const express = require('express');
const mongoose = require('./config/database');
const path = require('path');
const logger = require('morgan');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const clienteSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String
});

const Cliente = mongoose.model('Cliente', clienteSchema);

app.listen(3000, () => {
  console.log('Servidor foi iniciado http://localhost:3000');
});

app.post("/cliente", async (req, res) => {
  const { id, name, email } = req.body;

  try {
    const novoCliente = new Cliente({ id, name, email });
    await novoCliente.save();
    console.log('Cliente adicionado:', novoCliente);
    res.json(novoCliente);
  } catch (error) {
    console.error('Erro ao salvar cliente no MongoDB:', error);
    res.status(500).json({ error: 'Erro ao salvar cliente no MongoDB.' });
  }
});

app.get('/cliente', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes no MongoDB:', error);
    res.status(500).json({ error: 'Erro ao listar clientes no MongoDB.' });
  }
});

app.use('/users', usersRouter);

app.listen(3001, () => {
  console.log('Servidor está escutando na porta 3001');
});

module.exports = app;
