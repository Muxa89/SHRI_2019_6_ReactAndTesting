import * as fs from 'fs';
import { resolve } from 'path';

import { getServer } from './app';

function getRootDir() {
  const rootDir = process.argv[2];

  if (!rootDir) {
    console.error('Repository root path not specified.');
    console.error('Usage: node server.js <repository-path>');
    return false;
  } else if (!fs.existsSync(rootDir)) {
    console.error('Specified repository root path not exists on file system.');
    console.error('Provide correct path.');
    return false;
  }

  return resolve(rootDir);
}

function startServer(root: string) {
  const app = getServer(root);
  const port = 3000;
  app.listen(port, () => {
    console.log('Server is listening on ' + port);
  });
}

(function main() {
  const rootDir = getRootDir();
  if (!rootDir) {
    return;
  }

  console.log('Serving files from: ' + rootDir);

  startServer(rootDir);
})();
