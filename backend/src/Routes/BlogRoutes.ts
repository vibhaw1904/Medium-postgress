import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign,verify } from "hono/jwt";

export const blogRouter =new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    },
    Variables:{
        userId:string
    }
}>
blogRouter.use('/*', async(c,next)=>{
    const header=c.req.header('authorization')||"";
    const token =header.split(" ")[1]
  
    const response=await verify(token,c.env.JWT_SECRET)
    if(response){
        c.set("userId",response.id)
        await next()
    }
    else{ 
      c.status(403)
      return c.json({error:"unauth"})
    }
  })

blogRouter.post('/',async(c)=>{
    const authorId=c.get('userId');
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body=await c.req.json();
    try {
        const post=await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:authorId,
            }
        })
        return c.json({
            id:post.id
        })
    
    } catch (error) {
        c.status(411)
        return c.json({
            error,
            message:"error while posting the blog"
        })
    }


})
  blogRouter.put('/',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body=await c.req.json();
    try {
        const post=await prisma.post.update({
            where:{
                id:body.id,
            },
            data:{
                title:body.title,
                content:body.content,
            }
        })
        return c.json({
            id:post.id
        })
    } catch (error) {
        c.status(411)
        return c.json({
            error,
            message:"error updating data"
        })
    }

  })
  
blogRouter.get('/bulk', async(c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const posts=await prisma.post.findMany()
    return c.json({posts})
})
  
blogRouter.get('/:id', async(c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const id= c.req.param("id");

    try {
        const post=await prisma.post.findFirst({
            where:{
                id:id
            }
        })
        return c.json({
            post
        })
    } catch (error) {
        c.status(411)
        return c.json({
            error,
            message:"error while fetching the post"
        })
    }
  })

  