import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 344px;
  height: 184px;
  display: inline-flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main-white, #F2F2F2);
`;

const Title = styled.div`
color: var(--text, #323338);
text-align: center;
font-size: 16px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
`;

const ToGoText = styled.a`
  color: var(--text, #323338);
  text-align: center;
  font-size: 14px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;


const ToGo = styled.div`
  width: 312px;
  height: 36px;
  display: flex;
  padding: 8px 4px;
  justify-content: center;
  align-items: center;
  gap: 67px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--text-field, #D9D9D9);

  &:hover {
    background: var(--0, #4880EE);
  }

  &:hover ${ToGoText} {
    color: var(--main-white, #f2f2f2);
  }
`;

const Modal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <Title>마음의 쉼을 얻어 당신의 하루가 평안하길 바라요.</Title>
        <Link to="/Community" style={{ textDecoration: "none" }}>
          <ToGo>
            <ToGoText>기록하러가기</ToGoText>
          </ToGo>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <ToGo>
            <ToGoText>ASMR 다시 경험하기</ToGoText>
          </ToGo>
        </Link>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
