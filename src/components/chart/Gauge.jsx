import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

// 封装 Gauge 图表组件
const ChartGauge = ({ 
    height = '200px', // 图表高度
    min = 0, // 最小值
    max = 100, // 最大值
    radius = '80%', // 仪表盘大小
    splitNumber = 10, // 刻度数量
    data = 0, // 当前值
    axisWidth = 8, // 进度条宽度
    progressColor = '#000', // 进度条颜色
    pointerColor = '#000', // 指针颜色
    axisLineColor = '#eee' // 轴线颜色
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // 初始化图表
    if (!chartInstance.current && chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      series: [
        {
          type: 'gauge',
          min,
          max,
          radius,
          splitNumber,
          progress: {
            show: true,
            width: axisWidth,
            itemStyle: { color: progressColor }
          },
          axisLine: {
            lineStyle: {
              width: axisWidth,
              color: [[1, axisLineColor]]
            }
          },
          axisTick: {
            show: true,
            splitNumber: 10,
            length: 5,
            distance: 5,
            lineStyle: { width: 1 }
          },
          splitLine: {
            show: true,
            length: 8,
            distance: 5,
            lineStyle: { width: 1 }
          },
          axisLabel: {
            distance: 15,
            color: '#999',
            fontSize: 9
          },
          pointer: {
            show: true,
            width: 2,
            itemStyle: {
              borderColor: pointerColor,
              color: pointerColor
            }
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 10,
            itemStyle: {
              borderWidth: 1,
              borderColor: pointerColor
            }
          },
          title: { show: false },
          detail: {
            formatter: '{value}/' + max,
            valueAnimation: true,
            fontSize: 12,
            offsetCenter: [0, '80%']
          },
          data: [{ value: data }]
        }
      ]
    };

    chartInstance.current?.setOption(option);

    // 响应式调整
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [
    height,
    min,
    max,
    radius,
    splitNumber,
    data,
    axisWidth,
    progressColor,
    pointerColor,
    axisLineColor
  ]);

  // 组件卸载时销毁图表
  useEffect(() => {
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height }}></div>;
};

export { ChartGauge };
