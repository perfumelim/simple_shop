import React, { useState, useEffect } from "react";
import styled from "styled-components";

function ProductOption() {
  const [quantity, setQuantity] = useState(1);
  const [optionData, setOptionData] = useState(null);
  const [paperType, setPaperType] = useState(null);
  const [frameType, setFrameType] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState("기본");
  const [selectedFrame, setSelectedFrame] = useState("거치대");
  const simpleMultiply = quantity * 5000;
  const totalPrice = simpleMultiply.toLocaleString("ko-KR");

  useEffect(() => {
    fetch(`http://localhost:3000/Data/optionData.json`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOptionData(data);
        setPaperType(data[0].child);
        setFrameType(data[1].child);
      });
  }, []);

  const minusQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const plusQuantity = () => {
    quantity <= 999 ? setQuantity(quantity + 1) : setQuantity(999);
  };

  const selectPaperType = (e) => {
    setSelectedPaper(e.target.name);
  };

  const selectFrameType = (e) => {
    setSelectedFrame(e.target.name);
  };

  const getSummary = () => {
    const entries = new Map([
      ["타입", selectedPaper],
      ["옵션", selectedFrame],
      ["수량", quantity],
    ]);

    const obj = Object.fromEntries(entries);

    console.log(obj);
  };

  return (
    <ProductInfoContainer>
      <h2>옵션 선택</h2>
      <h4>타입</h4>
      <TypeSelectContainer>
        {paperType &&
          paperType.map((type, idx) => {
            return (
              <button
                onClick={selectPaperType}
                key={idx}
                value={type?.value}
                name={type?.label}
                className={
                  type?.label === selectedPaper ? "selectedBox" : ".btn"
                }
              >
                {type?.label}
              </button>
            );
          })}
      </TypeSelectContainer>
      <h4>옵션</h4>
      <OptionSelectContainer>
        {frameType &&
          frameType.map((type, idx) => {
            return (
              <button
                onClick={selectFrameType}
                key={idx}
                value={type?.value}
                name={type?.label}
                className={
                  type?.label === selectedFrame ? "selectedBox" : ".btn"
                }
              >
                {type?.label}
              </button>
            );
          })}
      </OptionSelectContainer>
      <h4>수량</h4>
      <QuantityContainer>
        <button onClick={minusQuantity}>-</button>
        {quantity}
        <button onClick={plusQuantity}>+</button>
      </QuantityContainer>
      <SummaryField>
        <p>
          {selectedPaper} / {selectedFrame}
        </p>
        <div>
          <p>수량: {quantity}</p>
          <span>{totalPrice}원</span>
        </div>
      </SummaryField>
      <TotalPriceContainer>
        <h4>총 가격</h4>
        <span> {totalPrice}원</span>
      </TotalPriceContainer>
      <button onClick={getSummary}>만들기</button>
      <Details>
        <div>
          <p>• 사이즈</p>
        </div>
        <span>15cm x 30cm</span>
      </Details>
      <Details>
        <div>
          <p>• 배송안내</p>
        </div>
        <span>제작 1일 및 택배배송 1~2일 소요</span>
      </Details>
      <Details>
        <div>
          <p>• 배송료</p>
        </div>
        <span>2,500원 (5만원 이상 주문 시 무료)</span>
      </Details>
    </ProductInfoContainer>
  );
}

export default ProductOption;

const ProductInfoContainer = styled.section`
  width: 320px;
  margin-left: 68px;

  > h2 {
    font-size: 22px;
    padding-bottom: 24px;
  }
  > h4 {
    font-size: 12px;
    padding-bottom: 8px;
  }
  > button {
    width: 320px;
    height: 50px;
    margin-bottom: 24px;
    background-color: black;
    color: white;
  }

  @media screen and (max-width: 500px) {
    margin: 10vh 0 0 0;
  }
`;

const TypeSelectContainer = styled.article`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  > button {
    border: 1px solid #eeeeee;
    width: 104px;
    height: 40px;
    font-size: 12px;
    text-align: center;
    color: black;
  }

  > .selectedBox {
    outline: 1px solid black;
  }
`;

const OptionSelectContainer = styled.article`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  > button {
    border: 1px solid #eeeeee;
    width: 158px;
    height: 40px;
    font-size: 12px;
    text-align: center;
  }

  > .selectedBox {
    outline: 1px solid black;
  }
`;

const QuantityContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 158px;
  height: 40px;
  border: 1px solid #eeeeee;
  font-size: 12px;
  margin-bottom: 24px;

  > button {
    width: 24px;
    height: 40px;
    font-size: 16px;
  }
`;

const SummaryField = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 71px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  font-size: 12px;

  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  > div > span {
    font-weight: bold;
  }
`;

const TotalPriceContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 56px;
  font-size: 12px;

  > span {
    font-size: 14px;
    color: #e5362c;
  }
`;

const Details = styled.div`
  display: flex;
  margin-bottom: 8px;
  font-size: 12px;

  > div {
    width: 80px;
  }

  > span {
    color: #666666;
  }
`;
