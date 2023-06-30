import { styled } from "styled-components";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Insta from "../../../Assets/img/Insta.png";
import Donate1 from "../../../Assets/img/Donate.png";
import kakao from "../../../Assets/img/KAKAO.png";
import sand from "../../../Assets/img/Sandblur.png";
import Logo from "../../../Assets/img/Logowhite.png";

const ParentContainer = styled.div`
 overflow-y: auto;
  height: 100vh;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  
  //linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${sand}), lightgray;
  position: relative; /* Add this line */
  z-index: 999;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Partdiv = styled.div`
 //background: rgba(255, 255, 255, 0.01) url(${sand});
  //linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${sand}), lightgray;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;


`
const Inquiryword= styled.div`
font-weight: 700;
font-size: 50px;
margin-left: -600px;
margin-top: 100px;
width: 622px;
color: var(--main-white, #F2F2F2);
`
const Sentence= styled.div`

width: 1200px;
height: 1052px;
font-size: 30px;
margin-left: 0px;
margin-top: 100px;


display: flex;
flex-direction: column;
`
const Titlediv=styled.div`
margin-top: 100px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
width:100px;
height:40px;
color: var(--main-white, #F2F2F2);
font-size: 40px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;

`
const Titlediv1=styled.div`
width:100px;
height:40px;
color: var(--main-white, #F2F2F2);
font-size: 40px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
`
const Titlediv2=styled.div`
//margin-top: 100px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
width:100px;
height:40px;
color: var(--main-white, #F2F2F2);
font-size: 40px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;

`

const Contentdiv=styled.div`
width:1200px;
height:100px;
margin-top: 50px;
font-size: 24px;
color: var(--main-white, #F2F2F2);
`
const Contentdiv1=styled.div`
width:1200px;
height:400px;
margin-top: 50px;
color: var(--main-white, #F2F2F2);
font-size: 24px;
`
const Contentdiv2=styled.div`
width:1200px;
height:300px;
margin-top: 50px;
color: var(--main-white, #F2F2F2);
font-size: 24px;
`
const MyLine = styled.div`
    
    margin-top: 100px; 
    margin-left: 0px;
    height: 2px;  /* 선의 두께를 변경하려면 이 값을 조정하세요. */
    background: var(--main-white, #F2F2F2);;  /* 선의 색상을 변경하려면 이 값을 조정하세요. */
    width: 1200px;  /* 선의 길이를 조정하려면 이 값을 조정하세요. */


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

    margin-left:-700px;
    margin-top: 50px;


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
    background-color: yellow;  // gray donation box
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

const Email = styled.div`
width:90px;
height:30px;
color: var(--main-white, #F2F2F2);
font-size: 30px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
margin-top: 30px;
margin-left: -600px;
`

const Emailtext = styled.div`
width:171px;
height:20px;
color: var(--main-white, #F2F2F2);
font-size: 40px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
margin-top: 20px;
margin-left: 60px;
`
const HomeAboutPage=()=>{
const [open,setopen]= useState(false);

return(
    <>
    <ParentContainer>
    <Link to='/'><img style={{marginLeft:"50px", width:"165px", height:"47px"}} src={Logo}/></Link>
    <Partdiv>
  
        <Inquiryword>소개</Inquiryword>
        <MyLine/>
        <Sentence>
            <Titlediv>Who</Titlediv>
            <Contentdiv>저희는 여러분들의 안정적인 상태를 위해, 정신적 쉼을 제공하고싶은 팀 WWW 입니다.</Contentdiv>
            
            
            <Titlediv1>Why</Titlediv1>
            <Contentdiv1>지금 당신은 안정적인 상태인가요? <br/>
            불안한 마음이나 걱정으로 인해 힘들지는 않은가요? 
            <br/><br/>당신의 불안정한 상태는, 일의 효율을 떨어뜨리고, 극심한 스트레스를 유발합니다. 
           <br/><br/> 우리는 당신의 하루가 더욱 편안하고, 안정되길 원합니다.
             </Contentdiv1>

            <Titlediv2>What</Titlediv2>
            <Contentdiv2>자연에 대한 영상과 ASMR 콘텐츠로 여러분들에게 높은 퀄리티의 쉼을 제공합니다.
                <br/><br/>
                 불안한 감정과 걱정들은 혼자 생각하면 더욱 커지기 마련입니다.<br/>
                  익명으로 사람들과 공유하며, 마음을 치유해보세요.</Contentdiv2>

          

            
</Sentence>
<MyLine/>

<div style={{display:"flex"}}>
    <Email>E-mail</Email>
    <Emailtext>Shimple.www@gmail.com</Emailtext>


</div>
<div style={{display:"flex"}}>
    <Email>E-mail</Email>
    <Emailtext>Shimple.www@gmail.com</Emailtext>


</div>
<div style={{display:"flex"}}>
    <Email>E-mail</Email>
    <Emailtext>Shimple.www@gmail.com</Emailtext>


</div>
<div style={{display:"flex"}}>


</div>
<div style={{display:"flex"}}>


</div>
<InstaLink to='/'><Instaimq src={Insta}></Instaimq></InstaLink>
<Donate onClick={() => {
                    setopen(true);
                }}><img src={kakao}/></Donate>

    </Partdiv>
    </ParentContainer>

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

export default HomeAboutPage;