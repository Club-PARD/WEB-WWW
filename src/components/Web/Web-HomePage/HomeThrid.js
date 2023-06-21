import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 20px;
  cursor: pointer;
`;

const BoxA = styled(Box)`
  background-color: lightblue;
`;

const BoxB = styled(Box)`
  background-color: lightgreen;
`;

const SelectBoxes = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [time, setTime] = useState(0);

    const handleOptionChange = (option, time) => {
        setSelectedOption(option);
        setTime(time);
    };

    return (
        <div>
            <Container>
                <Link to="/VideoPlayer" onClick={() => handleOptionChange('Option A', 10)}>
                    <BoxA>Box A</BoxA>
                </Link>
                <Link to="/VideoPlayer" onClick={() => handleOptionChange('Option B', 20)}>
                    <BoxB>Box B</BoxB>
                </Link>
            </Container>
        </div>
    );
};

export default SelectBoxes;
