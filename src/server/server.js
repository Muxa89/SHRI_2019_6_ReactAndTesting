const fs = require('fs');
const { resolve } = require('path');
// const { execFile, spawn } = require('child_process');
const childProcess = require('child_process');
const { promisify } = require('util');

const cors = require('cors');
const express = require('express');

const execFile = promisify(childProcess.execFile);

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

function getGitDir(folder) {
  return execFile('git', ['-C', folder, 'rev-parse', '--git-dir']).then(out =>
    out.stdout.replace(/^\s|\s$/g, '')
  );
}

function getAllRepositories(root, callback) {
  fs.readdir(root, { withFileTypes: true }, (err, files) => {
    const folders = files
      .filter(file => file.isDirectory())
      .map(file => file.name);

    const res = [];

    Promise.all(
      folders.map(folder =>
        getGitDir(resolve(root, folder))
          .then(() => {
            res.push(folder);
          })
          .catch(() => {})
          .finally(() => Promise.resolve())
      )
    ).then(() => {
      res.sort();
      callback(res);
    });
  });
}

function sortFilesTree(a, b) {
  if (a.type === 'folder' && b.type !== 'folder') {
    return -1;
  } else if (a.type !== 'folder' && b.type === 'folder') {
    return 1;
  } else {
    return a.name < b.name ? -1 : 1;
  }
}

function getFilesTree({ folder, gitFolder, hash, treePath }) {
  const command = 'git';
  const params = [
    '--git-dir',
    resolve(folder, gitFolder),
    'show',
    (hash || 'master') + ':' + (treePath || '')
  ];

  return execFile(command, params).then(out => {
    const lines = out.stdout.split('\n');
    lines.splice(0, 2);
    lines.splice(lines.length - 1, 1);

    const res = lines
      .map(line => ({
        name: line.replace('/', ''),
        type: line.indexOf('/') === -1 ? 'file' : 'folder'
      }))
      .sort(sortFilesTree);

    return res;
  });
}

function getFileInfo({ folder, gitFolder, hash, treePath }) {
  const command = 'git';
  const params = [
    '--git-dir',
    resolve(folder, gitFolder),
    'log',
    '-1',
    '--format=%H%n%s%n%an%n%ad',
    '--date=unix',
    hash,
    '--',
    treePath
  ];

  return execFile(command, params).then(out => {
    const [lastCommit, message, commiter, timestamp] = out.stdout.split('\n');

    return {
      lastCommit,
      message,
      commiter,
      timestamp
    };
  });
}

function getFilesTreeInfo({ folder, hash, treePath }) {
  hash = hash || 'master';
  treePath = treePath || '';
  return getGitDir(folder).then(gitFolder =>
    getFilesTree({ folder, gitFolder, hash, treePath }).then(files => {
      const res = [];

      return Promise.all(
        files.map(file =>
          getFileInfo({
            folder,
            gitFolder,
            hash,
            treePath: `${treePath}${treePath !== '' ? '/' : ''}${file.name}`
          }).then(info => {
            res.push({
              name: file.name,
              type: file.type,
              commit: info.lastCommit,
              message: info.message,
              commiter: info.commiter,
              timestamp: info.timestamp
            });
            return Promise.resolve();
          })
        )
      ).then(() => {
        res.sort(sortFilesTree);
        return res;
      });
    })
  );
}

function getBlobContentPromise(folder, hash, blobPath) {
  return getGitDir(folder).then(
    gitFolder =>
      new Promise((res, rej) => {
        let content = '';

        const gitProcess = childProcess.spawn('git', [
          '--git-dir',
          resolve(folder, gitFolder),
          'show',
          hash + ':' + blobPath
        ]);

        gitProcess.stdout.on('data', data => {
          content += data;
        });

        gitProcess.stderr.on('data', data => rej(data));

        gitProcess.on('close', () => {
          res(content);
        });
      })
  );
}

function treeHandler(root) {
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
