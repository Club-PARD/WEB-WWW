import React, {  useEffect, useState } from "react";
import { dbService} from "../fbase";
import { deleteDoc ,updateDoc, doc, collection, addDoc, query, orderBy, where, getDocs, Timestamp } from "firebase/firestore";







const MypageHome=({user})=>{
    const [title,settitle] = useState('');
    const [content,setcontent] = useState('');
    const [userPosts,setuserPosts]= useState([]);
    const [newContent,setNewContent] = useState(user.content); // default로 text를 설정
    const [userComments,setuserComments]= useState([]);
    const [editingId, setEditingId] = useState(null); 

    

            //필터 되는 부분
            useEffect(() => {
                const getPostsAndComments = async () => {
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
                                let post = {         id: postDoc.id, 
                                    ...postDoc.data(), 
                                    emotion: emotionDoc.data(), 
                                    emotionId: emotionDoc.id, // 이 부분 추가
                                    situation: situationDoc.data(), 
                                    situationId: situationDoc.id, // 이 부분 추가
                                    comments: []};
            
                                // Get comments for each post
                                const commentsQuery = query(collection(dbService, `emotions/${emotionId}/situations/${situationId}/posts/${postDoc.id}/comments`));
                                const commentsSnapshot = await getDocs(commentsQuery);
                                commentsSnapshot.forEach((commentDoc) => {
                                    post.comments.push({ id: commentDoc.id, ...commentDoc.data() });
                                });
                
                                posts.push(post);
                            }
                        }
                    }
                    setuserPosts(posts);
                }
            
                getPostsAndComments();
            }, [user]);
            

            console.log(userPosts);

            
            //posts 컬렉션 안에 있는 comments 서브컬렉션에서 author가 같은 데이터를 검색하고 결과를 배열로 저장위해서는
            //
            useEffect(() => {
                const getPostsAndComments = async () => {
                    // Get all posts
                    const postsQuery = query(collection(dbService, "posts"), orderBy("created_at", "desc"));
                    const postsSnapshot = await getDocs(postsQuery);
                    let posts = [];
                    for (const postDoc of postsSnapshot.docs) {  // post에 컬렉션에 각각 서브 컬렉션을 위해서
                        let post = { id: postDoc.id, ...postDoc.data(), comments: [] };
            
                        // Get comments for each post where author is the same as user.displayName
                        const commentsQuery = query(
                            collection(dbService, `posts/${postDoc.id}/comments`), 
                           /// where("author", "==", user.displayName)
                        );
                        const commentsSnapshot = await getDocs(commentsQuery); // 불러오니까 비동기로
                        commentsSnapshot.forEach((commentDoc) => {
                            post.comments.push({ id: commentDoc.id, ...commentDoc.data() });
                        });
            
                        posts.push(post);
                    }
                    setuserComments(posts);
                }
            
                getPostsAndComments();
                                //user prop이 변경될때 마다 
                // getPostsAndComments함수가 호출된다. 
            }, [user]);
            

            console.log(userComments);

            const handleDeleteComment = async (emotionId, situationId, postId, commentId) => {
                // 데이터베이스에서 해당 댓글을 삭제
                try {
                    // 데이터베이스에서 해당 댓글을 삭제
                    await deleteDoc(doc(dbService, `emotions/${emotionId}/situations/${situationId}/posts/${postId}/comments/${commentId}`));
                    // ... rest of your code
                } catch (error) {
                    console.log("Error deleting comment: ", error);
                }
            
                // userPosts 상태 업데이트
                setuserPosts((prevPosts) => {
                    return prevPosts.map((post) => {
                        if(post.id === postId) {
                            return {...post, comments: post.comments.filter((comment) => comment.id !== commentId)}
                        }
                        return post;
                    })
                });
            
                // userComments 상태 업데이트
                setuserComments((prevComments) => {
                    return prevComments.map((post) => {
                        if(post.id === postId) {
                            return {...post, comments: post.comments.filter((comment) => comment.id !== commentId)}
                        }
                        return post;
                    })
                });
            };
            

            const onDeleteClick = async (postId) => {
                const ok = window.confirm('Are you sure want to delete this newwt?');
                console.log(ok)
                if (ok) {
                    await deleteDoc(doc(dbService, "posts", postId)) // Use postId directly
                    setuserComments((prevComments) => {
                        return prevComments.filter((post) => post.id !== postId);
                    });
                }
            };
            
        
              const toggleEditing = (id) => setEditingId(id); 
              const onSubmit1 = async (e, postId) => {
                e.preventDefault();
             setNewContent(() => [ newContent]) //이렇게 해도 실행이 안되었습니다. 
                await updateDoc(doc(dbService, "posts", postId), // Use postId directly
                {
                  content: newContent,
                });
               
                setEditingId(null); // Reset editingId
              };
        
          
              console.log(userComments);
              console.log(userPosts);
              
return(
 
    
<>




{/*user의 값이  null이여서 구현 안되는 이슈 발생 useruid가 null일때 즉 로그인 안했을때는 접근 못하도록 제한 */}
{/*그 div옆에 , 표시해버리면 렌더링시에 DOM에서 자식 객체를 어떻게 처리할지 모르는 경우 발생

그렇때 문제가 되므로 조심해야 한다
그리고 return을 map시에 꼭해야 함
*/}

<div>
  {userPosts.map((post) => (
    <div key={post.id}>
      <h1>{post.title}</h1>
      <h2>{post.content}</h2>
      <h3>Emotion: {post.emotion.emotion}</h3> {/* Adjust this based on your actual emotion data structure */}
      <h3>Situation: {post.situation.situation}</h3> {/* Adjust this based on your actual situation data structure */}
      <h3>Likes: {post.likes}</h3> {/* Adjust this based on your actual likes data structure */}
      {post.comments.map((comment) => (
        <div key={comment.id}>

          <p>{comment.content}</p>
          <button onClick={() => handleDeleteComment(post.emotionId, post.situationId, post.id, comment.id)}>Delete Comment</button>


        </div>
      ))}
    </div>
  ))}
</div>






</>
  


  



)
};


export default MypageHome;

