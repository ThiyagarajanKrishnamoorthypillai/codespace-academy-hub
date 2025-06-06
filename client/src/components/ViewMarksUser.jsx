import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import AppFooter from '../components/AppFooter';

const ViewMarksUser = () => {
  const [markData, setMarkData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const userEmail = decodeURIComponent(
    document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/mark/`)
      .then(res => res.json())
      .then(data => {
        const userMarks = data.filter(item => item.useremail === userEmail);
        setMarkData(userMarks);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = markData.filter(mark =>
      Object.values(mark).some(field =>
        typeof field === 'string' &&
        field.toLowerCase().includes(term.toLowerCase())
      )
    );
    setMarkData(filtered);
  };

  return (
    <div>
      <div className="page-content-wrapper">
        <div className="top-products-area py-0">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>My Marks</h6>
            </div>
            <div className="row g-3">
              <div className="top-search-form">
                <form>
                  <input className="form-control" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
                </form>
              </div>
            </div>

            <div className="row mt-3">
              {markData.map((mark) => (
                <div className="col-12 col-md-6" key={mark._id}>
                  <div className="card product-card mb-3">
                    <div className="card-body">
                      <h6 className="card-title">{mark.name} ({mark.course})</h6>
                      
                      <p><b>Date:</b> {new Date(mark.dateMark).toLocaleDateString()}</p>
                      <p><b>Mark's:</b></p>
<div className="d-flex flex-wrap gap-2">
  {mark.imageMark?.map((img, i) => (
    <img
      key={i}
      src={img}
      alt={`Mark ${i}`}
      className="img-fluid rounded"
      style={{ maxWidth: "100px", cursor: "pointer" }}
      onClick={() => setSelectedImage(img)}
    />
  ))}
</div>

                     
<p className="mt-2"><b>Answer Images:</b></p>
<div className="d-flex flex-wrap gap-2">
  {mark.answerImages?.map((img, i) => (
    <img
      key={i}
      src={img}
      alt={`Answer ${i}`}
      width="60"
      style={{ cursor: "pointer" }}
      onClick={() => setSelectedImage(img)}
    />
  ))}
</div>

<p className="mt-2"><b>Question Images:</b></p>
<div className="d-flex flex-wrap gap-2">
  {mark.questionImages?.map((img, i) => (
    <img
      key={i}
      src={img}
      alt={`Question ${i}`}
      width="60"
      style={{ cursor: "pointer" }}
      onClick={() => setSelectedImage(img)}
    />
  ))}
</div>



                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
              <div className="modal show d-block" onClick={() => setSelectedImage(null)} style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-body text-center">
                      <img src={selectedImage} alt="Full View" className="img-fluid" />
                      <button className="btn btn-danger mt-2" onClick={() => setSelectedImage(null)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

     <AppFooter/>


      </div>
    </div>
  );
};

export default ViewMarksUser;
