import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, authorRes, categoryRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/courses/${id}`),
          axios.get("http://localhost:5000/api/authors"),
          axios.get("http://localhost:5000/api/categories"),
        ]);
        setCourse(courseRes.data);
        setAuthors(authorRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        console.error("❌ Error loading data:", err.message);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to update this course?");
    if (!confirmed) return;

    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(`http://localhost:5000/api/courses/${id}`, course, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Course updated successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("❌ Error updating course:", err.message);
    }
  };

  if (!course) return <div className="text-center py-4">Loading course...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">✏️ Edit Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={course.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={course.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Lessons</label>
          <input
            type="number"
            name="lessons"
            className="form-control"
            value={course.lessons}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <select
            name="category"
            className="form-select"
            value={course.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Author</label>
          <select
            name="author"
            className="form-select"
            value={course.author}
            onChange={handleChange}
          >
            {authors.map((auth) => (
              <option key={auth._id} value={auth.name}>
                {auth.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            name="imgUrl"
            className="form-control"
            value={course.imgUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image Alt</label>
          <input
            type="text"
            name="imgAlt"
            className="form-control"
            value={course.imgAlt}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          ✅ Update Course
        </button>
      </form>
    </div>
  );
};

export default AdminEditCourse;
