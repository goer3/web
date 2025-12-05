import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent]);

// 封装 Area 图表组件
const ChartArea = ({ data, height, showPoint = false }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // 初始化图表
    if (!chartInstance.current && chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      grid: {
        x: '10%', //x 偏移量
        y: '15%', // y 偏移量
        width: '85%', // 宽度
        height: '70%' // 高度
      },
      xAxis: {
        type: 'category',
        boundaryGap: false, // 从头开始
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        axisLabel: {
          margin: 10,
          fontSize: 10
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          margin: 10,
          fontSize: 10
        },
        splitNumber: 5,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            width: 0.5,
            color: '#f0f0f0'
          }
        }
      },
      series: [
        {
          type: 'line',
          smooth: true,
          symbol: showPoint ? 'emptyCircle' : 'none',
          symbolSize: 4,
          itemStyle: {
            color: '#000'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320, 1200, 1100, 1150, 1250, 1300],
          lineStyle: {
            color: '#000',
            width: 1
          },
          areaStyle: {
            color: '#000',
            opacity: 0.02
          }
        }
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        textStyle: {
          fontSize: 10
        },
        extraCssText: 'border-radius: 0;box-shadow:none;border: 1px solid #ddd;padding:10px;'
      }
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
  }, [data]);

  // 组件卸载时销毁图表
  useEffect(() => {
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height }}></div>;
};

export { ChartArea };
