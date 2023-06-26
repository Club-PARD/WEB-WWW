import { deleteDoc , doc, updateDoc, getDocs, collection } from "firebase/firestore";
import React, { useState,useEffect } from "react";
import { dbService } from "../fbase";


const Communitycontentsshow=({contentsObj,handleAddComment,user})=>{
    const [comments, setComments] = useState([]);

    const [newComments, setNewComments] = useState(""); // 새로운 댓글 입력을 위한 상태 추가
    /*
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (newComments !== "") {
          await handleAddComment(contentsObj.id,newComments); // 댓글 추가 요청 전달
          setNewComments(""); // 댓글 추가 후 입력 필드 초기화
        }
      };
      */
     
 // 댓글을 제출 할때 마다 화면에 바로바로 올라올 수 있게 하는 것으로 
 
const handleSubmitComment = async (e) => {
    e.preventDefault();  // 렌더링을 막고
    if (newComments !== "") { // 비어있지 않다면 그전에 값들에 업데이트 식으로 값을 더한다.
        const comment = {
            text: newComments,
            author: user.displayName,  // TODO: 이 부분에 실제 사용자 이름을 설정해주세요.
        };

        // 옵티미스틱 업데이트: 화면에 댓글을 즉시 추가
        setComments((prevComments) => [...prevComments, comment]);
        // 이는 화면에 추가하고 난 뒤에 firebase에 추가되는 비동기적이 부분을 
        // 상쇄하기 위한 과정으로 Comments배열에 먼저 값들을 추가한다.
     //화면에 먼저 이제 등록이 되고 그 동안 async함수 내에서 정의된 비동기로
     // await를 통해서 firebase database에 등록되어 올라간다.

        try {
            await handleAddComment(contentsObj.id, newComments); // 댓글 추가 요청 전달
            // 이를 통해서 firebase에 댓글을 먼저 추가 한다.
            setNewComments(""); // 댓글 추가 후 입력 필드 초기화
        } catch (error) {
            // 오류 발생 시, 옵티미스틱 업데이트를 롤백
            setComments((prevComments) => prevComments.filter((c) => c !== comment));
            console.error("댓글 추가 중 오류 발생", error);
        }
    }
};

    
      /*
        //게시글(post)에 따라 댓글(comment)이 모여 있는 배열을 만드는 useEffect이고 
        앞선 함수 설정과정이 있다면 필요는 없어보이긴 하지만 혹시 몰라 남겨둔다.
      useEffect(() => {
        const fetchData = async () => {
            const commentsCollection = collection(dbService, `posts/${contentsObj.id}/comments`);
            // 자 이제 게시물에 따라서 firebase에 추가된 댓글값들을 가져오는 과정이다.
            const commentsSnapshot = await getDocs(commentsCollection);
            const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(commentsList);
        };
        fetchData();
    }, [contentsObj.id, dbService]);
*/



useEffect(() => {
    const fetchData = async () => {
        const commentsCollection = collection(dbService, `posts/${contentsObj.id}/comments`);
        // 자 이제 게시물에 따라서 firebase에 추가된 댓글값들을 가져오는 과정이다.
        const commentsSnapshot = await getDocs(commentsCollection);
        const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsList);
    };
    fetchData();
}, [contentsObj.id, dbService]);








  
console.log(comments);


return(
<>

//편집하면 즉 update한다하면 이게 뜨도록 설정
        
      
        
        <>
        <h3>{contentsObj.title}</h3>
         <h4>{contentsObj.content}</h4>

{/* 댓글 출력 */}
{comments && (
    // 앞선 과정으로 만들어진 배열을 나타내는 것이다.
    <div>
        <h4>댓글:</h4>
        {comments.map((comment) => (
             <div key={comment.id}>
            <p key={comment.id}>{comment.text}</p>
           
            </div> 
            // contentsObj.id는 게시물의 고유 식별자입니다. 이 id는 Firestore에서 "posts" 컬렉션에 있는 각 게시물에 할당
            // comment.id는 댓글의 고유 식별자입니다. 이 id는 "comments"라는 서브컬렉션에 있는 각 댓글에 할당
        ))}
    </div>
)}



         <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={newComments}
            onChange={(e) => setNewComments(e.target.value)}
            placeholder="댓글 작성"
          />
          <button type="submit">댓글 추가</button>
          

        </form>


        
</>

    
</>)
};

export default Communitycontentsshow;
