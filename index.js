const express = require('express');
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Datos iniciales
let clientes = [
  { id: 1, nombre: 'Cliente 1' },
  { id: 2, nombre: 'Cliente 2' },
  { id: 3, nombre: 'Cliente 3' }
];

let productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Ruta para obtener clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta para agregar un cliente
app.post('/clientes', (req, res) => {
  const newCliente = req.body;
  clientes.push(newCliente);
  res.status(201).json(newCliente);
});

// Ruta para actualizar un cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const updatedCliente = req.body;
  
  // Encuentra el índice del cliente a actualizar
  const index = clientes.findIndex(cliente => cliente.id === parseInt(id));
  if (index !== -1) {
    // Actualiza solo las propiedades que han cambiado
    clientes[index] = { ...clientes[index], ...updatedCliente };
    res.json(clientes[index]);
  } else {
    res.status(404).send('Cliente no encontrado');
  }
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  clientes = clientes.filter(cliente => cliente.id !== parseInt(id));
  res.status(204).send();
});

// Ruta para agregar un producto
app.post('/productos', (req, res) => {
  const newProducto = req.body;
  productos.push(newProducto);
  res.status(201).json(newProducto);
});

// Ruta para actualizar un producto
app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const updatedProducto = req.body;
  
  // Encuentra el índice del producto a actualizar
  const index = productos.findIndex(producto => producto.id === parseInt(id));
  if (index !== -1) {
    // Actualiza solo las propiedades que han cambiado
    productos[index] = { ...productos[index], ...updatedProducto };
    res.json(productos[index]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  productos = productos.filter(producto => producto.id !== parseInt(id));
  res.status(204).send({ message: 'Elemento eliminado' });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


