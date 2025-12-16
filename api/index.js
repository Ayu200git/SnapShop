const serverless = require('serverless-http');
const { connectToDatabase } = require('../backend/utils/db');

let handler;

module.exports = async (req, res) => {
  await connectToDatabase();

  if (!handler) {
    const app = require('../backend/app');
    handler = serverless(app);
  }

  return handler(req, res);
};
