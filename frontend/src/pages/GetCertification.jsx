// src/pages/Home.js
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import "../assets/getCertificate.css"; // Adjust the path based on your project structure
import Footer from "../components/Footer";
const GetCertification = () => {
  return (
    <>
      <Helmet>
       <title>w3programmer - Certification</title>
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
          {/* Banner Section - Start
  ================================================== */}
          <section className="container  banner_style_4 mouse_move">
            <div className="container">
              <h5 className="text-center">
                Get a World-Class IT Certification with w3programmer
              </h5>
              <center><img src="/assets/images/logo/site_logo.png" alt="Education, Online Course, LMS Creative" style={{ height: '250px'}} /></center>
              <p className="lead text-justify">
                Are you an IT Professional looking to enhance your credentials
                and stand out in the competitive job market? w3programmer offers
                an exceptional opportunity to earn a world-class certificate
                that can elevate your career prospects globally.
              </p>
              <h2>Why Choose w3programmer?</h2>
              <p className="text-justify">
                At w3programmer, we understand the value of continuous learning
                and professional development. Our certification program is
                designed to validate your skills and knowledge, ensuring you are
                recognized for your expertise in the IT industry. Here’s why our
                certification stands out:
              </p>
              <h3>1. Global Recognition</h3>
              <p className="text-justify">
                Our certificates are recognized worldwide, giving you the
                credibility to showcase your skills and knowledge to employers
                and clients anywhere in the world. Whether you’re looking to
                advance your career locally or aiming for international
                opportunities, a w3programmer certification can open doors for
                you.
              </p>
              <h3>2. Comprehensive Exam</h3>
              <p className="text-justify">
                The certification exam is meticulously designed by industry
                experts to cover a wide range of topics essential for IT
                professionals. It assesses your practical skills and theoretical
                knowledge, ensuring you are well-prepared for real-world
                challenges.
              </p>
              <h3>3. Flexible Learning Paths</h3>
              <p className="text-justify">
                We offer flexible learning paths tailored to different IT
                domains and skill levels. Whether you are a beginner or an
                experienced professional, our resources will help you prepare
                effectively for the certification exam.
              </p>
              <h3>4. Quality Study Materials</h3>
              <p className="text-justify">
                w3programmer provides high-quality study materials, including
                tutorials, practice tests, and interactive learning sessions.
                Our resources are crafted to enhance your understanding and
                retention of key concepts, helping you succeed in the exam.
              </p>
              <h3>5. Expert Support</h3>
              <p className="text-justify">
                Our dedicated support team and expert instructors are available
                to assist you throughout your learning journey. From answering
                your queries to providing guidance on exam preparation, we are
                here to ensure you achieve your certification goals.
              </p>
              <h2>How to Get Certified?</h2>
              <p>
                Getting certified with w3programmer is a straightforward
                process:
              </p>
              <ul>
                <li>
                  <strong>Register for the Exam:</strong> Visit our website and
                  register for the certification exam that aligns with your
                  career goals and expertise.
                </li>
                <li>
                  <strong>Prepare with Our Resources:</strong> Utilize our
                  extensive study materials and practice tests to prepare for
                  the exam. Join our interactive learning sessions to clarify
                  doubts and gain insights from industry experts.
                </li>
                <li>
                  <strong>Take the Exam:</strong> Schedule and take the exam at
                  your convenience. Our flexible scheduling options allow you to
                  choose a date and time that suits you best.
                </li>
                <li>
                  <strong>Earn Your Certificate:</strong> Upon passing the exam,
                  you will receive your world-class certificate from
                  w3programmer. Use this credential to showcase your skills and
                  advance your career in the IT industry.
                </li>
              </ul>
              <h2>Start Your Certification Journey Today!</h2>
              <p>
                Don’t miss out on this opportunity to enhance your professional
                credentials. Join thousands of IT professionals who have already
                benefited from w3programmer’s certification program. Visit our{" "}
                <a
                  href="https://www.w3programmer.net/"
                  target="_blank"
                  className="link-primary"
                >
                  w3programmer.net
                </a>{" "}
                to learn more and register for the exam today.
              </p>
              <p>
                Empower your career with a globally recognized certification
                from w3programmer – your gateway to limitless opportunities in
                the IT world.
              </p>
            </div>
          </section>
          {/* Banner Section - End
  ================================================== */}
          {/* Category Section - End
  ================================================== */}
          {/* Funfact Section - Start
  ================================================== */}
          <section className="funfact_section section_space_md">
            <div className="container">
              <div className="row justify-content-lg-between justify-content-center">
                <div className="col col-lg-3 col-md-6 col-sm-6">
                  <div className="funfact_item">
                    <div
                      className="item_icon"
                      style={{
                        backgroundImage:
                          'url("assets/images/shapes/shape_16.png")',
                      }}
                    >
                      <img
                        src="assets/images/icons/icon_video_tutorial.png"
                        alt="Icon Video Tutorial"
                      />
                    </div>
                    <div className="item_content">
                      <h3 className="item_title">Q&amp;A</h3>
                      <p className="mb-0">
                        Whether learning or sharing knowledge, this is the right
                        place for you.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-3 col-md-6 col-sm-6">
                  <div className="funfact_item">
                    <div
                      className="item_icon"
                      style={{
                        backgroundImage:
                          'url("assets/images/shapes/shape_16.png")',
                      }}
                    >
                      <img
                        src="assets/images/icons/icon_medal.png"
                        alt="Icon Medal"
                      />
                    </div>
                    <div className="item_content">
                      <h3 className="item_title">Top rating instructors</h3>
                      <p className="mb-0">
                        Learn from top-rated instructors and share your
                        knowledge in the best place for education and expertise.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-3 col-md-6 col-sm-6">
                  <div className="funfact_item">
                    <div
                      className="item_icon"
                      style={{
                        backgroundImage:
                          'url("assets/images/shapes/shape_16.png")',
                      }}
                    >
                      <img
                        src="assets/images/icons/icon_graduation.png"
                        alt="Icon Video Tutorial"
                      />
                    </div>
                    <div className="item_content">
                      <h3 className="item_title">Lifetime Access</h3>
                      <p className="mb-0">
                        Enjoy lifetime access membership and learn from
                        top-rated instructors at your own pace.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GetCertification;
