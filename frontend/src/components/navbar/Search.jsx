import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <div className="search">
      <SearchIcon sx={{fontSize:'17px',marginRight:'8px',color:'gray'}} />
      <input
        style={{ width: "100%", fontSize: '14px' }}
        type="text" className="noborder" placeholder="Search" />
    </div>
  );
}
