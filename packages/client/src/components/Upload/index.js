import React, { useState } from "react";

import { uploadProfilePicture } from "../../api";

const TestUpload = () => {
  const [image, setImage] = useState(undefined);
  const [url, setUrl] = useState(undefined);

  const imageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const handleUpload = () => {
    if (!image) {
      console.log("No image selected");
    }
    console.log(image)

    uploadProfilePicture(image)
      .then(url => {
        console.log(url);
        setUrl(url);
      });
  }

  return (
    <>
      <h1>
        Upload Profile Picture
      </h1>
      <input type="file" onChange={imageChange} />
      <br></br>
      <button onClick={handleUpload}> Upload </button>

      { url ? <img src={url} /> : <></> }
    </>
  )

}

export default TestUpload;
