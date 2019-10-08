const { resolve } = require('path');

const cors = require('cors');
const express = require('express');

const { getAllRepositories, getBlobContentPromise, getFilesTreeInfo } = require('./api.js');

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

module.exports.getServer = function getServer(root) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/api/repos', (req, res) => {
    getAllRepositories(root, (err, repos) => {
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

  return app;
}