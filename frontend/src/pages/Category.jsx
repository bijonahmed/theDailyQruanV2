import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import Loader from "../components/Loader";

const Category = () => {
  const { slug } = useParams();
  // Example SEO data; replace with dynamic data as needed
  const seoData = {
    title: `${slug} Category`,
    description: `Explore courses and tutorials in the ${slug} category on My Awesome Website.`,
    keywords: `${slug}, courses, tutorials, My Awesome Website`,
  };
  const [loading, setLoading] = useState(true); // Add loading state
  const [categorys, setChidCategory] = useState([]);
  const [catName, setCategoryName] = useState();
  const [postMessages, setPostMessages] = useState();
  const [othersCategorys, setOthersCategorys] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get(
          `/public/getChildDataParentWise/${slug}`
        );
        setChidCategory(response.data.result);
        setCategoryName(response.data.name);
        setPostMessages(response.data.postMessages);
        setOthersCategorys(response.data.othersCategory);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to true before fetching data
      }
    };
    fetchData();
  }, [slug]);

  const [metaData, setMetaData] = useState({
    title: "Loading...",
    description: "Loading...",
    keywords: "Loading...",
    meta_title: "Loading...",
  });
  const formatSlug = (slug) => {
    if (!slug) return "";
    return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
  };

  const capitalizeWords = (title) => {
    if (!title) return '';
    return title
      .split(' ') // Split the string into words
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words back into a sentence
  };
    

  useEffect(() => {
    const fetchDataSEO = async () => {
      try {
        const response = await axios.get(`/public/mainCategorySeo/${slug}`);
        setMetaData({
          title: formatSlug(slug),
          description: response.data.meta_description || "",
          keywords: response.data.meta_keyword || "",
          meta_title: response.data.meta_title || "",
        });
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };

    fetchDataSEO();
  }, [slug]);


    // Get the base domain dynamically
    const baseUrl = window.location.origin;
    const canonicalUrl = `${baseUrl}/question-answer/${slug}`;
  

  return (
    <>
      {metaData.title && (
        <Helmet>
          <title>{metaData.meta_title}</title>
          <meta name="description" content={metaData.description} />
          <meta name="keywords" content={metaData.keywords} />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
      )}

      <GuestNavbar />
      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <main className="page_content">
          <section
            className="page_banner decoration_wrap"
            style={{ fontSize: "10px" }}
          >
            <div className="container" style={{ marginTop: "50px" }}>
              <h1 className="page_heading">{capitalizeWords(metaData.meta_title)}</h1>
              <h2 className="page_heading">{catName}</h2>
              <div>
                {postMessages ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: postMessages }}
                    style={{ fontSize: "10px" }} // Apply font size directly here
                  ></div>
                ) : (
                  <center>No content available.</center>
                )}
              </div>
            </div>
          </section>

          {loading ? (
            <center>
              <Loader />
            </center>
          ) : (
            <section className="container category_section">
              <div className="category2_items_wrapper row justify-content-center">
                <div className="col-md-12">
                  <div className="cat_container">
                    {categorys.map((category) => (
                      <div className="category_item_2" key={category.id}>
                        <Link to={`/question-answer/${category.slug}`}>
                          <span className="item_icon">
                            <img
                              src={category.file}
                              alt={category.id}
                              style={{ borderRadius: "10px", maxWidth: "60px" }}
                            />
                          </span>
                          <span className="item_content">
                            <strong className="item_title d-block">
                              {category.name}
                            </strong>
                            {/* <small className="item_counter d-block">
                             15025 Q&A
                           </small> */}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="container category_section section_space_lg">
            <div className="section_heading text-center">
              <h2 className="heading_text mb-0">
                Others most popular Technology
                <span className="d-block">Study Q&amp;A</span>
              </h2>
            </div>
            <div className="category2_items_wrapper row justify-content-center">
              <div className="col-md-12">
                <div className="cat_container">
                  {othersCategorys.map((category) => (
                    <div className="category_item_2" key={category.id}>
                      <Link to={`/question-answer/${category.slug}`}>
                        <span className="item_icon">
                          <img
                            src={category.file}
                            alt={category.id}
                            style={{ borderRadius: "10px", maxWidth: "60px" }}
                          />
                        </span>
                        <span className="item_content">
                          <strong className="item_title d-block">
                            {category.name}
                          </strong>
                          {/* <small className="item_counter d-block">
          15025 Q&A
        </small> */}
                        </span>
                      </Link>
                    </div>
                  ))}
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

export default Category;
