const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  res.write("I'm alive");

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
