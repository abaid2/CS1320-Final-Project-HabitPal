// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));