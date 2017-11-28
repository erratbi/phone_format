import express from "express";
import bodyParser from 'body-parser';
import fs from "fs";
import { resolve } from "path";

const app = express();

app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');

app.get('/*', (req, res) => {
    
  return res.render("index");
});

app.post('/*', (req, res) => {
    if(!req.body.data) return res.status(400);
    const { data } = req.body;

    const phones = data
      .split(/(\r\n\r\n)/)
      .map(line => {
        if (line !== "\r\n\r\n") return line.replace(/^\+(\d{2,3})(\d{3})(\d{3})(\d{3})$/, "+$1 $2 $3 $4");
      })
      .filter(line => !!line);

    return res.render("index", { phones: phones.join("\n")});
});


app.listen(3000, () => console.log( 'Server running...'));