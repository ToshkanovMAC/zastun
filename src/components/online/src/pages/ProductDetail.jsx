import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../api/productApi'
import { useAsyncData } from '../hooks/useAsyncData'
import { formatCurrency } from '../utils/format'
import LoadingSkeleton from '../components/LoadingSkeleton'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, loading, error } = useAsyncData(
    () => getProductById(id),
    [id],
  )

  return (
    <section className="detail-page">
      <button className="button secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {loading ? (
        <LoadingSkeleton rows={1} />
      ) : error ? (
        <div className="alert">{error}</div>
      ) : (
        product && (
          <div className="detail-grid">
            <div className="detail-image-panel">
              <img src={product.image} alt={product.name} />
              <div className="status-pill">
                {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
              </div>
            </div>

            <div className="detail-info">
              <span className="eyebrow">{product.category}</span>
              <h2>{product.name}</h2>
              <p className="detail-copy">{product.description}</p>

              <div className="detail-meta">
                <div>
                  <span>Price</span>
                  <strong>{formatCurrency(product.price)}</strong>
                </div>
                <div>
                  <span>Category</span>
                  <strong>{product.category}</strong>
                </div>
              </div>

              <div className="detail-specs">
                <h3>Specifications</h3>
                <div className="spec-grid">
                  <div>
                    <span>Weight</span>
                    <strong>{product.specs.weight}</strong>
                  </div>
                  <div>
                    <span>Bluetooth</span>
                    <strong>{product.specs.bluetooth}</strong>
                  </div>
                  <div>
                    <span>Warranty</span>
                    <strong>{product.specs.warranty}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default ProductDetail
