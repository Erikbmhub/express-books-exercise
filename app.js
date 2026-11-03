const express = require("express"); //Importa el modulo
const books = require(`./data/books.json`);
const app = express(); //Crea el servidor
const port = 3000; // Ruta a servidor

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Ejercicio 1 Crea una ruta /all para obtener todos los libros
app.get("/all", (req, res) => {
  res.status(200).json(books);
});
// Ejercicio 2 Crea una ruta /first para obtener el primer libro
app.get("/first", (req, res) => {
  res.status(200).json(books[0]);
});
// Ejercicio 3 Crea una ruta /last para obtener el último libro
// http://localhost:3000/last
app.get("/last", (req, res) => {
  const ultimoLibro = books[books.length - 1];
  res.status(200).json(ultimoLibro);
});
// Ejercicio 4 Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
// http://localhost:3000/middle
app.get("/middle", (req, res) => {
  const libro50 = books[Math.floor(books.length / 2)];
  res.status(200).json(libro50);
});
// Ejercicio 5 Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
// http://localhost:3000/author/dante-alighieri
app.get("/author/dante-alighieri", (req, res) => {
  const libroDante = books.find((book) => book.author === "Dante Alighieri");
  if (!libroDante) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }
  const tituloDante = libroDante.title;
  res.status(200).json(tituloDante);
});
// Ejercicio 6 Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
// http://localhost:3000/country/charles-dickens
app.get("/country/charles-dickens", (req, res) => {
  const libroDickens = books.find(
    (book) => book.author.toLocaleLowerCase() === "charles dickens",
  );
  if (!libroDickens) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }
  const paisdelLibro = libroDickens.country;
  res.status(200).json(paisdelLibro);
});
// Ejercicio 7 Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes,Ejemplo de respuesta: { pages: ..., year: ... }
// http://localhost:3000/year&pages/cervantes
app.get("/year&pages/cervantes", (req, res) => {
  const libroCervantes = books.find(
    book => book.author.toLowerCase() === "miguel de cervantes"
  );
  if (!libroCervantes) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }
  const {pages,year}= libroCervantes
  const resultado = {pages,year}
/* const anioLibro = libroCervantes.year;
  const resultado = { 
    pages : paginasLibro, 
    year : anioLibro 
  };
  const paginasLibro = libroCervantes.pages;*/
  res.status(200).json(resultado);
}); 
// Ejercicio 8 Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
// http://localhost:3000/country/count/spain
app.get("/country/count/spain", (req, res) => {
    const librosEspana = books.filter(book => book.country === "Spain");
    if (!librosEspana) {
        return res.status(404).json({message:"Libros no encontrados"});
    }
const totalLibros = librosEspana.length;
    res.status(200).json(totalLibros);
});
// Ejercico 9 Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
// http://localhost:3000/country/at-least/germany
app.get("/country/at-least/germany", (req, res) => { 
const librosAlemanes = books.find(book => book.country === "Germany")
if (!librosAlemanes) { 
    return res.status(404).send(false)
}
res.status(200).send(true)
});
// Ejercicio 10 Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas
// http://localhost:3000/pages/all-greater/200
app.get("/pages/all-greater/200", (req, res) => {
    const todosTienenMasDe200  = books.every(book => book.pages > 200)
    if (!todosTienenMasDe200) {
        return res.status(404).json(false)
    }
  res.status(200).json(true);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

