const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
require('../src/Middleware/passport-setup');

const {
  dateTime,
  event,
  getAllEvents,
} = require("../src/Controller/eventController");

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

// // Auth middleware that checks if the user is logged in
// const isLoggedIn = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example 
app.get('/', (req, res) => res.send('Example Home page!'))


// Auth Routes
app.get('/rest/v1/calendar/init/', passport.authenticate('google', { scope: ['profile', 'email'] }));



//READ All Events
router.get("/rest/v1/calendar/redirect/", async (req, res) => {
  try {
    const { start, end } = req.body;
    const eventData = await getAllEvents(start, end);
    res.send(eventData);
  } catch (error) {
    res.status(400).send(error);
  }
});



app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))