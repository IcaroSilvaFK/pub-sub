import express from 'express'
import cors from 'cors'
import axios from 'axios'

import {subscribe,notify} from './observers/index.js'


const app = express()

app.use(cors())

app.get('/:topic/:msg', (req, res) => {

  const topic = req.params.topic
  const msg = req.params.msg

  notify(topic, msg)

  res.send()
})




app.post('/:topic', (req,res) => {
  const topic = req.params.topic

  subscribe(topic, async (msg) => {
    console.log('sending', msg)
    const response = await axios.get(`http://localhost:8000/${topic}/${msg}`)
    console.log('response', response.data)
  })

  res.send('ok\n')
})

app.listen(3000, () => {
  console.log(`Listening on port 3000`)
})