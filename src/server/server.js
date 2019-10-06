const fs = require('fs');
const { resolve } = require('path');

const cors = require('cors');
const express = require('express');

const { getAllRepositories, getBlobContentPromise, getFilesTreeInfo } = require('./api.js');

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

const treeHandler = (root) => {
  return (req, res) => {
    getFilesTreeInfo({
      folder: resolve(root, req.params.repositoryId),
      hash: req.params.commitHash,
      treePath: req.params.path
    })
      .then(files => res.json(files))
      .catch(err => res.json(err));
  };
}

function startServer(root) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/api/repos', (req, res) => {
    getAllRepositories(root, repos => {
      res.json(
        repos.map(file => ({
          name: file,
          type: 'folder'
        }))
      );
    });
  });

  const apiPath = '/api/repos/:repositoryId';
  app.get(`${apiPath}`, treeHandler(root));
  app.get(`${apiPath}/tree/:commitHash`, treeHandler(root));
  app.get(`${apiPath}/tree/:commitHash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)`, treeHandler(root)); //prettier-ignore

  app.get(
    `${apiPath}/blob/:commitHash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)`,
    (req, res) =>
      getBlobContentPromise(
        resolve(root, req.params.repositoryId),
        req.params.commitHash,
        req.params.path
      ).then(content => {
        const pathParts = req.params.path
          .split('/')
          .filter(part => part !== '');

        res.set({
          'Content-Disposition': `attachment; filename="${
            pathParts[pathParts.length - 1]
          }"`
        });

        res.send(content);
      })
  );

  const port = 3000;
  app.listen(port);
  console.log('Server is listening on ' + port);
}

function main() {
  const rootDir = getRootDir();
  if (!rootDir) {
    return;
  }

  console.log('Serving files from: ' + rootDir);

  startServer(rootDir);
}

main();
