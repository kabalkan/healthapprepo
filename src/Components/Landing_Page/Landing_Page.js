import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./LandingPage.css"; // Importing the CSS styles for the Landing_Page component

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
    <section className="hero-section"> {/* Creating a section with className name 'hero-section' */}
      <div>
        <div data-aos="fade-up" className="flex-hero"> {/* Creating a div with data-aos attribute and className name 'flex-hero' */}
            
            <h1 style={{ color: "white" }} className="hero-heading">
              Your <span style={{ color: "#B9EDEF" }}>Health</span>. Your <span style={{ color: "#B9EDEF" }}>Choice</span>.
            </h1>
              <div className="blob-cont"> {/* Creating a div with className name 'blob-cont' */}
                  <div className="blue blob"></div> {/* Creating a blue blob inside the 'blob-cont' div */}
              </div>
              <div className="blob-cont"> {/* Creating another div with className name 'blob-cont' */}
                  <div className="blue1 blob"></div> {/* Creating a different blue blob inside the second 'blob-cont' div */}
              </div>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page; // Exporting the Landing_Page component to be used in other parts of the application
