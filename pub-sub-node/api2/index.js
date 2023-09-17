import express from 'express'
import cors  from 'cors'



const app = express()


app.use(cors())

app.get('/:topic/:msg', (req, res) => {
  const topic = req.params.topic
  const msg = req.params.msg
  res.send(topic + ' ' + msg)
})


app.listen(8000,()=> {
  console.log('running on port 8000')
})