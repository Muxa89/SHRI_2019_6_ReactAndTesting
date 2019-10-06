const cors = require('cors');
const express = require('express');

const treeHandler = () => {
  return (req, res) => {
    res.json([
      {
        name: 'Folder_1',
        type: 'folder',
        commit: 'Last commit 1',
        message: 'Message_1',
        commiter: 'Commiter_1',
        timestamp: 1570392755
      },
      {
        name: 'Folder_2',
        type: 'folder',
        commit: 'Last commit 2',
        message: 'Message_2',
        commiter: 'Commiter_2',
        timestamp: 1570392755
      },
      {
        name: 'Folder_3',
        type: 'folder',
        commit: 'Last commit 3',
        message: 'Message_3',
        commiter: 'Commiter_3',
        timestamp: 1570392755
      },
      {
        name: 'File_1',
        type: 'file',
        commit: 'Last commit 4',
        message: 'Message_4',
        commiter: 'Commiter_4',
        timestamp: 1570392755
      },
      {
        name: 'File_2',
        type: 'file',
        commit: 'Last commit 5',
        message: 'Message_5',
        commiter: 'Commiter_5',
        timestamp: 1570392755
      },
      {
        name: 'File_3',
        type: 'file',
        commit: 'Last commit 6',
        message: 'Message_6',
        commiter: 'Commiter_6',
        timestamp: 1570392755
      }
    ]);
  };
};

function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/api/repos', (req, res) => {
    res.json([
      {
        name: 'Repo_1',
        type: 'folder'
      },
      {
        name: 'Repo_2',
        type: 'folder'
      },
      {
        name: 'Repo_3',
        type: 'folder'
      },
      {
        name: 'Repo_4',
        type: 'folder'
      },
      {
        name: 'Repo_5',
        type: 'folder'
      }
    ]);
  });

  const apiPath = '/api/repos/:repositoryId';
  app.get(`${apiPath}`, treeHandler());
  app.get(`${apiPath}/tree/:commitHash`, treeHandler());
  app.get(`${apiPath}/tree/:commitHash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)`, treeHandler()); //prettier-ignore

  app.get(
    `${apiPath}/blob/:commitHash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)`,
    (req, res) => {
      res.set({
        'Content-Disposition': 'attachment; filename="testfile.txt"'
      });

      res.send('Test content');
    }
  );

  const port = 3000;
  app.listen(port);
  console.log('Server is listening on ' + port);
}

startServer();
