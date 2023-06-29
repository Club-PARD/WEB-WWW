import React, { useState } from "react";
import { dbService } from "../fbase";
import { addDoc, Timestamp, collection } from "firebase/firestore";
import { styled } from "styled-components";
import Arrow from "../Assets/img/Arrow.png";

const emotions = [
  { emotion: '슬픔', emoji: '😭' },
  { emotion: '걱정', emoji: '🤔' },
  { emotion: '힘듦', emoji: '🤯' },
  { emotion: '우울', emoji: '😮‍💨' },
  { emotion: '불안', emoji: '🤨' },
  { emotion: '화남', emoji: '😡' },
];



const situations = [
  { situation: '조언이 필요해요', emoji: '💭' },
  { situation: '공감이 필요해요', emoji: '😭' },
  { situation: '공유해요', emoji: '📢' },
];

const Input = styled.input`
width: 720px;
padding: 8px;
margin-top: 20px;
margin-left: 40px;
gap: 8px;
border-radius: 10px;
border: 1px solid var(--text-field, #D9D9D9);
background: var(--text-field, #D9D9D9);
text-align:center;
`

const Textarea = styled.textarea`
width: 720px;
height: 336px;
padding: 8px;
gap: 8px;
border-radius: 10px;
border: 1px solid var(--text-field, #D9D9D9);
background: var(--text-field, #D9D9D9);
margin-left: 40px;
margin-top: 31px;
resize: none;//textarea 크기 조절 금지
`

const InputWriting = styled.input`
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
margin-left: 696px;
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
  background: #C5C5C5;
  position: relative; /* Add this line */
  z-index: 999;
`;
const Partdiv = styled.div`
  background: #C5C5C5;
  width: 100%;
  
  min-height: 100vh; // Use min-height instead of height
  display: flex;
  flex-direction: column;
  align-items: center;


`

const Form = styled.form`
width: 800px;
height: 714px;
flex-shrink: 0;
border-radius: 10px;
border: 1px solid var(--text-field, #D9D9D9);
background: var(--main-white, #F2F2F2);
margin-top: 68px;

`
const Selectbox = styled.div`

display: flex;
margin-top: 20px;
margin-left: 57px;

`
const Selectbox1 = styled.div`

display: flex;
margin-top: 30px;
margin-left: 57px;
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

const Writing = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSituation, setSelectedSituation] = useState(situations[0]);
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);
  const [hoveredSituation, setHoveredSituation] = useState(null);
  const [hoveredEmotion, setHoveredEmotion] = useState(null);

  const handleChange1 = (event) => {
    if (event.target.value.length <= 10) { // Only set the new title if it's 10 characters or less
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

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <ParentContainer>
      <Partdiv>

        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex" }}>
            <Arrowed onClick={handleGoBack}><img  style={{width:'20px',
height:'20px'}} src={Arrow} /></Arrowed>
            <div style={{ marginLeft: "40%", marginTop: "30px" }}>기록하기</div>
          </div>
          <Selectbox1 >
            <div style={{ marginRight: "10px", display: "flex" }}>
              <label htmlFor="situation-select" style={{ color: "black" }}>게시판 선택하기  </label>
              <p style={{ color: "#FF7C64", lineHeight: "0px", marginTop: "9px", marginLeft: "4px" }}>*</p>
            </div>
            <div>
              {situations.map((situation, index) => (
                <Situationbox
                  key={index}
                  onMouseEnter={() => setHoveredSituation(situation)}
                  onMouseLeave={() => setHoveredSituation(null)}
                  onClick={() => setSelectedSituation(situation)}
                  style={{
display: "inline-flex",
                    padding: "6px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "15px",
                    border: "1px solid #323338",
                    gap: "6px",
                    borderRadius: "7px",
                    backgroundColor: hoveredSituation === situation ? '#323338' : (selectedSituation === situation ? '#323338' : 'rgba(255, 255, 255, 0)'),
                    color: hoveredSituation === situation ? 'white' : (selectedSituation === situation ? 'white' : '#323338'), 
                  }}
                >
                  {situation.situation}{situation.emoji}
                </Situationbox>
              ))}

            </div>
          </Selectbox1>
          <Selectbox>
            <div style={{ marginRight: "20px", display: "flex" }}>
              <label htmlFor="situation-select" style={{ color: "black" }}>감정 선택하기 </label>
              <p style={{ color: "#FF7C64", lineHeight: "0px", marginTop: "9px", marginLeft: "4px" }}>*</p>
            </div>

            <div>
              {emotions.map((emotion, index) => (
                <EmotionBox 
  key={index} 
  onClick={() => setSelectedEmotion(emotion)} 
  onMouseEnter={() => setHoveredEmotion(emotion)}
  onMouseLeave={() => setHoveredEmotion(null)}
  style={{
    display: "inline-flex",
    padding: "6px",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15px",
    border: "1px solid #323338",
    gap: "6px",
    borderRadius: "7px",
    backgroundColor: hoveredEmotion === emotion ? '#323338' : (selectedEmotion === emotion ? '#323338' : 'rgba(255, 255, 255, 0)'),
    color: hoveredEmotion === emotion ? 'white' : (selectedEmotion === emotion ? 'white' : '#323338'), 
  }}
>
  {emotion.emotion}{emotion.emoji}
</EmotionBox>

              ))}
            </div>
          </Selectbox>

          <Input
            onChange={handleChange1}
            value={title}
            type="text"
            maxLength={10}
            placeholder="What's on your mind?"
          />

          <Textarea
            onChange={handleChange2}
            value={content}
            maxLength={200}
            placeholder="What's on your mind?"
          />

          <InputWriting type="submit" value="posts" />
        </Form>
      </Partdiv>
    </ParentContainer>
  );
};

export default Writing;