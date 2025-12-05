import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

const ChartRadar2 = ({ data, height }) => {
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
      },
      legend: {
        show: false
      },
      radar: [
        {
          indicator: [{ text: '数据1' }, { text: '数据2' }, { text: '数据3' }, { text: '数据4' }, { text: '数据5' }, { text: '数据6' }],
          radius: '70%',
          splitNumber: 5,
          shape: 'circle',
          axisName: {
            fontSize: 10
          },
          axisNameGap: 10,
          splitArea: {
            areaStyle: {
              color: ['#fafafa', '#fff']
            }
          }
        }
      ],
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          data: [
            {
              value: [80, 50, 0.4, -100, 200, 100],
              name: 'Data A',
              lineStyle: {
                color: '#000',
                width: 2
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

export { ChartRadar2 };
