import React, {  useState } from "react";
import { dbService,StorageService } from "../fbase";
import { collection,addDoc} from "firebase/firestore";



const MypageHome=()=>{


    const createPost = async (title, content) => {
        const post = {
            title: title,
            content: content,
            created_at: new Date().toISOString(),
        };
    
        try {
            await addDoc(collection(dbService, "posts"), post);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
return(
    <>
    <form>
    


    </form>
    </>


)
};


export default MypageHome;

