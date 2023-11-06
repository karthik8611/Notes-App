import React, { useState, useEffect } from "react";
import "./Notespage.css";
import Heading from "./Heading";
import PopUp from "./Popup";
import TakeNotes from "../ShowNotes/TakeNotes";
import ViewNotes from "../ShowNotes/ViewNotes";

const NotePage = () => {
  const [popup, setPopup] = useState(false);
  const [random, setRandom] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const ClosePopup = () => setPopup(false);
  const prevData = JSON.parse(localStorage.getItem("groups")) || [];
//karthik
  const handleGroupClick = (index) => {
    setActiveGroup(index);
    if (isMobile) {
      document.querySelector("#create-container").classList.add("mobile-view");
      document
        .querySelector(".input-container")
        .classList.remove("mobile-view");
    }
  };

  const handleBackButton = () => {
    if (isMobile) {
      document.querySelector(".input-container").classList.add("mobile-view");
      document
        .querySelector("#create-container")
        .classList.remove("mobile-view");
    }
    setActiveGroup(null);
  };

  useEffect(() => {
    const rand = Math.floor(Math.random() * 10);
    setRandom(rand);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="container">
        <div id="create-container">
          <Heading />
          <div id="create-area">
            <button className="insert-note" onClick={() => setPopup(true)}>
              <span>+</span>Create Notes group
            </button>
          </div>
          {popup && <PopUp closePopup={ClosePopup} />}
          <div className="group-container">
            {prevData.map((data, index) => {
              return (
                <div
                  className="group"
                  key={data.groupName}
                  onClick={() => handleGroupClick(index)}
                  style={
                    activeGroup === index ? { backgroundColor: "#F7ECDC" } : {}
                  }
                >
                  <h1
                    className="group-icon"
                    style={{ backgroundColor: data.groupColor }}
                  >
                    {data.groupName.charAt(0) + data.groupName.charAt(random)}
                  </h1>
                  <h2 className="group-name">{data.groupName}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`input-container ${isMobile ? 'mobile-view' : ''}`}>
          {activeGroup !== null ? (
            <TakeNotes
              groupIndex={activeGroup}
              random={random}
              onBackButtonClick={handleBackButton}
            />
          ) : !isMobile ? (
            <ViewNotes />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
//karthik

export default NotePage;
