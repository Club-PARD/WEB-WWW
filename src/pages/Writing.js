import React, { useState } from "react";
import { dbService } from "../fbase";
import { addDoc, Timestamp, collection } from "firebase/firestore";

const situations = ["1", "2", "3", "4", "5", "6"];
const emotions = ["화남", "우울", "짜증"];

const Writing = ({ user, isCommentEnabled }) => {
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
        emotion: selectedEmotion,
        created_at: Timestamp.now(),
      });

      const situationRef = await addDoc(collection(dbService, `emotions/${emotionRef.id}/situations`), {
        name: user.displayName,
        uid: user.uid,
        situation: selectedSituation,
        created_at: Timestamp.now(),
      });

      await addDoc(collection(dbService, `emotions/${emotionRef.id}/situations/${situationRef.id}/posts`), {
        title: title,
        name: user.displayName,
        uid: user.uid,
        content: content,
        created_at: Timestamp.now(),
        isCommentEnabled: isCommentEnabled, // Add the isCommentEnabled field
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <select
          value={selectedEmotion}
          onChange={(e) => setSelectedEmotion(e.target.value)}
        >
          {emotions.map((emotion) => (
            <option key={emotion} value={emotion}>
              {emotion}
            </option>
          ))}
        </select>
        <select
          value={selectedSituation}
          onChange={(e) => setSelectedSituation(e.target.value)}
        >
          {situations.map((situation) => (
            <option key={situation} value={situation}>
              {situation}
            </option>
          ))}
        </select>

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
