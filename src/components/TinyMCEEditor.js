"use client"

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const TinyMCEEditor = () => {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  const handlePaste = (event, editor) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const html = clipboardData.getData('text/html');
    const plainText = clipboardData.getData('text/plain');
    let cleanedContent = html;

  
    const isFromWord = html.includes("xmlns:w");
    const isFromGoogleDocs = html.includes("docs-internal-guid");
    const isFromExcel = html.includes("class=\"xl\"");

    if (isFromWord || isFromGoogleDocs || isFromExcel) {
      
      const keepFormatting = window.confirm("Do you want to keep the original formatting?");
      if (!keepFormatting) {
        cleanedContent = plainText; 
      } else {
        
        cleanedContent = cleanHTML(html);
      }

      event.preventDefault(); 
      editor.execCommand('mceInsertContent', false, cleanedContent);
    }
  };

  const cleanHTML = (html) => {
    return html.replace(/(font-family|font-size|color):[^;]+;?/g, ''); 
  };

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue="<p></p>"
      apiKey= 'gw0yb0tcfubur5hacbp1ecapanp3f6iqfejvvvh69s99s9ku'
      init={{
        height: 500,
        menubar: false,
        plugins: "paste",
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat",
        paste_as_text: false,
        paste_preprocess: handlePaste,
       
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
