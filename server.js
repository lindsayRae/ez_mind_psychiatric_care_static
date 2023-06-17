import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { emailRoute } from './routes/emailRoute.js';

//! https://www.npmjs.com/package/dotenv
// configure the package
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.static('public'));
app.use(express.json()); // our server can accept json in body of request
// https://nodejs.org/api/path.html#pathresolvepaths
// If no path segments are passed, path.resolve() will return the absolute path of the current working directory.
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  app.get('/', async (req, res) => {
    res.send('Hello in prod');
  });
}

app.post('/sendEmail', (req, res) => {
  emailRoute(req, res);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
