// import React from 'react';
import dynamic from "next/dynamic";
import style from "../components/TinyMCEEditor.module.css";


const TinyMCEEditor = dynamic(() => import("../components/TinyMCEEditor"), { ssr: false });

const Homepage = () => {
  return (
    <div >
      <div className= {style.EditorDiv}>
        <h1> Editor</h1>
        <TinyMCEEditor />
      </div>
    </div>
  );
};

export default Homepage;