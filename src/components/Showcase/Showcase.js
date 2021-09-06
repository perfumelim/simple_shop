import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./Showcase.scss";
import styled from "styled-components";

export default function Slider({ imagesData }) {
  const [Images, setImages] = useState([]);
  const option = {
    showPlayButton: false,
    showFullscreenButton: false,
  };

  useEffect(() => {
    if (imagesData.length > 0) {
      imagesData.map((img) => {
        Images.push({
          original: `https://files.snaps.com/${img.imagePath}`,
          thumbnail: `https://files.snaps.com/${img.thumbnailImagePath}`,
        });
      });
      setImages(Images);
    }
  }, []);

  return (
    <ImageContainer>
      <ImageGallery {...option} items={Images} />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  width: 40vw;
`;
