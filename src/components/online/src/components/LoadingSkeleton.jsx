const LoadingSkeleton = ({ rows = 3 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: rows }).map((_, index) => (
        <article key={index} className="product-card skeleton-card">
          <div className="skeleton-block image-skeleton" />
          <div className="skeleton-block line-skeleton short" />
          <div className="skeleton-block line-skeleton" />
          <div className="skeleton-block line-skeleton" />
        </article>
      ))}
    </div>
  )
}

export default LoadingSkeleton
