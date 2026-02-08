// src/pages/Home.js
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const Study = () => {
  useEffect(() => {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.type = "text/css";
    styleLink.href = "/assets/css/course-details.css";
    document.head.appendChild(styleLink);

    return () => {
      document.head.removeChild(styleLink);
    };
  }, []);

  return (
    <>
      <Helmet>
        {" "}
        <title>
          w3programmer - Education, Online Course, Interview Q&A Platform
        </title>
      </Helmet>

      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>
        <GuestNavbar />

        <main className="page_content">
          {/* Page Banner - Start
  ================================================== */}
          {/* <section class="page_banner decoration_wrap">
    <div class="container">
<h1 class="page_heading">Javascript</h1>
<ul class="breadcrumb_nav unordered_list_center">
  <li><a href='home.html'>Home</a></li>
  <li>JavaScript </li>
</ul>
    </div>
    <div class="deco_item deco_img_1" data-parallax='{"y" : -200, "smoothness": 6}'>
<img src="assets/images/shapes/line_shape_1.png" alt="Line Shape Image">
    </div>
    <div class="deco_item deco_img_2" data-parallax='{"y" : 200, "smoothness": 6}'>
<img src="assets/images/shapes/dot_shape_2.png" alt="Line Shape Image">
    </div>
  </section> */}
          {/* Page Banner - End
  ================================================== */}
          {/* Details Section - Start
  ================================================== */}
          <section className="details_section blog_details_section section_space_md pt-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="sidebar-menu-wrap">
                    <div className="sidemenu-wrap d-flex justify-content-between align-items-center">
                      <h3>Sidebar Menu</h3>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebarTest"
                        aria-controls="sidebarTest"
                      >
                        <i className="fas fa-bars" />
                      </button>
                    </div>
                    {/* ============== */}
                    {/* =================== */}
                    <div
                      className="offcanvas offcanvas-start"
                      tabIndex={1}
                      id="sidebarTest"
                      aria-labelledby="sidebarTestLabel"
                    >
                      <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="sidebarTestLabel">
                          Menu
                        </h5>
                        <button
                          type="button"
                          className="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        />
                      </div>
                      <div className="offcanvas-body">
                        <div className="left-sidebar">
                          <nav className="sidebar-nav" data-simplebar>
                            <ul
                              id="sidebar-menu"
                              className="sidebar-menu metismenu"
                            >
                              <li>
                                <a href="index.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-home-8-line" />
                                    Home
                                  </span>
                                </a>
                              </li>
                              <li className="mm-active">
                                <a
                                  href="all-queations.html"
                                  className="has-arrow box-style active"
                                  aria-expanded="true"
                                >
                                  <i className="ri-question-line" />
                                  <span className="menu-title">Questions</span>
                                </a>
                                <ul className="sidemenu-nav-second-level mm-collapse mm-show">
                                  <li>
                                    <a href="all-queations.html">
                                      <span className="menu-title active">
                                        All questions
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="queations-details.html">
                                      <span className="menu-title">
                                        Questions details
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a
                                  href="communities.html"
                                  className="box-style"
                                >
                                  <span className="menu-title">
                                    <i className="ri-links-line" />
                                    Communities
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="most-answered.html"
                                  className="has-arrow box-style"
                                >
                                  <i className="ri-question-answer-fill" />
                                  <span className="menu-title">
                                    Most answered
                                  </span>
                                </a>
                                <ul className="sidemenu-nav-second-level mm-collapse">
                                  <li>
                                    <a href="most-answered.html">
                                      <span className="menu-title">
                                        Most answered
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="most-answered-details.html">
                                      <span className="menu-title">
                                        Most answered details
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="unanswered.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-checkbox-circle-line" />
                                    Unanswered
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="most-visited.html"
                                  className="box-style"
                                >
                                  <span className="menu-title">
                                    <i className="ri-eye-line" />
                                    Most visited
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="polls.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-bar-chart-fill" />
                                    Polls
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="faq.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-hq-line" />
                                    FAQs
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="groups.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-group-2-line" />
                                    Groups
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="education.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-book-line" />
                                    Education
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="technology.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-file-shield-2-line" />
                                    Technology
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="tags.html" className="box-style">
                                  <span className="menu-title">
                                    <i className="ri-price-tag-line" />
                                    Tags
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="user.html"
                                  className="has-arrow box-style"
                                >
                                  <i className="ri-user-line" />
                                  <span className="menu-title">User</span>
                                </a>
                                <ul className="sidemenu-nav-second-level mm-collapse">
                                  <li>
                                    <a href="user.html">
                                      <span className="menu-title">User</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="user-profile.html">
                                      <span className="menu-title">
                                        User profile
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="ask-questions.html">
                                      <span className="menu-title">
                                        Ask a questions
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="middull-content">
                    <ul className="page-nish">
                      <li>
                        <a href="index.html">
                          <i className="ri-home-8-line" />
                          Home
                        </a>
                      </li>
                      <li>Question</li>
                      <li className="active">All questions</li>
                    </ul>
                    <form className="aq-form">
                      <div className="form_group">
                        <i className="fas fa-search" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Have a question? Ask or enter a search"
                        />
                        <button className="aq-btn">Ask Question</button>
                      </div>
                    </form>
                    <ul
                      className="nav nav-tabs questions-tabs d-flex justify-content-between"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="recent-questions-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#recent-questions"
                          type="button"
                          role="tab"
                          aria-controls="recent-questions"
                          aria-selected="true"
                        >
                          Recent Questions
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="most-answered-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#most-answered"
                          type="button"
                          role="tab"
                          aria-controls="most-answered"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          Most Answered
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="unanswered-question-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#unanswered-question"
                          type="button"
                          role="tab"
                          aria-controls="unanswered-question"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          Unanswered Question
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="featured-question-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#featured-question"
                          type="button"
                          role="tab"
                          aria-controls="featured-question"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          Featured Question
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="recent-questions"
                        role="tabpanel"
                        aria-labelledby="recent-questions-tab"
                      >
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-1.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>4974</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>25</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Teresa Klein</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Photoshop</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">2 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    {/* =============== */}
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-2.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>774</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Adam Garrison</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 15 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Programming
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Teaching high school students various computer
                                  systems is a resource for the future
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">2 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">647 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-3.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>674</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>4</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Yvonne Cox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 16 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Conversion
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Here are some examples of how to prevent
                                  Kindle ebook text images from expanding from a
                                  PDF file.
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-4.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>494</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Nelson Koch</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">43 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">4 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">974 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-5.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>974</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>5</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">James Sardina</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 19 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  In the case of a human being, learning how
                                  many languages is logical is mentioned
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">35 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">3 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">735 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-6.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>951</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Judith Maddox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Why do people of different countries celebrate
                                  their New Year in different ways?
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">l Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">32 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">2 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">374 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-7.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>583</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>6</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Rick Thrasher</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 22 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  What is the requirement of a student's e-book
                                  for conducting educational activities?
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pagination-area">
                          <a
                            href="all-queations.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-left-line" />
                          </a>
                          <span
                            className="page-numbers current"
                            aria-current="page"
                          >
                            1
                          </span>
                          <a href="all-queations.html" className="page-numbers">
                            2
                          </a>
                          <a href="all-queations.html" className="page-numbers">
                            3
                          </a>
                          <a
                            href="all-queations.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-right-line" />
                          </a>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="most-answered"
                        role="tabpanel"
                        aria-labelledby="most-answered-tab"
                      >
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-1.jpg"
                                  alt="Image"
                                />
                              </a>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Teresa Klein</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Photoshop</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">2 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn bg-ea4335"
                                >
                                  Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-2.jpg"
                                  alt="Image"
                                />
                              </a>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Adam Garrison</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 15 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Programming
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Teaching high school students various computer
                                  systems is a resource for the future
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">2 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">647 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn bg-ea4335"
                                >
                                  Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-3.jpg"
                                  alt="Image"
                                />
                              </a>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Yvonne Cox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 16 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Conversion
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Here are some examples of how to prevent
                                  Kindle ebook text images from expanding from a
                                  PDF file.
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn bg-ea4335"
                                >
                                  Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-4.jpg"
                                  alt="Image"
                                />
                              </a>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Nelson Koch</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">43 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">4 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">974 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn bg-ea4335"
                                >
                                  Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-5.jpg"
                                  alt="Image"
                                />
                              </a>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">James Sardina</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 19 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  In the case of a human being, learning how
                                  many languages is logical is mentioned
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">35 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">3 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">735 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn bg-ea4335"
                                >
                                  Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-6.jpg"
                                  alt="Image"
                                />
                              </a>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Judith Maddox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Why do people of different countries celebrate
                                  their New Year in different ways?
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">l Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">32 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">2 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">374 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn bg-ea4335"
                                >
                                  Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-7.jpg"
                                  alt="Image"
                                />
                              </a>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Rick Thrasher</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 22 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  What is the requirement of a student's e-book
                                  for conducting educational activities?
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn bg-ea4335"
                                >
                                  Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pagination-area">
                          <a
                            href="ask-questions.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-left-line" />
                          </a>
                          <span
                            className="page-numbers current"
                            aria-current="page"
                          >
                            1
                          </span>
                          <a href="ask-questions.html" className="page-numbers">
                            2
                          </a>
                          <a href="ask-questions.html" className="page-numbers">
                            3
                          </a>
                          <a
                            href="ask-questions.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-right-line" />
                          </a>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="unanswered-question"
                        role="tabpanel"
                        aria-labelledby="unanswered-question-tab"
                      >
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-1.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>4974</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>25</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Teresa Klein</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Photoshop</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-2.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>774</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Adam Garrison</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 15 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Programming
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Teaching high school students various computer
                                  systems is a resource for the future
                                </a>
                              </h3>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">2 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">647 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-3.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>674</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>4</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Yvonne Cox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 16 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Conversion
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Here are some examples of how to prevent
                                  Kindle ebook text images from expanding from a
                                  PDF file.
                                </a>
                              </h3>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-4.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>494</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Nelson Koch</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">43 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">974 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-5.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>974</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>5</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">James Sardina</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 19 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  In the case of a human being, learning how
                                  many languages is logical is mentioned
                                </a>
                              </h3>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">35 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">735 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-6.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>951</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Judith Maddox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Why do people of different countries celebrate
                                  their New Year in different ways?
                                </a>
                              </h3>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">l Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">32 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">374 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-7.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>583</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>6</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Rick Thrasher</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 22 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  What is the requirement of a student's e-book
                                  for conducting educational activities?
                                </a>
                              </h3>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pagination-area">
                          <a
                            href="ask-questions.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-left-line" />
                          </a>
                          <span
                            className="page-numbers current"
                            aria-current="page"
                          >
                            1
                          </span>
                          <a href="ask-questions.html" className="page-numbers">
                            2
                          </a>
                          <a href="ask-questions.html" className="page-numbers">
                            3
                          </a>
                          <a
                            href="ask-questions.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-right-line" />
                          </a>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="featured-question"
                        role="tabpanel"
                        aria-labelledby="featured-question-tab"
                      >
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-1.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>4974</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>25</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Teresa Klein</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Photoshop</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">2 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="featured">Featured</span>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-2.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>774</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Adam Garrison</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 15 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Programming
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Teaching high school students various computer
                                  systems is a resource for the future
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">2 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">647 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="featured">Featured</span>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-3.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>674</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>4</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Yvonne Cox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 16 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Conversion
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Here are some examples of how to prevent
                                  Kindle ebook text images from expanding from a
                                  PDF file.
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="featured">Featured</span>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-4.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>494</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Nelson Koch</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  If you open Illustrator by dragging the
                                  Photoshop file, why it becomes a JPG file
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">43 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">4 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">974 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="featured">Featured</span>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-5.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>974</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>5</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">James Sardina</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 19 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  In the case of a human being, learning how
                                  many languages is logical is mentioned
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">35 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">3 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">735 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="featured">Featured</span>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-6.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>951</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>2</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Judith Maddox</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 14 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Graphic design
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  Why do people of different countries celebrate
                                  their New Year in different ways?
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">l Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">32 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">2 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">374 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="featured">Featured</span>
                        </div>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <a href="user.html">
                                <img
                                  src="assets/images/user/user-7.jpg"
                                  alt="Image"
                                />
                              </a>
                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="fas fa-thumbs-up" />
                                  <span>583</span>
                                </button>
                              </div>
                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="fas fa-thumbs-down" />
                                  <span>6</span>
                                </button>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li>
                                  <a href="user.html">Rick Thrasher</a>
                                </li>
                                <li>
                                  <span>Latest Answer: 22 hours ago</span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  <a href="tags.html" className="graphic">
                                    Language
                                  </a>
                                </li>
                              </ul>
                              <h3>
                                <a href="queations-details.html">
                                  What is the requirement of a student's e-book
                                  for conducting educational activities?
                                </a>
                              </h3>
                              <p>
                                Sed porttitor lectus nibh. Nulla porttitor
                                accumsan tincidunt. Donec rutrum congue leo eget
                                malesuada. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus rutrum
                                congue leo eget malesuada tincidunt.
                              </p>
                              <ul className="tag-list">
                                <li>
                                  <a href="tags.html">Discussion</a>
                                </li>
                                <li>
                                  <a href="tags.html">Language</a>
                                </li>
                                <li>
                                  <a href="tags.html">Analytics</a>
                                </li>
                              </ul>
                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>
                                    <a href="polls.html">24 Vote</a>
                                  </li>
                                  <li>
                                    <a href="most-answered.html">1 Answer</a>
                                  </li>
                                  <li>
                                    <a href="most-visited.html">658 Views</a>
                                  </li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="fas fa-share-alt" />
                                        </span>
                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-facebook-f" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-linkedin" />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="fab fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <a
                                  href="most-answered.html"
                                  className="default-btn"
                                >
                                  Answer
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="featured">Featured</span>
                        </div>
                        <div className="pagination-area">
                          <a
                            href="ask-questions.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-left-line" />
                          </a>
                          <span
                            className="page-numbers current"
                            aria-current="page"
                          >
                            1
                          </span>
                          <a href="ask-questions.html" className="page-numbers">
                            2
                          </a>
                          <a href="ask-questions.html" className="page-numbers">
                            3
                          </a>
                          <a
                            href="ask-questions.html"
                            className="next page-numbers"
                          >
                            <i className="ri-arrow-right-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="right-siderbar">
                    <div className="right-siderbar-common">
                      <a href="ask-questions.html" className="default-btn">
                        Ask a question
                      </a>
                    </div>
                    <div className="right-siderbar-common">
                      <div className="category">
                        <h3>
                          <i className="ri-list-unordered" />
                          Categories
                        </h3>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select category</option>
                          <option value={1}>Discussion</option>
                          <option value={2}>Language</option>
                          <option value={3}>Analytics</option>
                        </select>
                      </div>
                    </div>
                    <div className="right-siderbar-common">
                      <div className="discussions">
                        <h3>
                          <i className="fas fa-sticky-note" />
                          Top Discussions
                        </h3>
                        <ul>
                          <li>
                            <a href="most-answered.html">
                              The idea of how I will share my profile on social
                              sites
                            </a>
                          </li>
                          <li>
                            <a href="most-answered.html">
                              Discuss the rules for maintaining all the
                              employees in the company
                            </a>
                          </li>
                          <li>
                            <a href="most-answered.html">
                              The best way to choose between a job and a
                              business
                            </a>
                          </li>
                          <li>
                            <a href="most-answered.html">
                              Which is the most important UIUX in terms of
                              design?
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="right-siderbar-common">
                      <div className="answer-count">
                        <ul className="d-flex flex-wrap">
                          <li>
                            <span>Questions</span>
                            <span className="count">435</span>
                          </li>
                          <li>
                            <span>Answers</span>
                            <span className="count">435</span>
                          </li>
                          <li>
                            <span>Best answers</span>
                            <span className="count">324</span>
                          </li>
                          <li>
                            <span>Users</span>
                            <span className="count">2K</span>
                          </li>
                          <li>
                            <span>Posts</span>
                            <span className="count">852</span>
                          </li>
                          <li>
                            <span>Comments</span>
                            <span className="count">57</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="right-siderbar-common">
                      <div className="recent-post">
                        <h3>
                          <i className="fas fa-comment-alt" />
                          Recent post
                        </h3>
                        <ul>
                          <li>
                            <a href="most-answered.html">
                              What could be UX design software?
                            </a>
                            <p>
                              8 hours ago by{" "}
                              <a href="user.html">Alan Woodson</a>
                            </p>
                          </li>
                          <li>
                            <a href="most-answered.html">
                              All the new features that have been used in
                              Windows 11
                            </a>
                            <p>
                              11 hours ago by{" "}
                              <a href="user.html">Juan McPhail</a>
                            </p>
                          </li>
                          <li>
                            <a href="most-answered.html">
                              What is the most important thing in learning
                              design?
                            </a>
                            <p>
                              11 hours ago by{" "}
                              <a href="user.html">Vickie White</a>
                            </p>
                          </li>
                          <li>
                            <a href="most-answered.html">
                              Which language is the most popular in the web
                              right now?
                            </a>
                            <p>
                              13 hours ago by <a href="user.html">Jose Merz</a>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="right-siderbar-common">
                      <div className="top-members">
                        <h3>
                          <i className="fas fa-comment-alt" />
                          Top members
                        </h3>
                        <ul>
                          <li>
                            <a href="groups.html">
                              <img
                                src="assets/images/user/user-8.jpg"
                                alt="Image"
                              />
                              <p>
                                Yong Spears <span>(5k Points)</span>
                              </p>
                              <span>99 Questions</span>
                            </a>
                          </li>
                          <li>
                            <a href="groups.html">
                              <img
                                src="assets/images/user/user-9.jpg"
                                alt="Image"
                              />
                              <p>
                                Denise Jones <span>(4k Points)</span>
                              </p>
                              <span>85 Questions</span>
                            </a>
                          </li>
                          <li>
                            <a href="groups.html">
                              <img
                                src="assets/images/user/user-10.jpg"
                                alt="Image"
                              />
                              <p>
                                Dennis Rogers <span>(3k Points)</span>
                              </p>
                              <span>80 Questions</span>
                            </a>
                          </li>
                          <li>
                            <a href="groups.html">
                              <img
                                src="assets/images/user/user-11.jpg"
                                alt="Image"
                              />
                              <p>
                                Naomi Barnett <span>(1k Points)</span>
                              </p>
                              <span>60 Questions</span>
                            </a>
                          </li>
                          <li>
                            <a href="groups.html">
                              <img
                                src="assets/images/user/user-12.jpg"
                                alt="Image"
                              />
                              <p>
                                Mary Wenger <span>(952 Points)</span>
                              </p>
                              <span>50 Questions</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="right-siderbar-common">
                      <div className="ads">
                        <a href="queations-details.html">
                          <img src="assets/images/ad.jpg" alt="Image" />
                        </a>
                        <a
                          href="queations-details.html"
                          className="default-btn"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                    <div className="right-siderbar-common">
                      <div className="trending-tags">
                        <h3>
                          <i className="fas fa-tag" />
                          Trending Tags
                        </h3>
                        <ul>
                          <li>
                            <a href="tags.html">discussion</a>
                          </li>
                          <li>
                            <a href="tags.html">analytics</a>
                          </li>
                          <li>
                            <a href="tags.html">company</a>
                          </li>
                          <li>
                            <a href="tags.html">life</a>
                          </li>
                          <li>
                            <a href="tags.html">computer</a>
                          </li>
                          <li>
                            <a href="tags.html">interview</a>
                          </li>
                          <li>
                            <a href="tags.html">grammer</a>
                          </li>
                          <li>
                            <a href="tags.html">convertion</a>
                          </li>
                          <li>
                            <a href="tags.html">google</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Details Section - End
  ================================================== */}
          {/* Get Start Section - Start
  ================================================== */}
  <br/>
          <section className="getstart_section decoration_wrap text-center">
            <div className="container">
              <h2 className="title_text">Ready to kick-start your career?</h2>
              <a className="btn btn_primary" href="#!">
                <span>
                  <small>Try It For Free</small>
                  <small>Try It For Free</small>
                </span>
                <i className="far fa-angle-double-right ms-1" />
              </a>
            </div>
            <div
              className="deco_item deco_img_1"
              data-parallax='{"y" : -130, "smoothness": 6}'
            >
              <img
                src="assets/images/shapes/line_shape_4.png"
                alt="Shape Image"
              />
            </div>
            <div
              className="deco_item deco_img_2"
              data-parallax='{"y" : 130, "smoothness": 6}'
            >
              <img src="assets/images/shapes/shape_5.png" alt="Shape Image" />
            </div>
          </section>
          {/* Get Start Section - End
  ================================================== */}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Study;
