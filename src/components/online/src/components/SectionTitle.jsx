const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="section-title">
      <p className="eyebrow">Catalog</p>
      <h2>{title}</h2>
      <p className="section-copy">{subtitle}</p>
    </div>
  )
}

export default SectionTitle
