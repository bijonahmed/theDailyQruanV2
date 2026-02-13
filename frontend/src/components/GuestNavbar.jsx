// src/Navbar.js
import React, { useState, useEffect, useContext } from "react";
import { Link,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import axios from "/config/axiosConfig";
import { CartContext } from "../CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { getToken, token, logout } = AuthUser();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showslug, setSlug] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get("/public/parentChildCategory");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const redirectCategory = async (slug) => {
    console.log(slug);
    setSlug(slug);
    navigate(`/category/${slug}`);
  };

  useEffect(() => {
    fetchData();
  }, [showslug]);

  const logoutUser = async () => {
    if (token) {
      await logout();
      navigate("/login");
    }
  };

  const location = useLocation(); // Get current route
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine logo size based on route
  const logoStyle =
    location.pathname === "/" // Home route
      ? {
          height: isMobile ? "60px" : "60px", // Home: mobile 60px, desktop 60px
          width: isMobile ? "73px" : "90px",
        }
      : {
          height: isMobile ? "60px" : "60px", // Other pages: mobile 60px, desktop 60px
          width: isMobile ? "60px" : "60px",
        };
  return (
    <>
      <header className="site_header header_style_4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col col-lg-1">
              <div className="site_logo">
                <Link className="site_link" to="/">
                  <img
                    src="/assets/images/logo/site_logo.png"
                    alt="The Daily Quran"
                    style={logoStyle}
                  />
                </Link>
              </div>
            </div>
            <div className="col col-lg-8">
              <nav className="main_menu navbar navbar-expand-lg">
                <div
                  className="main_menu_inner collapse navbar-collapse justify-content-left"
                  id="main_menu_dropdown"
                >
                  <ul className="main_menu_list unordered_list_center">
                    <li className="active">
                      <Link className="nav-link" to="/" id="home_submenu">
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link className="nav-link" to="/surah">
                        Surah
                      </Link>
                    </li>

                    {/* CategoryMenu Component to render categories and subcategories */}

                    <li className="dropdown d-none">
                      <a
                        className="nav-link"
                        href="#"
                        id="pages_submenu"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Technology
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="pages_submenu"
                      >
                        {categories.map((category) => (
                          <li className="dropdown" key={category.id}>
                            <Link
                              className="nav-link"
                              id={`submenu_${category.id}`}
                              onClick={() => redirectCategory(category.slug)}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {category.name}
                            </Link>
                            {category.children.length > 0 && (
                              <ul
                                className="dropdown-menu"
                                aria-labelledby={`submenu_${category.id}`}
                              >
                                {category.children.map((subCategory) => (
                                  <li key={subCategory.id}>
                                    <Link
                                      to={`/question-answer/${subCategory.slug}`}
                                    >
                                      {subCategory.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* <li>
                      <Link className="nav-link" to="/pdf-books">
                        PDF
                      </Link>
                    </li>
                    <li className="d-none">
                      <Link className="nav-link" to="/complete-guide">
                        Complete Guide
                      </Link>
                    </li> */}
                    <li>
                      <Link className="nav-link" to="/juz">
                        Juz
                      </Link>
                      
                    </li>
                      <li>

                          <Link className="nav-link" to="/quran-translation">
                        Quran Translation
                      </Link>
                      </li>


                    <li>
                      <Link className="nav-link" to="/pdf-books">
                        PDF
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="nav-link" to="/torrent-tutorial">
                        Torrent
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/job">
                        Job
                      </Link>
                    </li> */}

                    {/* {token && (
                      <li>
                        <Link className="nav-link" to="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {token && (
                      <li className="dropdown">
                        <Link
                          className="nav-link"
                          href="#"
                          id="register_submenu"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          My Profile
                        </Link>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="register_submenu"
                        >
                          <li>
                            <Link to="/users/profile">Profile</Link>
                          </li>
                          <li>
                            <Link to="/users/change-password">
                              Change Password
                            </Link>
                          </li>
                          <li>
                            <Link to="/users/my-certificate">Certificate</Link>
                          </li>
                          <li>
                            <Link to="/users/referral">Referral</Link>
                          </li>
                          <li>
                            <Link to="/users/my-bookmarks">My Bookmarks</Link>
                          </li>
                        </ul>
                      </li>
                    )} */}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col col-lg-3">
              <ul className="header_btns_group unordered_list_end">
                <li>
                  <button
                    data-magnetic
                    data-cursor="-opaque"
                    className="mobile_menu_btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#main_menu_dropdown"
                    aria-controls="main_menu_dropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="far fa-bars" />
                  </button>
                </li>

                {/* {token ? (
                  <li>
                    <Link className="nav-link" to="#" onClick={logoutUser}>
                      {" "}
                      <i className="far fa-sign-out" />
                      &nbsp;Logout
                    </Link>
                  </li>
                ) : (
                  <>
                    {cart.length > 0 && (
                      <li>
                        <Link to="/cart" className="cart_btn mt-1">
                          <i className="far fa-shopping-cart" />
                          <span className="cart_counter">{cart.length}</span>
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        className="login_btn"
                        data-cursor="-opaque"
                        data-magnetic
                        to="/login"
                      >
                        <i className="far fa-user" />
                      </Link>
                    </li>

                    <li>
                      <Link className="btn btn_primary" to="/signup">
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            lineHeight: "1",
                          }}
                        >
                          <small>Sign Up</small>
                          <small>Sign Up</small>
                        </span>
                      </Link>
                    </li>
                  </>
                )} */}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
