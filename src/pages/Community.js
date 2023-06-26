import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { dbService } from "../fbase";

const Community = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [emotions, setEmotions] = useState([]);
  const [situations, setSituations] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState(null);
  const sit = ["1", "2", "3", "4", "5", "6"];
  const ems = ["화남", "우울", "짜증"];

  const getComments = async (emotionId, situationId, postId) => {
    const commentsSnapshot = await getDocs(
      collection(
        dbService,
        `emotions/${emotionId}/situations/${situationId}/posts/${postId}/comments`
      )
    );

    const commentsData = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return commentsData;
  };

  const addComment = async (e, emotionId, situationId, postId) => {
    e.preventDefault();

    try {
      const newComment = {
        content: comments[postId],
        created_at: serverTimestamp(),
      };

      const updatedPosts = posts.map((post) => {
        if (
          post.grandParentId === emotionId &&
          post.parentId === situationId &&
          post.id === postId
        ) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      });

      setPosts(updatedPosts);

      await addDoc(
        collection(
          dbService,
          `emotions/${emotionId}/situations/${situationId}/posts/${postId}/comments`
        ),
        newComment
      );

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const emotionSnapshot = await getDocs(collection(dbService, "emotions"));
      const emotionsData = emotionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setEmotions(emotionsData);
  
      const postsData = [];
  
      for (const emotionDoc of emotionSnapshot.docs) {
        const situationSnapshot = await getDocs(
          collection(
            dbService,
            `emotions/${emotionDoc.id}/situations`
          )
        );
  
        const situationsData = situationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setSituations((prevSituations) => [
          ...prevSituations,
          ...situationsData,
        ]);
  
        for (const situationDoc of situationSnapshot.docs) {
          const postSnapshot = await getDocs(
            collection(
              dbService,
              `emotions/${emotionDoc.id}/situations/${situationDoc.id}/posts`
            )
          );
  
          const posts = postSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            parentId: situationDoc.id,
            grandParentId: emotionDoc.id,
            comments: [] // Initialize with an empty array
          }));
  
          for (const post of posts) {
            const comments = await getComments(
              post.grandParentId,
              post.parentId,
              post.id
            );
  
            post.comments = comments;
          }
  
          postsData.push(...posts);
        }
      }
  
      setPosts(postsData);
    };
  
    fetchPosts();
  }, []);
  

  const handleCommentChange = (postId, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  const handleEmotionChange = (event) => {
    const selectedEmotionId = event.target.value;
    setSelectedEmotion(selectedEmotionId);
  };
  
  const handleSituationChange = (event) => {
    const selectedSituationId = event.target.value;
    setSelectedSituation(selectedSituationId);
  };
  
  
  const filteredPosts = posts.filter((post) => {
    const emotion = emotions.find((emotion) => emotion.id === post.grandParentId);
    const situation = situations.find((situation) => situation.id === post.parentId);
    
    if (
      (selectedEmotion && emotion.emotion !== selectedEmotion) ||
      (selectedSituation && situation.situation !== selectedSituation)
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div>
        <div>
          <label htmlFor="emotion-select">Emotion:</label>
        </div>
        <div>
          <select id="emotion-select" onChange={handleEmotionChange}>
            <option value="">Select Emotion</option>
            {ems.map((emotion, index) => (
              <option key={index} value={emotion}>
                {emotion}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="situation-select">Situation:</label>
        </div>
        <div>
          <select id="situation-select" onChange={handleSituationChange}>
            <option value="">Select Situation</option>
            {sit.map((situation, index) => (
              <option key={index} value={situation}>
                {situation}
              </option>
            ))}
          </select>
        </div>
      </div>
      { 
      
      filteredPosts.map((post) => {
        const emotion = emotions.find((emotion) => emotion.id === post.grandParentId);
        const situation = situations.find((situation) => situation.id === post.parentId);
        
        if (
          (selectedEmotion && emotion.emotion !== selectedEmotion) ||
          (selectedSituation && situation.situation !== selectedSituation)
        ) {
          return null;
        }
        return (
          <div key={post.id}>
            <div>
              {emotion && <p>Emotion: {emotion.emotion}</p>}
              {situation && <p>Situation: {situation.situation}</p>}
            </div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <ul>
              {post.comments.map((comment) => (
                <div key={comment.id}>
                  <li>{comment.content}</li>
                </div>
              ))}
            </ul>
            {user && (
              <form onSubmit={(e) => addComment(e, post.grandParentId, post.parentId, post.id)}>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comments[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button type="submit">Post</button>
              </form>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Community;
