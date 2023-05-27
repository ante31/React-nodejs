import React, { useState } from 'react';
import { Buffer } from 'buffer';

const DragAndDrop = ({ setProductImage }) => {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;
      const base64String = dataUrl.replace('data:', '').replace(/^.+,/, '');
      const buffer = Buffer.from(base64String, 'base64');
      setImage(dataUrl);
      setProductImage(buffer);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '300px',
        height: '300px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {image && (
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <img
            src={image}
            alt="Dropped image"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      )}
      {!image && (
        <p
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Drag and drop an image here
        </p>
      )}
    </div>
  );
};

export default DragAndDrop;
