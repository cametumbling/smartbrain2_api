const express = require('express');
const compression = require('compression');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const logout = require('./controllers/logout');
const image = require('./controllers/image');
const auth = require('./middleware/authorization');

// const PORT = process.env.PORT;
// const DATABASE_URL = process.env.DATABASE_URL;
const salt = bcrypt.genSaltSync(10);

/* earliest form of this was:
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'jill',
    password: '',
    database: 'smart-brain'
  }
})
*/
/* attempt #1 for Docker course:
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
})
*/
// attempt #2 for Docker course:
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
});
/*later version of this from intro course after deploying to heroku:
const db = knex({
  client: 'pg',
  connection: {
    //connectionString: process.env.DATABASE_URL,
    connectionString: process.env.POSTGRES_URI,
    ssl: true
  }
});
*/
//const saltRounds = 10;

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(compression());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//app.get('/', (req, res) => { res.send('It works!') })
app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, salt) })
app.get('/profile/:id',  auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/profile/:id',  auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) })
app.put('/image', auth.requireAuth, (req,res) => { image.handleImage(req, res, db) })
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res) })
app.post('/logout', auth.requireAuth, (req, res) => { logout.handleLogout(req, res) });

app.listen(process.env.PORT || 3000, () => {
  if(process.env.PORT) {
  console.log(`app is running on port ${process.env.PORT}`)
  } else if (3000) {
  console.log('App is running on port 3000.')
  }
})

