const serverless = require('serverless-http')
const Koa = require('koa')
const request = require('request-promise')
const Router = require('koa-router');

const app = new Koa()
const router = new Router()

router.get('/:url_to_be_encoded', async ctx => {
  try {
    const res = await request.get(`https://tinyurl.com/api-create.php?url=${ctx.params.url_to_be_encoded}`)
    ctx.body = { shortenUrl: res.body }
  } catch(e) {
    ctx.status = 400
    ctx.body = 'Error'
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

// serverless koa app
const handler = serverless(app)
// export module
module.exports.handler = async (event, context) => {
  const result = await handler(event, context)
  return result
}
