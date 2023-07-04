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
  background-size: cover;
  background-repeat: no-repeat;
`;
const Partdiv= styled.div`
background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
min-height: 100vh;
  //width:800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
`

const Inquiryword= styled.div`
font-size: 32px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 160%;
margin-right: 150px;
margin-top: 40px;
width: 200px;
color: #FFF;
`
const Sentence= styled.div`
width: 345px;
height: 596px;
font-size: 30px;
margin-left: 0px;
margin-top: 100px;


display: flex;
flex-direction: column;
`
const Titlediv=styled.div`
margin-top: -60px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
width:64px;
height:34px;
color: var(--main-white, #F2F2F2);
font-size: 24px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;

`
const Titlediv1=styled.div`
margin-top: 15px;
width:100px;
height:40px;
color: var(--main-white, #F2F2F2);
font-size: 24px;
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
font-size: 24px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
margin-top: 15px;
`

const Contentdiv=styled.div`
width:345px;
height:100px;
margin-top: 30px;
font-size: 16px;
color: var(--main-white, #F2F2F2);
`
const Contentdiv1=styled.div`
width:345px;
height:300px;
margin-top: 30px;
color: var(--main-white, #F2F2F2);
font-size: 15px;
`
const Contentdiv2=styled.div`
width:345px;
height:300px;
margin-top: 30px;
color: var(--main-white, #F2F2F2);
font-size: 16px;
`
const MyLine = styled.div`
    
    margin-top: 20px; 
    margin-left: 0px;
    height: 1px;  /* 선의 두께를 변경하려면 이 값을 조정하세요. */
    background: var(--main-white, #F2F2F2);;  /* 선의 색상을 변경하려면 이 값을 조정하세요. */
    width: 345px;  /* 선의 길이를 조정하려면 이 값을 조정하세요. */


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

    margin-left:-160px;
    margin-top: 50px;
cursor: pointer;

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
    width: 330px;
    height: 700px;
    background-color: yellow;  // gray donation box
    display: flex;

    align-items: center;
    border-radius: 20px;
`;
const Donateimg=styled.img`
margin-top: 50PX;
width:250px;
height:400px;

`

const DonateName= styled.div`
margin-top: 0px;
width: 130px;
height: 40px;

color: black;
font-weight: 900;
font-size: 40px;

`
const Donatesentence= styled.div`
width: 230px;
height: 70px;
margin-top: 30px;

color: black;
font-weight: 500;
font-size: 20px;
`

const Email = styled.div`
width:90px;
height:30px;
color: var(--main-white, #F2F2F2);
font-size: 24px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
margin-top: 30px;
margin-left: 0px;
`

const Emailtext = styled.div`
width:171px;
height:20px;
color: var(--main-white, #F2F2F2);
font-size: 14px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
margin-top:40px;
margin-left: 0px;
`
const Inner = styled.div`
  padding: 0px 0px 0px;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  `
;
const MobAbout=()=>{
const [open,setopen]= useState(false);

return(
    <>
    <ParentContainer>
        <Inner>
    <Link to='/'><img style={{background:"rgba(0,0,0,0)",marginLeft:"15px", width:"165px", height:"47px"}} src={Logo}/></Link>
    <Partdiv>

        <Inquiryword>서비스 소개</Inquiryword>

  

        <MyLine/>
        <Sentence>
            <Titlediv>Who</Titlediv>
            <Contentdiv>저희는 여러분들의 안정적인 상태를 위해,<br/> 정신적 쉼을 제공하고싶은 팀 WWW 입니다.</Contentdiv>
            
            
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

<div style={{display:"flex", flexDirection:"column", marginLeft:"-170px"}}>
    <Email>E-mail</Email>
    <Emailtext>Shimple.www@gmail.com</Emailtext>


</div>
<div style={{display:"flex",flexDirection:"column", marginLeft:"-170px"}}>
    <Email>E-mail</Email>
    <Emailtext>Shimple.www@gmail.com</Emailtext>


</div>
<div style={{display:"flex",flexDirection:"column", marginLeft:"-170px"}}>
    <Email>E-mail</Email>
    <Emailtext>Shimple.www@gmail.com</Emailtext>


</div>
<div style={{display:"flex"}}>


</div>
<div style={{display:"flex"}}>


</div>



<Donate onClick={() => {
                    setopen(true);
                    console.log("Donate was clicked"); 
                }}><img style={{width:"180px", height:"37.5px"}} src={kakao}/></Donate>


 <DonationPopup open={open} onClick={() => {
                setopen(false);
            }}>
                <DonationBox>
                    <Donateimg src={Donate1}/>
                    <DonateName>WWW</DonateName>
                    <Donatesentence>QR코드를 스캔 해주세요!
                        
                    </Donatesentence>

                </DonationBox>
            </DonationPopup>
          </Partdiv>
            </Inner>
    </ParentContainer>
    </>
)
}

export default MobAbout;