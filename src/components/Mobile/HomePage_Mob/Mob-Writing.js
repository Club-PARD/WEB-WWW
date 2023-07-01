import React, { useState,useRef } from "react";
import { dbService } from "../../../fbase";
import { addDoc, Timestamp, collection } from "firebase/firestore";
import { styled } from "styled-components";

import { useNavigate } from 'react-router-dom';
import sand from "../../../Assets/img/Sandblur.png";

import Logo from "../../../Assets/img/Logowhite.png";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


  
const emotions = [
  { emotion: '슬픔', emoji: '😭' },
  { emotion: '힘듦', emoji: '🤯' },
  { emotion: '걱정', emoji: '🤔' },
  { emotion: '불안', emoji: '🤨' },
  { emotion: '우울', emoji: '😮‍💨' },
  { emotion: '화남', emoji: '😡' },
  { emotion: '행복', emoji: '🥰' },
  { emotion: '기쁨', emoji: '😄' },
  { emotion: '설렘', emoji: '😆' },
  { emotion: '감사', emoji: '😮‍💨' },
  { emotion: '뿌듯', emoji: '😙' },
  { emotion: '신남', emoji: '🥳' },
];



const situations = [
  { situation: '조언이 필요해요', emoji: '💭' },
  { situation: '공감이 필요해요', emoji: '😭' },
  { situation: '공유해요', emoji: '📢' },
];

const Input = styled.input`

width: 340px;
padding:8px 8px 6px 10px;

margin-top: 10px;
margin-left: 5px;

border-radius: 10px;
border: 1px solid var(--text-field, #D9D9D9);
background: #D9D9D9;


`

const Textarea = styled.textarea`


width: 340px;
height: 296px;
padding: 6px;

border-radius: 10px;
border: 1px solid var(--text-field, #D9D9D9);
background: #D9D9D9;
margin-left: 8px;
margin-top: 31px;
resize: none;//textarea 크기 조절 금지

`
const InputWriting = styled.input`
width: 137px;
height: 38px;
padding: 8px;
gap: 8px;
border-radius: 10px;
background: var(--disabled, #A7A7A7);
color: var(--main-white, #F2F2F2);
text-align: center;
font-size: 16px;
font-family: NanumBarunGothic;
font-weight: 800;
line-height: 140%;
border: none;
margin-left: 50px;
margin-top: 30px;
cursor:pointer;
&:hover{
  background-color:black;
color: var(--main-white, #F2F2F2);
};
`
const InputWriting1 = styled.input`
width: 137px;
height: 38px;
padding: 8px;
gap: 8px;
border-radius: 10px;
background: var(--disabled, #A7A7A7);
color: var(--main-white, #F2F2F2);
text-align: center;
font-size: 16px;
font-family: NanumBarunGothic;
font-weight: 800;
line-height: 140%;
border: none;
margin-left: 20px;
margin-top: 30px;
cursor:pointer;
&:hover{
  background-color:black;
color: var(--main-white, #F2F2F2);
};
`
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

const Form = styled.form`
width: 370px;
height: 500px;

border-radius: 10px;

background: rgba(0,0,0,0);
margin-top: 30px;

`
const Selectbox = styled.div`

display: flex;
width:320px;
height: 50px;
margin-top: 20px;
margin-left: -60px;


`
const Selectbox1 = styled.div`

display: flex;
margin-top: 30px;
margin-left: 0px;
`
const Arrowed = styled.button`

margin-left:20px;
cursor: pointer;
margin-top: 20px;
background: var(--main-white, #F2F2F2);
border:none;
`
const EmotionBox = styled.div`

  cursor: pointer;
  
  
  &:hover{
    background-color: #323338;
    color:white;
  }
`;

const Situationbox= styled.div`


  cursor:pointer;
  &:hover{
    background-color: #323338;
    color:white;
  }
`
const Writingdiv=styled.div`

color: #FFF;
margin-left: -230px;
margin-top: 30px;
font-size: 32px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
`

const Choosesituation=styled.div`

color: #FFF;
margin-left: -230px;
margin-top: 30px;
color: #FFF;

font-size: 16px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
`


const Chooseemotion=styled.div`

color: #FFF;
margin-left: -240px;
margin-top: 30px;
color: #FFF;

font-size: 16px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
`
const MobWriting = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSituation, setSelectedSituation] = useState(situations[0]);
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);
  const [hoveredSituation, setHoveredSituation] = useState(null);
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const navigate = useNavigate();
  const sliderRef = useRef();
  const handleChange1 = (event) => {
    if (event.target.value.length <= 14) { // Only set the new title if it's 10 characters or less
      setTitle(event.target.value);
    }
};

const handleChange2 = (event) => {
    if (event.target.value.length <= 200) { // Only set the new content if it's 200 characters or less
      setContent(event.target.value);
    }
};



  const onSubmit = async (e) => {
   e.preventDefault();
      // Do not proceed if title and content are empty
  if (!title.trim() && !content.trim()) {
    return;
  }

    try {
      const emotionRef = await addDoc(collection(dbService, "emotions"), {
        name: user.displayName,
        uid: user.uid,
        emotion: selectedEmotion.emotion,
        created_at: Timestamp.now(),
      });

      const situationRef = await addDoc(collection(dbService, `emotions/${emotionRef.id}/situations`), {
        name: user.displayName,
        uid: user.uid,
        situation: selectedSituation.situation,
        created_at: Timestamp.now(),
      });

      await addDoc(collection(dbService, `emotions/${emotionRef.id}/situations/${situationRef.id}/posts`), {
        title: title,
        name: user.displayName,
        uid: user.uid,
        content: content,
        created_at: Timestamp.now(),
      });

      // Reset the form after submit
      setTitle("");
      setContent("");
      setSelectedSituation(situations[0]);
      setSelectedEmotion(emotions[0]);

 // Redirect to '/Community' after successful submission
 navigate('/Community');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleGoBack = (event) => {
    event.stopPropagation(); // stop event from bubbling up
    event.preventDefault(); // stop the default action (submitting the form)
    window.history.back();
  };
  
  function SlideItem({ emotion, selectedEmotion }) {
    const [hoveredEmotion, setHoveredEmotion] = useState(null);
  
    return (
      <button 
        onClick={() => setSelectedEmotion(emotion)}
        onMouseEnter={() => setHoveredEmotion(emotion)}
        onMouseLeave={() => setHoveredEmotion(null)}
        style={{
          display:"inline-flex",
          cursor:"pointer",
          padding:"6px",
          justifyContent:"center",
          alignItems:"center",
          marginRight: "15px",
          marginBottom: "15px",
          border:"1px solid #F2F2F2",
          borderRadius:"7px",
          backgroundColor: hoveredEmotion === emotion ? '#323338' : (selectedEmotion === emotion ? '#323338' : 'rgba(0,0,0,0)'),
          color: hoveredEmotion === emotion ? '#F2F2F2' : (selectedEmotion === emotion ? '#F2F2F2' : ' #F2F2F2'), 
        }}
      >
        {emotion.emotion} {emotion.emoji}
      </button>
    );
  }
  const handleClick = () => {
    sliderRef.current.slickNext();
  };
  return (
    <ParentContainer>
      <Link to='/'><img style={{ marginLeft:"15px", width:"165px", height:"47px"}} src={Logo}/></Link>
      <Partdiv>
      <Writingdiv >기록하기</Writingdiv>
      <Choosesituation>게시판 선택하기</Choosesituation>
      <Selectbox1 >
            
            <div>
            {situations.map((situation, index) => (
            <div
             key={index} 
              onClick={() => setSelectedSituation(situation)}
              onMouseEnter={() => setHoveredSituation(situation)}
              onMouseLeave={() => setHoveredSituation(null)}
              style={{
                display:"inline-flex",
                padding:"3px",
                cursor:"pointer",
                fontSize:"13px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"10px",
                border:"1px solid #F2F2F2",
                gap:"6px",
                borderRadius:"7px",
                backgroundColor: hoveredSituation === situation ? '#323338' : (selectedSituation === situation ? '#323338' : 'rgba(0,0,0,0)'),
                color: hoveredSituation === situation ? '#F2F2F2' : (selectedSituation === situation ? '#F2F2F2' : ' #F2F2F2'), 
              }}
            >
              {situation.situation}{situation.emoji}
            </div>
           
          ))}
          

            </div>
          </Selectbox1>
          <Chooseemotion>감정 선택하기</Chooseemotion>
          <Selectbox>


        <div style={{width:"220px"}}>
        <Slider style={{marginLeft:"27px",marginTop:"10px",width:"310px"}} slidesToShow={4} slidesToScroll={6} arrows={false} onClick={handleClick}
  swipe={true} swipeToSlide={true}
>
  {emotions.map((emotion, index) => (
    <div key={index}>
      <SlideItem emotion={emotion} selectedEmotion={selectedEmotion} />
    </div>
  ))}
</Slider>
        </div>
      </Selectbox>
      <Form onSubmit={onSubmit}>         
       <Input
            onChange={handleChange1}
            value={title}
            type="text"
            maxLength={14}
            placeholder="14글자 이내로 작성해주세요"
          />

<Textarea
            onChange={handleChange2}
            value={content}
            maxLength={200}
            placeholder="200글자 이내로 작성해주세요"
          />
          <div style={{display:"flex"}}>          
            <InputWriting1  onClick={(event) => handleGoBack(event)} type="submit" value="취소하기" />
          <InputWriting type="submit" value="기록하기" />
          </div>
          </Form>


        
      </Partdiv>
    </ParentContainer>
  );
};

export default MobWriting;