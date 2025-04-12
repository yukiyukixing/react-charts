import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as echarts from 'echarts'
import './index.css'

function LineCharts({
  title = '折线图',
  xAxisData = [],
  seriesData = [], // 单数据系列情况
  seriesName = '数据',
  color = 'rgba(29, 169, 160, 1)',
  labelColor = null,
  decimalPlaces = 2,
  multiSeries = null, // 新增：多数据系列
}) {
  const chartRef = useRef(null)
  let chartInstance = null

  // 初始化图表
  const initChart = () => {
    if (!chartRef.current) return

    // 销毁之前的实例
    if (chartInstance) {
      chartInstance.dispose()
    }

    // 创建新实例
    chartInstance = echarts.init(chartRef.current)

    // 设置图表配置项
    const option = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ccc',
            width: 1,
          },
        },
      },
      legend: {
        show: multiSeries ? true : false,
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: multiSeries ? '10%' : '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#515E5F',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E0E0E0',
            type: 'dashed',
          },
        },
        axisLabel: {
          formatter: function (value) {
            if (value >= 10000) {
              return (value / 10000).toFixed(decimalPlaces) + '万'
            } else {
              return value
            }
          },
        },
      },
      series: multiSeries
        ? multiSeries.map((item) => ({
            name: item.name,
            type: 'line',
            data: item.data,
            itemStyle: {
              color: item.color,
            },
            symbol: item.showSymbol === false ? 'none' : 'emptyCircle',
            symbolSize: item.symbolSize || 8,
            connectNulls: true,
            lineStyle: {
              width: item.lineWidth || 2.5,
              color: item.color,
            },
            label: {
              show: item.showLabel !== false,
              position: 'top',
              formatter: function (params) {
                const value = params.value
                if (value >= 10000) {
                  return (value / 10000).toFixed(item.decimalPlaces || decimalPlaces) + '万'
                } else {
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
              },
              fontSize: 15,
              color: item.labelColor || item.color,
              distance: 10,
            },
            smooth: true,
            emphasis: {
              scale: 1,
              focus: 'series',
            },
            z: 2,
          }))
        : [
            {
              name: seriesName,
              type: 'line',
              data: seriesData,
              itemStyle: {
                color: color,
              },
              symbol: 'emptyCircle',
              symbolSize: 8,
              connectNulls: true,
              lineStyle: {
                width: 2.5,
              },
              label: {
                show: true,
                position: 'top',
                formatter: function (params) {
                  // 将大数字转换为万为单位
                  const value = params.value
                  if (value >= 10000) {
                    // 转换为万单位并保留指定小数位数
                    return (value / 10000).toFixed(decimalPlaces) + '万'
                  } else {
                    // 较小数字保持原样，添加千位分隔符
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                },
                fontSize: 15,
                color: labelColor || color,
                distance: 10,
              },
              smooth: true,
              triggerLineEvent: false,
              emphasis: {
                scale: 1,
                focus: 'series',
              },
              z: 2,
            },
          ],
    }

    // 应用配置项
    chartInstance.setOption(option)
  }

  // 处理窗口大小变化
  const handleResize = () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  }

  // 初始化并设置resize监听
  useEffect(() => {
    initChart()

    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
      window.removeEventListener('resize', handleResize)
    }
  }, []) // 仅在组件挂载时执行

  // 数据变化时更新图表
  useEffect(() => {
    if (chartInstance) {
      const option = chartInstance.getOption()

      option.xAxis[0].data = xAxisData

      if (multiSeries) {
        // 更新多条线数据
        multiSeries.forEach((series, index) => {
          if (option.series[index]) {
            option.series[index].data = series.data
            option.series[index].name = series.name
          }
        })
      } else {
        // 更新单条线数据
        option.series[0].data = seriesData
        option.series[0].name = seriesName
      }

      option.title[0].text = title

      chartInstance.setOption(option)
    }
  }, [xAxisData, seriesData, seriesName, title, multiSeries])

  return <div className="line-chart-container" ref={chartRef}></div>
}

// PropTypes验证
LineCharts.propTypes = {
  title: PropTypes.string,
  xAxisData: PropTypes.array,
  seriesData: PropTypes.array,
  seriesName: PropTypes.string,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  decimalPlaces: PropTypes.number,
  multiSeries: PropTypes.array,
  smooth: PropTypes.bool,
}

export default LineCharts
