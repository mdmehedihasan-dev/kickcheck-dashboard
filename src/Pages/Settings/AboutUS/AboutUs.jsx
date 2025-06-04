import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 600,
    iframe: false,
    theme: "dark",
  };

  return (
    <div className="container min-h-screen ">
      <h2 className="mt-16 mb-6 text-2xl font-bold text-white">
        About Us
      </h2>
    <div >
        <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={() => {}}
      />
   <div className="text-center">
       <button className="bg-[#5F9E19] p-2 text-white  mt-2 rounded-lg">
        Save Change
      </button>
   </div>
    </div>
    </div>
  );
};

export default AboutUs;
