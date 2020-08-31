import React, { Component } from "react";
import { Auth, Db, storage} from '../../../src/providers/FirebaseProvider/firebase';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };
  render() {
    return (
      <div>
          <br/>
          React Firebase Image Uploader
          <br/> 
            File
            <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>
        <br />  
      </div>
    );
  }
}

export default Upload;
