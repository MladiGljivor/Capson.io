const {Pool} = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'pg',
    database: 'Capson',
    password: 'root',
    port: 5432,

});

const sql_create_users = 
`
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username text NOT NULL UNIQUE,
    rating int,
    passwordHash text NOT NULL

);
`;


async function seed() {
await pool.query(sql_create_users,[])

}

const connectToDB = async () => {
    try {
      await pool.connect();
    } catch (err) {
      console.log(err);
    }
  };
  connectToDB().then(seed());
module.exports=pool;