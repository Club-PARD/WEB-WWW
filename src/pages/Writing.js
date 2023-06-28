import React, { useState } from "react";
import { dbService } from "../fbase";
import { addDoc, Timestamp, collection } from "firebase/firestore";

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

const Writing = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSituation, setSelectedSituation] = useState(situations[0]);
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);

  const onSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          {emotions.map((emotion, index) => (
            <div
              key={index}
              onClick={() => setSelectedEmotion(emotion)}
              style={{
                display: 'inline-block',
                margin: '5px',
                padding: '10px',
                backgroundColor: selectedEmotion === emotion ? 'blue' : 'white',
                color: selectedEmotion === emotion ? 'white' : 'black',
                borderRadius: '25px',
                cursor: 'pointer',
              }}
            >
              {emotion.emotion} {emotion.emoji}
            </div>
          ))}
        </div>

        <div>
          {situations.map((situation, index) => (
            <div
              key={index}
              onClick={() => setSelectedSituation(situation)}
              style={{
                display: 'inline-block',
                margin: '5px',
                padding: '10px',
                backgroundColor: selectedSituation === situation ? 'blue' : 'white',
                color: selectedSituation === situation ? 'white' : 'black',
                borderRadius: '25px',
                cursor: 'pointer',
              }}
            >
              {situation.situation} {situation.emoji}
            </div>
          ))}
        </div>

        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="What's on your mind?"
          maxLength={300}
        />
        <input type="submit" value="posts" />
      </form>
    </>
  );
};

export default Writing;
