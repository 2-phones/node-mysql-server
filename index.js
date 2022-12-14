import express from 'express';
import cors from 'cors';
import { connection,} from './database.js';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());


app.use(express.json({strict:false}));

app.get('/', (req, res) => {
    res.send('π β±  Hello world! π');
});

app.get('/user', (req, res) => {
    res.send('π β±  Hello world! π');
});


//λ‘κ·ΈμΈ 
app.post('/login',(req,res) => { 
    const { email , password } = req.body;
    connection.query(`SELECT * from userlist where Email = '${email}' and Password = ${password}`, (error, rows, fields) => {
        if(error) throw error;
        !rows.length ? res.status(401).send('μμ΄λνλ¦Ό')
        : res.status(201).send('λ³ΈμΈλ§μ');
  });
  
})

/// νμκ°μ μμ²­
app.post('/signup', (req,res) => {
    console.log(req.body);
    const { id,email,pw } = req.body;
    const useradd = `Insert into userlist (Name,Email,Password) values('${id}','${email}',${pw});`;
    connection.query(useradd,(error,rows) =>{
        error ? res.status(404).send('μ€λ³΅λ μμ΄λ μλλ€!')
        : res.status(200).send('κ°μμλ£!');
    });
   
})

/// νμκ°μ μ‘°ν
app.get('/signup', (req,res) => {
    const useradd = `select * from userlist;`;
    connection.query(useradd,(error,result) =>{
        if(error) throw error;
        res.status(201).send(result);
    });
   
})

// κ²μκΈ λ±λ‘μμ²­
app.post('/postboard',(req,res) => {
    const{name , title, body} = req.body;
    console.log(req.body);
    const useradd = `Insert into posts (Title,Body) values('${title}','${body}');`;
    connection.query(useradd,(error,result) =>{
        error ? res.status(404).send(error)
        : res.status(200).send('κ²μκΈ λ±λ‘ μλ£!');
    });
})

// κ²μκΈ μ‘°νμμ²­
app.get('/posts',(req,res) => {
    const useradd = `select * from posts;`
    connection.query(useradd,(error,result) =>{
        if(error) throw error;
        res.status(201).send(result);
    });
})

const server = app.listen(PORT, () => {
    console.log(`μλ² μ μμ μΌλ‘ μ΄λ ·μ ν¬νΈλ²νΈ : ${PORT}`);
});
