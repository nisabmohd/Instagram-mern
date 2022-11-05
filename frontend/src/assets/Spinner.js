import React from "react";
import loader from "./loader.gif";

export const Spinner = () => {
  return <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><img style={{margin:'auto',width:'20px',marginTop:'35px'}} src={loader} alt="" /></div>
};
