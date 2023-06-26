import React from 'react';
import styled from 'styled-components';

const DIVV = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  color: white;
  font-size: 100px;
`;

function RealTimeUser() {
  return (
    <div>
      <DIVV>
        Real time user
      </DIVV>
    </div>
  );
}

export default RealTimeUser;
