// import React from 'react';
import dynamic from "next/dynamic";


const TinyMCEEditor = dynamic(() => import("../components/TinyMCEEditor"), { ssr: false });

const Homepage = () => {
  return (
    <div>
      <h1>TinyMCE Editor</h1>
      <TinyMCEEditor />
    </div>
  );
};

export default Homepage;