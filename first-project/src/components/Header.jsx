import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2 rounded-bottom border">
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand fs-4 d-flex align-items-center" to="/" style={{ textDecoration: 'none' }}>
  <i className="bi bi-link-45deg me-2" style={{
    fontSize: '1.6rem',
    color: '#7b2cbf'
  }}></i>

  <span style={{
    fontFamily: 'Playfair Display, serif',
    fontWeight: 700,
    fontSize: '1.6rem',
    color: '#111827',
    letterSpacing: '1px'
  }}>Affi</span>

  <span style={{
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '1.6rem',
    background: 'linear-gradient(90deg, #7b2cbf, #9d4edd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginLeft: '2px'
  }}>
    ne<span style={{
      display: 'inline-block',
      transform: 'rotate(-15deg)',
      fontWeight: 700,
      color: '#7b2cbf', // Visible "x" on white
      WebkitTextFillColor: 'initial',
      background: 'none'
    }}>x</span>
  </span>
</Link>


        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-1 rounded ${
                  location.pathname === "/"
                    ? "bg-primary text-white"
                    : "text-dark"
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-1 rounded ${
                  location.pathname === "/login"
                    ? "bg-primary text-white"
                    : "text-dark"
                }`}
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
