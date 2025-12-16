const serverless = require('serverless-http');
const { connectToDatabase } = require('../backend/utils/db');

let handler = null;

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error('DB connection error in serverless wrapper:', err);
    res.statusCode = 500;
    res.end('Database connection error');
    return;
  }

  if (!handler) {
    const app = require('../backend/app');
    handler = serverless(app);
  }

  return handler(req, res);
};
