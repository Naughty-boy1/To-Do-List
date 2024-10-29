import fs from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'service-worker.js');
const dest = path.join(process.cwd(), 'dist', 'service-worker.js');

fs.copyFile(src, dest, (err) => {
  if (err) {
    console.error('Error copying file:', err);
  } else {
    console.log('Service worker copied successfully.');
  }
});
