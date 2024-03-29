import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { userRouter } from './Routes/UserRoutes'
import { blogRouter } from './Routes/BlogRoutes'
import { sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'
 const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>();
app.use('/*', cors())

app.route('api/v1/user',userRouter);
app.route('api/v1/post',blogRouter);




export default app
