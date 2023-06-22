import React, {  useState } from "react";
import { dbService,StorageService } from "../fbase";
import { collection,addDoc} from "firebase/firestore";



const MypageHome=({user})=>{
    const [title,settitle] = useState('');
    const [content,setcontent] = useState('');

    const onSubmit= async (e)=>{
        e.preventDefault();
        const post = {
            title: title,
            name:user.displayName,
            uid:user.uid,
           
            content: content,
            created_at: new Date().toISOString(),
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
return(
 
    
<>
<form onSubmit={onSubmit}>
<input onChange={onChange} value={title} type='text' placeholder="What's on your mind?"
maxLength={120} ></input>
<textarea onChange={onChange1} value={content} placeholder="What's on your mind?"
maxLength={300} ></textarea>
<input type='submit' value='Nweet' ></input>
</form>
</>
  


  



)
};


export default MypageHome;

