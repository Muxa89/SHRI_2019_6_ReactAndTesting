import * as fs from 'fs';
import { resolve } from 'path';
import * as childProcess from 'child_process';
import { promisify } from 'util';
import ICommitInfo from 'src/interfaces/ICommitInfo';
import ITreeEntryInfo from 'src/interfaces/ITreeEntryInfo';
import { IEntryType } from '../interfaces/IEntryType';
import moment = require('moment');
import { first } from 'lodash';

const execFile = promisify(childProcess.execFile);

export const getGitDir = (folder: string) => {
  return execFile('git', ['-C', folder, 'rev-parse', '--git-dir']).then(out => out.stdout.replace(/^\s+|\s+$/g, ''));
};

interface getAllRepositoriesCallback {
  (err: Error | null, res: Array<string>): void;
}

export const getAllRepositories = (root: string, callback: getAllRepositoriesCallback): void => {
  fs.readdir(root, { withFileTypes: true }, (err, files) => {
    const folders = files.filter(file => file.isDirectory()).map(file => file.name);

    const res: Array<string> = [];

    Promise.all(
      folders.map(folder =>
        getGitDir(resolve(root, folder))
          .then(() => {
            res.push(folder);
          })
          .finally(() => Promise.resolve())
      )
    ).then(() => {
      res.sort();
      callback(null, res);
    });
  });
};

enum FileTreeObjectType {
  FILE = 'file',
  FOLDER = 'folder'
}

interface FileTreeObject {
  name: string;
  type: FileTreeObjectType;
}

function sortFilesTree(a: FileTreeObject, b: FileTreeObject): number {
  if (a.type === 'folder' && b.type !== 'folder') {
    return -1;
  } else if (a.type !== 'folder' && b.type === 'folder') {
    return 1;
  } else {
    return a.name < b.name ? -1 : 1;
  }
}

export interface FilesTreeParams extends GetFilesTreeInfoParams {
  gitFolder: string;
}

export const getFilesTree = ({ folder, gitFolder, hash, treePath }: FilesTreeParams) => {
  const command = 'git';
  const params = ['--git-dir', resolve(folder, gitFolder), 'show', (hash || 'master') + ':' + (treePath || '')];

  return execFile(command, params).then(out => {
    const lines = out.stdout.split('\n');
    lines.splice(0, 2);
    lines.splice(lines.length - 1, 1);

    const res = lines
      .map(
        line =>
          ({
            name: line.replace('/', ''),
            type: line.indexOf('/') === -1 ? 'file' : 'folder'
          } as FileTreeObject)
      )
      .sort(sortFilesTree);

    return res;
  });
};

export const getFileInfo = ({ folder, gitFolder, hash, treePath }: FilesTreeParams) => {
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

interface GetFilesTreeInfoParams {
  folder: string;
  hash: string;
  treePath: string;
}

export interface FileTreeInfoObject {
  name: string;
  type: FileTreeObjectType;
  commit: string;
  message: string;
  commiter: string;
  timestamp: string;
}

export const getFilesTreeInfo = ({ folder, hash, treePath }: GetFilesTreeInfoParams) => {
  hash = hash || 'master';
  treePath = treePath || '';
  return getGitDir(folder).then(gitFolder =>
    getFilesTree({ folder, gitFolder, hash, treePath }).then(files => {
      const res: Array<FileTreeInfoObject> = [];

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

export interface GetBlobContentPromiseParams {
  folder: string;
  hash: string;
  blobPath: string;
}

export const getBlobContentPromise = ({ folder, hash, blobPath }: GetBlobContentPromiseParams) => {
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

const executeCommand = (command: string, args: string[]): Promise<string[]> => {
  // TODO add error handler
  return new Promise(res => {
    const output: string[] = [];
    const child = childProcess.spawn(command, args);
    child.stdout.on('data', data => output.push(data.toString()));
    child.stdout.on('close', () => res(output));
  });
};

const executeGitCommand = async (folder: string, args: string[]): Promise<string[]> => {
  const gitDir = await getGitDir(folder);
  return await executeCommand('git', ['--git-dir', `${resolve(folder, gitDir)}`, ...args]);
};

export const getBranches = async (folder: string): Promise<string[]> => {
  const branchesListOutput = await executeGitCommand(folder, ['branch', '--list']);
  return branchesListOutput
    .join(' ')
    .split('\n')
    .map(br => br.replace(/[\s*]/g, ''))
    .filter(br => br !== '');
};

const getGitDirNew = async (folder: string): Promise<string | null> => {
  try {
    const output = await executeCommand('git', ['-C', folder, 'rev-parse', '--git-dir']);
    return output[0]?.replace(/\s/g, '');
  } catch (err) {
    return null;
  }
};

export const getRepositories = async (root: string): Promise<string[]> => {
  const entries = await fs.promises.readdir(root, { withFileTypes: true });
  const repositories: string[] = [];
  await Promise.all(
    entries
      .filter(entry => entry.isDirectory())
      .map(async directory => {
        const directoryContainsGitDir = await getGitDirNew(resolve(root, directory.name));
        if (directoryContainsGitDir) {
          repositories.push(directory.name);
        }
      })
  );
  return repositories;
};

export const getCommits = async (
  directory: string,
  hash: string,
  limit: number,
  path?: string
): Promise<ICommitInfo[]> => {
  const args = ['log', '--pretty=format:"%h||%an||%at||%s"', '-n', `${limit}`, hash];
  if (path) {
    args.push(path);
  }
  const gitLogOutput = await executeGitCommand(directory, args);
  const matcher = /"(.*)\|\|(.*)\|\|(.*)\|\|(.*)"/;
  const result: ICommitInfo[] = [];

  gitLogOutput
    .map(line => line.match(matcher))
    .forEach(match => {
      if (!match) {
        return;
      }
      const [, hash, author, timestamp, message] = match;
      result.push({
        hash,
        author,
        timestamp: moment(+timestamp).valueOf() * 1000,
        message
      });
    });

  return result;
};

interface ITreeEntry {
  type: IEntryType;
  name: string;
}

const getTreeEntries = async (directory: string, hash: string, path: string): Promise<ITreeEntry[]> => {
  const result: ITreeEntry[] = [];

  const lsTreeOutput = await executeGitCommand(directory, ['ls-tree', `${hash}:${path}`]);

  // "<mode> <type> <object>\t<file>", see https://git-scm.com/docs/git-ls-tree#_output_format
  const matcher = /(\w+) (\w+) (\w+)\t(.+)/;

  lsTreeOutput
    .join('\n')
    .split('\n')
    .map(line => line.match(matcher))
    .forEach(match => {
      if (match && match[2] && match[4]) {
        result.push({
          type: match[2] === 'blob' ? IEntryType.FILE : IEntryType.FOLDER,
          name: match[4]
        });
      }
    });

  return result;
};

export const getEntriesWithInfo = async (directory: string, hash: string, path: string): Promise<ITreeEntryInfo[]> => {
  const entries = await getTreeEntries(directory, hash, path);
  return await Promise.all(
    entries.map(async entry => {
      const lastCommit = first(await getCommits(directory, hash, 1, `${path}${path ? '/' : ''}${entry.name}`));

      if (!lastCommit) {
        throw new Error('Could not receive information for last commit');
      }

      const result: ITreeEntryInfo = {
        type: entry.type,
        name: entry.name,
        lastCommit
      };
      return result;
    })
  );
};

module.exports = {
  getAllRepositories,
  getBlobContentPromise,
  getFileInfo,
  getFilesTree,
  getFilesTreeInfo,
  getGitDir,
  getBranches,
  getRepositories,
  getCommits,
  getEntriesWithInfo
};
