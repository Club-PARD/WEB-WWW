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

const BoxA = styled(Box)`
  background-color: lightblue;
`;

const BoxB = styled(Box)`
  background-color: lightgreen;
`;

const BoxC = styled(Box)`
  background-color: lightgreen;
`;

const SelectedOption = styled.div`
  margin-top: 20px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;

const SelectedTime = styled.div`
  margin-top: 10px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;

const HomeThrid = () => {
    const [option, setOption] = useState('');
    const [time, setTime] = useState(0);

    const handleOptionChange = (option, time) => {
        setOption(option);
        setTime(time);
    };

    return (
        <Container>
            <TimeTitle>시간을 선택해주세요</TimeTitle>
            <PartDiv>
                <Link to="/VideoPlayer" onClick={() => handleOptionChange('Option A', 10)}>
                    <BoxA>15분 선택</BoxA>
                </Link>
                <Link to="/VideoPlayer" onClick={() => handleOptionChange('Option B', 20)}>
                    <BoxB>30분 선택</BoxB>
                </Link>
                <Link to="/VideoPlayer" onClick={() => handleOptionChange('Option C', 30)}>
                    <BoxC>무제한</BoxC>
                </Link>
            </PartDiv>
        </Container>
    );
};

export default HomeThrid;
