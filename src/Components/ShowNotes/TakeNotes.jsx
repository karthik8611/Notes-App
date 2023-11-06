import React, { useState, useEffect } from "react";
import { IoSendSharp } from "react-icons/io5";
import { GoArrowLeft } from 'react-icons/go';

const TakeNotes = ({ groupIndex, random ,onBackButtonClick}) => {
  const [savedNotes, setSavedNotes] = useState([]);
  const [note, setNote] = useState("");

  const formatCurrentDateTime = () => {
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const optionsDate = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const date = new Date();
    const time = date.toLocaleString("en-US", optionsTime);
    const dateStr = date.toLocaleString("en-US", optionsDate);

    return `${time} ${dateStr}`;
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
   
    if (note.length > 0) {
      const newNote = {
        time_data: formatCurrentDateTime(),
        content: note,
      };

      const prevData = JSON.parse(localStorage.getItem("groups")) || [];

      if (groupIndex >= 0 && groupIndex < prevData.length) {
        prevData[groupIndex].notes = prevData[groupIndex].notes || [];
        prevData[groupIndex].notes.push(newNote);
        localStorage.setItem("groups", JSON.stringify(prevData));
        setSavedNotes(prevData);
        setNote("");
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSaveNote(e);
    }
  };
  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem("groups")) || [];
    setSavedNotes(prevData);
    setNote("");
  }, [groupIndex]);

  return (
    <div className="notes-input">
      <div className="group-heading">
        <GoArrowLeft className="back-btn" onClick={onBackButtonClick}/>
        <h1
          className="group-icon"
          style={{
            backgroundColor: savedNotes[groupIndex]?.groupColor || "",
          }}
        >
          {savedNotes[groupIndex]?.groupName?.charAt(0) +
            savedNotes[groupIndex]?.groupName?.charAt(
              random 
            ) || "B"}
        </h1>
        <h1 className="group-name">{savedNotes[groupIndex]?.groupName|| ""}</h1>
      </div>

      <div className="saved-notes">
        {savedNotes[groupIndex]?.notes?.map((savedNote, noteIndex) => (
          <div key={noteIndex} className="notes-content">
            <p className="time-data">{savedNote.time_data}</p>
            <p>{savedNote.content}</p>
          </div>
        ))}
      </div>
      <form className="input-note">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
          onKeyDown={handleKeyDown}
        />

        <IoSendSharp className="save-note" onClick={(e) => handleSaveNote(e)} />
      </form>
    </div>
  );
};

export default TakeNotes;
