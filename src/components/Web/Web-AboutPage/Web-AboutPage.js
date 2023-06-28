import { styled } from "styled-components";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Insta from "../../../Assets/img/Insta.png";
import Donate1 from "../../../Assets/img/Donate.png";
const PartDiv = styled.div`
display: flex;
flex-direction: column;
margin: 0px auto;


height: 1200px;
width: 1440px;

`;
const Inquiryword= styled.div`
font-weight: 700;
font-size: 50px;
margin-left: 300px;
margin-top: 100px;
`
const Sentence= styled.div`

width: 1200px;
font-size: 30px;
margin-left: 300px;
margin-top: 200px;
`
const Strong = styled.strong`
  font-weight: bold;
`;
const MyLine = styled.hr`
    border: 0;
    margin-top: 200px; 
    margin-left: 300px;
    height: 2px;  /* 선의 두께를 변경하려면 이 값을 조정하세요. */
    background: #888;  /* 선의 색상을 변경하려면 이 값을 조정하세요. */
    width: 1200px;  /* 선의 길이를 조정하려면 이 값을 조정하세요. */
    z-index: 8;

`;
const InstaLink= styled(Link)`

`
const Instaimq= styled.img`
width: 85px;
height:85px;
margin-top: 50px;
    margin-left: 300px;
    z-index: 2;
    

`

const Donate=styled.div`
text-align: center;
line-height: 80px;
    margin-left: 300px;
    margin-top: 50px;
    width: 85px;
height:85px;
background-color: brown;
color: white;
border-radius: 20px;

`

const DonationPopup = styled.div`
    display: ${({ open }) => (open ? "flex" : "none")};  // visibility based on 'open' state
    position: fixed;  // positioned relative to the nearest positioned ancestor (instead of positioned relative to the viewport)
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
 
    background-color: rgba(0, 0, 0, 0.5);  // semi-transparent black
    z-index: 10;
`;

const DonationBox = styled.div`
display: flex;
flex-direction:column;
    width: 800px;
    height: 1100px;
    background-color: red;  // gray donation box
    display: flex;

    align-items: center;
    border-radius: 20px;
`;
const Donateimg=styled.img`
margin-top: 100PX;
width:400px;
height:500px;

`

const DonateName= styled.div`
margin-top: 100px;
width: 200px;
height: 0px;

color: black;
font-weight: 900;
font-size: 70px;

`
const Donatesentence= styled.div`
width: 350px;
height: 100px;
margin-top: 100px;

color: black;
font-weight: 500;
font-size: 30px;
`
const AboutPage=()=>{
const [open,setopen]= useState(false);

return(
    <>
    <PartDiv>
        <Inquiryword>소개</Inquiryword>
        <Sentence>
            저희 <Strong>WWW</Strong>는 충분한 휴식을 취하지 않는 현대 사회인들에게 가치있는 휴식을 선물하고자 시작하였습니다.
살면서 번아웃으로 힘든적이 있지 않으신가요? 열심히 하고 있는데, 오히려 집중력은 떨어지고, 일의 효율성이 떨어지지는 않나요? 쉬는 것을 두려워하지 마세요. 당장의 휴식은 뒤쳐짐이 아닌, 다음을 위한 도약입니다.
<Strong>WWW</Strong>가 제공하는 휴식 서비스를 통해, 마음의 평안함을 얻고, 회복된 몸과 마음으로 더욱 활기 넘치는 날들을 보내시길 바랍니다.
</Sentence>
<MyLine/>
<InstaLink to='/'><Instaimq src={Insta}></Instaimq></InstaLink>
<Donate onClick={() => {
                    setopen(true);
                }}>후원</Donate>

    </PartDiv>
    <DonationPopup open={open} onClick={() => {
                setopen(false);
            }}>
                <DonationBox>
                    <Donateimg src={Donate1}/>
                    <DonateName>WWW</DonateName>
                    <Donatesentence>QR코드를 스캔 해주세요!
                        돈을 주세요!
                    </Donatesentence>

                </DonationBox>
            </DonationPopup>
    </>
)
}

export default AboutPage;