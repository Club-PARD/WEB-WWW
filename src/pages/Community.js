import React, { useEffect, useState } from "react";
import { getDoc,getDocs, collection, addDoc, serverTimestamp, updateDoc, doc  } from "firebase/firestore";
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
  const handleLikeClick = async (emotionId, situationId, postId) => {
    const postRef = doc(
        dbService,
        `emotions/${emotionId}/situations/${situationId}/posts/${postId}`
    );
    const postSnapshot = await getDoc(postRef);
    const currentLikes = postSnapshot.data().likes || 0; // If 'likes' is undefined, set it to 0

    // Update the local posts state
    const updatedPosts = posts.map((post) => {
        if (
            post.grandParentId === emotionId &&
            post.parentId === situationId &&
            post.id === postId
        ) {
            return {
                ...post,
                likes: currentLikes + 1,
            };
        }
        return post;
    });

    setPosts(updatedPosts);

    // Update Firestore
    await updateDoc(postRef, {
        likes: currentLikes + 1
    });
};
// 수정된 감정 클릭 핸들러
const handleEmotionClick = (emotion) => {
  setSelectedEmotion(selectedEmotion === emotion ? null : emotion);
};

// 수정된 상황 클릭 핸들러
const handleSituationClick = (situation) => {
  setSelectedSituation(selectedSituation === situation ? null : situation);
};

// 전체 보기 핸들러
const handleShowAll = () => {
  setSelectedEmotion(null);
  setSelectedSituation(null);
};


  return (
    <>
             <div>
        <div>
          <label htmlFor="emotion-select">Emotion:</label>
        </div>
        <div>
          {ems.map((emotion, index) => (
            <button 
              key={index} 
              onClick={() => handleEmotionClick(emotion)}
              style={{
                backgroundColor: selectedEmotion === emotion ? 'blue' : 'white',  // Selected emotion turns blue
                color: selectedEmotion === emotion ? 'white' : 'black',  // Color changes for readability
              }}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="situation-select">Situation:</label>
        </div>
        <div>
          <button onClick={handleShowAll}>전체 보기</button>
          {sit.map((situation, index) => (
            <button 
              key={index} 
              onClick={() => handleSituationClick(situation)}
              style={{
                backgroundColor: selectedSituation === situation ? 'blue' : 'white',  // Selected situation turns blue
                color: selectedSituation === situation ? 'white' : 'black',  // Color changes for readability
              }}
            >
              {situation}
            </button>
          ))}
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
            <p>Likes: {post.likes}</p>
            {user && (<>
                          <button onClick={() => handleLikeClick(post.grandParentId, post.parentId, post.id)}>
                          Like
                        </button>
              <form onSubmit={(e) => addComment(e, post.grandParentId, post.parentId, post.id)}>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comments[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button type="submit">Post</button>
              </form>
              </>)}
          </div>
        );
      })}
    </>
  );
};

export default Community;
