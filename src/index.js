import 'dotenv/config';
import Server from './Server.js';

const server = new Server().app;
const PORT = process.env.SERVER_PORT || process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});