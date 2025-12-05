import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

// 封装 Bar 图表组件
const ChartBar = ({ data, height }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // 初始化图表
    if (!chartInstance.current && chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      grid: {
        top: '20',
        left: '15',
        right: '15',
        bottom: '20',
      },
      xAxis: {
        type: 'category',
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
          show: true
        }
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320, 1200, 1100, 1150, 1250, 1300],
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#fafafa',
              borderColor : '#000',
              // borderWidth : 1
            }
          }
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
  }, [data]);

  // 组件卸载时销毁图表
  useEffect(() => {
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height }}></div>;
};

export { ChartBar };
