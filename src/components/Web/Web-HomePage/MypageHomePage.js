import React, { useEffect, useState } from "react";
import { dbService } from "../../../fbase";
import { getDocs, getDoc, collection, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import ReactModal from 'react-modal';
import { styled } from "styled-components";
import Noheart from "../../../Assets/img/Noheart.png";
import Communication from "../../../Assets/img/communication1.png";
import Communicationwhite from "../../../Assets/img/Communication.png";
import RedHeart from "../../../Assets/img/RedHeart.png";
import sand from "../../../Assets/img/Sea.png";
import Logo from "../../../Assets/img/Logowhite.png";
import Commingsoon from "../../../Assets/img/commingsoonWeb.png";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../Assets/img/73711-loadingbar";
const LoadingAnimationWrapper = styled.div`
scale: 50%;
height:100vh;
`;
const emotions = [
  { emotion: '슬픔', emoji: '😭' },
  { emotion: '힘듦', emoji: '🤯' },
  { emotion: '걱정', emoji: '🤔' },
  { emotion: '불안', emoji: '🤨' },
  { emotion: '우울', emoji: '😮‍💨' },
  { emotion: '화남', emoji: '😡' },
  { emotion: '행복', emoji: '🥰' },
  { emotion: '기쁨', emoji: '😄' },
  { emotion: '설렘', emoji: '😆' },
  { emotion: '감사', emoji: '😮‍💨' },
  { emotion: '뿌듯', emoji: '😙' },
  { emotion: '신남', emoji: '🥳' },
];

const situations = [
  { situation: '조언이 필요해요', emoji: '💭' },
  { situation: '공감이 필요해요', emoji: '😭' },
  { situation: '공유해요', emoji: '📢' },
];
const ParentContainer = styled.div`
   overflow-y: auto;
  height: 100vh;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
`;
const Partdiv= styled.div`
background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
min-height: 100vh;
  //width:800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
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
padding-top: 40px;
padding-bottom: 40px;
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

margin-left: 0px;
margin-top: 108px;
`

const Growthphoto = styled.img`
//display:flex;
width: 802px;
height: 434px;
border-radius: 15px;



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
padding-top: 108px;
padding-bottom: 40px;
`

const SitandEms =styled.div`
display: flex;
width:300px;
margin-top: 20px;
gap:5px;


`
const Title= styled.div`

width: 300px;
padding-left: 15px;
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
margin-left: 12px;
margin-top: 20px;
`
const MyLLine= styled.div`
margin-left: -20px;
width: 800px;
background:#D9D9D9;
height:1px;
`
const Whiteboxpost= styled.div`
 cursor:pointer;
border:none;
display: flex;
flex-direction: column;
width: 800px;
height: 147px;
padding: 6px 0px 8px 0px;




border-bottom: 1px solid #D9D9D9;

margin-left: -20px;

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
width: 520px;
margin-left: -10px;
color: #f2f2f2;
font-size: 40px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-top: 40px;
`
const SitandEmspost =styled.div`
display: flex;
width:300px;
gap:10px;
margin-left: -20px;
`
const SitandEmspostmodi =styled.div`
display: flex;
flex-direction: column;
gap:10px;
margin-top: 100px;
`

const Modititle = styled.div`
width: 600px;
height: 60px;
color: #f2f2f2;
text-align: center;
font-size: 40px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
`

const Modiexplain = styled.div`
color: var(--main-white, #F2F2F2);
text-align: center;
font-size: 12px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;
line-height: 140%;
`
const ModiInput= styled.input`

margin-top: 50px;
font-size: 20px;
height:44px;
width: 720px;
padding: 8px;
border-radius: 10px;
border: 1px solid var(--text-field, #D9D9D9);
background:#D9D9D9;
`
const Moditextarea= styled.textarea`

resize: none;
font-size: 20px;
margin-top: 20px;
width: 720px;
height: 336px;
padding: 8px;
border-radius: 10px;
border: 1px solid var(--text-field, #D9D9D9);
background:#D9D9D9;
`
const Savebutton= styled.button `
margin-left: 20px;
border:none;
display: flex;
width: 200px;
height: 50px;
padding: 8px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 10px;
background: #A7A7A7;
color: #F2F2F2;
font-size: 20px;
cursor: pointer;
&:hover{
  background: #4880EE;
}
`
const Canclebutton= styled.button `
border:none;

display: flex;
width: 200px;
height: 50px;
padding: 8px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 10px;
background: var(--text, #a7a7a7);
color: #F2F2F2;
font-size: 20px;
cursor: pointer;

`
const WhitePostContent = styled.div`

display: flex;
flex-direction: column;
width:870px;
height: 580.277px;
padding: 18.4px 39px;
margin-top: 37px;
flex-shrink: 0;
border-radius: 13px;
border: 1.3px solid var(--text-field, #D9D9D9);
background: rgba(255, 255, 255, 0.01);
`
const WhiteCommentPost = styled.div`
//width:770px;
margin-top: 10px;
height: 403.119px;
border-radius: 13px;
border: 1.3px solid var(--text-field, #D9D9D9);
background: rgba(0, 0, 0,0);
overflow-y: auto;
overflow-x: hidden;
padding-bottom: 20px;
`
const Commenttitle =styled.div`
color: #f2f2f2;
font-size: 26px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: 40px;
margin-top: 23px;
`
const Contentbox= styled.div`
color: #f2f2f2;
font-size: 20px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;
padding-top: 40px;
margin: 3px;;
width: 770px;
height: 350px;
margin-left: -7px;
 word-wrap: break-word; /* if the word is too long, break it into multiple lines */
    overflow-wrap: break-word; /* same as word-wrap, but a newer version */

`
const LikeDivpost =styled.div`
width:50px;
display: flex;
margin-left: -10px;
margin-top: 200px;
background: rgba(0,0,0,0);
`
const ImgPost =styled.div`
width:50px;
display: flex;
margin-top: 192px;
`
const EditcommentG= styled.div`
margin-left: 602px;
margin-top: -30px;
cursor: pointer;
text-decoration:none;
color: #f2f2f2;
&:hover{
  text-decoration-line: underline;
}
`
const DeletecommentG= styled.div`
margin-left: 40px;
margin-top: -30px;
color:#f2f2f2;
cursor: pointer;
text-decoration:none;
&:hover{
  text-decoration-line: underline;
}
`
const Claim = styled.div`
color:#f2f2f2;
margin-left:610px;
margin-top: 202px;
cursor: pointer;
text-decoration:none;
&:hover{
  text-decoration-line: underline;
}
`
const Commentcommentbox= styled.div`
 position: relative;
width:780px;
margin-left: 37px;
color: #f2f2f2;
font-size: 17.6px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 500;
line-height: 140%;
display: flex;
margin-top: 10px;
border-radius: 13px;
flex-direction: column;
background:rgba(242, 242, 242, 0.10);

`
const CommentLenght = styled.div`
width: 660px;
margin-top: 10px;
padding-left: 10px;
margin-bottom: 2px;

`
const Anony= styled.div`
margin-top: 10px;
color: #f2f2f2;
font-size: 20.2px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: 10px;
`
const CommentDelete= styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
width: 50px;
height:20px;
border:none;
color: #f2f2f2;
text-align: center;
font-size: 14px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
text-decoration:none;
cursor:pointer;

margin-top: 10px;
background: rgba(0,0,0,0);
&:hover{
  text-decoration-line: underline;
}

`

const Inner = styled.div`
  padding: 0px 0px 0px;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  `
;
const MypageHome = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange1 = (event) => {
    if (event.target.value.length <= 14) { // Only set the new title if it's 10 characters or less
      setEditedTitle(event.target.value);
    }
};
console.log(user);
const handleChange2 = (event) => {
  if (event.target.value.length <= 200) { // Only set the new content if it's 200 characters or less
    setEditedContent(event.target.value);
  }
};
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
      case '행복':
                return '🥰';
      case '기쁨':
                return '😄';
      case '설렘':
                return '😆';
      case '감사':
                return '😮‍💨';
      case '뿌듯':
              return '😙';
      case '신남':
                return '🥳';
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
                });
                posts.push(post);
              }
            }
          }
          // Sort posts by created_at in descending order
          posts.sort((a, b) => b.created_at - a.created_at);
  
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
    return <LoadingAnimationWrapper>
    <Lottie
      options={{
        animationData: animationData,
        loop: true,
        autoplay: true,
      }}
    />
  </LoadingAnimationWrapper>;
  }
  // 이 함수는 감정 상태에 따라 글자 색상을 변경합니다.
  const getColorByEmotion = (emotion) => {
    switch(emotion) {
      case '행복':
      case '설렘':
      case '기쁨':
      case '뿌듯':
      case '감사':
      case '신남':
        return '#4880EE'; // 파란색
      case '슬픔':
      case '힘듦':
      case '걱정':
      case '불안':
      case '우울':
      case '화남':
        return '#DD5257'; // 빨간색
      default:
        return '#000000'; // 기본 검은색
    }
  }
  console.log(userPosts);
  return (
    <ParentContainer>
      <Inner>      


      <Partdiv>
      <Link to='/'><img style={{marginLeft:"-630px", marginTop:"20px",width:"165px", height:"47px"}} src={Logo}/></Link>

        <Mytitle>

       마이페이지
        </Mytitle>
        <MyGrowth>
          {user.displayName}님의 쉼 성장 그래프
        </MyGrowth>
        <Growthdiv>
         <Growthphoto src={Commingsoon} />
        </Growthdiv>
        <Mypostcheck>          
        {user.displayName}님의 최근 글 작성목록
        </Mypostcheck>
        <MyLLine/>
        {userPosts.map((post) => (
          <div key={post.id}>
            
<Whiteboxpost onClick={() => handlePostClick(post)}>       




       <Title>
              {/* Render post title */}
              {post.title}
              </Title>

<SitandEms>
         {post.situation.situation && <div style={{
                display:"inline-flex",
                padding:"5px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #5BC184",
               height:'30px',
              marginTop:"5px",
                borderRadius:"7px",
                backgroundColor: 'rgba(0,0,0,0)',
                color:  '#5BC184' 
              }}> {post.situation.situation} </div>}
              {post.emotion.emotion  && <div               style={{
                display:"inline-flex",
                padding:"5px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"10px",
                border:`1px solid ${getColorByEmotion(post.emotion.emotion )}`,
               height:'30px',
              marginTop:"6px",
                borderRadius:"6px",
                backgroundColor: "rgba(0,0,0,0)",
                color:  getColorByEmotion(post.emotion.emotion )
              }}>{post.emotion.emotion }</div>}
                              </SitandEms>


              <div style={{display:"flex"}}>
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
        marginLeft:"16px"}} src={Communicationwhite}/>
<div style={{
        border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"5px",
        marginLeft:"7px",
        color:"#F2F2F2"
      }}>{getCommentCount(post.id)}</div>
</LikeandComment>

</div>
                              
                
            </Whiteboxpost>
            {selectedPost && selectedPost.id === post.id && (
              <>
                          <ReactModal 
                          isOpen={isModalOpen}
                          onRequestClose={closePost} 
                          style={{
                            overlay: {
                              backgroundColor: 'rgba(0, 0, 0,0.5)',

                            
                            },
                            content: {
                              color: 'black',
                              background:  `#17171B`,
                              margin: '0 auto',
                              width: '1000px',
                              height: '90%',
                        
                              display: 'flex',
                              backgroundSize : 'cover',
                              backgroundRepeat : 'no-repeat',
                              alignItems: 'center',
                              borderRadius:"13px",
                              flexDirection:"column",
                              overflowX: 'hidden', // 가로 스크롤을 없애기 위한 속성입니다.
                              overflowY: 'auto' // 세로 스크롤을 활성화하기 위한 속성입니다.
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
                        display:'flex',
                        flexDirection:"column",
                        alignItems:"center"
                      }}>
                        <Modititle>수정하기</Modititle>
                        <Modiexplain> 게시판을 선택하고, 공유하고 싶은 감정을 선택해주세요.</Modiexplain>
                        <SitandEmspostmodi>
    <div style={{paddingLeft:"30px", display:"flex",width:"800px",height:"100px",flexDirection:"column" }}>

    <div style={{ width:"130px",color: "#f2f2f2"}}>
           현재 선택된 감정
              
            </div>
            <div style={{width:"750px",marginLeft:"-14px",marginTop:"20px"}}>
        {emotions.map(item => (
            <div 
                key={item.emotion}
                style={{
                  
                   
                    display:"inline-flex",
                    padding:"5px",
                    justifyContent:"center",
                    alignItems:"center",
                    marginLeft:"15px",
                    marginBottom:"15px",
                    border:post.emotion.emotion === item.emotion ? `1px solid ${getColorByEmotion(post.emotion.emotion )}` : "1px solid #A7A7A7",
                    height:'30px',
                    marginTop:"-2px",
                    borderRadius:"6px",
                    backgroundColor: post.emotion.emotion === item.emotion ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
                    color: post.emotion.emotion === item.emotion ? getColorByEmotion(post.emotion.emotion ) : '#A7A7A7' 
                }}
            >
                {item.emotion} 
            </div>
        ))}
        </div>
    </div>
    <div style={{paddingLeft:"30px",display:"flex",width:"200px",height:"130px",flexDirection:"column"}}>
    <div style={{ marginRight: "20px", display: "flex",color: "#f2f2f2" }}>
              현재 선택된 게시판
              
            </div>

            <div style={{width:"650px",marginLeft:"-14px",marginTop:"20px"}}>
        {situations.map(item => (
            <div
                key={item.situation}
                style={{
                    display:"inline-flex",
                    padding:"5px",
                    justifyContent:"center",
                    alignItems:"center",
                    marginLeft:"15px",
                    border:post.situation.situation === item.situation ? "1px solid #5BC184" : "1px solid #F2F2F2",
                    height:'30px',
                    marginTop:"-2px",
                    borderRadius:"7px",
                    backgroundColor: post.situation.situation === item.situation ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
                    color: post.situation.situation === item.situation ? '#5BC184' : '#F2F2F2' 
                }}
            >
                {item.situation} 
            </div>
        ))}
        </div>
    </div>
</SitandEmspostmodi>
                      <ModiInput
                                    onChange={handleChange1}
                                    value={editedTitle}
                                    type="text"
                                    maxLength={14}
                                    placeholder="14글자 이내로 작성해주세요"
                      
                      
                      />
                      <Moditextarea
                        type="text"
                        value={editedContent}
                     
                        onChange={handleChange2}
                   
                        maxLength={200}
                        placeholder="200글자 이내로 작성해주세요"
                      />
                      <div style={{display:"flex",marginTop:"30px" }}>
                      <Canclebutton onClick={handleCancelEdit}>취소하기</Canclebutton>
                      <Savebutton onClick={handleSaveEdit}>수정하기</Savebutton>
                      
                    </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        height: '100%',
                        overflowY: 'auto', // Added to enable vertical scrollbar
                      }}>
                <WhitePostContent>
                <SitandEmspost>
                {post.situation.situation && <div style={{
                display:"inline-flex",
                padding:"5px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #5BC184",
             
               height:'30px',
              marginTop:"-2px",
                borderRadius:"7px",
                backgroundColor: 'rgba(0,0,0,0)',
                color:  '#5BC184' 
              }}> {post.situation.situation}  
              </div>}
              {post.emotion.emotion && <div               style={{
                display:"inline-flex",
                padding:"6px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:`1px solid ${getColorByEmotion(post.emotion.emotion)}`,
               height:'30px',
              marginTop:"-2px",
                borderRadius:"6px",
                backgroundColor: 'rgba(0,0,0,0)',
                color: getColorByEmotion(post.emotion.emotion)
              }}>{post.emotion.emotion} </div>}
                              
       </SitandEmspost>
    
       <Titlepost>
              {/* Render post title */}
             {post.title}
              </Titlepost>
              {user && user.displayName === post.name && (
                     <div style={{display:"flex"}}>

                    <EditcommentG onClick={() => handleEditPost(post.id)}>
                      수정하기
                    </EditcommentG>
                    <DeletecommentG onClick={() => handleDeletePost(post.id)}>
                      삭제하기
                    </DeletecommentG>
                    </div>
              
                )}
                
                <Contentbox>{post.content}</Contentbox>
                <div style={{display:"flex"}}>
                                  <LikeDivpost>
                                  <button 
style={{
  width: "28px", height: "28px",
  border: "none",backgroundColor: " rgba(0, 0, 0,0)"
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
        backgroundColor: " rgba(0, 0, 0,0)",
        marginLeft:"10px",
        fontSize:"20px",
        color:"#F2F2F2",
      }}>
{post.likes}
</div>
</LikeDivpost>
<ImgPost>
    <img  style={{width:"28px", height:"27px",border: "none",
        backgroundColor: " rgba(0, 0, 0,0)",
        marginTop:"8px", 
        marginLeft:"30px"}} src={Communicationwhite}/>
<div style={{
        border: "none",
        backgroundColor: " rgba(0, 0, 0,0)",
        color:"#F2F2F2",
        marginTop:"8px",
        marginLeft:"7px",
        fontSize:"20px"
      }}>{getCommentCount(post.id)}</div>
      </ImgPost>

      <Claim onClick={(e)=>{
        e.preventDefault();
        alert("힝 속았징~~?>< 꼬우면 전화 하든 둥  010-7440-8352 - 조민 - ")
      }}>신고하기</Claim>

      </div>

                </WhitePostContent>
                <WhiteCommentPost>
                  <Commenttitle>댓글</Commenttitle>
{post.comments.map((comment) => (
  <>
<Commentcommentbox key={comment.docId}>
  <Anony>익명</Anony>
  <div style={{display:"flex", flexDirection:"column"}}>
    {comment.content.split('\n').map((line, index, array) => {
      return (
        <div style={{display:"flex", justifyContent:"space-between"}} key={index}>
          <CommentLenght>{line}</CommentLenght>
          {user && comment.userId === user.uid && index === array.length - 1 && (
            <CommentDelete onClick={() => handleDeleteComment(post.id, comment.docId)}>
              삭제
            </CommentDelete>
          )}
        </div>
      )
    })}
  </div>
</Commentcommentbox>


    
    </>
  
))}
                </WhiteCommentPost>
                    </div>
                  )}
                </ReactModal>
              </>
            )}
          </div>
        ))}

      </Partdiv>
      </Inner>
    </ParentContainer>
  );

};
export default MypageHome;