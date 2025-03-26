const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
app.set('view engine','ejs');
const path = require('path');
const { title } = require('process');

app.use(express.static(path.join(__dirname,'public')));


app.use(express.json()) 
app.use(express.urlencoded({extended:true}))



// app.get('/',(req,res)=>{
//     res.render('index');
// })

app.get('/',(req,res)=>{
    fs.readdir(`./hisaab`,(err,files)=>{
        if(err)return res.status(500).send(err);
        res.render('index',{files : files});
    })
})

app.get('/create', (req, res) => {
    res.render('create');
})

app.post('/createhisaab',(req,res)=>{
    let currDate=new Date();
    
    let date = `${currDate.getDate()}-${currDate.getMonth()+1}-${currDate.getFullYear()} (${currDate.getHours()}.${currDate.getMinutes()}.${currDate.getSeconds()}) `;
    
    fs.writeFile(`./hisaab/${req.body.title} ${date}.txt`,req.body.content,(err)=>{
        if(err)return res.status(500).send(err);
        res.redirect('/');
    })
})

app.get('/edit/:filename', (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}` ,"utf-8" ,(err,filedata)=>{
        if(err)return res.status(500).send(err);
        res.render('edit',{filedata,filename : req.params.filename});
    })
})

app.post('/update/:filename',(req,res)=>{
    fs.writeFile(`./hisaab/${req.params.filename}`,req.body.content,(err)=>{
        if(err) return res.status(500).send(err);
        res.redirect('/');
    })
})

app.get('/hisaab/:filename', (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}` ,"utf-8" ,(err,filedata)=>{
        if(err)return res.status(500).send(err);
        res.render('hisaab',{filedata,filename : req.params.filename});
    })
})

app.get('/delete/:filename',(req,res)=>{
    fs.unlink(`./hisaab/${req.params.filename}`,(err)=>{
        if(err)return res.status(500).send(err);
        res.redirect('/');
    })
})


app.listen(3000,()=>{
        console.log('App listening on port http://localhost:3000')
        }
    )