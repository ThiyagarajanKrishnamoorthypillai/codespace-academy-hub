import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import "./css/bootstrap.min.css";
import "./css/style.css";

const UpdateFeedbackAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state || {};

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    useremail: '',
    feedback: '',
    status: '',
    explanation: '',
    adminFeedbackdateCreated: '',
  });

  useEffect(() => {
  if (feedback) {
    setFormData({
      _id: feedback._id,
      name: feedback.name,
      useremail: feedback.useremail,
      feedback: feedback.feedback,
      status: feedback.status,
      explanation: feedback.explanation || '',
      adminFeedbackdateCreated: new Date().toISOString(),
      image: feedback.image || [],
      pdf: feedback.pdf || [],
    });
  }
}, [feedback]);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
     const token = localStorage.getItem('token');
await axios.put(`${import.meta.env.VITE_API_URL}/feedback/${formData._id}`, formData, {
  headers: {
    'x-auth-token': token, // ✅ Secure header
  },
});
      alert('Feedback updated successfully!');
      navigate('/admin_home');
    } catch (err) {
      console.error("Update error:", err.message);
      alert('Failed to update feedback.');
    }
  };

  return (
    <div className="container py-5">
      <h4 className="text-center text-dark mb-4">Update Feedback</h4>
      <form onSubmit={handleUpdate} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} readOnly />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="useremail" className="form-control" value={formData.useremail} readOnly />
        </div>
        <div className="mb-3">
          <label>Feedback</label>
          <textarea name="feedback" className="form-control" value={formData.feedback} readOnly rows="3" />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <input
            type="text"
            name="status"
            className="form-control"
            value={formData.status}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Explanation (Admin Notes)</label>
          <textarea
            name="explanation"
            className="form-control"
            value={formData.explanation}
            onChange={handleInputChange}
            rows="4"
            placeholder="Write your explanation or comments here..."
            required
          />
        </div>
        <div className="mb-3">
          <label>Updated Date</label>
          <input
            type="text"
            name="adminFeedbackdateCreated"
            className="form-control"
            value={new Date(formData.adminFeedbackdateCreated).toLocaleString()}
            readOnly
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Update Feedback</button>
      </form>
    </div>
  );
};

export default UpdateFeedbackAdmin;
