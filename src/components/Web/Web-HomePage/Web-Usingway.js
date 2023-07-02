import { styled } from "styled-components";

import { Link } from "react-router-dom";

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
color: var(--main-white, #F2F2F2);
margin-left: -1020px;
margin-top: 30px;
text-align: center;
font-size: 36px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
`
const Sentence= styled.div`

width: 1140px;
height: 1203px;
font-size: 30px;
margin-left: 0px;
margin-top: 100px;


display: flex;
flex-direction: column;
`
const Titlediv=styled.div`
margin-top: -40px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
width:800px;
height:30px;
color: var(--main-white, #F2F2F2);
font-size: 30px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;

`
const Titlediv1=styled.div`
width:1100px;
height:30px;
color: var(--main-white, #F2F2F2);
font-size: 30px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
margin-top: 60px;
`
const Titlediv2=styled.div`
//margin-top: 100px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
width:1100px;
height:20px;
color: var(--main-white, #F2F2F2);
font-size: 30px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
margin-top: 60px;

`

const Titlediv3=styled.div`
//margin-top: 100px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
width:1100px;
height:40px;
color: var(--main-white, #F2F2F2);
font-size: 30px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
margin-top: 0px;
`
const Titlediv4=styled.div`
//margin-top: 100px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
width:1100px;
height:40px;
color: var(--main-white, #F2F2F2);
font-size: 30px;
font-family: Calliga;
font-style: normal;
font-weight: 400;
line-height: 140%;
margin-top: 50px;
`
const Contentdiv=styled.div`
width:1100px;
height:100px;
margin-top: 50px;
font-size: 24px;
color: var(--main-white, #F2F2F2);
`
const Contentdiv1=styled.div`
width:1100px;
height:400px;
margin-top: 50px;
color: var(--main-white, #F2F2F2);
font-size: 24px;
`
const Contentdiv2=styled.div`
width:1100px;
height:300px;
margin-top: 50px;
color: var(--main-white, #F2F2F2);
font-size: 24px;
`
const MyLine = styled.div`
    
    margin-top: 0px; 
    margin-left: 100px;
    height: 2px;  /* 선의 두께를 변경하려면 이 값을 조정하세요. */
    background: var(--main-white, #F2F2F2);;  /* 선의 색상을 변경하려면 이 값을 조정하세요. */
    width: 1240px;  /* 선의 길이를 조정하려면 이 값을 조정하세요. */


`;
const RestLink= styled(Link)`
color: #FFF;
font-size: 16px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
width:400px;
height: 30px;
text-decoration: none;
cursor: pointer;
&:hover{
    text-decoration-line: underline;
}
margin-top:10px;
margin-left: -740px;
`

const UsingHomePage=()=>{

return(
    <>
    <div className="Barun-GothicB-font">
    <ParentContainer>
    <Link to='/'><img style={{marginLeft:"50px", width:"165px", height:"47px"}} src={Logo}/></Link>
    <Partdiv>
    
        <Inquiryword>이용방법</Inquiryword>
        <MyLine/>
        <Sentence>
            <Titlediv>1. 물멍, 불멍, 숲멍 테마가 준비되어 있어요.</Titlediv>
            <Contentdiv>취향에 맞는 테마를 선택해보세요.</Contentdiv>
            
            
            <Titlediv1>2.짧게 집중적인 휴식을 원한다면 15분 / 30분 시간 선택을 해주세요.</Titlediv1>
            <Contentdiv1>자동으로 멈출거에요 : &#41; <br/><br/>
            일이나 공부에 집중하기 위해 사용한다면, 무제한 버전을 사용해보세요.
            <br/><br/>자연의 소리가 여러분들의 마음을 안정시키고, 집중력을 올려줄거에요.


             </Contentdiv1>

            <Titlediv2>3. 다양한 소리를 조절해서 들을 수 있어요.</Titlediv2>
            <Contentdiv2>나에게 딱 맞는 소리를 찾아보세요.</Contentdiv2>

                  <Titlediv3>4. 불안한 감정이나, 힘든 감정을 가지고만 있으면 더욱 커지기 마련이에요.</Titlediv3>
            <Contentdiv2>여러분들의 감정을 사람들과 나눠보세요.
                <br/><br/>
                실질적 조언이 필요하다면, 조언이 필요해요 게시판에,<br/><br/>
                그저 공감이 필요하다면, 공감이 필요해요 게시판에 글을 올려보세요.<br/><br/>
                물론 기쁜 일은 함께 나누면 배가 될거에요 :<br/><br/>
                여러분들의 감정에 맞는 생각을 기록하고 나눠보세요.<br/><br/>
                </Contentdiv2>


                  <Titlediv4>5. 여러분들만의 휴식 꿀팁이 있나요? </Titlediv4>
            <Contentdiv2>나만의 휴식 꿀팁을 나누며, 나에게 더욱 잘 맞는 휴식 방법을 찾아보세요.
                <br/><br/>
</Contentdiv2>

          

            
</Sentence>
<MyLine/>
<RestLink to = '/'>지금 바로 쉬러가기</RestLink>

</Partdiv>
</ParentContainer>
</div>
    </>
)
}

export default UsingHomePage;