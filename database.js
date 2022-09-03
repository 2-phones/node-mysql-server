import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456789',
  database :  'stackoverflow'
});







// connection.query('SELECT * from topic', (error, rows, fields) => {
//   if (error) throw error;
//   console.log('User info is: ', rows);
//   return rows;
// });


export { mysql, connection, }