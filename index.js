const express = require('express');
const path = require('path');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

// Configurar middleware para parsear el body de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para generar el código QR
app.post('/generate', (req, res) => {
  const url = req.body.url;

  QRCode.toDataURL(url, (err, src) => {
    if (err) return res.status(500).send('Error al generar el código QR');

    res.json({ src });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
