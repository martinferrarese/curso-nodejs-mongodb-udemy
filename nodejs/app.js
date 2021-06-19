const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = "mongodb+srv://ferra31:5173arrefmfzzz@comiditacluster0.qcw0g.mongodb.net/comidita-database?retryWrites=true&w=majority";
const Item = require('./views/models/items');

app.use(express.urlencoded({extended: true}));
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(3000);
  })
  .catch(err => console.error('No se pudo conectar a la base de datos: ' + err));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('./get-items');
});

app.get('/get-items', (req, res) => {
  Item.find()
    .then(resultado => {
      res.render('index', {items: resultado});
    })
    .catch(err => res.send(err)
    );
});

app.post('/create-new-item', (req, res) => {
  const item = Item(req.body);
  item.save().then(resultado => res.redirect('/get-items')).catch(err => res.send(err));
});

app.get('/add-item', (req, res) => {
  res.render('add-item')
});

// Se usa para cuando el request no coincide con ningún endpoint existente
// Tiene que ir abajo de todo porque si no se come el request
app.use((req, res) => {
    res.render('error')
});