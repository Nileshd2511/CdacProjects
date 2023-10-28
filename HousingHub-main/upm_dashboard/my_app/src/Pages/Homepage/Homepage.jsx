import React from "react";
import BuildingImage1 from "../../Assets/building1.jpg"; 
import BuildingImage2 from "../../Assets/image2.jpg"; 
import BuildingImage3 from "../../Assets/building1.jpg"; 
import "./homepage.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

function Homepage() {
  return (
    <>
    <Navbar />
      <div className="content">
        <div className="building-section">
          <div className="building-info">
            <h2>About Us</h2>
            <h5>At Urban Property Management, we understand that managing properties, whether they're residential buildings, flats, or rental spaces, requires a seamless and efficient solution. 
            <br/><br/>
            Our state-of-the-art property management software is designed to cater to the needs of builders, owners, and tenants, streamlining the entire property management process from end to end</h5>
          </div>
          <img src={BuildingImage1} alt="Building 1" className="building-image" />
        </div>
        <div className="building-section">
          <img src={BuildingImage2} alt="Building 2" className="building-image" />
          <div className="building-info">
          <h2>Why Choose Urban Property Management:</h2><br/>
            <h5>User-Friendly Interface: Our software is designed with simplicity in mind, making it easy for users of all tech levels to navigate and use effectively.
<br/><br/>

End-to-End Automation: Reduce manual tasks and increase operational efficiency with automated processes tailored to your property management needs.
<br/>
<br/>
Security and Privacy: We prioritize the security of your data and ensure compliance with industry standards to safeguard your information.
<br/>
<br/>
Dedicated Support: Our customer support team is available to assist you whenever you need help or have questions about the software.</h5>
<br/>
<br/>
          </div>
        </div>
        <div className="building-section">
          <div className="building-info">
          <h2>Key Features:</h2>
            <h5>

Property Portfolio Management: Builders can effortlessly manage multiple properties, monitor their progress, and access critical data in real time.
<br/>
<br/>
Owner Engagement: Owners can stay informed about their property's performance, financials, and maintenance requests through a user-friendly owner portal.
<br/>
<br/>
Tenant Convenience: Tenants enjoy a seamless experience, from applying for a rental to submitting maintenance requests and making payments online.
<br/>
<br/>
Rent Management: Our automated rent collection and tracking system ensures accuracy and timeliness, while reducing administrative workload.
<br/>
<br/>
Maintenance Tracking: Builders, owners, and tenants can report, monitor, and resolve maintenance issues promptly, enhancing tenant satisfaction.
<br/><br/>
Financial Insights: Access comprehensive financial reports, track expenses, and generate statements for a clear overview of property financials.
<br/><br/>
Document Repository: Securely store and share important documents, such as contracts, agreements, and inspection reports, all in one central location.
<br/><br/>
Communication Hub: Foster better communication among all stakeholders through in-app messaging, notifications, and announcements.
<br/><br/>
Analytics and Reporting: Make informed decisions with data-driven insights, helping you optimize occupancy rates and maximize rental income.





</h5>


           
          </div>
          <img src={BuildingImage3} alt="Building 3" className="building-image" />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Homepage;
