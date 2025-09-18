import axios from "axios";

export const fetchAuthorsWithStats = async () => {
  // Fetch all authors
  const authorsRes = await axios.get("https://lms-backend-production-0239.up.railway.app/api/authors");
  const authors = authorsRes.data;

  // Fetch all courses
  const coursesRes = await axios.get("https://lms-backend-production-0239.up.railway.app/api/courses/all");
  const courses = coursesRes.data;

  // Fetch all enrollments
  const enrollmentsRes = await axios.get("https://lms-backend-production-0239.up.railway.app/api/enrollments/all");
  const enrollments = enrollmentsRes.data;

  // Map author stats
  return authors.map(author => {
    // Courses by this author
    const authorCourses = courses.filter(
      c => (c.author && c.author.name && c.author.name === author.name) ||
           (c.authorDetails && c.authorDetails.name === author.name)
    );
    // Students enrolled in this author's courses
    const courseIds = authorCourses.map(c => c._id);
    const students = enrollments.filter(e => courseIds.includes(e.courseId));
    return {
      ...author,
      courseCount: authorCourses.length,
      studentCount: students.length,
      designation: author.degi || author.deg || author.designation || '',
      image: author.image,
    };
  });
};
