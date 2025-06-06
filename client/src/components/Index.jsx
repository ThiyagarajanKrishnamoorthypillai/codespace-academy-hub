import React from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgBack from "./img/bg-img/wall.jpg";
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff" }}>
      
      {/* Reusable Header */}
      <AppHeader />

      {/* Main Content */}
      <main style={{ flex: 1, marginBottom: '40px' }} className="d-flex align-items-center justify-content-center text-center ">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            width: "80%",
            height: "65vh",
            borderRadius: "16px",
            
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Left: Background Image */}
          <div
            style={{
              flex: 1,
              height: "100%",
              backgroundImage: `url(${imgBack})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          ></div>

          {/* Right: Buttons */}
          <div className="d-flex flex-column align-items-center justify-content-center px-5" style={{ flex: 1 }}>
            <h4 className="mb-4  " style={{ textShadow: '0 0 8px rgba(0, 128, 0, 0.4)' }}>
  Choose your Login
</h4>

            <div className="d-flex gap-4 flex-wrap">
             <Link
  to="/user_login"
  className="text-white"
  style={{
    background:"rgba(13, 163, 75)",
    width: "180px",
    padding: "12px 20px",
    borderRadius: "15px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 0 0 transparent"
  }}
  onMouseEnter={(e) => e.target.style.boxShadow = "0 0 15px #004080"}
  onMouseLeave={(e) => e.target.style.boxShadow = "0 0 0 transparent"}
>
  Student Login
</Link>
              <Link
                to="/admin_login"
                  className="text-white"
  style={{
    backgroundColor: '#004080',
    width: "180px",
    padding: "12px 20px",
    borderRadius: "15px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 0 0 transparent",
    
  }}
  onMouseEnter={(e) => e.target.style.boxShadow = "0 0 7px #004080"}
  onMouseLeave={(e) => e.target.style.boxShadow = "0 0 0 transparent"}
>
                Tutor Login
              </Link>
            </div>
          </div>


        </div>
      </main>

      {/* Reusable Footer */}
      <AppFooter />
    </div>
  );
};

export default Index;
