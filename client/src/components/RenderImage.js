import React, { useState, useEffect } from 'react';

const RenderImage = ({ buffer }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (buffer) {
      // Convert the buffer data to a data URL
      const arrayBufferView = buffer;
      const blob = new Blob([arrayBufferView], { type: 'image/png' }); // Assuming the image is PNG
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);

      setImageSrc(imageUrl);
    }
  }, [buffer]);

  return (
    <div>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="blog Image"
          style={{ objectFit: "fill",
          height: "300px",
          width: "300px"}}
        />
      )}
    </div>
  );
};

export default RenderImage;
