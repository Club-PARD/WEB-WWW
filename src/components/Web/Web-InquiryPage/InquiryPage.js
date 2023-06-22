import styled from "styled-components";
import { useState } from "react";

const PartDiv = styled.div`
display: flex;
flex-direction: column;
margin: 0px auto;


height: 1000px;
width: 1440px;

`;
const Inquiryword= styled.div`
font-weight: 700;
font-size: 50px;
margin-left: 300px;
margin-top: 200px;
`
const Sentence= styled.div`
font-weight: 400;
width: 1200px;
font-size: 30px;
margin-left: 300px;
margin-top: 200px;
`

const Form= styled.form`
width: 1000px;
height:800px;



`
const Inquiryfirst=()=>{




    return(
        <>
        <PartDiv>
            <Inquiryword>문의</Inquiryword>
            <Sentence>WWW에 제보하고 싶은 서비스가 있거나 문의사항이 있다면 보내주세요</Sentence>
           
        </PartDiv>
        </>

    )
};

export default Inquiryfirst