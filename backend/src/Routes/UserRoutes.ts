import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign,verify } from "hono/jwt";
import { signupInput } from "@vibhaw/medium-common";
import { signinInput } from "@vibhaw/medium-common";
export const userRouter =new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    }
}>

userRouter.post('/signup', async (c) => {
    // console.log(`JWT Secret Length: ${c.env.JWT_SECRET}`);
    // console.log(c.env.JWT_SECRET)
    const body = await c.req.json();
const {success}=signupInput.safeParse(body)
if(!success){
    c.status(411)
    return c.json({
        message:"please enter valid credentials"
    })
}
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      try {
          const user = await prisma.user.create({
              data: {
                  email: body.email,
                  password: body.password
              }
          });
      const jwt= await sign({id:user.id},c.env.JWT_SECRET);
      return c.json({jwt})
      
          // return c.text('jwt here')
      } catch(e) {
          return c.status(403);
      }
  })


userRouter.post('/signin',async(c)=>{
    // console.log(`JWT Secret Length: ${c.env.JWT_SECRET}`);
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body)
if(!success){
    c.status(411)
    return c.json({
        message:"please enter valid credentials"
    })
}
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
   
      const user=await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
      if(!user){
        c.status(403)
        return c.json({error:"user noit found"})
      }
      const jwt= await sign({id:user.id},c.env.JWT_SECRET)
      return c.json({jwt})
    
  })
  