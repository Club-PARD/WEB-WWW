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
  width: 532px;
  height: 250px;
  display: inline-flex;
  padding: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 30px;
  background: var(--main-white, #f2f2f2);
`;

const Title = styled.div`
  color: var(--text, #323338);
  text-align: center;
  font-size: 24px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
`;

const ToGoText = styled.a`
  color: var(--text, #323338);
  text-align: center;
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const ToGo = styled.div`
  width: 468px;
  height: 44px;
  border-radius: 10px;
  background: var(--text-field, #d9d9d9);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: linear-gradient(
      0deg,
      rgba(91, 193, 132, 1) 0%,
      rgba(91, 193, 132, 1) 100%
    );
  }
  /* 91,193,132,1 */

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
            <ToGoText>홈으로가기</ToGoText>
          </ToGo>
        </Link>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;