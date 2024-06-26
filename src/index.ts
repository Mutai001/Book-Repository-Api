import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { number } from 'zod'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { prometheus } from '@hono/prometheus'
import { html, raw } from 'hono/html'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { HTTPException } from 'hono/http-exception'
import { timeout } from 'hono/timeout'





const app = new Hono().basePath('/api')

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })
const { printMetrics, registerMetrics } = prometheus()

// inbuilt middlewares
app.use(logger())
app.use(csrf()) 
app.use(trimTrailingSlash())
app.use('*', registerMetrics)
app.use('/', timeout(10000, customTimeoutException))
app.use('*', registerMetrics)




app.get('/ok', (c) => {
  return c.text('The server is running☑️')
})
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})
app.get('/metrics', printMetrics)


//Routes
// app.route('/', UserRouter)
 // api/auth/register   or api/auth/login



// default route
app.get('/', (c) => {
  const html = `
    <h1>Welcome to Hono</h1>
    <p>Server is running on port ${process.env.PORT}</p>
  `
  return c.html(html);
});


// const port = 3000 
const port = Number(process.env.PORT)
console.log(`Server is running on port ${process.env.PORT}`);
app.get('/metrics', printMetrics)

console.log('Registered routes: ', app.routes);

serve({
  fetch: app.fetch,
  port: 3000,
});











