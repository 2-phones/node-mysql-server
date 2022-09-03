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

app.post('/users', (req,res) => {
    console.log(req.body);
    const { name,email,pw } = req.body;
    const useradd = `Insert into userlist (Name,Email,Password) values(${name},${email},password(${pw}));`;
   connection.query(useradd);
    res.status(200).send('가입완료!');
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