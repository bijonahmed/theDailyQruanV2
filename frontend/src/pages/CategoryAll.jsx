
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";

const Category = () => {
  const { slug } = useParams();
  // Example SEO data; replace with dynamic data as needed
  const seoData = {
    title: `All Category`,
    description: `Explore courses and tutorials in the ${slug} category on My Awesome Website.`,
    keywords: `${slug}, courses, tutorials, My Awesome Website`
  };
  
  const [categorys, setChidCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/public/getAllChildCaegorys`);
        setChidCategory(response.data.result);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    }, []);


  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
      </Helmet>

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
       



        <section className="page_banner decoration_wrap">
            <div className="container">
            <br/> <br/> 
              <h1 className="page_heading">All Category</h1>
            </div>
          </section>
          <section className="container category_section bg_info">
            <div className="container">
              <div className="category2_items_wrapper row justify-content-center">
                 
              {categorys.map((category) => (
                <div className="col col-lg-3">
                  <div className="category_item_2">
                    <Link to={`/question-answer/${category.slug}`}>
                      <span className="item_icon">
                      <img src={category.file} alt={category.id} style={{ borderRadius: '10px', maxWidth: '60px' }}/>
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
                </div>
            ))}
  
              </div>
            </div>
          </section>
          <br/> <br/> 
           
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Category;
