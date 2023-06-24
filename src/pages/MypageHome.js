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

    const onSubmit= async (e)=>{
        e.preventDefault();
        const post = {
            title: title,
            name:user.displayName,
            uid:user.uid,
           
            content: content,
            created_at: Timestamp.now(),
        };
    
        try {
            await addDoc(collection(dbService, "posts"), post);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const onChange111=(e)=>{
        const {target:{value},}=e; //e.target.value 생성과정
       
            settitle(value)
    
        };
        const onChange11111=(e)=>{
            const {target:{value},}=e; //e.target.value 생성과정
           
                setcontent(value)
            };

            //필터 되는 부분
            useEffect(() => {
                const getPostsByUser = async () => {
                    const q = query(
                        collection(dbService, "posts"), 
                        where("name", "==", user.displayName),
                    orderBy("created_at","desc")
                    
                    );
                    // posts collection에서 uid를 통해서 필터를 하며 이때 where이 사용됨
                    const querySnapshot = await getDocs(q);
                    //getDocs(q)는 앞에서 생성한 쿼리를 실행하여 해당하는 문서들의 데이터를 가져옴
                    // await로 하는 이유는 오래 걸리니까 순서를 상황에 따라 유동적 조절
                    // async안에서
                    let posts = [];
                    //let userPosts = [];는 검색한 문서의 데이터를 저장할 빈 배열을 생성
                    querySnapshot.forEach((doc) => {
                        posts.push({id: doc.id, ...doc.data()});
                    });
                    // getDocs에서 반환받은 querySnapshot의 각 문서에 대해 실행되는 반복문
                    // userPosts배열에 각문서의 id와 데이터를 가져온다.
                    setuserPosts(posts)
  
                } 
                //시간이 얼마나 걸릴지 모르니까 async함수를 사용한다.
                /*
                React에서 비동기 데이터를 불러오는 데 일반적으로 사용됩니다. useEffect 내부에서 비동기 함수를 정의하고 즉시 호출하는 것이 핵심입니다. 이렇게 하면 useEffect의 클린업 함수에서 비동기 상태를 관리할 필요가 없습니다.
                */
        
                getPostsByUser();
                //user prop이 변경될때 마다 
                // getPostsByUser 함수가 호출된다. 
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
                            where("author", "==", user.displayName)
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

            const handleDeleteComment = async (postId, commentId) => {
                // 데이터베이스에서 해당 댓글을 삭제
                await deleteDoc(doc(dbService, `posts/${postId}/comments/${commentId}`));
                // 화면에서 해당 댓글을 삭제
                // 화면에서 바로 사라지지 않았다. 상태 얻베이트가 렌더링 때까지 반영되지 않으므로
                //setuserComments 함수는 비동기적으로 작동하므로, 상태를 즉시 업데이트하거나 컴포넌트를 재렌더링하지 않습니다.
                //상태를 직접 조작하여 삭제하려는 댓글을 제외한 새로운 댓글 배열을 생성하고, setuserComments 함수를 사용하여 이 새로운 배열로 상태를 업데이트하는 것입니다.
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
                setNewContent(() => [ newContent])
                await updateDoc(doc(dbService, "posts", postId), // Use postId directly
                {
                  content: newContent,
                });
               
                setEditingId(null); // Reset editingId
              };
        
          
              
return(
 
    
<>
<form onSubmit={onSubmit}>
<input onChange={onChange111} value={title} type='text' placeholder="What's on your mind?"
maxLength={120} ></input>
<textarea onChange={onChange11111} value={content} placeholder="What's on your mind?"
maxLength={300} ></textarea>
<input type='submit' value='posts' ></input>
</form>



{/*user의 값이  null이여서 구현 안되는 이슈 발생 useruid가 null일때 즉 로그인 안했을때는 접근 못하도록 제한 */}
{/*그 div옆에 , 표시해버리면 렌더링시에 DOM에서 자식 객체를 어떻게 처리할지 모르는 경우 발생

그렇때 문제가 되므로 조심해야 한다
그리고 return을 map시에 꼭해야 함
*/}

<div>


            {userComments.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    {editingId === post.id ? (
                        <div>
                            <form onSubmit={(e)=>{onSubmit1(e,post.id)}}>
                                <input type='text' placeholder="Edit your post" value={newContent} onChange={(e)=>setNewContent(e.target.value)} />
                                <input type='submit' value="Update" />
                            </form>
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>{post.content}</p>
                            <button onClick={() => onDeleteClick(post.id)}>Delete Post</button>
                            <button onClick={() => toggleEditing(post.id)}>Edit Post</button>
                            {post.comments.map((comment) => (
                                <div key={comment.id}>
                                    <p>{comment.text}</p>
                                    <button onClick={() => handleDeleteComment(post.id, comment.id)}>Delete Comment</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>





</>
  


  



)
};


export default MypageHome;

