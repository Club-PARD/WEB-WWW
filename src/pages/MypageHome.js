import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { getDocs, getDoc, collection, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

const MypageHome = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (user) {
          // Get all emotions
          const emotionsSnapshot = await getDocs(collection(dbService, "emotions"));
          let posts = [];

          for (const emotionDoc of emotionsSnapshot.docs) {
            const emotionId = emotionDoc.id;

            // Get all situations for each emotion
            const situationsSnapshot = await getDocs(collection(dbService, `emotions/${emotionId}/situations`));

            for (const situationDoc of situationsSnapshot.docs) {
              const situationId = situationDoc.id;

              // Get posts for each situation where user.displayName is the same
              const postsQuery = query(
                collection(dbService, `emotions/${emotionId}/situations/${situationId}/posts`),
                where("name", "==", user.displayName),
                orderBy("created_at", "desc")
              );

              const postsSnapshot = await getDocs(postsQuery);

              for (const postDoc of postsSnapshot.docs) {
                let post = {
                  id: postDoc.id,
                  ...postDoc.data(),
                  emotion: emotionDoc.data(),
                  emotionId: emotionDoc.id,
                  situation: situationDoc.data(),
                  situationId: situationDoc.id,
                  comments: []
                };

                // Get comments for each post
                const commentsQuery = query(
                  collection(dbService, `emotions/${emotionId}/situations/${situationId}/posts/${postDoc.id}/comments`)
                );
                const commentsSnapshot = await getDocs(commentsQuery);

                commentsSnapshot.forEach((commentDoc) => {
                  post.comments.push({ id: commentDoc.id, ...commentDoc.data() });
                });

                posts.push(post);
              }
            }
          }

          setUserPosts(posts);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    getPosts();
  }, [user]);

  const handleEditPost = async (postId) => {
    try {
      const postToUpdate = userPosts.find((post) => post.id === postId);
      if (!postToUpdate) return;

      setEditingPostId(postId);
      setEditedTitle(postToUpdate.title);
      setEditedContent(postToUpdate.content);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };
  const handleSaveEdit = async () => {
    try {
      const postToUpdate = userPosts.find((post) => post.id === editingPostId);
      if (!postToUpdate) return;
  
      const postRef = doc(
        dbService, 
        `emotions/${postToUpdate.emotionId}/situations/${postToUpdate.situationId}/posts/${editingPostId}`
      );
  
      const postDoc = await getDoc(postRef);
  
      if (!postDoc.exists()) {
        console.error("Post does not exist.");
        return;
      }
  
      await updateDoc(postRef, {
        title: editedTitle,
        content: editedContent
      });
  
      setUserPosts((prevPosts) =>
        prevPosts.map((prevPost) =>
          prevPost.id === editingPostId ? { ...prevPost, title: editedTitle, content: editedContent } : prevPost
        )
      );
  
      setEditingPostId(null);
      setEditedTitle("");
      setEditedContent("");
    } catch (error) {
      console.error("Error saving post edit:", error);
    }
  };
  
  
  

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedTitle("");
    setEditedContent("");
  };

  const handleDeletePost = async (postId) => {
    try {
      const postToDelete = userPosts.find((post) => post.id === postId);
      if (!postToDelete) return;
  
      const postRef = doc(
        dbService, 
        `emotions/${postToDelete.emotionId}/situations/${postToDelete.situationId}/posts/${postId}`
      );
  
      await deleteDoc(postRef);
  
      setUserPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {userPosts.map((post) => (
          <div key={post.id}>
            {editingPostId === post.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <h1>{post.title}</h1>
                <h2>{post.content}</h2>
                <h3>Emotion: {post.emotion.emotion}</h3>
                <h3>Situation: {post.situation.situation}</h3>
                <h3>Likes: {post.likes}</h3>
                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.content}</p>
                  </div>
                ))}
                {user && user.displayName === post.name && (
                  <div>
                    <button onClick={() => handleEditPost(post.id)}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MypageHome;



