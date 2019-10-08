const fs = require('fs');
const { resolve } = require('path');
const childProcess = require('child_process');
const { promisify } = require('util');
const execFile = promisify(childProcess.execFile);

const getGitDir = folder => {
  return execFile('git', ['-C', folder, 'rev-parse', '--git-dir']).then(out =>
    out.stdout.replace(/^\s+|\s+$/g, '')
  );
};

const getAllRepositories = (root, callback) => {
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
      callback(null, res);
    });
  });
};

function sortFilesTree(a, b) {
  if (a.type === 'folder' && b.type !== 'folder') {
    return -1;
  } else if (a.type !== 'folder' && b.type === 'folder') {
    return 1;
  } else {
    return a.name < b.name ? -1 : 1;
  }
}

const getFilesTree = ({ folder, gitFolder, hash, treePath }) => {
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
};

const getFileInfo = ({ folder, gitFolder, hash, treePath }) => {
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
};

const getFilesTreeInfo = ({ folder, hash, treePath }) => {
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
};

const getBlobContentPromise = (folder, hash, blobPath) => {
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
};

module.exports = {
  getAllRepositories,
  getBlobContentPromise,
  getFileInfo,
  getFilesTree,
  getFilesTreeInfo,
  getGitDir
};
