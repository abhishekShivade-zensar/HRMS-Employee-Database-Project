const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
mongoose
  .connect('mongodb://127.0.0.1:27017/employeedatabase')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const employeeRoute = require('./routes/employee.routes')
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
// Static directory path
app.use(express.static(path.join(__dirname, 'dist/HRMS-Front-End')))
// API root
app.use('/api', employeeRoute)
// PORT
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
// 404 Handler
app.use((_req, _res, next) => {
  next(createError(404))
})
// Base Route
app.get('/', (_req, res) => {
  res.send('invaild endpoint')
})
app.get('*', (_req, res) => {
  res.sendFile(
    path.join(__dirname, 'dist/HRMS-Front-End/index.html'),
  )
})
// error handler
app.use(function (err, _req, res, _next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})