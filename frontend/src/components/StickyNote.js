import React from "react";

const StickyNote = ({ content, posX, posY }) => {
  return (
    <div
      className="sticky"
      style={{
        position: "absolute",
        left: `${posX}px`,
        top: `${posY}px`,
        width: "200px",
        height: "200px",
        backgroundColor: "yellow",
        border: "1px solid black",
        // Add any other styles or classes you need
      }}
    >
      {content}
    </div>
  );
};

export default StickyNote;
