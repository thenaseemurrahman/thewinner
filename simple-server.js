import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Serve static files from the project root
app.use(express.static('.'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Test API page: http://localhost:${PORT}/test-api.html`);
    console.log('Press Ctrl+C to stop the server');
});
