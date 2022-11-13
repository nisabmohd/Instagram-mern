import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Menu, MenuItem } from "@mui/material";

export default function Search() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = useState('')
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="search">
        <SearchIcon sx={{ fontSize: '17px', marginRight: '8px', color: 'gray' }} />
        <input
          value={text}
          onClick={handleClick}
          onChange={e=>setText(e.target.value)}
          style={{ width: "100%", fontSize: '14px' }}
          type="text" className="noborder" placeholder="Search" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

      </Menu>

    </>
  );
}
