import React from "react";
import { BiSearch } from "react-icons/bi";

export const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="container">
          <h1>
            <label>
              Over <span>10.000</span> Curated Design
            </label>{" "}
            <br />
            <label>Resources, Graphic & Website Template</label>
          </h1>
          <p>
            High-quality Design Themes for personal of comercial use contains
            10k+ items in 100 categories.
          </p>
          <div className="search">
            <span>All Categories</span>
            <hr />
            <input type="text" placeholder="Search Products ..." />
            <button>
              <BiSearch className="searchIcon heIcon" />
            </button>
          </div>
          <p>Example: Mockup, PSD, Theme Design, Image...</p>
        </div>
      </div>
    </>
  );
};
