import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StickyBoard.css";

const StickyBoard = () => {
  const [stickies, setStickies] = useState([]);
  const [newStickyContent, setNewStickyContent] = useState("");

  useEffect(() => {
    fetchStickies();
  }, []);

  const fetchStickies = async () => {
    try {
      const response = await axios.get("/api/stickies");
      setStickies(response.data);
    } catch (error) {
      console.error("Error fetching stickies:", error);
    }
  };

  const addSticky = async () => {
    console.log("Add Sticky button clicked");
    try {
      const response = await axios.post("/api/stickies", {
        content: newStickyContent,
        posX: 100,
        posY: 100,
      });
      setStickies([...stickies, response.data]);
      setNewStickyContent("");
    } catch (error) {
      console.error("Error adding sticky:", error);
      console.log("Error details:", error.response);
    }
  };

  const updateSticky = async (id, updatedContent) => {
    try {
      const response = await axios.put(`/api/stickies/${id}`, {
        content: updatedContent,
      });
      const updatedStickies = stickies.map((sticky) =>
        sticky._id === id ? response.data : sticky
      );
      setStickies(updatedStickies);
    } catch (error) {
      console.error("Error updating sticky:", error);
    }
  };

  const deleteSticky = async (id) => {
    try {
      await axios.delete(`/api/stickies/${id}`);
      const updatedStickies = stickies.filter((sticky) => sticky._id !== id);
      setStickies(updatedStickies);
    } catch (error) {
      console.error("Error deleting sticky:", error);
    }
  };

  return (
    <div className="sticky-board-container">
      {" "}
      {/* Added container class */}
      {/* Input and Add Sticky button */}
      <div className="input-container">
        {" "}
        {/* Added container class */}
        <input
          type="text"
          value={newStickyContent}
          onChange={(e) => setNewStickyContent(e.target.value)}
          placeholder="Enter sticky note content"
        />
        <button className="add-button" onClick={addSticky}>
          Add Sticky
        </button>
      </div>
      {/* Sticky notes */}
      <div className="sticky-board">
        {stickies.map((sticky) => (
          <div key={sticky._id} className="sticky">
            <textarea
              value={sticky.content}
              onChange={(e) => updateSticky(sticky._id, e.target.value)}
            />
            <button
              className="delete-button"
              onClick={() => deleteSticky(sticky._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyBoard;
