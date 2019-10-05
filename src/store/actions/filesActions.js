import axios from 'axios';
import { setInfoTableItems } from './infoTableActions';

function pad(num) {
  var s = num + '';
  while (s.length < 2) s = '0' + s;
  return s;
}

function formatDate(date) {
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

export function loadFiles(repositoryId, hash, treePath) {
  return function(dispatch) {
    let requestAddress = 'http://localhost:3000/api/repos';
    if (repositoryId !== undefined) {
      requestAddress += `/${repositoryId}`;

      if (hash !== undefined) {
        requestAddress += `/tree/${hash}`;

        if (treePath !== undefined) {
          requestAddress += `/${treePath}`;
        }
      }
    }

    return axios.get(requestAddress).then(response =>
      dispatch(
        setInfoTableItems(
          response.data.map(item => ({
            name: item.name,
            type: item.type,
            commit: item.commit ? item.commit.slice(0, 6) : '',
            message: item.message || '',
            commiter: item.commiter || '',
            date: item.timestamp
              ? formatDate(new Date(+item.timestamp * 1000))
              : ''
          }))
        )
      )
    );
  };
}
