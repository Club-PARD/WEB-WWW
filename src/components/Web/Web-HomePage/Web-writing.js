import React, { useState } from "react";
import { dbService } from "../../../fbase";
import {
  addDoc,
  Timestamp,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";
import sand from "../../../Assets/img/Sea.png";

import Logo from "../../../Assets/img/Logowhite.png";
import { Link } from "react-router-dom";

const emotions = [
  { emotion: "슬픔", emoji: "😭" },
  { emotion: "힘듦", emoji: "🤯" },
  { emotion: "걱정", emoji: "🤔" },
  { emotion: "불안", emoji: "🤨" },
  { emotion: "우울", emoji: "😮‍💨" },
  { emotion: "화남", emoji: "😡" },
  { emotion: "행복", emoji: "🥰" },
  { emotion: "기쁨", emoji: "😄" },
  { emotion: "설렘", emoji: "😆" },
  { emotion: "감사", emoji: "😮‍💨" },
  { emotion: "뿌듯", emoji: "😙" },
  { emotion: "신남", emoji: "🥳" },
];

const situations = [
  { situation: "조언이 필요해요", emoji: "💭" },
  { situation: "공감이 필요해요", emoji: "😭" },
  { situation: "공유해요", emoji: "📢" },
];

const Input = styled.input`
  width: 720px;
  padding: 8px;
  margin-top: 20px;
  margin-left: 40px;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid var(--text-field, #d9d9d9);
  background: #d9d9d9;
`;

const Textarea = styled.textarea`
  width: 720px;
  height: 336px;
  padding: 8px;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid var(--text-field, #d9d9d9);
  background: #d9d9d9;
  margin-left: 40px;
  margin-top: 31px;
  resize: none; //textarea 크기 조절 금지
`;
const InputWriting = styled.input`
  width: 137px;
  height: 38px;
  padding: 8px;
  gap: 8px;
  border-radius: 10px;
  background: var(--disabled, #a7a7a7);
  color: var(--main-white, #f2f2f2);
  text-align: center;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-weight: 800;
  line-height: 140%;
  border: none;
  margin-left: 100px;
  margin-top: 31px;
  cursor: pointer;
  &:hover {
    background: #4880ee;
    color: #f2f2f2;
  }
`;
const InputWriting1 = styled.input`
  width: 137px;
  height: 38px;
  padding: 8px;
  gap: 8px;
  border-radius: 10px;
  background: var(--disabled, #a7a7a7);
  color: var(--main-white, #f2f2f2);
  text-align: center;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-weight: 800;
  line-height: 140%;
  border: none;
  margin-left: 210px;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: var(--main-white, #f2f2f2);
  }
`;
const ParentContainer = styled.div`
  overflow-y: auto;
  height: 100vh;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  margin: 0 auto;
  //linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${sand}), lightgray;
  position: relative; /* Add this line */
  z-index: 999;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Partdiv = styled.div`
  background: rgba(255, 255, 255, 0.01) url(${sand});
  //linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${sand}), lightgray;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Form = styled.form`
  width: 800px;
  height: 900px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--text-field, #17171b);
  background: #17171b;
  margin-top: 68px;
`;
const Bigtitle = styled.div`
  color: var(--main-white, #f2f2f2);
  text-align: center;
  font-size: 24px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  color: #f2f2f2;

  margin-top: 30px;
`;
const Smalltitle = styled.div`
  color: var(--main-white, #f2f2f2);
  text-align: center;
  font-size: 12px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
const Selectbox = styled.div`
  display: flex;
  width: 700px;
  height: 150px;
  margin-top: 20px;
  margin-left: 57px;
  flex-direction: column;
`;
const ChooseEmo = styled.div`
  width: 130px;
  color: var(--main-white, #f2f2f2);
  text-align: center;
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-left: -20px;
`;
const Selectbox1 = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 57px;
  flex-direction: column;
`;

const Choosesitu = styled.div`
  color: #d9d9d9;
  text-align: center;
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-left: -20px;
`;
const Arrowed = styled.button`
  margin-left: 20px;
  cursor: pointer;
  margin-top: 20px;
  background: var(--main-white, #f2f2f2);
  border: none;
`;
const EmotionBox = styled.div`
  cursor: pointer;

  &:hover {
    background-color: #323338;
    color: white;
  }
`;

const Situationbox = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #323338;
    color: white;
  }
`;

const Writinghome = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSituation, setSelectedSituation] = useState(situations[0]);
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);
  const [hoveredSituation, setHoveredSituation] = useState(null);
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const navigate = useNavigate();
  const handleChange1 = (event) => {
    if (event.target.value.length <= 14) {
      // Only set the new title if it's 10 characters or less
      setTitle(event.target.value);
    }
  };

  const handleChange2 = (event) => {
    if (event.target.value.length <= 200) {
      // Only set the new content if it's 200 characters or less
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
        created_at: serverTimestamp(),
      });

      const situationRef = await addDoc(
        collection(dbService, `emotions/${emotionRef.id}/situations`),
        {
          name: user.displayName,
          uid: user.uid,
          situation: selectedSituation.situation,
          created_at: serverTimestamp(),
        }
      );

      await addDoc(
        collection(
          dbService,
          `emotions/${emotionRef.id}/situations/${situationRef.id}/posts`
        ),
        {
          title: title,
          name: user.displayName,
          uid: user.uid,
          content: content,
          created_at: serverTimestamp(),
        }
      );

      // Reset the form after submit
      setTitle("");
      setContent("");
      setSelectedSituation(situations[0]);
      setSelectedEmotion(emotions[0]);

      // Redirect to '/Community' after successful submission
      navigate("/Community");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleGoBack = (event) => {
    event.stopPropagation(); // stop event from bubbling up
    event.preventDefault(); // stop the default action (submitting the form)
    window.history.back();
  };

  const getColorByEmotion = (emotion) => {
    switch (emotion) {
      case "행복":
      case "설렘":
      case "기쁨":
      case "뿌듯":
      case "감사":
      case "신남":
        return "#4880EE"; // 파란색
      case "슬픔":
      case "힘듦":
      case "걱정":
      case "불안":
      case "우울":
      case "화남":
        return "#DD5257"; // 빨간색
      default:
        return "#000000"; // 기본 검은색
    }
  };
  return (
    <ParentContainer>
      <Partdiv>
        <Link to="/">
          <img
            style={{
              marginLeft: "-930px",
              marginTop: "20px",
              width: "165px",
              height: "47px",
            }}
            src={Logo}
          />
        </Link>

        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Bigtitle>
              <div className="Barun-Gothic-font">기록하기</div>
            </Bigtitle>
            <Smalltitle style={{ marginTop: "5px", color: "#f2f2f2" }}>
              {" "}
              <div className="Barun-Gothic-font">
                게시판을 선택하고, 익명으로 공유하고 싶은 감정을 1가지씩
                선택해주세요.
              </div>
            </Smalltitle>
          </div>
          <Selectbox1>
            <Choosesitu
              style={{ marginRight: "0px", color: "#f2f2f2", display: "flex" }}
            >
              <div className="Barun-Gothic-font">게시판 선택하기</div>
            </Choosesitu>
            <div style={{ marginLeft: "-40px", marginTop: "20px" }}>
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
                    border:
                      hoveredSituation === situation
                        ? "1px solid #5BC184"
                        : selectedSituation === situation
                        ? "1px solid #5BC184"
                        : "1px solid #A7A7A7",
                    gap: "6px",
                    borderRadius: "7px",
                    backgroundColor:
                      hoveredSituation === situation
                        ? "rgba(0, 0, 0, 0)"
                        : selectedSituation === situation
                        ? "rgba(0, 0, 0, 0)"
                        : "rgba(0, 0, 0, 0)",
                    color:
                      hoveredSituation === situation
                        ? "#5BC184"
                        : selectedSituation === situation
                        ? "#5BC184"
                        : "#A7A7A7",
                  }}
                >
                  {situation.situation}
                </Situationbox>
              ))}
            </div>
          </Selectbox1>
          <Selectbox>
            <ChooseEmo style={{ display: "flex", width: "130px" }}>
              <div className="Barun-Gothic-font">감정 선택하기</div>
            </ChooseEmo>

            <div
              style={{ width: "800px", marginLeft: "-40px", marginTop: "20px" }}
            >
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
                    marginBottom: "15px",
                    border:
                      hoveredEmotion === emotion
                        ? `1px solid ${getColorByEmotion(emotion.emotion)}`
                        : selectedEmotion === emotion
                        ? `1px solid ${getColorByEmotion(emotion.emotion)}`
                        : "1px solid #A7A7A7",

                    gap: "10px",
                    borderRadius: "7px",
                    backgroundColor:
                      hoveredEmotion === emotion
                        ? "rgba(0, 0, 0, 0)"
                        : selectedEmotion === emotion
                        ? "rgba(0, 0, 0, 0)"
                        : "rgba(0, 0, 0, 0)",
                    color:
                      hoveredEmotion === emotion
                        ? getColorByEmotion(emotion.emotion)
                        : selectedEmotion === emotion
                        ? getColorByEmotion(emotion.emotion)
                        : "#A7A7A7",
                  }}
                >
                  {emotion.emotion}
                </EmotionBox>
              ))}
            </div>
          </Selectbox>

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
          <div style={{ display: "flex" }}>
            <InputWriting1
              onClick={(event) => handleGoBack(event)}
              type="submit"
              value="취소하기"
            />
            <InputWriting type="submit" value="기록하기" />
          </div>
        </Form>
      </Partdiv>
    </ParentContainer>
  );
};

export default Writinghome;
