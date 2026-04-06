import { useMemo } from 'react'
import { getProducts } from '../api/productApi'
import { useAsyncData } from '../hooks/useAsyncData'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import SectionTitle from '../components/SectionTitle'

const Home = () => {
  const { data: products, loading, error } = useAsyncData(getProducts, [])

  const productCount = useMemo(() => products?.length ?? 0, [products])

  return (
    <section className="home-page">
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Featured collection</span>
          <h2>Modern gear for every workspace.</h2>
          <p className="hero-copy">
            Discover curated products crafted for design, comfort, and reliability.
          </p>
        </div>
        <div className="hero-metrics">
          <div>
            <strong>{productCount}</strong>
            <span>products available</span>
          </div>
          <div>
            <strong>Responsive</strong>
            <span>clean and modern layout</span>
          </div>
        </div>
      </div>

      <SectionTitle
        title="Browse products that feel premium."
        subtitle="Click any card to view details and stock information."
      />

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : (
        <div className="product-grid">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
