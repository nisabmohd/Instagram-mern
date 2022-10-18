import React from "react";
import "./navbar.css";
import logo from "./logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";
import { messageOutline, profileIcon, savedIcon, settingsIcon, switchAccountIcon } from "../../assets/svgIcons";
import { exploreOutline } from "../../assets/svgIcons";
import { postUploadOutline } from "../../assets/svgIcons";
import { likeOutline } from "../../assets/svgIcons";
import { homeOutline } from "../../assets/svgIcons";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import {Dialog, DialogContent, DialogTitle } from "@mui/material";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [openDailog, setOpenDilaog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDilaog(true);
  };

  const handleCloseDialog = () => {
    setOpenDilaog(false);
  };

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

          <button onClick={handleClickOpen} className="no-style " >{postUploadOutline}</button>
          <Dialog
            maxWidth="lg"
            open={openDailog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ fontFamily: 'Questrial', textAlign: 'center', fontSize: '16.5px' }} id="alert-dialog-title">
              {"Create new post"}
            </DialogTitle>
            <Divider />
            <DialogContent style={{ width: '100%' }}>
              <div className="post" style={{ width: '40vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <svg style={{ marginBottom: '10px' }} aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                Drag photos and videos here
                <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '3.5px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '12px' }}>Select from computer</button>
              </div>
            </DialogContent>

          </Dialog>


          <button className="no-style " >{likeOutline}</button>






          <button onClick={handleClick} className="no-style " >
            <img style={{ width: '27px', borderRadius: '50%' }} src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" alt="" />
          </button>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}

            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                width: '250px',  
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem style={{fontSize:'14px',fontFamily:'Questrial'}}>
              {profileIcon}
              <span style={{marginLeft:'12px'}}>Profile</span>
            </MenuItem>
            <MenuItem style={{fontSize:'14px',fontFamily:'Questrial'}}>
              {savedIcon}
              <span style={{marginLeft:'12px'}}>Saved</span>
            </MenuItem>
            <MenuItem style={{fontSize:'14px',fontFamily:'Questrial'}}>
              {settingsIcon}
              <span style={{marginLeft:'12px'}}>Settings</span>
            </MenuItem>
            <MenuItem style={{fontSize:'14px',fontFamily:'Questrial'}}>
              {switchAccountIcon}
              <span style={{marginLeft:'12px'}}>Switch accounts</span>
            </MenuItem>
            <Divider />
            <MenuItem style={{fontSize:'14px',fontFamily:'Questrial'}}>
            <span style={{marginLeft:'7px'}}>Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
