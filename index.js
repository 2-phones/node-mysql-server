import express from 'express';
import cors from 'cors';
import { connection,} from './database.js';


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json({strict:false}));

app.get('/', (req, res) => {
    res.send('Hello world!');
});


//로그인 
app.post('/login',(req,res) => { 
    const { email , password } = req.body;
    connection.query(`SELECT * from userlist where Email = '${email}' and Password = ${password}`, (error, rows, fields) => {
        if(error) throw error;
        !rows.length ? res.status(401).send('아이디틀림')
        : res.status(201).send('본인맞음');
  });
  
})

/// 회원가입 요청
app.post('/SignUp', (req,res) => {
    console.log(req.body);
    const { name,email,pw } = req.body;
    const useradd = `Insert into userlist (Name,Email,Password) values(${name},${email},${pw});`;
    connection.query(useradd,(error,rows) =>{
        error ? res.status(404).send(error)
        : res.status(200).send('가입완료!');
    });
   
})

// 게시글 등록요청
app.post('/postboard',(req,res) => {
    const{name , title, body} = req.body;
    console.log(req.body);
    const useradd = `Insert into posts values('${name}',${title},${body});`;
    connection.query(useradd,(error,result) =>{
        error ? res.status(404).send(error)
        : res.status(200).send('게시글 등록 완료!');

    });
})

// 게시글 조회요청
app.get('/posts',(req,res) => {
    const useradd = `select * from posts;`
    connection.query(useradd,(error,result) =>{
        if(error) throw error;
        console.log(result);
        res.status(201).send(result);
    });
})
