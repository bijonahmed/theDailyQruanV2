import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../assets/pdfBooks.css";

const PdfZone = () => {
  const { slug } = useParams();
  console.log("Slug=" + slug);
  // Example SEO data; replace with dynamic data as needed
  const seoData = {
    title: `PDF`,
    description: `Explore courses and tutorials category on My Awesome Website.`,
    keywords: `PDF ebooks, courses, tutorials, My Awesome Website`,
  };

  const [categorys, setChidCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [response, setResponseData] = useState([]);
  const [categoryName, setResponseCategory] = useState([]);

  const childfetchData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setTags(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetechepdfData = async () => {
    console.log(slug);

    try {
      const response = await axios.get(`/public/filterepdfCategory`, {
        params: { slug: slug }, // Passing slug as a query parameter
      });
      setResponseData(response.data.rows);
      setResponseCategory(response.data.categoryName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetechepdfData();
    // fetchData();
    childfetchData();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
      </Helmet>

      <GuestNavbar />
      <br />
      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>
        <br />

        <main className="page_content">
          <section className="about_section mt-4">
            <div className="container">
              <div className="row">
                <div className="col col-lg-12">
                  <aside className="sidebar">
                    <center>
                      <ul className="breadcrumb_nav unordered_list_center">
                        <li>
                          <Link to="/pdf-books">PDF Books</Link>
                        </li>
                        <li>{categoryName}</li>
                      </ul>
                    </center>
                    <div className="widget form_item mb-3">
                      <form action="#">
                        <input
                          type="search"
                          name="search"
                          placeholder="Write your keyword..."
                        />
                        <button type="submit" className="submit_icon">
                          <img
                            src="/assets/images/icons/icon_search.svg"
                            alt="Icon Search"
                          />
                        </button>
                      </form>
                    </div>
                    <br />





                    <div className="widget category_list">
                      <div className="row">
                        {response.slice(0, 300).map((category) => (
                          <div className="col-6 col-md-4" key={category.id}>
                            {" "}
                            {/* col-6 for mobile (2 columns), col-md-2 for desktop (5 columns) */}
                            <ul className="unordered_list_block">
                              <li>
                                <Link to={`/pdf-details/${category.slug}`}>
                                  <span>{category.name}</span>
                                  
                                </Link>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="widget">
                      <h3 className="widget_title">Tags</h3>
                      <ul className="tags_list unordered_list">
                        {tags.map((category) => (
                          <li key={Math.random()}>
                            <Link to={`/question-answer/${category.slug}`}>
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>
          <br />
          <br />
          <br />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PdfZone;
