import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.stock === 0 ? (
          <span className="status-badge out-of-stock">Out of stock</span>
        ) : (
          <span className="status-badge">{product.category}</span>
        )}
      </div>

      <div className="product-body">
        <div>
          <p className="product-title">{product.name}</p>
          <p className="product-category">{product.category}</p>
        </div>

        <div className="product-meta">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <span className="product-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
