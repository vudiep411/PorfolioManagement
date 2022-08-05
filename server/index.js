import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './Routes/user.js'

const app = express()


app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI || '', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected db')
})

app.listen(PORT, () => console.log('server started'))
