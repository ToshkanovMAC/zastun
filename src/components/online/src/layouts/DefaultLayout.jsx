import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Admin', path: '/admin' },
]

const DefaultLayout = () => {
  const location = useLocation()

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-block">
          <div className="brand-mark">e</div>
          <div>
            <p className="eyebrow">Modern storefront</p>
            <h1>Pulse Commerce</h1>
          </div>
        </div>

        <nav className="nav-bar" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive || location.pathname === item.path
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Built for a clean React e-commerce demo.</p>
      </footer>
    </div>
  )
}

export default DefaultLayout
