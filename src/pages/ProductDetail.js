import React, { useState, useEffect } from "react";
import Showcase from "../components/Showcase/Showcase";
import ProductOption from "../components/ProductOption/ProductOption";
import styled from "styled-components";

function ProductDetail() {
  const [imagesData, setImagesData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/Data/imageData.json`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setImagesData(data);
      });
  }, []);

  return (
    <Container>
      {imagesData && <Showcase imagesData={imagesData} />}

      <ProductOption />
    </Container>
  );
}

export default ProductDetail;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8vh;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
