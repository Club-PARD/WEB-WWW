import { deleteDoc,getDoc,getDocs, collection, addDoc, serverTimestamp, updateDoc, doc  } from "firebase/firestore";
import { dbService } from "../../../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect,useRef } from "react";
import ReactModal from 'react-modal';
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import searchModule from "../../../Assets/img/icon-search-mono.png";
import Noheart from "../../../Assets/img/Noheart.png";
import Communication from "../../../Assets/img/Communication.png";
import RedHeart from "../../../Assets/img/RedHeart.png";
import sand from "../../../Assets/img/Sandblur.png";
import Logo from "../../../Assets/img/Logowhite.png";
import communication1 from "../../../Assets/img/communication1.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Lottie from "react-lottie";
import animationData from "../../../Assets/img/118176-day-and-night-transition-scene";

const LoadingAnimationWrapper = styled.div`

`;
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






const FirstDiv= styled.div`
display: flex;
flex-direction: column;
width: 350px;
margin-top: 10px;
margin-right: 10px;
`

const Rest= styled.div`
width:58px;
color: #FFF;
text-align: center;
font-size: 32px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
`
const Search = styled.input`
  display: flex;
  width: 345px;
  padding: 8px 6px;
  align-items: center;
  margin-left: 0px;
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

const Whiteboxpost= styled.div`
 
border:none;
display: flex;
flex-direction: row;
width: 340px;
height: 60px;
padding: 6px 0px 8px 0px;
align-items: center;

flex-shrink: 0;
border-radius: 5px;
border: 1px solid #D9D9D9;

margin-top: 12px;
box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);




`

const SitandEms =styled.div`
display: flex;
width:300px;
gap:3px;
margin-left: 0px;
margin-top: 20px;



`
const SitandEmspost =styled.div`
display: flex;
width:300px;
gap:10px;
//margin-left: 250px;




`
const LikeandComment =styled.div`
display: flex;
margin-left: 3px;
margin-top: 0px;
`


const Claim = styled.div`
color: #f2f2f2;
margin-left: 20px;
margin-top: 110px;
cursor: pointer;
text-decoration:none;
&:hover{
  text-decoration-line: underline;
}
`



const Selectbox=styled.div`

height: 80px;
width:330px;
display: flex;
flex-direction: column;
margin-top: 10px;
margin-left: -28px;

`


const Selectbox1=styled.div`

display: flex;
flex-direction: column;
margin-top: 27px;
margin-left: 15px;
;
`
const ems = [
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


const sit = [
  { situation: '조언이 필요해요', emoji: '💭' },
  { situation: '공감이 필요해요', emoji: '😭' },
  { situation: '공유해요', emoji: '📢' },

];

const Title= styled.div`
cursor:pointer;
width: 175px;
margin-left: 5px;
color: #F2F2F2;
font-size: 14px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;
//line-height: 140%;
margin-top : 10px;
`
const Titlepost= styled.div`

width: 250px;

color: #f2f2f2;
font-size: 20px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-top: 40px;



`
const AllButton = styled.button`
 display: inline-flex;
 width:80px;
  padding: 8px 10px 10px 10px;
  justify-content: center;
  align-items: center;
   margin-top: 21px;
   margin-bottom: 21px;
  margin-left: 280px;
  border: 1px solid #F2F2F2;
  gap: 6px;
  border-radius: 7px;
  background-color:rgba(255, 255, 255, 0);
   cursor:pointer;
  color: #F2F2F2;

  &:hover {
    background-color:  #F2F2F2;
    color: black;
  }
`

const Mywriting= styled(Link)`
margin-top: 36px;
text-decoration: none;
width: 345px;
height: 38px;
font-size: 16px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 10px;
color:#F2F2F2;
border: 1px solid var(--text, #F2F2F2);
&:hover{
  color:black;
  background-color: white;

}
`

const WhitePostContent = styled.div`
display: flex;
flex-direction: column;
width:320px;
height: 340.277px;

margin-top: 17px;
flex-shrink: 0;
border-radius: 13px;
border: 1.3px solid var(--text-field, #D9D9D9);
background: rgba(0,0,0,0);
//margin-left: 220px;
`


const WhiteCommentPost = styled.div`
width:350px;
margin-top: 10px;
height: 403.119px;
border-radius: 13px;
margin-left: -10px;
background: rgba(0, 0, 0,0);
overflow-y: auto;
overflow-x: hidden;
`
const Commenttitle =styled.div`
color: #f2f2f2;
font-size: 16px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: 10px;
margin-top: 40px;

`

const Contentbox= styled.div`
color: #f2f2f2;
font-size: 16px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 400;

padding-top: 10px;
margin: 3px;;
width: 300px;
height: 350px;
margin-left: 10px;




`

const LikeDivpost =styled.div`
width:50px;
display: flex;
margin-left: 0px;
margin-top: 108px;
color: #f2f2f2;

`
const ImgPost =styled.div`
width:50px;
display: flex;
margin-top: 100px;
color: #f2f2f2;
`
const CommentForm = styled.form`

display: flex;
width: 100%;
background: rgba(0,0,0,0);
margin-top: 30px;

`
const Commentcommentbox= styled.div`
width:335px;
margin-left: 10px;
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
width: 300px;
margin-left: 10px;
margin-top: 8px;
margin-bottom: 2px;
font-size: 12px;

`
const Anony= styled.div`
margin-top: 10px;
color: #f2f2f2;
font-size: 12px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-left: 10px;
`
const CommentDelete= styled.button`
width: 50px;
border:none;
color: #f2f2f2;
text-align: center;
font-size: 12px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 300;
line-height: 140%;
text-decoration:none;
cursor:pointer;
margin-left: 20px;
margin-bottom: 0px;
background: rgba(0,0,0,0);
&:hover{
  text-decoration-line: underline;
}

` // 앞에서 div로 크게 묶은 거에서 margin을 거니까 댓글이 늘어나도
// 삭제 버튼의 위치가 거의 고정이다. 
// div안에 display flex하고 그 안에 가로 정렬 상태에서 div를 크게 하나 잡고
// 거기다 margin을 거니 삭제 버튼의 위치가 고정됨,
// div전체크기가 안에 divwidth랑 그 옆에 가로 정렬 된 div의 width와 margin -left나 right값을 합친거 보다 커야 됨

const CommentInput =styled.input`
margin-left: 16px;
color: #f2f2f2;
width:250px;
height: 32px;
padding-left:10px;

background: rgba(0,0,0,0);
//align-items: center;
border-radius: 13px;
border: 1.3px solid var(--text-field, #D9D9D9);

::placeholder {
    color: #f2f2f2; // 원하는 색상으로 변경하세요.
    opacity: 1;
  }
`
const CommentButton=styled.button`
border: none;
margin-left: 8px;
width: 59px;
height: 38px;
padding: 6px;
border-radius: 13px;
background: var(--text, #323338);
color: var(--main-white, #F2F2F2);
text-align: center;
font-size: 6px;
font-family: NanumBarunGothic;
font-style: normal;
font-weight: 600;
line-height: 140%;
cursor:pointer;
&:hover{
  background: #F2F2F2;
color:  #323338;
}
`
const Mobcommunity= () => {
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
  const [hoveredSituation, setHoveredSituation] = useState(null);
  //const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef();
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
            comments: [newComment, ...post.comments],
            //댓글 최신에 단게 가장 위로
            //comments: [newComment, ...post.comments],
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
          ...situationsData,   //이전에 데이타베이스에 있는 상황 감정들 다 더하는겨 이래야 로딩없이 빠르게 쌓임
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
      setLoading(false); // Set loading to false after posts are fetched

    }; // 이게 최신에 쓴 댓글이 위로 가게 함
   
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
  
    if (likedUsers.includes(user.uid)) {   //posts컬렉션안에 likes라는 필드값을 하나 더 만듬
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
    setSelectedEmotion(selectedEmotion === emotion ? null : emotion);   // 다른거 선택시에 기존꺼 선택 취소
  };

  const handleSituationClick = (situation) => {
    setSelectedSituation(selectedSituation === situation ? null : situation); // 다른거 선택시에 기존꺼 선택 취소
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
const handleClick = () => {
  sliderRef.current.slickNext();
};

function SlideItem({ emotion, selectedEmotion }) {
  const [hoveredEmotion, setHoveredEmotion] = useState(null);

  return (
    <button 
      onClick={() => handleEmotionClick(emotion.emotion)}
      onMouseEnter={() => setHoveredEmotion(emotion)}
      onMouseLeave={() => setHoveredEmotion(null)}
      style={{
        display:"inline-flex",
        cursor:"pointer",
        padding:"6px",
        justifyContent:"center",
        alignItems:"center",
        marginRight: "15px",
        marginBottom: "15px",
        border:"1px solid #F2F2F2",
        borderRadius:"7px",
        backgroundColor: hoveredEmotion === emotion ? '#F2F2F2' : (selectedEmotion === emotion.emotion ? '#F2F2F2' : 'rgba(0,0,0,0)'),
        color: hoveredEmotion === emotion ? '#323338' : (selectedEmotion === emotion.emotion ? '#323338' : ' #F2F2F2'), 
      }}
    >
      {emotion.emotion} {emotion.emoji}
    </button>
  );
}
  return (<ParentContainer>

    <Link to='/'><img style={{ marginLeft:"10px", width:"165px", height:"47px"}} src={Logo}/></Link>

    
    
    <Partdiv>
    
      <FirstDiv>
  
        <div>
      <Rest>쉼터</Rest>
      </div>
      <>
      <Search type="text" value={searchQuery} placeholder="제목을 입력하세요" onChange={handleSearchChange} />

      
  
       </>
       </FirstDiv>
 

       <Mywriting to='/Writing'>
       기록하러가기
       </Mywriting>
           <Selectbox1 >
           <div style={{marginLeft:"-15px"}}>
  <label htmlFor="situation-select" style={{fontSize:"19px" ,color: "#F2F2F2",marginTop:"7px" ,marginLeft: "0px"}}>게시판 선택하기  </label>
  
</div>
        <div style={{marginLeft:"-30px", marginTop:"10px"}}>
        {sit.map((situation, index) => (
            <button 
              key={index} 
              onClick={() => handleSituationClick(situation.situation)}
              onMouseEnter={() => setHoveredSituation(situation)}
              onMouseLeave={() => setHoveredSituation(null)}
              style={{
                display:"inline-flex",
                padding:"5px",
                cursor:"pointer",
                fontSize:"13px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #F2F2F2",
                gap:"6px",
                borderRadius:"7px",
                backgroundColor: hoveredSituation === situation ? '#F2F2F2' : (selectedSituation === situation.situation ? '#F2F2F2' : 'rgba(0,0,0,0)'),
                color: hoveredSituation === situation ? '#323338' : (selectedSituation === situation.situation ? '#323338' : ' #F2F2F2'), 
              }}
            >
              {situation.situation}{situation.emoji}
            </button>
           
          ))}
          
        </div>

        </Selectbox1>

      <Selectbox>
      <div style={{  width:"155px",marginLeft:"0px"}}>
  <label htmlFor="situation-select" style={{fontSize:"19px" ,color: "#F2F2F2",marginTop:"7px"}}>감정 선택하기 </label>
  
</div>


        <div style={{width:"220px"}}>
        <Slider style={{marginLeft:"27px",marginTop:"10px",width:"310px"}} slidesToShow={4} slidesToScroll={6} arrows={false} onClick={handleClick}
  swipe={true} swipeToSlide={true}
>
  {ems.map((emotion, index) => (
    <div key={index}>
      <SlideItem emotion={emotion} selectedEmotion={selectedEmotion} />
    </div>
  ))}
</Slider>
        </div>
      </Selectbox>
  
      <AllButton onClick={handleShowAll}

>초기화</AllButton>
      { 
      
      filteredPosts.map((post) => {
        const emotion = emotions.find((emotion) => emotion.id === post.grandParentId);
        const situation = situations.find((situation) => situation.id === post.parentId);
        console.log(emotion);
        if (
          (selectedEmotion && emotion.emotion !== selectedEmotion) ||
          (selectedSituation && situation.situation !== selectedSituation)
        ) {
          return null;
        }
        return (



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

       marginTop:"10px",
       width: "20px", height: "20px"
      }}
    >
      {post.likedUsers && post.likedUsers.includes(user.uid) ? (
        <img style={{  width: "14px", height: "14px"}} src={RedHeart} alt="Red Heart" />
      ) : (
        <img style={{  width: "14px", height: "14px"}} src={Noheart} alt="No Heart" />
      )}
    </button>
    
 
    <div     style={{
        border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"5px",
        marginLeft:"3px",
        color:"#F2F2F2"
      }}>
{post.likes}
</div>
<img  style={{width:"14px", height:"14px",border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"10px", 
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
         {situation && <div style={{
fontSize:"10px",
display:"inline-flex",
padding:"2px",
justifyContent:"center",
alignItems:"center",
marginLeft:"8px",
border:"1px solid #323338",
height:'30px',
marginTop:"5px",
borderRadius:"7px",
backgroundColor: '#323338',
color:  '#F2F2F2'
              }}> {situation.situation} {getsituaion(situation.situation)}</div>}
              {emotion && <div               style={{
                fontSize:"10px",
                display:"inline-flex",
                padding:"2px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"6px",
                border:"1px solid #323338",
               height:'30px',
              marginTop:"5px",
                borderRadius:"6px",
                backgroundColor: '#323338',
                color:  '#F2F2F2'  
              }}>{emotion.emotion} {getEmoji(emotion.emotion)}</div>}



                              </SitandEms>
                              
                

            </Whiteboxpost>


            {selectedPost && selectedPost.id === post.id && (
                         <ReactModal 
                         isOpen={isModalOpen}
                         onRequestClose={closePost} 
                         style={{
                           overlay: {
                             backgroundColor: 'rgba(0, 0, 0,0.5)',
                       
                           },
                           content: {
                             color: 'black',
                             background: `rgba(255, 255, 255, 0.01) url(${sand})`,
                             backgroundSize : 'cover',
                             backgroundRepeat : 'no-repeat',
                             margin: '0 auto',
                            width: '360px',
                             height: '90%',
                             display: 'flex',
                          
                             alignItems: 'center',
                             overflowY: 'hidden',
                             borderRadius:"13px",
                             display:"flex",
                             flexDirection:"column",
                             overflowY: 'auto',
                         
                             //position: 'absolute', // absolute positioning
                             left: '50%', // center the modal horizontally
     top: '53%', // center the modal vertically
     transform: 'translate(-50%, -50%)', // center the modal
                             //모달 내용이 부모 요소의 높이를 초과하면 자동으로 스크롤 바를 생성하도록 설정합니다. "overflowY: 'auto'"가 그 역할을 담당합니다.
                 
                 // 또한, 모달의 높이(height)를 조정하여 모달의 내용이 충분하지 않을 경우 모달 자체의 높이를 줄일 수 있습니다. 
                           }
                         }}
                       >
<div
              style={{
                
                height: '100%',
                overflowY: 'auto',
                 // Added to enable vertical scrollbar
              }}>
                 <SitandEmspost>
                        {situation && <div style={{
                display:"inline-flex",
                padding:"5px",
                justifyContent:"center",
                alignItems:"center",
                
                border:"1px solid #323338",
                marginLeft:"0px",
               height:'30px',
              marginTop:"-2px",
                borderRadius:"7px",
                backgroundColor: '#323338',
                color:  '#F2F2F2' 
              }}> {situation.situation} {getsituaion(situation.situation)} 
              </div>}
              {emotion && <div               style={{
                display:"inline-flex",
                padding:"4px",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"15px",
                border:"1px solid #323338",
               height:'30px',
              marginTop:"0px",
                borderRadius:"6px",
                backgroundColor: '#323338',
                color:  '#F2F2F2' 
              }}>{emotion.emotion} {getEmoji(emotion.emotion)}</div>}
                              
       </SitandEmspost>
       <Titlepost>
              {/* Render post title */}
             {post.title}
              </Titlepost>

                <WhitePostContent>




                <Contentbox>{post.content}</Contentbox>


                <div style={{display:"flex"}}>
                                  <LikeDivpost>
                <button 

      onClick={() => handleLikeClick(post.grandParentId, post.parentId, post.id)}
      style={{
        width: "28px", height: "28px",
        border: "none", cursor:"pointer",
        backgroundColor: " rgba(0,0,0,0)"

       // backgroundColor: post.likedUsers && post.likedUsers.includes(user.uid) ? "white" : "white",
      }}
    >
      {post.likedUsers && post.likedUsers.includes(user.uid) ? (
        <img style={{ width: "14px", height: "14px" }} src={RedHeart} alt="Red Heart" />
      ) : (
        <img style={{ width: "14px", height: "14px" }} src={Noheart} alt="No Heart" />
      )}
    </button>
    <div     style={{
        border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginLeft:"3px",
        fontSize:"14px",
        marginTop:"2px"
      
      }}>
{post.likes}
</div>
</LikeDivpost>
<ImgPost>
    <img  style={{width:"14px", height:"14px",border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"13px", 
        marginLeft:"10px"}} src={Communication}/>
<div style={{
        border: "none",
        backgroundColor: " rgba(0,0,0,0)",
        marginTop:"10px",
        marginLeft:"7px",
        fontSize:"14px",
      
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
                {user && (
  <>


    <CommentForm onSubmit={(e) => addComment(e, post.grandParentId, post.parentId, post.id)}>
      <CommentInput
        type="text"
        placeholder="따뜻한 마음을 담아 조언해주세요 :)"
        value={comments[post.id] || ""}
        onChange={(e) => handleCommentChange(post.id, e.target.value)}
      />
      <CommentButton type="submit">댓글쓰기</CommentButton>
    </CommentForm>
  </>
)}
{post.comments.map((comment) => (
  <>
  
  <Commentcommentbox key={comment.docId}> {/* 변경된 부분: comment.docId로 변경 */}
  <Anony>익명</Anony>
  <div style={{display:"flex"}}>
   <CommentLenght> {comment.content}</CommentLenght>
    {user && comment.userId === user.uid && (
      <CommentDelete onClick={() => deleteComment(post.grandParentId, post.parentId, post.id, comment.docId)}> {/* 변경된 부분: comment.docId로 변경 */}
        삭제
      </CommentDelete>
    )}
    </div>
    </Commentcommentbox>
    

    </>
  
))}
                </WhiteCommentPost>


            


    


              </div>
          </ReactModal>)}
          </div>
         
       



        );
      })}
   
    </Partdiv>
    </ParentContainer>
  );
};

export default Mobcommunity; 