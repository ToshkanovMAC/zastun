import { useMemo } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getAnalytics } from '../api/analyticsApi'
import { useAsyncData } from '../hooks/useAsyncData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

const Admin = () => {
  const { data, loading, error } = useAsyncData(getAnalytics, [])

  const lineData = useMemo(() => {
    if (!data?.monthlyAveragePrice) return null

    return {
      labels: data.monthlyAveragePrice.map((item) => item.month),
      datasets: [
        {
          label: 'Average price',
          data: data.monthlyAveragePrice.map((item) => item.average),
          fill: false,
          borderColor: '#4f46e5',
          backgroundColor: '#c7d2fe',
          tension: 0.35,
          pointRadius: 5,
        },
      ],
    }
  }, [data])

  const pieData = useMemo(() => {
    if (!data?.categoryDistribution) return null

    return {
      labels: data.categoryDistribution.map((item) => item.category),
      datasets: [
        {
          data: data.categoryDistribution.map((item) => item.productCount),
          backgroundColor: ['#4f46e5', '#2563eb', '#f59e0b', '#10b981'],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    }
  }, [data])

  return (
    <section className="admin-page">
      <div className="admin-header">
        <div>
          <span className="eyebrow">Analytics</span>
          <h2>Store performance overview</h2>
          <p>View monthly trends and category mix from your product catalog.</p>
        </div>
      </div>

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <LoadingSkeleton rows={2} />
      ) : (
        <div className="chart-grid">
          <article className="chart-panel">
            <div className="chart-panel-header">
              <h3>Monthly average price</h3>
            </div>
            {lineData && (
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                  },
                }}
              />
            )}
          </article>

          <article className="chart-panel">
            <div className="chart-panel-header">
              <h3>Category distribution</h3>
            </div>
            {pieData && (
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' },
                  },
                }}
              />
            )}
          </article>
        </div>
      )}
    </section>
  )
}

const LoadingSkeleton = ({ rows = 2 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: rows }).map((_, index) => (
      <article key={index} className="chart-skeleton">
        <div className="skeleton-block line-skeleton short" />
        <div className="skeleton-block chart-skeleton-rect" />
      </article>
    ))}
  </div>
)

export default Admin
