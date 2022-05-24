const express=require('express')
const path=require('path')


const app=express()
const port=process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'static'))) // for serving static files


app.get('/',(req,res)=>{
    res.status(200).sendFile('index.html')
})

app.get('/pankaj_linkedin',(req,res)=>{
    res.status(301).redirect('https://www.linkedin.com/in/pankaj-kumar-353358120/')
})

app.get('/pankaj_github',(req,res)=>{
    res.status(301).redirect('https://github.com/panks123')
})

app.listen(port)