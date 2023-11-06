import React from "react";
import "./ViewNotes.css";
import Footer from "./Footer";
import background_image from "../../Assets/bgimage.png";

const ViewNotes = () => {
  return (
    <>
      <div id="note-container">
        <div id="note-area">
          <img src={background_image} alt="background_image" />
          <h1>Pocket notes</h1>
          <p>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ViewNotes;
