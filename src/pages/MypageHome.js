import React, {  useEffect, useState } from "react";
import { dbService} from "../fbase";
import { collection, addDoc, query, orderBy, where, getDocs, Timestamp } from "firebase/firestore";







const MypageHome=({user})=>{
    const [title,settitle] = useState('');
    const [content,setcontent] = useState('');
    const [userPosts,setuserPosts]= useState([]);

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
    const onChange=(e)=>{
        const {target:{value},}=e; //e.target.value 생성과정
       
            settitle(value)
    
        };
        const onChange1=(e)=>{
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
            console.log(userPosts)
return(
 
    
<>
<form onSubmit={onSubmit}>
<input onChange={onChange} value={title} type='text' placeholder="What's on your mind?"
maxLength={120} ></input>
<textarea onChange={onChange1} value={content} placeholder="What's on your mind?"
maxLength={300} ></textarea>
<input type='submit' value='posts' ></input>




{/*user의 값이  null이여서 구현 안되는 이슈 발생 useruid가 null일때 즉 로그인 안했을때는 접근 못하도록 제한 */}
{/*그 div옆에 , 표시해버리면 렌더링시에 DOM에서 자식 객체를 어떻게 처리할지 모르는 경우 발생

그렇때 문제가 되므로 조심해야 한다
그리고 return을 map시에 꼭해야 함
*/}
{userPosts.map((post)=>{
return(
<div key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.content}</p>

</div> 
);
})}
</form>



</>
  


  



)
};


export default MypageHome;

