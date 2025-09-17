import AdminAddCourse from "./AdminAddCourse";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("❌ Error loading courses:", err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (err) {
      console.error("❌ Delete failed:", err.message);
    }
  };

  const handleEdit = (courseId) => {
    const confirmed = window.confirm("Do you want to edit this course?");
    if (!confirmed) return;
    navigate(`/admin-edit-course/${courseId}`);
  };

  return (
    <div className="container mt-5">
      <h2>🛠️ Admin Dashboard</h2>
      <hr />
      <AdminAddCourse fetchCourses={fetchCourses} />
      <hr />
      <h4>📚 Existing Courses</h4>
      <ul className="list-group">
        {courses.map((course) => (
          <li
            key={course._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{course.title} - ₹{course.price}</span>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(course._id)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(course._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <h4>📝 Applications from Author</h4>
      <div className="mb-4">
        <a href="/admin/author-applications" className="btn btn-info" target="_blank" rel="noopener noreferrer">
          View Author Applications
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
