import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/Index"
import { BlogSkeleton } from "../components/BlogSkelton"
export const Blogs=()=>{
    const {loading,allblogs}=useBlogs();
    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <Appbar/>
<div className="flex justify-center">
         <div className="max-w-xl">
            {
                allblogs.map((blog)=> 
                <BlogCard
                id={blog.id}
                title={blog.title}
                authorName={blog.author.name || "anonymus"}
                content={blog.content}
                publishedDate={"2nd feb 2021"}
                />)
            }
          
       
       </div>
    </div>
    </div>  
    
      
   
}