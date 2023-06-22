import { deleteDoc , doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fbase";


const Communitycontentsshow=({contentsObj,isOwner})=>{
    const [editing, setediting] = useState(false);
    //contents를 수정하고 있는지 아닌지
    const [newContent,setNewContent] = useState(contentsObj.content); // default로 text를 설정
    // input의 값 수정가능

    const onDeleteClick= async()=>{
        const ok = window.confirm('Are you sure want to delete this newwt?');
        console.log(ok)
        if (ok){
            await deleteDoc(doc(dbService,"posts",`${contentsObj.id}`))
        }
    };
    const toggleEditing= ()=>setediting((prev)=>!prev) 

    const onSubmit1=async (e)=>{
        e.preventDefault();
        await updateDoc(doc(dbService,"posts",`${contentsObj.id}`),
        {content:newContent,
        });
        setediting(false);
        }; 
        // updatedocs로 수정가능


        const onChange=(e)=>{
            const {
                target : {value},
            } =e;
            
            setNewContent(value);
        
        
        }  ;  
return(
<>
{editing ? 
        
        (
<>
        <form onSubmit={onSubmit1}>
            <input type='text' placeholder="Edit your post" value={newContent}
            onChange={onChange}
            />
            <input type='submit' value="수정"></input>
        </form>
        <button onClick={toggleEditing}>Cancel</button>
        </>

        )
        :
        (
        <>
        <h3>{contentsObj.title}</h3>
         <h4>{contentsObj.content}</h4>

     
                 <button onClick={onDeleteClick}>Delete Nweet</button>
          <button 
          onClick={toggleEditing}
          >Edit content</button>
        
</>
)
        }
</>)
};

export default Communitycontentsshow;