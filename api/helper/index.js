const crypto = require("crypto");
const StreamChat = require('stream-chat').StreamChat;
require('dotenv').config();

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};
const { STREAM_API_KEY, STREAM_API_SECRET } = process.env;

const client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);
module.exports = { generateSecretKey, client };
