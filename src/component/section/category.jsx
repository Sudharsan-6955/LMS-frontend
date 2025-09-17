import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const subTitle = "Popular Category";
const title = "Popular Category For Learn";
const btnText = "Browse All Categories";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error.message);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className="category-section padding-tb">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-2 justify-content-center row-cols-xl-6 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {categories.map((val, i) => (
              <div className="col" key={i}>
                <div className="category-item text-center">
                  <div className="category-inner">
                    <div className="category-thumb">
                      <img src={val.imgUrl} alt={val.imgAlt} />
                    </div>
                    <div className="category-content">
                      <Link to="/course"><h6>{val.title}</h6></Link>
                      <span>{val.count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/course" className="lab-btn">
              <span>{btnText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
