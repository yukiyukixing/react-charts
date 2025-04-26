import React from 'react'
import LineCharts from './LineCharts'
import './App.css'

function App() {
  // 组合月份和销售数据为对象数组
  const salesDataObjects = [
    { month: '2024.01', sales: 17589 },
    { month: '2024.02', sales: 17391 },
    { month: '2024.03', sales: 16319 },
    { month: '2024.04', sales: 21981 },
    { month: '2024.05', sales: 35709 },
    { month: '2024.06', sales: 57168 },
    { month: '2024.07', sales: 39991 },
    { month: '2024.08', sales: 46323 },
    { month: '2024.09', sales: 20117 },
    { month: '2024.10', sales: 4400 },
    { month: '2024.11', sales: 8253 },
    { month: '2024.12', sales: 31426 },
    { month: '2025.01', sales: 37397 },
    { month: '2025.02', sales: 14040 },
    { month: '2025.03', sales: 43905 },
  ]

  const incomeDataObjects = [
    { month: '2024.03', sales: 25322 },
    { month: '2024.04', sales: 27581 },
    { month: '2024.05', sales: 30131 },
    { month: '2024.06', sales: 36517 },
    { month: '2024.07', sales: 30230 },
    { month: '2024.08', sales: 32056 },
    { month: '2024.09', sales: 50131 },
    { month: '2024.10', sales: 30132 },
    { month: '2024.11', sales: 30096 },
    { month: '2024.12', sales: 30132 },
    { month: '2025.01', sales: 31076 },
    { month: '2025.02', sales: 30982 },
    { month: '2025.03', sales: 39946 },
  ]

  const debtDataObjects = [
    { month: '2024.01', sales: 267874 },
    { month: '2024.02', sales: 267874 },
    { month: '2024.03', sales: 263691 },
    { month: '2024.04', sales: 268939 },
    { month: '2024.05', sales: 279221 },
    { month: '2024.06', sales: 280457 },
    { month: '2024.07', sales: 298660 },
    { month: '2024.08', sales: 315716 },
    { month: '2024.09', sales: 287586 },
    { month: '2024.10', sales: 268114 },
    { month: '2024.11', sales: 248227 },
    { month: '2024.12', sales: 251551 },
    { month: '2025.01', sales: 261555 },
    { month: '2025.02', sales: 243390 },
    { month: '2025.03', sales: 232417 },
  ]

  // 合并收入和支出的月份，去重
  const combinedMonths = [
    ...new Set([
      ...salesDataObjects.map((item) => item.month),
      ...incomeDataObjects.map((item) => item.month),
    ]),
  ].sort()

  // 合并收入和支出的数据
  const combinedData = () => {
    const incomeData = []
    const expenseData = []

    combinedMonths.forEach((month) => {
      // 查找该月的收入
      const income = incomeDataObjects.find((item) => item.month === month)
      incomeData.push(income ? income.sales : 0)

      // 查找该月的支出
      const expense = salesDataObjects.find((item) => item.month === month)
      expenseData.push(expense ? expense.sales : 0)
    })

    return {
      months: combinedMonths,
      incomeData,
      expenseData,
    }
  }

  const { months, incomeData, expenseData } = combinedData()

  // 添加支出标线配置
  const expenseMarkLine = {
    silent: false,
    symbol: ['circle', 'arrow'], // 起点使用圆圈，终点使用箭头
    symbolSize: [8, 10], // 设置起点和终点符号的大小
    lineStyle: {
      color: '#1DA9A0',
      type: 'dashed', // 改为虚线
      width: 1,
    },
    label: {
      formatter: '5000',
      position: 'end',
    },
    data: [
      {
        yAxis: 5000,
        name: '5000',
      },
    ],
  }

  // 添加收入标线配置
  const incomeMarkLine = {
    silent: false,
    symbol: ['circle', 'arrow'], // 起点使用圆圈，终点使用箭头
    symbolSize: [8, 10], // 设置起点和终点符号的大小
    lineStyle: {
      color: '#1DA9A0',
      type: 'dashed', // 虚线
      width: 1,
    },
    label: {
      formatter: '6万',
      position: 'end',
    },
    data: [
      {
        yAxis: 60000,
        name: '6万',
      },
    ],
  }

  return (
    <>
      <div className="app-container">
        <h1 className="app-main-title">
          <span>挂图</span>
        </h1>
        <h1 className="app-title">收入支出对比图</h1>

        <div className="charts-wrapper">
          <div className="chart-item">
            <LineCharts
              title="收入支出对比"
              xAxisData={months}
              multiSeries={[
                {
                  name: '收入',
                  data: incomeData,
                  color: '#1DA9A0', // 绿色
                  decimalPlaces: 1,
                  showLabel: false,
                  symbolSize: 4, // 符号大小设为4
                  lineWidth: 2,
                },
                {
                  name: '支出',
                  data: expenseData,
                  color: '#FF0000', // 红色
                  labelColor: '#FF0000',
                  decimalPlaces: 1,
                  showLabel: false,
                  symbolSize: 4, // 符号大小设为4
                  lineWidth: 2,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="app-container">
        <h1 className="app-title">收入折线图</h1>

        <div className="charts-wrapper">
          <div className="chart-item">
            <LineCharts
              title="每月收入数据"
              xAxisData={incomeDataObjects.map((item) => item.month)}
              seriesData={incomeDataObjects.map((item) => item.sales)}
              seriesName="收入"
              color="#1DA9A0"
              decimalPlaces={1}
              markLine={incomeMarkLine}
            />
          </div>
        </div>
      </div>
      <div className="app-container">
        <h1 className="app-title">支出折线图</h1>

        <div className="charts-wrapper">
          <div className="chart-item">
            <LineCharts
              title="每月支出数据"
              xAxisData={salesDataObjects.map((item) => item.month)}
              seriesData={salesDataObjects.map((item) => item.sales)}
              seriesName="支出"
              color="#FF0000"
              labelColor="#FF0000"
              decimalPlaces={1}
              markLine={expenseMarkLine}
            />
          </div>
        </div>
      </div>

      <div className="app-container">
        <h1 className="app-title">负债折线图</h1>

        <div className="charts-wrapper">
          <div className="chart-item">
            <LineCharts
              title="每月负债数据"
              xAxisData={debtDataObjects.map((item) => item.month)}
              seriesData={debtDataObjects.map((item) => item.sales)}
              seriesName="负债"
              color="#FF0000"
              labelColor="#FF0000"
              decimalPlaces={2}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
