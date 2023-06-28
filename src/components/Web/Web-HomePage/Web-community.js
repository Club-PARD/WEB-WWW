import { deleteDoc,getDoc,getDocs, collection, addDoc, serverTimestamp, updateDoc, doc  } from "firebase/firestore";
import { dbService } from "../../../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";
import ReactModal from 'react-modal';
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import searchModule from "../../../Assets/img/icon-search-mono.png";



const ParentContainer = styled.div`
  overflow-y: auto;
  height: 100vh;
  background: #ececec;
`;
const Partdiv= styled.div`
  background: #ececec;
  width: 100%;
  
  min-height: 100vh; // Use min-height instead of height
  display: flex;
  flex-direction: column;
  align-items: center;


`

const FirstDiv= styled.div`
display: flex;
width: 602px;
margin-top: 80px;
`

const Rest= styled.div`

color: #323338;
text-align: center;
font-size: 36px;
font-family: NanumSquare Neo variable;
font-weight: 100;
line-height: 140%;
`
const Search = styled.input`
  display: flex;
  width: 290px;
  padding: 8px 6px;
  align-items: center;
  margin-left: 90px;
  margin-top: 9px;
  border-radius: 5px;
  background: var(--text-field, #D9D9D9) url(${searchModule}) no-repeat 95% center;
  border: none;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  color: #8B95A1;
  text-align: left;
  font-size: 12px;
  font-family: NanumSquare Neo variable;
  font-weight: 100;
  line-height: 140%;
`;

const Whitebox= styled.div`
border:none;
display: flex;
width: 602px;
height: 48px;
padding: 6px 0px 8px 30px;
align-items: center;
gap: 273px;
flex-shrink: 0;
border-radius: 5px;
border: 1px solid #D9D9D9;
background: var(--main-white, #F2F2F2);
margin-top: 24px;
box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);




`
const Whiteboxpost= styled.div`
border:none;
display: flex;
width: 602px;
height: 48px;
padding: 6px 0px 8px 0px;
align-items: center;

flex-shrink: 0;
border-radius: 5px;
border: 1px solid #D9D9D9;
background: var(--main-white, #F2F2F2);
margin-top: 24px;
box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);




`
const Buttonwriting= styled(Link)`
display: flex;
padding: 8px;
justify-content: flex-end;
align-items: center;
gap: 8px;
border-radius: 10px;
background: #C38447;
border: none;
color: var(--main-white, #F2F2F2);
text-align: center;
font-size: 16px;
font-family: NanumSquare Neo variable;
font-weight: 500;
line-height: 140%;
text-decoration: none;

`
const Selectbox=styled.div`

display: flex;
margin-top: 10px;

`
const Selectbox1=styled.div`

display: flex;
margin-top: 10px;
margin-right: 57px;
`
const ems = [
  { emotion: '슬픔', emoji: '😭' },
  { emotion: '걱정', emoji: '🤔' },
  { emotion: '힘듦', emoji: '🤯' },
  { emotion: '우울', emoji: '😮‍💨' },
  { emotion: '불안', emoji: '🤨' },
  { emotion: '화남', emoji: '😡' },
];

const sit = [
  { situation: '조언이 필요해요', emoji: '💭' },
  { situation: '공감이 필요해요', emoji: '😭' },
  { situation: '공유해요', emoji: '📢' },

];

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [emotions, setEmotions] = useState([]);
  const [situations, setSituations] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState(null);
  //const sit = ["조언이 필요해요", "공감이 필요해요", "공유해요"];
  //const ems= ["슬픔","걱정","힘듦","우울", "불안", "화남"];
  //const sit = ["조언이 필요해요", "공감이 필요해요", "공유해요"];
  //const ems = ["슬픔","걱정","힘듦","우울", "불안", "화남"];
  const [user, setUsers] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUsers(currentUser);
    });
  }, []);

  const deleteComment = async (emotionId, situationId, postId, commentId) => {
    const commentRef = doc(
      dbService,
      `emotions/${emotionId}/situations/${situationId}/posts/${postId}/comments/${commentId}`
    );
  
    try {
      // Firestore delete first
      await deleteDoc(commentRef);
      console.log("Comment deleted successfully");
  
      // Then update the state
      let newPosts = [...posts];
      for (let post of newPosts) {
        if (
          post.grandParentId === emotionId &&
          post.parentId === situationId &&
          post.id === postId
        ) {
          post.comments = post.comments.filter((comment) => comment.docId !== commentId);
        }
      }
  
      // Then update the state once
      setPosts(newPosts);
  
      // 삭제 완료 알림
      //alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };
  
  
  
  

  const getComments = async (emotionId, situationId, postId) => {
    const commentsSnapshot = await getDocs(
      collection(
        dbService,
        `emotions/${emotionId}/situations/${situationId}/posts/${postId}/comments`
      )
    );
    const commentsData = commentsSnapshot.docs.map((doc) => ({
      docId: doc.id, // 변경된 부분: docId로 문서 ID를 할당합니다.
      ...doc.data(),
    }));
    commentsData.sort((a, b) => b.created_at.seconds - a.created_at.seconds);
    return commentsData;
  };
  
  const addComment = async (e, emotionId, situationId, postId) => {
    e.preventDefault();
  
    const newComment = {
      id: postId + Date.now(), // 시간 적으로 차이를 줘야 각각 삭제 가능
      content: comments[postId],
      created_at: serverTimestamp(),
      userId: user.uid,
      username: user.displayName,
    };
  
    try {
      // Firestore update first
      const commentRef = await addDoc(
        collection(
          dbService,
          `emotions/${emotionId}/situations/${situationId}/posts/${postId}/comments`
        ),
        newComment
      );
  
      newComment.docId = commentRef.id; // Get the document ID from the reference
  
      // Then update state
      const updatedPosts = posts.map((post) => {
        if (
          post.grandParentId === emotionId &&
          post.parentId === situationId &&
          post.id === postId
        ) {
          return {
            ...post,
            comments: [ newComment,...post.comments],
            //댓글 최신에 단게 가장 위로
          };
        }
        return post;
      });
  
      setPosts(updatedPosts);
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
            comments: [], // Initialize with an empty array
            likedUsers: doc.data().likedUsers || [] // Initialize likedUsers with an empty array if it doesn't exist
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
   // 날짜 기준으로 정렬합니다.
   postsData.sort((a, b) => b.created_at.seconds - a.created_at.seconds);
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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleLikeClick = async (emotionId, situationId, postId) => {
    const postRef = doc(dbService, `emotions/${emotionId}/situations/${situationId}/posts/${postId}`);
    const postSnapshot = await getDoc(postRef);
    const currentLikes = postSnapshot.data().likes || 0;
    const likedUsers = postSnapshot.data().likedUsers || [];
  
    let updatedLikes = currentLikes;
    let updatedLikedUsers = [...likedUsers];
  
    if (likedUsers.includes(user.uid)) {
      updatedLikes -= 1;
      updatedLikedUsers = updatedLikedUsers.filter(userId => userId !== user.uid);
    } else {
      updatedLikes += 1;
      updatedLikedUsers.push(user.uid);
    }
  
    const updatedPosts = posts.map((post) => {
      if (post.grandParentId === emotionId && post.parentId === situationId && post.id === postId) {
        return {
          ...post,
          likes: updatedLikes,
          likedUsers: updatedLikedUsers
        };
      }
      return post;
    });
  
    setPosts(updatedPosts);
  
    await updateDoc(postRef, {
      likes: updatedLikes,
      likedUsers: updatedLikedUsers
    });
  };
  

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(selectedEmotion === emotion ? null : emotion);
  };

  const handleSituationClick = (situation) => {
    setSelectedSituation(selectedSituation === situation ? null : situation);
  };

  const handleShowAll = () => {
    setSelectedEmotion(null);
    setSelectedSituation(null);
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
  
    if (searchQuery) {
      const title = post.title.toLowerCase();
      const query = searchQuery.toLowerCase();
      return title.includes(query);
    }
  
    return true;
  });
  
  const getCommentCount = (postId) => {
    const post = filteredPosts.find((p) => p.id === postId);
    if (post) {
      return post.comments.length;
    }
    return 0;
  };
console.log(filteredPosts);
  return (<ParentContainer>
    <Partdiv>
      <FirstDiv>
        <div>
      <Rest>쉼터</Rest>
      </div>
      <>
      <Search type="text" value={searchQuery} placeholder="검색어를 입력하세요" onChange={handleSearchChange} />

      
  
       </>
       </FirstDiv>
 
       <Whitebox>
        <div style={{color:"#323338", textAlign:"center",
        fontSize:"16px", fontFamily:" NanumSquare Neo variable;",
        fontWeight:"100", lineHeight:"140%"
      
      }}>어떤 이야기를 나누고 싶나요?</div>
      <Buttonwriting to='/Writing'>
     
        기록하기
        
      </Buttonwriting>

       </Whitebox>
           <Selectbox1 >
           <div style={{marginRight: "15px", display: "flex"}}>
  <label htmlFor="situation-select" style={{color: "black"}}>게시판 선택하기  </label>
  <p style={{color: "#FF7C64", lineHeight: "0px", marginTop: "9px", marginLeft: "4px"}}>*</p>
</div>
        <div>
        {sit.map((situation, index) => (
            <button 
              key={index} 
              onClick={() => handleSituationClick(situation.situation)}
              style={{
                display:"inline-flex",
                padding:"6px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #C38447",
                gap:"6px",
                borderRadius:"7px",
                backgroundColor: selectedSituation === situation.situation ? '#C38447' : 'rgba(255, 255, 255, 0)',  // Selected situation turns blue
                color: selectedSituation === situation.situation ? 'white' : '#C38447',  // Color changes for readability
              }}
            >
              {situation.situation}{situation.emoji}
            </button>
          ))}
          
        </div>
        </Selectbox1>
      <Selectbox>
      <div style={{marginRight: "15px", display: "flex"}}>
  <label htmlFor="situation-select" style={{color: "black"}}>감정 선택하기 </label>
  <p style={{color: "#FF7C64", lineHeight: "0px", marginTop: "9px", marginLeft: "4px"}}>*</p>
</div>


        <div>
          <button onClick={handleShowAll}>전체 보기</button>
          {ems.map((emotion, index) => (
            <button 
              key={index} 
              onClick={() => handleEmotionClick(emotion.emotion)}
              style={{
                display:"inline-flex",
                padding:"6px",
                justifyContent:"center",
                alignItems:"center",
                marginRight:"15px",
                border:"1px solid #C38447",
                gap:"6px",
                borderRadius:"7px",
                backgroundColor: selectedEmotion === emotion.emotion ? '#C38447' : 'rgba(255, 255, 255, 0)',  // Selected emotion turns blue
                color: selectedEmotion === emotion.emotion ? 'white' : '#C38447',  // Color changes for readability
              }}
            >
            { emotion.emotion}{emotion.emoji}
            </button>
          ))}
        </div>
      </Selectbox>
     
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
<Whiteboxpost>       
       <div onClick={() => handlePostClick(post)}>
              {/* Render post title */}
              <h2>{post.title}</h2>
              {emotion && <p>Emotion: {emotion.emotion}</p>}
                              {situation && <p>Situation: {situation.situation}</p>}
            </div>
            <div

  style={{
    backgroundColor: post.likedUsers && post.likedUsers.includes(user.uid) ? "blue" : "white",
    color: post.likedUsers && post.likedUsers.includes(user.uid) ? "white" : "black",
  }}
>
Like
</div>
<div>
{post.likes}
</div>
                <div>{getCommentCount(post.id)}</div>

            </Whiteboxpost>


            {selectedPost && selectedPost.id === post.id && (
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
<div
              style={{
                height: '100%',
                overflowY: 'auto', // Added to enable vertical scrollbar
              }}>
                              {emotion && <p>Emotion: {emotion.emotion}</p>}
              {situation && <p>Situation: {situation.situation}</p>}
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.comments.map((comment) => (
  <div key={comment.docId}> {/* 변경된 부분: comment.docId로 변경 */}
    <p>{comment.content}</p>
    {user && comment.userId === user.uid && (
      <button onClick={() => deleteComment(post.grandParentId, post.parentId, post.id, comment.docId)}> {/* 변경된 부분: comment.docId로 변경 */}
        Delete
      </button>
    )}
  </div>
))}

           
            <p>Likes: {post.likes}</p>
            {user && (<>
              <button
  onClick={() => handleLikeClick(post.grandParentId, post.parentId, post.id)}
  style={{
    backgroundColor: post.likedUsers && post.likedUsers.includes(user.uid) ? "blue" : "white",
    color: post.likedUsers && post.likedUsers.includes(user.uid) ? "white" : "black",
  }}
>
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
          </ReactModal>)}
          </div>
         
       



        );
      })}
   
    </Partdiv>
    </ParentContainer>
  );
};

export default Community; 