const db = require("./db")

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
await db.query(sql_create_users,[])

}

seed();