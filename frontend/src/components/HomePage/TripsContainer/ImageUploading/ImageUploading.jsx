import React from 'react';
import {parse,stringify} from 'flatted';
import './ImageUploading.css'

function UploadImages({postCreateData,handleChange}) {
/*
  const upload = (file) => {
    fetch('/upload', { // Your POST endpoint
      method: 'POST',
      headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryMd9mWQx2MULR6XnI"
      },
      body: stringify({file}) // This is your file object
    }).then(
      response => response.json() // if the response is a JSON object
    ).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
  };

  
    const input = document.querySelector('.custom-file-input')
    
    // This will upload the file after having read it
    

    // Event handler executed when a file is selected
    const onSelectFile = () => upload(input.files[0]);

    // Add a listener on your input
    // It will be triggered when a file will be selected
    input.addEventListener('change', onSelectFile, false);
    */
    return (
        <div className="m-3">
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <div class="custom-file mb-3">
                    <label for="file" class="custom-file-label">Photo for Post: </label>
                    <input type="file" name="file" id="file" className="custom-file-input" 
                    // onChange={(event) => {upload(event.target.files[0])}} // true false not working
                    onChange={handleChange}
                     />
                    <input type="submit" value="Submit" class="btn btn-primary btn-block post-submit-button"/>
                </div>
            </form>
        </div>
      );
}


export default UploadImages;