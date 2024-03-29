import axios from "axios";
import { useEffect, useState } from "react"
import { API_URL } from "../config";

interface Blog{
    "title": string,
    "content":string,
    "id": number,
    "author": {
        "name": string
    }
}

export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const[allblogs,setAllBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${API_URL}/api/v1/post/bulk`,{headers:{
            Authorization:'Bearer '+localStorage.getItem("token")
        }}).then((res)=>{
            setAllBlogs(res.data.posts)
            setLoading(false)
        })
    })
    return{

        loading,allblogs
    }
}