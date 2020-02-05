import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { firestore, storage } from '../fierbase';
// import { ConsoleWriter } from "istanbul-lib-report";
// import { removePropertiesDeep } from "@babel/types";

export function MyDropzone(props) {
  const onDrop = useCallback(
    pictures => {
      alert('Got Your Picture');
      pictures.forEach(picture => {
        props.handleFileChange(picture.name, picture);
        storage
          .ref()
          .child(props.state.email)
          .child(picture.name)
          .put(picture)
          .then(response => response.ref.getDownloadURL())
          .then(photoUrl => this.userRef.update({ photoUrl }));
      });
    },
    [props.state.email]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='drop-zone'>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>click</p>}
    </div>
  );
}
