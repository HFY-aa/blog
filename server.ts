import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support large base64 uploads for images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API to list photos in volunteer folders
  app.get('/api/photos/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const folderPath = path.join(process.cwd(), 'public', 'assets', 'volunteer', category);
      
      try {
        const files = await fs.readdir(folderPath);
        // Map to public URLs and filter for images
        const photos = files
          .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .map(file => `/assets/volunteer/${category}/${file}`);
        
        res.json({ photos });
      } catch (err) {
        // If folder empty or doesn't exist, return empty
        res.json({ photos: [] });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to list photos' });
    }
  });

  // API to upload files to volunteer folders
  app.post('/api/upload/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const { files } = req.body;
      
      if (category === 'hui-ta') {
        return res.status(403).json({ error: 'Upload is prohibited for the activity of drawing the fence (hui-ta).' });
      }
      
      if (!files || !Array.isArray(files)) {
        return res.status(400).json({ error: 'Invalid body, files array required.' });
      }

      const folderPath = path.join(process.cwd(), 'public', 'assets', 'volunteer', category);
      // Ensure folder exists
      await fs.mkdir(folderPath, { recursive: true });

      for (const file of files) {
        const { name, data } = file;
        if (!name || !data) continue;

        const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const filePath = path.join(folderPath, name);
        await fs.writeFile(filePath, buffer);
      }

      res.json({ success: true, message: `${files.length} images saved directly.` });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Upload failed' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
