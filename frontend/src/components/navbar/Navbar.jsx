import React, { useState } from "react";
import "./navbar.css";
import logo from "./logo.png";
import Search from "./Search";
import { Link, NavLink } from "react-router-dom";
import { exploreFill, homeFill, messageFill, messageOutline, profileIcon, savedIcon, settingsIcon, switchAccountIcon } from "../../assets/svgIcons";
import { exploreOutline } from "../../assets/svgIcons";
import { postUploadOutline } from "../../assets/svgIcons";
import { likeOutline } from "../../assets/svgIcons";
import { homeOutline } from "../../assets/svgIcons";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { url } from "../../baseUrl";
import { api } from "../../Interceptor/apiCall";
import defaultImg from '../../assets/dafault.png'
import { NotificationBox } from "../dialog/NotificationBox";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase';


export const Navbar = ({ active }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [imgurl, setImgurl] = useState('')
  const context = useContext(AuthContext)
  const [caption, setCaption] = useState('')
  const [innerActive, setInnerActive] = useState()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElNot, setAnchorElNot] = React.useState(null);
  const openNot = Boolean(anchorElNot);
  const handleClickNot = (event) => {
    setInnerActive("notification")
    setAnchorElNot(event.currentTarget);
  };
  const handleCloseNot = () => {
    setAnchorElNot(null);
    setInnerActive()
  };

  const [openDailog, setOpenDilaog] = React.useState(false);

  const handleClickOpen = () => {
    setInnerActive("newpost")
    setOpenDilaog(true);
  };

  const handleCloseDialog = () => {
    setImgurl('')
    setCaption('')
    setOpenDilaog(false);
    setInnerActive()
  };

  const logout = async () => {
    api.post(`${url}/auth/logout`, {
      token: localStorage.getItem('refresh_token')
    }).then((resp) => {
      if (resp.data) {
        localStorage.clear()
        window.location.reload()
        context.setAuth(null)
      }
    }).catch((err) => {

    })
  }
  context.logout = logout

  const upload = async (e) => {
    const file = e.target.files[0]
    if (!(file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      context.throwErr("Filt type not supported")
    }
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        context.throwErr("Some error occured")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgurl(downloadURL)
        });
      }
    );
  }
  const handlePost = async () => {
    if (!caption) {
      return context.throwErr("Caption Required")
    }
    const data = {
      caption: caption,
      files: [{
        fileType: "image",
        link: imgurl
      }]
    }
    api.post(`${url}/post/create`, data).then((res) => {
      if (res.data) {
        context.throwSuccess("Posted")
        handleCloseDialog()
        context.newpost(res.data)
      }
      console.log(res.data);
    })
  }


  return (
    <div className="navbar flex">
      <div className="width60 nav flex flex-row justify-btwn">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/"><img src={logo} style={{ marginBottom: '-5px' }} alt="" /></Link>
        </div>
        <div className="searchbar">
          <Search />
        </div>
        <div className="icons">
          <NavLink to="/" >{(active === "home" && !innerActive) ? homeFill : homeOutline}</NavLink>
          <Link to="/chats/all">{(active === "chat" && !innerActive) ? messageFill : messageOutline}</Link>

          <button onClick={handleClickOpen} className="no-style " >{innerActive === "newpost" ?
            <svg aria-label="New post" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="m12.003 5.545-.117.006-.112.02a1 1 0 0 0-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 0 0-.877.876L5.545 12l.007.117a1 1 0 0 0 .877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 0 0 .876.877l.117.007.117-.007a1 1 0 0 0 .876-.877l.007-.116V13h4.452l.116-.007a1 1 0 0 0 .877-.876l.007-.117-.007-.117a1 1 0 0 0-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 0 0-.876-.877ZM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1Z"></path></svg>
            :
            postUploadOutline}</button>
          <Dialog
            maxWidth="lg"
            open={openDailog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                borderRadius: '15px'
              }
            }}
          >
            <DialogTitle style={{ fontFamily: 'Poppins', textAlign: 'center', fontSize: '15.5px' }} id="alert-dialog-title">
              {"Create new post"}
            </DialogTitle>
            <Divider style={{ marginTop: '-10px' }} />
            <DialogContent style={{}}>
              <div className="post" style={{ width: '45vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>

                {
                  imgurl ?
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                      <div className="imageup" style={{ height: '65%' }}>
                        <img style={{ width: '95%', height: '100%', margin: 'auto' }} src={imgurl} alt="" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', position: 'absolute', bottom: 15, margin: 'auto' }}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Caption"
                          multiline
                          rows={4}
                          InputProps={{
                            style: { fontSize: '13.5px', fontFamily: 'Poppins' }
                          }}
                          value={caption} onChange={e => setCaption(e.target.value)}
                        />
                        <button onClick={() => handlePost()} style={{ border: 'none', outline: 'none', background: 'blue', padding: '3.5px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '12px', fontSize: '15px', cursor: 'pointer' }}>Upload</button>
                      </div>
                    </div> :
                    <>
                      <svg style={{ marginBottom: '10px' }} aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                      <p style={{ fontSize: '15px' }}>Drag photos and videos here</p>
                      <label htmlFor="imgHandleUp" style={{ border: 'none', outline: 'none', background: 'blue', padding: '3.5px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '12px', fontSize: '15px', cursor: 'pointer' }}>Select from computer</label>
                      <input onChange={e => upload(e)} id="imgHandleUp" type="file" multiple hidden />
                    </>
                }

              </div>
            </DialogContent>

          </Dialog>


          <Menu
            anchorEl={anchorElNot}
            id="account-menu"
            open={openNot}
            onClick={handleCloseNot}
            onClose={handleCloseNot}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                width: '470px',
                minHeight: '30px',
                maxHeight: '400px',
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
            <div style={{ minHeight: '150px', maxHeight: '390px', display: 'flex', flexDirection: 'column', overflowY: 'scroll', }}>

              {
                <NotificationBox />
              }

            </div>

          </Menu>

          <NavLink to="/explore">{(active === "explore" && !innerActive) ? exploreFill : exploreOutline}</NavLink>


          <button className="no-style " onClick={handleClickNot} >{innerActive === "notification" ?
            <svg aria-label="Notifications" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            : likeOutline}</button>


          <button onClick={handleClick} className="no-style " >
            <img style={{ minWidth: '27px', height: '27px', objectFit: 'cover', borderRadius: '50%', border: (active === "myprofile" && !innerActive) ? '2px solid #333333' : "2px solid white", marginLeft: '-2px' }} src={context?.auth?.avatar ? context.auth.avatar : defaultImg} alt="" />
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
            <MenuItem style={{ fontSize: '13px', fontFamily: 'Poppins' }}>
              <Link to={`/${context.auth.username}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {profileIcon}
                <span style={{ marginLeft: '12px' }}>Profile</span>
              </Link>
            </MenuItem>
            <MenuItem style={{ fontSize: '13px', fontFamily: 'Poppins' }}>
              <Link to="/saved/thenisab" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {savedIcon}
                <span style={{ marginLeft: '12px' }}>Saved</span>
              </Link>
            </MenuItem>
            <MenuItem style={{ fontSize: '13px', fontFamily: 'Poppins' }}>
              <Link to="/accounts/edit" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {settingsIcon}
                <span style={{ marginLeft: '12px' }}>Settings</span>
              </Link>
            </MenuItem>
            <MenuItem style={{ fontSize: '13px', fontFamily: 'Poppins' }}>
              {switchAccountIcon}
              <span style={{ marginLeft: '12px' }}>Switch accounts</span>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => logout()} style={{ fontSize: '13px', fontFamily: 'Poppins' }}>
              <span style={{ marginLeft: '7px' }}>Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
