import React, { useState } from "react";

function Navbar({ sections }) {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      style={{
        background: "#f0f0f0",
        padding: "10px",
        position: "sticky",
        top: "0",
        zIndex: "1",
      }}
    >
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-around",
          margin: "0",
          padding: "0",
        }}
      >
        {sections.map((section) => (
          <li
            key={section.id}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
