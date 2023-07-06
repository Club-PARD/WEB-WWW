import React, { useEffect, useState, useRef } from "react";
import { dbService } from "../../../fbase";
import {
  getDocs,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import ReactModal from "react-modal";
import { styled } from "styled-components";
import Noheart from "../../../Assets/img/Noheart.png";
import Communication from "../../../Assets/img/communication1.png";
import Communicationwhite from "../../../Assets/img/Communication.png";
import RedHeart from "../../../Assets/img/RedHeart.png";
import sand from "../../../Assets/img/Sea.png";
import Logo from "../../../Assets/img/Logowhite.png";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../Assets/img/73711-loadingbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import modalX from "../../../Assets/img/modalX.png";

import Commingsoon from "../../../Assets/img/commingsoonmobile.png";

const LoadingAnimationWrapper = styled.div`
  height: 100vh;
`;

const Inner = styled.div`
  padding: 0px 0px 0px;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
`;
const ParentContainer = styled.div`
  overflow-y: auto;
  height: 100vh;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
`;
const Partdiv = styled.div`
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;

  width: 100%;
  min-height: 100vh;
  //width:375px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
`;
const Mytitle = styled.div`
  color: var(--text, #fff);
  font-size: 32px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  max-width: 395px;
  min-width: 375px;
  height: 50px;
  width: 100%;
  margin-top: 77px;
  padding-top: 40px;
  padding-bottom: 50px;
  padding-left: 20px;
`;
const MyLine = styled.div`
  width: 345px;

  height: 1px;
  background: #f2f2f2;
  margin-left: 1px;
`;
const MyGrowth = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  color: #fff;
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  margin-left: -20px;
  margin-top: 0px;

  width: 100%;
  padding-left: 30px;
  max-width: 395px;
  min-width: 375px;
`;

const Growthdiv = styled.div`
  //display:flex;
  width: 100%;
  max-width: 360px;
  min-width: 345px;

  height: 345px;
  border-radius: 10px;


  margin-left: 1px;
  margin-right: 1px;
  margin-top: 10px;
`;

const Growthphoto = styled.img`
  height: 345px;
  width: 100%;
  border-radius: 10px;
`;
const Mypostcheck = styled.div`
  color: #fff;
  width: 330px;

  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  margin-left: 0px;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 395px;
  min-width: 375px;
  padding-left: 25px;
`;

const SitandEms = styled.div`
  display: flex;
  width: 200px;
  gap: 3px;
  margin-top: 20px;
  margin-left: 60px;
`;
const Title = styled.div`
  cursor: pointer;
  width: 220px;
  padding-left: 10px;
  color: #f2f2f2;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 400;
  //line-height: 140%;
  margin-top: 10px;
`;
const LikeandComment = styled.div`
  display: flex;
  margin-left: 3px;
  margin-top: 28px;
  width: 200px;
`;
const Whiteboxpost = styled.div`
  border: none;

  width: 340px;
  height: 98px;
  padding: 6px 0px 8px 0px;
  align-items: center;
  //flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--main-white, #f2f2f2);
  margin-bottom: 18px;
  margin-left: 1px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Titlepost = styled.div`
  max-width: 255px;
  min-width: 230px;
  width: 100%;
  margin-left: 0px;
  color: #f2f2f2;
  font-size: 18px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  padding-left: 10px;
  margin-top: 40px;
`;
const SitandEmspost = styled.div`
  display: flex;
  width: 300px;
  gap: 10px;
  margin-left: 10px;
  margin-top: 10px;
`;
const SitandEmspostmodi = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  margin-left: -20px;
`;

const Modititle = styled.div`
  width: 160px;
  height: 60px;
  color: #f2f2f2;
  margin-right: 15px;
  font-size: 32px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  padding-left: 15px;
`;

const Modidiffi = styled.div`
  color: var(--main-white, #f2f2f2);
  padding-left: 18px;
  font-size: 12px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
const ModiInput = styled.input`
  color: #f2f2f2;
  margin-top: 50px;
  margin-left: 10px;
  font-size: 20px;
  height: 30px;
  width: 330px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid var(--text-field, #d9d9d9);
  background: rgba(0, 0, 0, 0);
`;
const Moditextarea = styled.textarea`
  color: #f2f2f2;
  resize: none;
  font-size: 20px;
  margin-top: 50px;
  width: 330px;
  height: 336px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid var(--text-field, #d9d9d9);
  background: rgba(0, 0, 0, 0);
  margin-left: 10px;
`;
const Savebutton = styled.button`
  border: none;
  display: flex;
  width: 137px;
  height: 50px;
  padding: 8px;
  margin-left: 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: #a7a7a7;
  color: #f2f2f2;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: var(--text, #323338);
  }
`;
const Canclebutton = styled.button`
  border: none;
  margin-left: 30px;
  display: flex;
  width: 137px;
  height: 50px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: var(--text, #a7a7a7);
  color: #f2f2f2;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: var(--text, #323338);
  }
`;

const emotions = [
  { emotion: "슬픔", emoji: "😭" },
  { emotion: "힘듦", emoji: "🤯" },
  { emotion: "걱정", emoji: "🤔" },
  { emotion: "불안", emoji: "🤨" },
  { emotion: "우울", emoji: "😮‍💨" },
  { emotion: "화남", emoji: "😡" },
  { emotion: "행복", emoji: "🥰" },
  { emotion: "기쁨", emoji: "😄" },
  { emotion: "설렘", emoji: "😆" },
  { emotion: "감사", emoji: "😮‍💨" },
  { emotion: "뿌듯", emoji: "😙" },
  { emotion: "신남", emoji: "🥳" },
];

const situations = [
  { situation: "조언이 필요해요", emoji: "💭" },
  { situation: "공감이 필요해요", emoji: "😭" },
  { situation: "공유해요", emoji: "📢" },
];
const WhitePostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 345px;
  height: 500.277px;
  //padding: 18.4px 39px;
  margin-top: 20px;
  flex-shrink: 0;
  border-radius: 13px;
  border: 1.3px solid var(--text-field, #d9d9d9);
  background: rgba(255, 255, 255, 0.01);
`;
const WhiteCommentPost = styled.div`
  width: 345px;
  margin-top: 10px;
  height: 403.119px;
  border-radius: 13px;

  background: rgba(0, 0, 0, 0);
  overflow-y: auto;
  overflow-x: hidden;
`;
const Commenttitle = styled.div`
  color: #f2f2f2;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  padding-left: 9px;
  margin-top: 23px;
`;
const Contentbox = styled.div`
  color: #f2f2f2;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 400;

  padding-top: 30px;
  margin: 3px;
  width: 320px;
  height: 480px;
  margin-left: 13px;
  word-wrap: break-word; /* if the word is too long, break it into multiple lines */
  overflow-wrap: break-word; /* same as word-wrap, but a newer version */
`;
const LikeDivpost = styled.div`
  width: 15px;
  display: flex;
  padding-left: 10px;
  margin-top: 46px;
  background: rgba(0, 0, 0, 0);
`;
const ImgPost = styled.div`
  width: 50px;
  display: flex;
  margin-top: 39px;
  padding-left: 20px;
`;
const EditcommentG = styled.div`
  font-size: 10px;
  padding-left: 242px;
  margin-top: -5px;
  cursor: pointer;
  text-decoration: none;
  color: #f2f2f2;
  margin-right: 1vh;

  &:hover {
    text-decoration-line: underline;
  }
`;
const DeletecommentG = styled.div`
  font-size: 10px;
  padding-left: 5px;
  margin-top: -5px;
  color: #f2f2f2;
  cursor: pointer;
  text-decoration: none;
  // margin-right: 1vh;
  &:hover {
    text-decoration-line: underline;
  }
`;
const Claim = styled.div`
  color: #f2f2f2;
  font-size: 14px;
  padding-left: 210px;
  margin-top: 50px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration-line: underline;
  }
`;
const Commentcommentbox = styled.div`
  position: relative;
  width: 345px;
  margin-left: 0px;
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
  background: rgba(242, 242, 242, 0.1);
`;
const CommentLenght = styled.div`
  width: 300px;
  margin-left: 10px;
  margin-top: 8px;
  margin-bottom: 2px;
  font-size: 12px;
  word-wrap: break-word; /* if the word is too long, break it into multiple lines */
  overflow-wrap: break-word; /* same as word-wrap, but a newer version */
`;
const Anony = styled.div`
  margin-top: 10px;
  color: #f2f2f2;
  font-size: 12px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-left: 10px;
`;
const CommentDelete = styled.button`
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 50px;
  border: none;
  color: #f2f2f2;
  text-align: center;
  font-size: 12px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  text-decoration: none;
  cursor: pointer;
  margin-left: 20px;
  margin-bottom: 0px;
  background: rgba(0, 0, 0, 0);
  &:hover {
    text-decoration-line: underline;
  }
`;
/*
const Inner = styled.div`
  padding: 20px 0px 0px;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  `
;
*/
const Selectsituaionword = styled.div`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  width: 150px;
  margin-left: 24px;
`;
const Selectemotionword = styled.div`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-left: 40px;
`;
const MobMypage = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef();
  const handleChange1 = (event) => {
    if (event.target.value.length <= 14) {
      // Only set the new title if it's 10 characters or less
      setEditedTitle(event.target.value);
    }
  };
  console.log(user);
  const handleChange2 = (event) => {
    if (event.target.value.length <= 200) {
      // Only set the new content if it's 200 characters or less
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
    switch (emotion) {
      case "슬픔":
        return "😭";
      case "불안":
        return "🤨";
      case "걱정":
        return "😀";
      case "힘듦":
        return "🤯";
      case "우울":
        return "😮‍💨";
      case "화남":
        return "😡";
      case "행복":
        return "🥰";
      case "기쁨":
        return "😄";
      case "설렘":
        return "😆";
      case "감사":
        return "😮‍💨";
      case "뿌듯":
        return "😙";
      case "신남":
        return "🥳";
      default:
        return "";
    }
  };

  const getsituaion = (situaion) => {
    switch (situaion) {
      case "조언이 필요해요":
        return "💭";
      case "공감이 필요해요":
        return "😭";
      case "공유해요":
        return "📢";
      default:
        return "";
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
          const emotionsSnapshot = await getDocs(
            collection(dbService, "emotions")
          );
          let posts = [];
          for (const emotionDoc of emotionsSnapshot.docs) {
            const emotionId = emotionDoc.id;
            // Get all situations for each emotion
            const situationsSnapshot = await getDocs(
              collection(dbService, `emotions/${emotionId}/situations`)
            );
            for (const situationDoc of situationsSnapshot.docs) {
              const situationId = situationDoc.id;
              // Get posts for each situation where user.displayName is the same
              const postsQuery = query(
                collection(
                  dbService,
                  `emotions/${emotionId}/situations/${situationId}/posts`
                ),
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
                  comments: [],
                };
                // Get comments for each post
                const commentsQuery = query(
                  collection(
                    dbService,
                    `emotions/${emotionId}/situations/${situationId}/posts/${postDoc.id}/comments`
                  ),
                  orderBy("created_at", "desc")
                );
                const commentsSnapshot = await getDocs(commentsQuery);
                commentsSnapshot.forEach((commentDoc) => {
                  post.comments.push({
                    docId: commentDoc.id,
                    ...commentDoc.data(),
                  });
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
        content: editedContent,
      });
      setUserPosts((prevPosts) =>
        prevPosts.map((prevPost) =>
          prevPost.id === editingPostId
            ? { ...prevPost, title: editedTitle, content: editedContent }
            : prevPost
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
      setUserPosts((prevPosts) =>
        prevPosts.filter((prevPost) => prevPost.id !== postId)
      );
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
    return (
      <LoadingAnimationWrapper>
        <Lottie
          options={{
            animationData: animationData,
            loop: true,
            autoplay: true,
          }}
        />
      </LoadingAnimationWrapper>
    );
  }

  const getColorByEmotion = (emotion) => {
    switch (emotion) {
      case "행복":
      case "설렘":
      case "기쁨":
      case "뿌듯":
      case "감사":
      case "신남":
        return "#4880EE"; // 파란색
      case "슬픔":
      case "힘듦":
      case "걱정":
      case "불안":
      case "우울":
      case "화남":
        return "#DD5257"; // 빨간색
      default:
        return "#000000"; // 기본 검은색
    }
  };

  function SlideItem({ item, selectedEmotion }) {
    return (
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",

          paddingLeft: "12px",
          paddingRight: "12px",
          height: "30px",
          marginTop: "3px",
          borderRadius: "6px",
          marginLeft: "2px",

          backgroundColor: "rgba(0,0,0,0)",

          border:
            selectedEmotion === item.emotion
              ? `1px solid ${getColorByEmotion(selectedEmotion)}`
              : "1px solid #f2f2f2",

          color:
            selectedEmotion === item.emotion
              ? getColorByEmotion(selectedEmotion)
              : "#f2f2f2",
        }}
      >
        {item.emotion}
      </div>
    );
  }
  function SlideSituaion({ item, selectedSituation }) {
    return (
      <div
        style={{
          display: "inline-flex",
          padding: "6px",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "15px",

          height: "30px",
          marginTop: "0px",
          borderRadius: "7px",
          border:
            selectedSituation === item.situation
              ? "1px solid #5BC184"
              : "1px solid #F2F2F2",
          backgroundColor: "rgba(0,0,0,0)",
          color: selectedSituation === item.situation ? "#5BC184" : "#F2F2F2",
        }}
      >
        {item.situation}
      </div>
    );
  }

  return (
    <ParentContainer>
      <Inner>
        <Partdiv>
          <Link style={{ border: "none" }} to="/">
            <img
              style={{
                marginTop:"2.6vh",
                marginLeft: "-175px",
                border: "none",
                width: "165px",
                height: "47px",
              }}
              src={Logo}
            />
          </Link>

          <Mytitle>마이페이지</Mytitle>
          <MyLine />
          {/*{user.displayName}*/}
          <MyGrowth>{user.displayName} 님의 쉼 성장 그래프</MyGrowth>
          <Growthdiv>
            <Growthphoto src={Commingsoon} />
          </Growthdiv>
          <Mypostcheck>{user.displayName}님의 최근 글 작성목록</Mypostcheck>
          {userPosts.map((post) => (
            <div key={post.id}>
              <Whiteboxpost onClick={() => handlePostClick(post)}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Title>
                    {/* Render post title */}
                    {post.title}
                  </Title>
                  <div style={{ display: "flex" }}>
                    <LikeandComment>
                      <button
                        style={{
                          border: "none",
                          background: "rgba(0,0,0,0)",
                          marginTop: "5px",
                        }}
                      >
                        {post.likedUsers &&
                        post.likedUsers.includes(user.uid) ? (
                          <img
                            style={{ width: "21px", height: "21px" }}
                            src={RedHeart}
                            alt="Red Heart"
                          />
                        ) : (
                          <img
                            style={{ width: "21px", height: "21px" }}
                            src={Noheart}
                            alt="No Heart"
                          />
                        )}
                      </button>

                      <div
                        style={{
                          border: "none",
                          backgroundColor: " rgba(0,0,0,0)",
                          marginTop: "4px",
                          color: "#F2F2F2",
                          fontSize: "21px",
                        }}
                      >
                        {post.likes}
                      </div>
                      <img
                        style={{
                          width: "21px",
                          height: "21px",
                          border: "none",
                          backgroundColor: " rgba(0,0,0,0)",
                          marginTop: "8px",
                          marginLeft: "16px",
                        }}
                        src={Communicationwhite}
                      />
                      <div
                        style={{
                          border: "none",
                          backgroundColor: " rgba(0,0,0,0)",
                          marginTop: "4px",
                          marginLeft: "7px",
                          color: "#F2F2F2",
                          fontSize: "21px",
                        }}
                      >
                        {getCommentCount(post.id)}
                      </div>
                    </LikeandComment>

                    <SitandEms>
                      {post.situation.situation && (
                        <div
                          style={{
                            fontSize: "10px",
                            display: "inline-flex",
                            paddingLeft: "3px",
                            paddingRight: "3px",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "8px",

                            height: "30px",
                            marginTop: "5px",
                            borderRadius: "7px",
                            border: "1px solid #5BC184",
                            backgroundColor: "rgba(0,0,0,0)",
                            color: "#5BC184",
                          }}
                        >
                          {" "}
                          {post.situation.situation}{" "}
                        </div>
                      )}
                      {post.emotion.emotion && (
                        <div
                          style={{
                            fontSize: "10px",
                            display: "inline-flex",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "6px",

                            height: "30px",
                            marginTop: "5px",
                            borderRadius: "6px",
                            border: `1px solid ${getColorByEmotion(
                              post.emotion.emotion
                            )}`,
                            backgroundColor: "rgba(0,0,0,0)",
                            color: getColorByEmotion(post.emotion.emotion),
                          }}
                        >
                          {post.emotion.emotion}{" "}
                        </div>
                      )}
                    </SitandEms>
                  </div>
                </div>
              </Whiteboxpost>
              {selectedPost && selectedPost.id === post.id && (
                <>
                  <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={closePost}
                    style={{
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0,0.5)",
                      },
                      content: {
                        color: "black",
                        background: " #17171B",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        margin: "0 auto",
                        width: "390px",
                        height: "90%",
                        display: "flex",
                        border:"none",
                        alignItems: "center",
                        overflowY: "hidden",
                        borderRadius: "13px",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        //position: 'absolute', // absolute positioning
                        left: "50%", // center the modal horizontally
                        top: "53%", // center the modal vertically
                        transform: "translate(-50%, -50%)", // center the modal
                        //모달 내용이 부모 요소의 높이를 초과하면 자동으로 스크롤 바를 생성하도록 설정합니다. "overflowY: 'auto'"가 그 역할을 담당합니다.
                        border: "none",
                        // 또한, 모달의 높이(height)를 조정하여 모달의 내용이 충분하지 않을 경우 모달 자체의 높이를 줄일 수 있습니다.
                      },
                    }}
                  >
                    {editingPostId === post.id ? (
                      <div
                        style={{
                          height: "100%",
                          overflowY: "auto", // Added to enable vertical scrollbar
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            border: "none",
                            paddingLeft: "320px",
                          }}
                          onClick={closePost}
                        >
                          <img
                            style={{
                              width: "21px",
                              height: "21px",
                              scale: "1.7",
                            }}
                            src={modalX}
                          />
                        </button>
                        <Modititle>수정하기</Modititle>
                        <Modidiffi>
                          현재 선택된 게시판과 감정은 변경이 어려워요
                        </Modidiffi>
                        <SitandEmspostmodi>
                          <Selectsituaionword>
                            현재 선택된 게시판
                          </Selectsituaionword>
                          <div style={{ display: "flex", marginLeft: "16px" }}>
                            <Slider
                              style={{
                                marginLeft: "20px",
                                marginTop: "4px",
                                width: "320px",
                              }}
                              slidesToShow={2.2}
                              slidesToScroll={1}
                              arrows={false}
                              infinite={false}
                            >
                              {situations.map((item) => (
                                <div key={item.situation}>
                                  <SlideSituaion
                                    item={item}
                                    selectedSituation={post.situation.situation}
                                  ></SlideSituaion>
                                </div>
                              ))}
                            </Slider>
                          </div>
                          <Selectemotionword
                            style={{ display: "flex", width: "150px" }}
                          >
                            현재 선택된 감정
                          </Selectemotionword>
                          <div style={{ width: "200px", marginLeft: "30px" }}>
                            <Slider
                              style={{
                                marginLeft: "5px",
                                marginTop: "4px",
                                width: "310px",
                              }}
                              slidesToShow={4.2}
                              slidesToScroll={1}
                              arrows={false}
                              swipe={true}
                              swipeToSlide={true}
                              infinite={false}
                            >
                              {emotions.map((item) => (
                                <div key={item.emotion}>
                                  <SlideItem
                                    item={item}
                                    selectedEmotion={post.emotion.emotion}
                                  />
                                </div>
                              ))}
                            </Slider>
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
                        <div style={{ display: "flex", marginTop: "30px" }}>
                          <Savebutton onClick={handleSaveEdit}>
                            수정하기
                          </Savebutton>
                          <Canclebutton onClick={handleCancelEdit}>
                            취소하기
                          </Canclebutton>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          overflowY: "auto", // Added to enable vertical scrollbar
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            border: "none",
                            paddingLeft: "320px",
                          }}
                          onClick={closePost}
                        >
                          <img
                            style={{ width: "21px", height: "21px" }}
                            src={modalX}
                          />
                        </button>
                        <WhitePostContent>
                          <SitandEmspost>
                            {post.situation.situation && (
                              <div
                                style={{
                                  display: "inline-flex",
                                  padding: "5px",
                                  justifyContent: "center",
                                  alignItems: "center",

                                  marginLeft: "0px",
                                  height: "30px",
                                  marginTop: "-2px",
                                  borderRadius: "7px",
                                  border: "1px solid #5BC184",
                                  backgroundColor: "rgba(0,0,0,0)",
                                  color: "#5BC184",
                                }}
                              >
                                {" "}
                                {post.situation.situation}
                              </div>
                            )}
                            {post.emotion.emotion && (
                              <div
                                style={{
                                  display: "inline-flex",
                                  padding: "4px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginLeft: "15px",

                                  height: "30px",
                                  marginTop: "-1px",
                                  borderRadius: "6px",
                                  border: `1px solid ${getColorByEmotion(
                                    post.emotion.emotion
                                  )}`,
                                  backgroundColor: "rgba(0,0,0,0)",
                                  color: getColorByEmotion(
                                    post.emotion.emotion
                                  ),
                                }}
                              >
                                {post.emotion.emotion}{" "}
                              </div>
                            )}
                          </SitandEmspost>
                          <Titlepost>
                            {/* Render post title */}
                            {post.title}
                          </Titlepost>
                          {user && user.displayName === post.name && (
                            <div style={{ display: "flex" }}>
                              <EditcommentG
                                onClick={() => handleEditPost(post.id)}
                              >
                                수정하기
                              </EditcommentG>
                              <DeletecommentG
                                onClick={() => handleDeletePost(post.id)}
                              >
                                삭제하기
                              </DeletecommentG>
                            </div>
                          )}

                          <Contentbox>{post.content}</Contentbox>
                          <div
                            style={{ display: "flex", marginBottom: "10px" }}
                          >
                            <LikeDivpost>
                              <button
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  border: "none",
                                  backgroundColor: " rgba(0, 0, 0,0)",
                                  // backgroundColor: post.likedUsers && post.likedUsers.includes(user.uid) ? "white" : "white",
                                }}
                              >
                                {" "}
                                {post.likedUsers &&
                                post.likedUsers.includes(user.uid) ? (
                                  <img
                                    style={{ width: "24px", height: "24px" }}
                                    src={RedHeart}
                                    alt="Red Heart"
                                  />
                                ) : (
                                  <img
                                    style={{ width: "24px", height: "24px" }}
                                    src={Noheart}
                                    alt="No Heart"
                                  />
                                )}
                              </button>
                              <div
                                style={{
                                  border: "none",
                                  backgroundColor: " rgba(0, 0, 0,0)",
                                  marginLeft: "5px",
                                  marginTop: "-4px",
                                  fontSize: "24px",
                                  color: "#F2F2F2",
                                }}
                              >
                                {post.likes}
                              </div>
                            </LikeDivpost>
                            <ImgPost>
                              <img
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  border: "none",
                                  backgroundColor: " rgba(0, 0, 0,0)",
                                  marginTop: "8px",
                                  marginLeft: "30px",
                                }}
                                src={Communicationwhite}
                              />
                              <div
                                style={{
                                  border: "none",
                                  backgroundColor: " rgba(0, 0, 0,0)",
                                  color: "#F2F2F2",
                                  marginTop: "3px",
                                  marginLeft: "7px",
                                  fontSize: "24px",
                                }}
                              >
                                {getCommentCount(post.id)}
                              </div>
                            </ImgPost>
                            <Claim
                              onClick={(e) => {
                                e.preventDefault();
                                alert("신고가 접수되었습니다");
                              }}
                            >
                              신고하기
                            </Claim>
                          </div>
                        </WhitePostContent>
                        <WhiteCommentPost>
                          <Commenttitle>댓글</Commenttitle>
                          {post.comments.map((comment) => (
                            <>
                              <Commentcommentbox key={comment.docId}>
                                {" "}
                                {/* 변경된 부분: comment.docId로 변경 */}
                                <Anony>익명</Anony>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {comment.content
                                    .split("\n")
                                    .map((line, index, array) => {
                                      return (
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                          key={index}
                                        >
                                          <CommentLenght>{line}</CommentLenght>
                                          {user && (
                                            <CommentDelete
                                              onClick={() =>
                                                handleDeleteComment(
                                                  post.id,
                                                  comment.docId
                                                )
                                              }
                                            >
                                              삭제
                                            </CommentDelete>
                                          )}
                                        </div>
                                      );
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
export default MobMypage;
