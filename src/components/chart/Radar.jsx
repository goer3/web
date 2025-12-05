import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

const ChartRadar = ({ data, height }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // 初始化图表
    if (!chartInstance.current && chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      title: {
        show: false
        // text: '标题'
      },
      legend: {
        show: false,
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        radius: '70%',
        axisName: {
          fontSize: 10
        },
        axisNameGap: 5,
        splitArea: {
          areaStyle: {
            color: ['#fafafa', '#fff']
          }
        },
        indicator: [
          { name: '数据上', max: 6500 },
          { name: '数据左上', max: 16000 },
          { name: '数据左下', max: 30000 },
          { name: '数据下', max: 38000 },
          { name: '数据右下', max: 52000 },
          { name: '数据右上', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          symbolSize: 0,
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget',
              lineStyle: {
                color: '#000'
              }
            }
          ]
        }
      ],
      tooltip: {
        show: true,
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

export { ChartRadar };
