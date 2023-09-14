import React from 'react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)
const Chart = ({ chartData }) => {
  return (
    <div>
      <Bar  data={chartData}
        options={{
          scales:{
            y: {
              beginAtZero:true
            }
          }
        }}
      ></Bar>

    </div>
  )
}

export default Chart