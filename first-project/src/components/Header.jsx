import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2 rounded-bottom border">
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          <i className="bi bi-box-seam-fill me-2"></i>Rivaayat
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


// import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react"
// import { Link } from 'react-router-dom';
// import { useState } from "react"

// const Header = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const cartItemCount = 3 // This would come from your cart state

//   return (
//     <header className="sticky-top shadow-sm">
//       {/* Top Bar */}
//       <div className="bg-light border-bottom">
//         <div className="container-fluid">
//           <div className="row align-items-center py-2">
//             <div className="col-md-8 d-none d-md-block">
//               <small className="text-muted">
//                 <span className="me-3">🚚 Free shipping on orders over $50</span>
//                 <span className="text-muted me-3">|</span>
//                 <span>📞 24/7 Customer Support</span>
//               </small>
//             </div>
//             <div className="col-md-4 col-12 text-end">
//               <small>
//                 <Link href="/track-order" className="text-decoration-none text-muted me-3 hover-primary">
//                   Track Order
//                 </Link>
//                 <span className="text-muted me-3">|</span>
//                 <Link href="/help" className="text-decoration-none text-muted hover-primary">
//                   Help
//                 </Link>
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
//         <div className="container-fluid">
//           {/* Logo */}
//           <Link href="/" className="navbar-brand d-flex align-items-center text-decoration-none">
//             <div
//               className="bg-gradient-primary rounded me-2 d-flex align-items-center justify-content-center"
//               style={{ width: "40px", height: "40px" }}
//             >
//               <span className="text-white fw-bold fs-5">R</span>
//             </div>
//             <span className="fw-bold fs-3 text-gradient-primary">Rivaayat</span>
//           </Link>

//           {/* Desktop Search Bar */}
//           <div className="d-none d-md-flex flex-grow-1 mx-4" style={{ maxWidth: "400px" }}>
//             <div className="input-group">
//               <span className="input-group-text bg-light border-end-0">
//                 <Search size={18} className="text-muted" />
//               </span>
//               <input
//                 type="search"
//                 className="form-control border-start-0 bg-light"
//                 placeholder="Search products..."
//                 style={{ boxShadow: "none" }}
//               />
//             </div>
//           </div>

//           {/* Right Actions */}
//           <div className="d-flex align-items-center">
//             {/* Mobile Search Toggle */}
//             <button
//               className="btn btn-link text-dark p-2 d-md-none me-2"
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//             >
//               <Search size={20} />
//             </button>

//             {/* Wishlist */}
//             <button className="btn btn-link text-dark p-2 me-2 d-none d-sm-block position-relative">
//               <Heart size={20} />
//               <span
//                 className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                 style={{ fontSize: "0.6rem" }}
//               >
//                 2
//               </span>
//             </button>

//             {/* Cart */}
//             <button className="btn btn-link text-dark p-2 me-2 position-relative">
//               <ShoppingCart size={20} />
//               {cartItemCount > 0 && (
//                 <span
//                   className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                   style={{ fontSize: "0.6rem" }}
//                 >
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>

//             {/* User Dropdown */}
//             <div className="dropdown me-2">
//               <button className="btn btn-link text-dark p-2" type="button" data-bs-toggle="dropdown">
//                 <User size={20} />
//               </button>
//               <ul className="dropdown-menu dropdown-menu-end">
//                 <li>
//                   <Link href="/login" className="dropdown-item">
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/register" className="dropdown-item">
//                     Sign Up
//                   </Link>
//                 </li>
//                 <li>
//                   <hr className="dropdown-divider" />
//                 </li>
//                 <li>
//                   <Link href="/account" className="dropdown-item">
//                     My Account
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/orders" className="dropdown-item">
//                     Orders
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/settings" className="dropdown-item">
//                     Settings
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="btn btn-link text-dark p-2 d-lg-none"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               <Menu size={20} />
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav ms-auto me-4">
//               <li className="nav-item">
//                 <Link href="/" className="nav-link fw-medium hover-underline">
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item dropdown">
//                 <a className="nav-link dropdown-toggle fw-medium" href="#" role="button" data-bs-toggle="dropdown">
//                   Categories
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link href="/electronics" className="dropdown-item">
//                       Electronics
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/fashion" className="dropdown-item">
//                       Fashion
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/home-garden" className="dropdown-item">
//                       Home & Garden
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/sports" className="dropdown-item">
//                       Sports
//                     </Link>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>
//                   <li>
//                     <Link href="/categories" className="dropdown-item">
//                       View All Categories
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item">
//                 <Link href="/deals" className="nav-link fw-medium hover-underline d-flex align-items-center">
//                   Deals
//                   <span className="badge bg-danger ms-1" style={{ fontSize: "0.6rem" }}>
//                     Hot
//                   </span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/about" className="nav-link fw-medium hover-underline">
//                   About
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/contact" className="nav-link fw-medium hover-underline">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         {isSearchOpen && (
//           <div className="container-fluid d-md-none mt-3">
//             <div className="input-group">
//               <span className="input-group-text bg-light">
//                 <Search size={18} className="text-muted" />
//               </span>
//               <input type="search" className="form-control bg-light" placeholder="Search products..." />
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Mobile Menu Offcanvas */}
//       <div
//         className={`offcanvas offcanvas-end ${isMobileMenuOpen ? "show" : ""}`}
//         style={{ visibility: isMobileMenuOpen ? "visible" : "hidden" }}
//       >
//         <div className="offcanvas-header border-bottom">
//           <h5 className="offcanvas-title fw-bold">Menu</h5>
//           <button type="button" className="btn-close" onClick={() => setIsMobileMenuOpen(false)}></button>
//         </div>
//         <div className="offcanvas-body">
//           <div className="d-flex flex-column">
//             <Link href="/" className="nav-link py-3 border-bottom fw-medium">
//               Home
//             </Link>

//             <div className="py-3 border-bottom">
//               <div className="fw-medium mb-2">Categories</div>
//               <div className="ps-3">
//                 <Link href="/electronics" className="nav-link py-2 text-muted">
//                   Electronics
//                 </Link>
//                 <Link href="/fashion" className="nav-link py-2 text-muted">
//                   Fashion
//                 </Link>
//                 <Link href="/home-garden" className="nav-link py-2 text-muted">
//                   Home & Garden
//                 </Link>
//                 <Link href="/sports" className="nav-link py-2 text-muted">
//                   Sports
//                 </Link>
//               </div>
//             </div>

//             <Link href="/deals" className="nav-link py-3 border-bottom fw-medium d-flex align-items-center">
//               Deals
//               <span className="badge bg-danger ms-2" style={{ fontSize: "0.6rem" }}>
//                 Hot
//               </span>
//             </Link>
//             <Link href="/about" className="nav-link py-3 border-bottom fw-medium">
//               About
//             </Link>
//             <Link href="/contact" className="nav-link py-3 border-bottom fw-medium">
//               Contact
//             </Link>

//             <div className="mt-4 pt-3 border-top">
//               <Link href="/track-order" className="nav-link py-2 text-muted">
//                 Track Order
//               </Link>
//               <Link href="/help" className="nav-link py-2 text-muted">
//                 Help
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Backdrop for mobile menu */}
//       {isMobileMenuOpen && (
//         <div className="offcanvas-backdrop fade show" onClick={() => setIsMobileMenuOpen(false)}></div>
//       )}

//       <style jsx>{`
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #007bff, #6f42c1);
//         }
        
//         .text-gradient-primary {
//           background: linear-gradient(135deg, #007bff, #6f42c1);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
        
//         .hover-primary:hover {
//           color: #007bff !important;
//         }
        
//         .hover-underline {
//           position: relative;
//           transition: color 0.3s ease;
//         }
        
//         .hover-underline:hover {
//           color: #007bff !important;
//         }
        
//         .hover-underline::after {
//           content: '';
//           position: absolute;
//           width: 0;
//           height: 2px;
//           bottom: -2px;
//           left: 0;
//           background-color: #007bff;
//           transition: width 0.3s ease;
//         }
        
//         .hover-underline:hover::after {
//           width: 100%;
//         }
        
//         .navbar {
//           backdrop-filter: blur(10px);
//           background-color: rgba(255, 255, 255, 0.95) !important;
//         }
        
//         .dropdown-menu {
//           border: none;
//           box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
//           border-radius: 0.5rem;
//         }
        
//         .dropdown-item:hover {
//           background-color: #f8f9fa;
//           color: #007bff;
//         }
        
//         .input-group-text {
//           border-right: none;
//         }
        
//         .form-control:focus {
//           border-color: #007bff;
//           box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
//         }
        
//         .btn-link:hover {
//           color: #007bff !important;
//         }
        
//         .offcanvas {
//           width: 320px !important;
//         }
        
//         @media (max-width: 768px) {
//           .navbar-brand .fs-3 {
//             font-size: 1.5rem !important;
//           }
//         }
//       `}</style>
//     </header>
//   )
// }

// export default Header
