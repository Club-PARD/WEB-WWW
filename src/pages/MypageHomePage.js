import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { getDocs, getDoc, collection, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import ReactModal from 'react-modal';

const MypageHome = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closePost = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Add this line
  };
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Add this line
  };
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
                  post.comments.push({ docId: commentDoc.id, ...commentDoc.data() });
                  // 여기서 설정한 docId가 중요
                  // comment의 id를  docId로 문서id로 바꿔야 
                  // 삭제 가능
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
  const handleDeleteComment = async (postId, commentId) => {
    try {
      const post = userPosts.find((post) => post.id === postId);
      if (!post) return;

      const commentRef = doc(
        dbService,
        `emotions/${post.emotionId}/situations/${post.situationId}/posts/${postId}/comments/${commentId}`
      );

      await deleteDoc(commentRef);

      setUserPosts((prevPosts) =>
        prevPosts.map((prevPost) => {
          if (prevPost.id === postId) {
            return {
              ...prevPost,
              comments: prevPost.comments.filter(
                (comment) => comment.docId !== commentId
              ),
            };
          }
          return prevPost;
        })
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
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
            <div onClick={() => handlePostClick(post)}>
              {/* Render post title */}
              <h2>{post.title}</h2>
            </div>

            {selectedPost && selectedPost.id === post.id && (
              <>
                <ReactModal
                  isOpen={isModalOpen}
                  onRequestClose={closePost}
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',

                    },
                    content: {
                      color: 'black',
                      backgroundColor: 'white',
                      margin: '0 auto',
                      width: '50%',
                      height: '80%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflowY: 'scroll'
                      //모달 내용이 부모 요소의 높이를 초과하면 자동으로 스크롤 바를 생성하도록 설정합니다. "overflowY: 'auto'"가 그 역할을 담당합니다.

                      // 또한, 모달의 높이(height)를 조정하여 모달의 내용이 충분하지 않을 경우 모달 자체의 높이를 줄일 수 있습니다. 
                    }
                  }}
                >
                  {editingPostId === post.id ? (
                    <div
                      style={{
                        height: '100%',
                        overflowY: 'auto', // Added to enable vertical scrollbar
                      }}>
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
                    <div
                      style={{
                        height: '100%',
                        overflowY: 'auto', // Added to enable vertical scrollbar
                      }}>
                      <h1>{post.title}</h1>
                      <h2>{post.content}</h2>
                      <h3>Emotion: {post.emotion.emotion}</h3>
                      <h3>Situation: {post.situation.situation}</h3>
                      <h3>Likes: {post.likes}</h3>
                      {post.comments.map((comment) => (
                        <div key={comment.docId}>
                          <p>{comment.content}</p>
                          <p>{comment.docId}</p>
                          {user && user.displayName === comment.username && (
                            <button
                              onClick={() =>
                                handleDeleteComment(post.id, comment.docId)
                                //항상 문서 삭제하려면 문서의 id로 변경 문서 docId
                                //comments컬렉션 삭제시 comments컬렉션의 문서 id로 변경하고 실행                
                              }
                            >
                              Delete Comment
                            </button>
                          )}
                        </div>
                      ))}
                      {user && user.displayName === post.name && (
                        <div>
                          <button onClick={() => handleEditPost(post.id)}>Edit</button>
                          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </div>
                      )}
                    </div>

                  )}
                </ReactModal>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MypageHome;