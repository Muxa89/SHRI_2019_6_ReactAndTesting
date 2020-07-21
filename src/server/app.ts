import { resolve } from 'path';
import * as cors from 'cors';
import * as express from 'express';
import { Express, Request, Response } from 'express';
import { api } from '../util/api';
import { first } from 'lodash';

import {
  getAllRepositories,
  getBlobContentPromise,
  GetBlobContentPromiseParams,
  getBranches,
  getCommits,
  getEntriesWithInfo,
  getFilesTreeInfo,
  getRepositories
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

export function getServer(root: string): Express {
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

  app.get(`${apiPath}/blob/:commitHash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)`, (req, res) =>
    getBlobContentPromise({
      folder: resolve(root, req.params.repositoryId),
      hash: req.params.commitHash,
      blobPath: req.params.path
    } as GetBlobContentPromiseParams).then(content => {
      const pathParts = req.params.path.split('/').filter(part => part !== '');

      res.set({
        'Content-Disposition': `attachment; filename="${pathParts[pathParts.length - 1]}"`
      });

      res.send(content);
    })
  );

  app.get(api.branches.path, async (req, res) => {
    const params = req.params as typeof api.branches.params;
    res.send(await getBranches(resolve(root, params.repository)));
  });

  app.get(api.repositories.path, async (req, res) => {
    res.send(await getRepositories(resolve(root)));
  });

  app.get(api.lastCommit.path, async (req, res) => {
    const { repository, branch } = req.params as typeof api.lastCommit.params;
    const commits = await getCommits(resolve(root, repository), branch, 1);
    res.send(first(commits));
  });

  app.get(api.tree.path, async (req, res) => {
    const { repository, hash, path } = req.params as typeof api.tree.params;
    res.send(await getEntriesWithInfo(resolve(root, repository), hash, path || ''));
  });

  return app;
}
