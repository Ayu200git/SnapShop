require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');
 

const apiProductsRoutes = require('./routes/api/products');
const apiAuthRoutes = require('./routes/api/auth');
const apiCartRoutes = require('./routes/api/cart');
const apiOrderRoutes = require('./routes/api/orders');
const apiAdminRoutes = require('./routes/api/admin');

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(upload.single('image'));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Serverless API running'
  });
});

app.use('/api/products', apiProductsRoutes);
app.use('/api/auth', apiAuthRoutes);
app.use('/api/cart', apiCartRoutes);
app.use('/api/orders', apiOrderRoutes);
app.use('/api/admin', apiAdminRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl
  });
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error('API Error:', {
    status,
    message,
    path: req.originalUrl
  });

  res.status(status).json({
    error: message
  });
});

module.exports = app;
