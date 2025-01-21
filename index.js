import express from "express";
import bodyparser from "body-parser";
import fs from "fs";
import { parse } from "path";

/* Generamos la aplicacion express con: */
const app = express();
app.use(bodyparser.json());

const readData = () => {
    try{
        const data = fs.readFileSync("db.json");
        console.log(data);
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }
    catch (err) {
        console.error(err);
    }
}

readData();

console.log(readData());

app.listen(3000, () => {
  console.log("Servidor en marcha en http://localhost:3000");
}
);

app.get("/", (req, res) => {
    res.send("Hola gente");
});


/* Para verlos todos */
app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
});

/* Para ver con id */
app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book);
});


const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    
    }
    catch (err) {
        console.error(err);
    
    }
}

/* Para añadir uno nuevo */
app.post("/books", (req, res) => {
    const data = readData();
    const newBook = req.body;
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
}
);