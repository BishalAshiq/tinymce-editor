"use client"; 

import { Editor } from "@tinymce/tinymce-react"; 
import { useRef } from "react"; 
import style from "./TinyMCEEditor.module.css";

const TinyMCEEditor = () => {
  const editorRef = useRef(null); 

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content); 
  };

 
  const handlePaste = (event, editor) => {
    let html = '';
    let plainText = ''; 

    
    if (event.clipboardData) {
      html = event.clipboardData.getData('text/html') || ''; 
      plainText = event.clipboardData.getData('text/plain') || ''; 
    } else if (typeof window !== 'undefined' && window.clipboardData) {
      html = window.clipboardData.getData('Text') || ''; 
      plainText = html; 
    }

    let cleanedContent = html; 

    const isFromWord = html.includes("xmlns:w"); 
    const isFromGoogleDocs = html.includes("docs-internal-guid"); 
    const isFromExcel = html.includes("class=\"xl\""); 

    if (isFromWord || isFromGoogleDocs || isFromExcel) {
      const keepFormatting = window.confirm("Content detected from an external source. Do you want to keep the original formatting?");
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
    let cleanedHtml = html.replace(/style="[^"]*"/g, ''); 
    cleanedHtml = cleanedHtml.replace(/<[^>]*class="[^"]*"[^>]*>/g, ''); 
    cleanedHtml = cleanedHtml.replace(/(font-family|font-size|color):[^;]+;?/g, ''); 

    return cleanedHtml;
  };

  return (
   <div>
     <Editor
     className={style.Editor}
      onInit={(evt, editor) => (editorRef.current = editor)} 
      initialValue="<p>Write Here</p>" // 
      apiKey='gw0yb0tcfubur5hacbp1ecapanp3f6iqfejvvvh69s99s9ku' 
      init={{
        height: 400, 
        menubar: false, 
        plugins:[
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', "paste"
        ], 
        toolbar: 
          "undo redo | formatselect | bold italic backcolor | link image" +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat", 
        paste_as_text: false, 
        paste_preprocess: handlePaste, 
      }}
      onEditorChange={handleEditorChange} 
    />
   </div>
  );
};

export default TinyMCEEditor; 
