import { resolve } from 'path';
import * as cors from 'cors';
import * as express from 'express';
import { Request, Response } from 'express';

import {
  getAllRepositories,
  getBlobContentPromise,
  getFilesTreeInfo,
  GetBlobContentPromiseParams
} from './api';

const treeHandler = (root: string) => {
  return (req: Request, res: Response) => {
    getFilesTreeInfo({
      folder: resolve(root, req.params.repositoryId),
      hash: req.params.commitHash,
      treePath: req.params.path
    })
      .then(files => res.json(files))
      .catch(err => res.json(err));
  };
};

export function getServer(root: string) {
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
      getBlobContentPromise({
        folder: resolve(root, req.params.repositoryId),
        hash: req.params.commitHash,
        blobPath: req.params.path
      } as GetBlobContentPromiseParams).then(content => {
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
};
