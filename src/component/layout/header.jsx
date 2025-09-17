import { useState, useEffect } from "react";
import '../../assets/css/custom-mobile-dropdown.css';
import { Link, NavLink, useLocation } from "react-router-dom";

const phoneNumber = "+800-123-4567 6587";
const address = "Beverley, New York 224 USA";

const socialList = [
  { iconName: "icofont-facebook-messenger", siteLink: "#" },
  { iconName: "icofont-twitter", siteLink: "#" },
  { iconName: "icofont-vimeo", siteLink: "#" },
  { iconName: "icofont-skype", siteLink: "#" },
  { iconName: "icofont-rss-feed", siteLink: "#" },
];

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const location = useLocation();

  const homeMap = {
    "/": "Home One",
    "/index-2": "Home Two",
    "/index-3": "Home Three",
    "/index-4": "Home Four",
    "/index-5": "Home Five",
    "/index-6": "Home Six",
    "/index-7": "Home Seven",
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleMobileMenuToggle = (index, e) => {
    if (window.innerWidth < 992) {
      e.preventDefault(); // Prevent anchor navigation
      setOpenMenuIndex(openMenuIndex === index ? null : index);
    }
  };

  return (
    <header className={`header-section ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
      <div className={`header-top ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <ul className="lab-ul left">
              <li><i className="icofont-ui-call"></i> <span>{phoneNumber}</span></li>
              <li><i className="icofont-location-pin"></i> {address}</li>
            </ul>
            <ul className="lab-ul social-icons d-flex align-items-center">
              <li><p>Find us on : </p></li>
              {socialList.map((val, i) => (
                <li key={i}><a href={val.siteLink}><i className={val.iconName}></i></a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <Link to="/"><img src="/assets/images/logo/01.png" alt="logo" /></Link>
            </div>

            <div className="menu-area">
              {isLoggedIn && (
                <div className="menu">
                  <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                    {/* Home (temporarily only Home One, no dropdown) */}
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    {/* 
                      Home dropdown and other home variants removed for clarity and to simplify the navbar.
                      To restore, uncomment the code below.
                    */}
                    {/*
                    <li className={`menu-item-has-children ${openMenuIndex === 0 ? "open" : ""}`}
                      onClick={(e) => handleMobileMenuToggle(0, e)}>
                      <a href="#">{homeMap[location.pathname] || "Home"}</a>
                      <ul className="lab-ul dropdown-menu">
                        <li><NavLink to="/">Home One</NavLink></li>
                        <li><NavLink to="/index-2">Home Two</NavLink></li>
                        <li><NavLink to="/index-3">Home Three</NavLink></li>
                        <li><NavLink to="/index-4">Home Four</NavLink></li>
                        <li><NavLink to="/index-5">Home Five</NavLink></li>
                        <li><NavLink to="/index-6">Home Six</NavLink></li>
                        <li><NavLink to="/index-7">Home Seven</NavLink></li>
                      </ul>
                    </li>
                    */}

                    {/* Courses (temporarily direct link, no dropdown) */}
                    <li>
                      <NavLink to="/course">Courses</NavLink>
                    </li>
                    {/* 
                      Courses dropdown and details removed for clarity and to avoid confusion.
                      To restore, uncomment the code below.
                    */}
                    {/*
                    <li className={`menu-item-has-children ${openMenuIndex === 1 ? "open" : ""}`}
                      onClick={(e) => handleMobileMenuToggle(1, e)}>
                      <a href="#">Courses</a>
                      <ul className="lab-ul dropdown-menu">
                        <li><NavLink to="/course">Course</NavLink></li>
                        <li><NavLink to="/course-single">Course Details</NavLink></li>
                        <li><NavLink to="/course-view">Course View</NavLink></li>
                      </ul>
                    </li>
                    */}

                    {/* 
                      Blog dropdown removed for clarity and because the blog feature is currently hidden.
                      To restore, uncomment the code below.
                    */}
                    {/*
                    <li className={`menu-item-has-children ${openMenuIndex === 2 ? "open" : ""}`}
                      onClick={(e) => handleMobileMenuToggle(2, e)}>
                      <a href="#">Blog</a>
                      <ul className="lab-ul dropdown-menu">
                        <li><NavLink to="/blog">Blog Grid</NavLink></li>
                        <li><NavLink to="/blog-2">Blog Style 2</NavLink></li>
                        <li><NavLink to="/blog-3">Blog Style 3</NavLink></li>
                        <li><NavLink to="/blog-single">Blog Single</NavLink></li>
                      </ul>
                    </li>
                    */}

                    {/* Pages */}
                    <li className={`menu-item-has-children ${openMenuIndex === 3 ? "open" : ""}`}
                      onClick={(e) => handleMobileMenuToggle(3, e)}>
                      <a href="#" onClick={(e) => handleMobileMenuToggle(3, e)}>Pages</a>
                      <ul className="lab-ul dropdown-menu" style={{ display: (window.innerWidth < 992 && openMenuIndex === 3) ? 'block' : undefined }}>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/team">Team</NavLink></li>
                        <li><NavLink to="/instructor">Instructor</NavLink></li>
                        {/* 
                          Other pages removed for clarity: Shop, Cart, Search, 404.
                          To restore, uncomment the code below.
                        */}
                        {/*
                        <li><NavLink to="/shop">Shop Page</NavLink></li>
                        <li><NavLink to="/shop-single">Shop Details Page</NavLink></li>
                        <li><NavLink to="/cart-page">Shop Cart Page</NavLink></li>
                        <li><NavLink to="/search-page">Search Page</NavLink></li>
                        <li><NavLink to="/search-none">Search None</NavLink></li>
                        <li><NavLink to="/404">404</NavLink></li>
                        */}
                      </ul>
                    </li>

                    {/* Contact */}
                    <li><NavLink to="/contact">Contact</NavLink></li>

                    <li>
                      <NavLink to="/my-courses">
                        <i className="icofont-book-alt"></i> <span>MY COURSES</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}

              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="login">
                    <i className="icofont-user"></i> <span>LOG IN</span>
                  </Link>
                  <Link to="/signup" className="signup">
                    <i className="icofont-users"></i> <span>SIGN UP</span>
                  </Link>
                </>
              ) : (
                <>
                  <NavLink to="/admin-login" className="login">
                    <i className="icofont-user"></i> <span>DASHBOARD</span>
                  </NavLink>
                  <button onClick={handleLogout} className="signup">
                    <i className="icofont-logout"></i> <span>LOGOUT</span>
                  </button>
                </>
              )}

              {/* Mobile Toggles */}
              <div
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="ellepsis-bar d-lg-none" onClick={() => setSocialToggle(!socialToggle)}>
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;