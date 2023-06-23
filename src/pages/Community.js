import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, orderBy,query } from "firebase/firestore";
import Communitycontentsshow from "./Communitycontentsshow";

const Community= ({user})=>{

    const [contents,setcontents] = useState([]);

    useEffect(()=>{
        const q =query(
            collection(dbService,'posts'),   orderBy("created_at","desc")
        ); // post collection에서 정보를 받고
        {/*
        Cannot read properties of null (reading 'uid')
TypeError: Cannot read properties of null (reading 'uid')
    at http://localhost:3000/main.93b3afdf19416e8a77d5.hot-update.js:58:34
    at Array.map (<anonymous>)
    at Community (http://localhost:3000/main.93b3afdf19416e8a77d5.hot-update.js:53:24)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:79241:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:82123:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:83835:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:68833:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:68877:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:68934:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:88808:11)
        Community 컴포넌트에서는 각 contents 요소에 대해 data.uid === user.uid라는 표현식을 사용하고 있는데, 이 때 user가 null이면 이런 오류가 발생할 수 있습니다.

또한, 이 코드가 실행되는 시점에 user 객체가 아직 설정되지 않았을 가능성도 있습니다. App.js에서 user state를 null로 초기화하고 있기 때문에, user가 아직 설정되지 않은 상태에서 Community 컴포넌트가 렌더링되면 user.uid에 접근하려 할 때 오류가 발생합니다.
     */}
        onSnapshot(q,(snapshot)=>{
            const postArr = snapshot.docs.map((doc)=>({
                //기본적으로 데이터 베이스에 일이 있을 때 알람을 받는 것
                id:doc.id,
                ...doc.data(),
                //snapshot을 받을 때 배열을 만들고
            }));
            setcontents(postArr) // 만들어진 배열을 setnweets로 받음
        }); //배열 안에 넣는 것 snapshot을 찍어서 
        // id랑 data를 넣는다. 
        // 렌데링 될때만

    },[]);
console.log(contents);
    return(
        <>

{contents.map((data,id) => (
   <Communitycontentsshow
     key={id} 
     contentsObj={data} 
     isOwner={user ?  data.uid === user.uid: false }
   />  //map을 하고 return을 해야 한다 
   //Communitycontentsshow가 components로서 리턴하니까
))}
        </>
    )
    
    };
    
    export default Community;