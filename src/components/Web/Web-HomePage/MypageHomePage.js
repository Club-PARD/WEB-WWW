import React, { useEffect, useState } from "react";
import { dbService } from "../../../fbase";
import { getDocs, getDoc, collection, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import ReactModal from 'react-modal';
import { styled } from "styled-components";
import Noheart from "../../../Assets/img/Noheart.png";
import Communication from "../../../Assets/img/Communication.png";
import RedHeart from "../../../Assets/img/RedHeart.png";
import sand from "../../../Assets/img/Sand.png";
const ParentContainer = styled.div`
   overflow-y: auto;
  height: 100vh;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${sand}), lightgray;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Partdiv= styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${sand}), lightgray;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;



`
const Mytitle = styled.div`
color: var(--text, #F2F2F2);

font-size: 60px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;
line-height: 140%;
width:800px;
height:50px;
margin-left: 0px;
margin-top: 108px;

`

const MyGrowth = styled.div`
color: var(--text, #F2F2F2);
width:500px;
height:50px;
font-size: 30px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: -300px;
margin-top: 108px;

`

const Growthdiv = styled.div`
//display:flex;
width: 802px;
height: 434px;
border-radius: 15px;
border: 2px solid var(--text, #F2F2F2);
background: var(--text, #F2F2F2);
margin-left: 0px;
margin-top: 108px;
`

const Mypostcheck = styled.div`

color: var(--text, #f2f2f2);
width:500px;
height:50px;
font-size: 30px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: -300px;
margin-top: 108px;
margin-bottom: 40px;
`

const SitandEms =styled.div`
display: flex;
width:300px;
gap:5px;
margin-left: 150px;
margin-top: 50px;



`
const Title= styled.div`
cursor:pointer;
width: 340px;
margin-left: 30px;
color: #F2F2F2;
font-size: 20px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;
//line-height: 140%;
margin-top : 7px;
`
const LikeandComment =styled.div`
display: flex;
margin-left: 24px;
margin-top: 30px;

`

const Whiteboxpost= styled.div`
 
border:none;
display: flex;
flex-direction: row;
width: 800px;
height: 104px;
padding: 6px 0px 8px 0px;
align-items: center;

flex-shrink: 0;
border-radius: 5px;
border: 1px solid #D9D9D9;

margin-bottom:18px;
margin-left: -20px;
box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);




`

const WhiteDispost= styled.div`
display: flex;
width:770px;
height: 40.76px;
padding: 18.4px 39px;
flex-shrink: 0;
border-radius: 13px;
border: 1.3px solid var(--text-field, #D9D9D9);
background: var(--main-white, #F2F2F2);
`

const Titlepost= styled.div`

width: 360px;
margin-left: -15px;
color: var(--text, #323338);
font-size: 24px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;
line-height: 140%;



`

const SitandEmspost =styled.div`
display: flex;
width:300px;
gap:10px;
margin-left: 0px;


`

const LikeandCommentpost =styled.div`
display: flex;
margin-right: 30px;

`

const WhitePostContent = styled.div`
display: flex;
flex-direction: column;
width:770px;
height: 480.277px;
padding: 18.4px 39px;
margin-top: 37px;
flex-shrink: 0;
border-radius: 13px;
border: 1.3px solid var(--text-field, #D9D9D9);
background: var(--main-white, #F2F2F2);
`


const WhiteCommentPost = styled.div`
//width:770px;
margin-top: 10px;
height: 403.119px;
border-radius: 13px;
border: 1.3px solid var(--text-field, #D9D9D9);
background: var(--main-white, #F2F2F2);
overflow-y: auto;
overflow-x: hidden;
`
const Commenttitle =styled.div`
color: var(--text, #323338);
font-size: 26px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: 30px;
margin-top: 23px;

`

const Contentbox= styled.div`
color: #000;
font-size: 16px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;


width: 770px;
height: 350px;




`

const LikeDivpost =styled.div`
width:50px;
display: flex;
margin-left: -27px;
margin-top: 340px;

`
const ImgPost =styled.div`
width:50px;
display: flex;
margin-top: 333px;
`
const CommentForm = styled.form`

display: flex;
width: 100%;

`
const Commentcommentbox= styled.div`
width:800px;
margin-left: 39px;
color: #000;
font-size: 17.6px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 500;
line-height: 140%;
display: flex;
margin-top: 10px;
`
const CommentLenght = styled.div`
width: 660px;

`
const Anony= styled.div`
margin-top: 30px;
color: var(--text, #323338);
font-size: 20.2px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: 30px;
`
const Claim = styled.div`
margin-left: 600px;
margin-top: 340px;
cursor: pointer;
text-decoration:none;
&:hover{
  text-decoration-line: underline;
}
`
const CommentDelete= styled.button`
width: 50px;
border:none;
color: #000;
text-align: center;
font-size: 14px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
text-decoration:none;
cursor:pointer;
margin-left: 50px;
margin-top: 10px;


`
const MypageHome = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCommentCount = (postId) => {
    const post = userPosts.find((p) => p.id === postId);
    if (post) {
      return post.comments.length;
    }
    return 0;
  };
  const getEmoji = (emotion) => {
    switch(emotion) {
      case '슬픔':
        return '😭';
      case '불안':
        return '🤨';
      case '걱정':
          return '😀';
      case '힘듦':
            return '🤯';
      case '우울':
              return '😮‍💨';
      case '화남':
                return '😡';
      default:
        return '';
    }
  };

  const getsituaion = (situaion ) => {
    switch(situaion ) {
      case '조언이 필요해요':
        return '💭';
      case '공감이 필요해요':
        return '😭';
      case '공유해요':
          return '📢';

      default:
        return '';
    }
  };
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
    <ParentContainer>
      <Partdiv>

        <Mytitle>

       마이페이지
        </Mytitle>

        <MyGrowth>
          {user.displayName}님의 쉼 성장 그래프
        </MyGrowth>

        <Growthdiv>
          aa

        </Growthdiv>


        <Mypostcheck>          
        {user.displayName}님의 최근 글 작성목록

        </Mypostcheck>


        {userPosts.map((post) => (

          <div key={post.id}>

<Whiteboxpost>       
<div style={{display:"flex", flexDirection:"column"}}>       
       <Title onClick={() => handlePostClick(post)}>
              {/* Render post title */}
              {post.title}
              </Title>
              <LikeandComment>
                              <button
      
      style={{
        border: "none",
        background:"rgba(0,0,0,0)",

       marginTop:"5px"
      }}
    >
      {post.likedUsers && post.likedUsers.includes(user.uid) ? (
        <img style={{ width: "20px", height: "20px" }} src={RedHeart} alt="Red Heart" />
      ) : (
        <img style={{ width: "20px", height: "20px" }} src={Noheart} alt="No Heart" />
      )}
    </button>
    
 
    <div     style={{
        border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"5px",
        color:"#F2F2F2"
      }}>
{post.likes}
</div>
<img  style={{width:"20px", height:"20px",border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"7px", 
        marginLeft:"16px"}} src={Communication}/>
<div style={{
        border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"5px",
        marginLeft:"7px",
        color:"#F2F2F2"
      }}>{getCommentCount(post.id)}</div>
</LikeandComment>
</div>
         <SitandEms>
         {post.situation.situation && <div style={{
                display:"inline-flex",
                padding:"5px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #F2F2F2",
               height:'30px',
              marginTop:"5px",
                borderRadius:"7px",
                backgroundColor: '#F2F2F2',
                color:  '#323338' 
              }}> {post.situation.situation} {getsituaion(post.situation.situation)}</div>}
              {post.emotion.emotion  && <div               style={{
                display:"inline-flex",
                padding:"4px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"10px",
                border:"1px solid #F2F2F2",
               height:'30px',
              marginTop:"6px",
                borderRadius:"6px",
                backgroundColor: '#F2F2F2',
                color:  '#323338' 
              }}>{post.emotion.emotion } {getEmoji(post.emotion.emotion )}</div>}



                              </SitandEms>
                              
                


            </Whiteboxpost>


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
                              backgroundColor: '#D9D9D9',
                              margin: '0 auto',

                             width: '1000px',
                              height: '90%',
                              display: 'flex',
                           
                              alignItems: 'center',
                              overflowY: 'hidden',
                              borderRadius:"13px",
                              display:"flex",
                              flexDirection:"column",
                              overflowY: 'auto'
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
                        <WhiteDispost>
                <Titlepost onClick={() => handlePostClick(post)}>
              {/* Render post title */}
             {post.title}
              </Titlepost>

         <SitandEmspost>
              {post.emotion.emotion && <div               style={{
                display:"inline-flex",
                padding:"4px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #323338",
               height:'30px',
              marginTop:"-2px",
                borderRadius:"6px",
                backgroundColor: '#323338',
                color:  'white' 
              }}>{post.emotion.emotion} {getEmoji(post.emotion.emotion)}</div>}
                              {post.situation.situation && <div style={{
                display:"inline-flex",
                padding:"5px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #323338",
             
               height:'30px',
              marginTop:"-2px",
                borderRadius:"7px",
                backgroundColor: '#323338',
                color:  'white' 
              }}> {post.situation.situation} {getsituaion(post.situation.situation)} 
              </div>}
                              </SitandEmspost>
                              <LikeandCommentpost>
                              <button
      
      style={{
        border: "none",
        backgroundColor: " #F2F2F2",
        marginTop:"5px"
      }}
    >
      {post.likedUsers && post.likedUsers.includes(user.uid) ? (
        <img style={{ width: "28px", height: "27px" }} src={RedHeart} alt="Red Heart" />
      ) : (
        <img style={{ width: "28px", height: "27px" }} src={Noheart} alt="No Heart" />
      )}
    </button>
    
 
<div     style={{
        border: "none",
        backgroundColor: " #F2F2F2",
        marginTop:"8px",
        fontSize:"20px"
      }}>
{post.likes}
</div>
<img  style={{width:"28px", height:"27px",border: "none",
        backgroundColor: " #F2F2F2",
        marginTop:"8px", 
        marginLeft:"16px"}} src={Communication}/>
<div style={{
        border: "none",
        backgroundColor: " #F2F2F2",
        marginTop:"8px",
        marginLeft:"7px",
        fontSize:"20px"
      }}>{getCommentCount(post.id)}</div>
</LikeandCommentpost>

                </WhiteDispost>
                <WhitePostContent>
                <Contentbox>{post.content}</Contentbox>
                <div style={{display:"flex"}}>
                                  <LikeDivpost>
                                  <button 


style={{
  width: "28px", height: "28px",
  border: "none"
 // backgroundColor: post.likedUsers && post.likedUsers.includes(user.uid) ? "white" : "white",
}}
>      {post.likedUsers && post.likedUsers.includes(user.uid) ? (
        <img style={{ width: "28px", height: "28px" }} src={RedHeart} alt="Red Heart" />
      ) : (
        <img style={{ width: "28px", height: "28px" }} src={Noheart} alt="No Heart" />
      )}

</button>

    <div     style={{
        border: "none",
        backgroundColor: " #F2F2F2",
        marginLeft:"10px",
        fontSize:"20px"
      }}>
{post.likes}
</div>
</LikeDivpost>
<ImgPost>
    <img  style={{width:"28px", height:"27px",border: "none",
        backgroundColor: " #F2F2F2",
        marginTop:"8px", 
        marginLeft:"30px"}} src={Communication}/>
<div style={{
        border: "none",
        backgroundColor: " #F2F2F2",
        marginTop:"8px",
        marginLeft:"7px",
        fontSize:"20px"
      }}>{getCommentCount(post.id)}</div>
      </ImgPost>
      <Claim onClick={(e)=>{
        e.preventDefault();
        alert("힝 속았징~~?>< 꼬우면 전화 하든 둥 시불 010-7440-8352 - 조민 - ")

      }}>신고하기</Claim>

      </div>

                </WhitePostContent>



                <WhiteCommentPost>
                  <Commenttitle>댓글</Commenttitle>

{post.comments.map((comment) => (
  <>
  <Anony>익명</Anony>

  <Commentcommentbox key={comment.docId}> {/* 변경된 부분: comment.docId로 변경 */}
    
   <CommentLenght> {comment.content}</CommentLenght>
   {user && comment.userId === user.uid && (
      <CommentDelete onClick={() => handleDeleteComment(post.id, comment.docId)}> {/* 변경된 부분: comment.docId로 변경 */}
        삭제
      </CommentDelete>
    )}



    </Commentcommentbox>
    

    </>
  
))}

                </WhiteCommentPost>
                {user && user.displayName === post.name && (
                  <div>
                    <button onClick={() => handleEditPost(post.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </button>
                  </div>
                )}
                    </div>

                  )}
                </ReactModal>
              </>
            )}
          </div>
        ))}
      </Partdiv>
    </ParentContainer>
  );
};

export default MypageHome;