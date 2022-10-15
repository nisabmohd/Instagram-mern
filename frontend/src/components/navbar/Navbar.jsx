import React from "react";
import "./navbar.css";
import logo from "./logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";
import { messageOutline } from "../../assets/svgIcons";
import { exploreOutline } from "../../assets/svgIcons";
import { postUploadOutline } from "../../assets/svgIcons";
import { likeOutline } from "../../assets/svgIcons";
import { homeOutline } from "../../assets/svgIcons";

export const Navbar = () => {
  return (
    <div className="navbar flex">
      <div className="width60 nav flex flex-row justify-btwn">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="searchbar">
          <Search />
        </div>
        <div className="icons">
          <Link to="/">{homeOutline}</Link>
          <Link to="/chats">{messageOutline}</Link>
          <Link to="/explore">{exploreOutline}</Link>
          <button className="no-style " >{postUploadOutline}</button>
          <button className="no-style " >{likeOutline}</button>
          <Link to="/"><img style={{width:'27px',borderRadius:'50%'}} src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" alt="" /></Link>
        </div>
      </div>
    </div>
  );
};
