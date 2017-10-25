import Koa from 'koa'
import favicon from 'koa-favicon'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import cors from 'kcors'
import path from 'path'
import fs from 'fs-plus'
// import https from 'https'
import http from 'http'
import logger from './lib/logger'
import Redis from './lib/redis'
import proxy from './lib/proxy'
import multer from 'koa-multer'
import ueditor from './router/ueditor'
import upload from './router/upload'

const app = new Koa()
global.Redis = Redis
console.log(path.join(__dirname,'./../public'))
app.use(logger.koaLogger(logger.getLogger()))
app.use(favicon())
app.use(compress())
app.use(bodyParser())
app.use(cors())
app.use(serve(path.join(__dirname,'./../public')))
app.use(upload.routes())
app.use(ueditor.routes())
app.use(proxy())
// const options = {
//   key: fs.readFileSync(path.join(__dirname,'./../key/server-key.pem')),
//   ca: [fs.readFileSync(path.join(__dirname,'./../key/ca-cert.pem'))],
//   cert: fs.readFileSync(path.join(__dirname,'./../key/server-cert.pem'))
// }
app.on('error', (err, ctx) => {
  console.log('error: ', err)
})
http.createServer(app.callback()).listen(3000,'0.0.0.0')