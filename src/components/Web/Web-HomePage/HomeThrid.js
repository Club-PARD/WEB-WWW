import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeTitle = styled.div`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 140%;
  margin-top: 20px; /* Add margin-top for spacing */
`;

const PartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px; /* Add margin-top for spacing */
`;

const Box = styled.div`
  width: 442px;
  height: 535px;
  margin-right: 27px;
  cursor: pointer;
`;

const TimeA = styled(Box)`
  background-color: lightblue;
`;

const TimeB = styled(Box)`
  background-color: lightgreen;
`;

const TimeC = styled(Box)`
  background-color: lightgreen;
`;

const HomeThrid = ({ setTime }) => {
   

    const handleOptionChange = (duration) => {
        setTime(duration);
    };

    return (
        <Container>
            <TimeTitle>시간을 선택해주세요</TimeTitle>
            <PartDiv>
            <Link
  to="/Video1"
  onClick={() => handleOptionChange(5)}
>
  <TimeA >15분 선택</TimeA>
</Link>
                <Link  to="/Video1"
    onClick={() => handleOptionChange(20)}
>
                    <TimeB >30분 선택</TimeB>
                </Link>
                <Link   to= "/Video1"
    onClick={() => handleOptionChange(30)}

 >
                    <TimeC >무제한</TimeC>
                </Link>
            </PartDiv>
        </Container>
    );
};

export default HomeThrid;
