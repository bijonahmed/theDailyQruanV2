import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../assets/pdfBooks.css";
import Loader from "../components/Loader";
import { useCreateIframeAndLoadViewer } from "@prodfox/react-ui-plugin";

const PdfDetails = () => {
  const { slug } = useParams();
  console.log("Slug=" + slug);
  const baseUrl = window.location.origin;
  const canonicalUrl = `${baseUrl}/pdf-details/${slug}`;

  // Define SEO data here
  const seoData = {
    title: `PDF`,
    description: `Explore courses and tutorials category on My Awesome Website.`,
    keywords: `PDF ebooks, courses, tutorials, My Awesome Website`,
    canonicalUrl: canonicalUrl,
  };

  const [loading, setLoading] = useState(true);
  const [categorys, setChidCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [cateName, setCateName] = useState("");
  const [cateSlug, setCateSlug] = useState("");
  const [onlyName, setName] = useState("");

  const containerRef = useRef(null);

  const handleDownload = () => {
    if (responseData && responseData.showPdf) {
      const link = document.createElement("a");
      link.href = responseData.showPdf;
      link.download = "w3programmerpdf.pdf"; // Specify the file name here
      link.click();
    }
  };

  const getCategory = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(`/public/getepdfCategoryList`);
      setChidCategory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const childfetchData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setTags(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetechepdfData = async () => {
    try {
      const response = await axios.get(`/public/filterepdfrow`, {
        params: { slug: slug },
      });
      setResponseData(response.data);
      setCateName(response.data.catName);
      setCateSlug(response.data.catSlug);
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { download } = useCreateIframeAndLoadViewer({
    container: containerRef,
    fileName: "my-file.pdf",
    uuid: "some-user",
    licenseKey: "sandbox",
    locale: "en",
    tools: {
      editing: ["extract", "remove", "move"],
      thumbnails: ["zoom", "expand"],
      general: ["thumbnails", "download", "search", "panel-toggle", "zoom"],
    },
    files: [
      {
        url: responseData.showPdf, //"https://api.w3programmer.net/backend/files/DO2blMQffYwoCsjEJ3US.pdf",
        name: slug,
      },
    ],
    onReady: () => {
      console.log("PDF Viewer is ready");
      setLoading(false);
      setViewerReady(true);
    },
    onError: (err) => {
      console.error("Viewer load error:", err);
      setLoading(false);
      setError("Failed to load PDF viewer.");
    },
  });

  useEffect(() => {
    getCategory();
    fetechepdfData();
    childfetchData();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonicalUrl} />
      </Helmet>

      <GuestNavbar />
      <br />
      <div className="page_wrapper">
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <section
          className="banner_section  banner_style_4  mouse_move"
          style={{
            minHeight: "260px",
            backgroundSize: "80%",
            marginTop: "40px",
          }}
        >
          <div
            className="decoration_wrap"
            style={{
              backgroundImage:
                'url("/assets/images/shapes/shapes_group_1.png")',
              minHeight: "200px",
              backgroundSize: "80%",
            }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col col-lg-7">
                  <div className="banner_content text-center">
                    <h1
                      className="banner_title wow fadeInUp"
                      data-wow-delay=".1s"
                      style={{ fontSize: "35px" }}
                    >
                      {onlyName}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <main className="page_content">
          <section className="aboutsection mt-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-9">
                  <div>
                    {responseData && responseData.categoryId === 93 ? (
                      <div style={{ height: "100px", width: "100%" }}>
                        <a
                          href={responseData.download_link}
                          className="btn btn-primary btn-lg w-100 h-100 d-flex align-items-center justify-content-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                        </a>
                      </div>
                    ) : responseData && responseData.showPdf ? (
                      <div>
                        <center>
                          {loading ? (
                            <center>
                              <Loader />
                            </center>
                          ) : (
                            <center>
                              If fetching reading viewer, please read manually: <a href={responseData.showPdf} target="_blank" rel="noopener noreferrer">Download</a><br/>                          Back to{" "}
                              <Link
                                to={`/pdf-zone/${cateSlug}`}
                                style={{ marginBottom: "15px" }}
                              >
                                {cateName}
                              </Link>{" "}
                              Category
                            </center>
                          )}
                        </center>
                        <div className="container">
                          <div
                            id="pdf"
                            ref={containerRef}
                            style={{
                              margin: "0",
                              border: "1px solid #ccc",
                              height: "1000px",
                              width: "100%",
                              marginBottom: "20px",
                            }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <p>No PDF to display</p>
                    )}
                  </div>
                  <div className="widget ms-5">
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
                </div>
                <div className="col-3">
                  <div className="widget_title">Categories</div>
                  <br />
                  <div className="category_list">
                    <div className="right-column-content">
                      <div className="row">
                        {categorys.map((category) => (
                          <div key={category.id}>
                            <ul className="unordered_list_block">
                              <li>
                                <Link
                                  to={`/pdf-zone/${category.slug}`}
                                  style={{ width: "100%" }}
                                >
                                  <span>{category.name}</span>
                                  <span>
                                    <strong>
                                      &nbsp;({category.count || 0})
                                    </strong>
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <br />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PdfDetails;
