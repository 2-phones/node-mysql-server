import express from 'express';
import ngrok from 'ngrok'
import cors from 'cors';
import { connection,} from './database.js';


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json({strict:false}));

app.get('/', (req, res) => {
    res.send('Hello world!');
});


app.get('/users',(req,res) => { 

    connection.query('SELECT * from topic', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
  
})

/// 회원가입 요청
app.post('/users', (req,res) => {
    console.log(req.body);
    const { name,email,pw } = req.body;
    const useradd = `Insert into userlist (Name,Email,Password) values(${name},${email},${pw});`;
    connection.query(useradd,(error,rows) =>{
        error ? res.status(404).send(error)
        : res.status(200).send('가입완료!');
    });
   
})

// 게시글 등록요청
app.post('/Postboard',(req,res) => {
    const{name , title, body} = req.body;
    const useradd = `Insert into posts values('${name}','${title}','${body}');`;
    connection.query(useradd,(error,rows) =>{
        error ? res.status(404).send(error)
        : res.status(200).send('게시글 등록 완료!');
    });
})

// 게시글 조회요청
app.get('/Postboard',(req,res) => {
    const useradd = `select * from posts;`
    connection.query(useradd,(error,rows) =>{
        error ? res.status(404).send(error)
        : res.status(200).send(rows);
    });
})

const server = app.listen(8080, () => {
    console.log('Running at 8080');
});

ngrok.connect({
    proto : 'http',
    addr : process.env.PORT,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    }
});