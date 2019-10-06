/* eslint-disable no-undef */

import { getGitDir } from '../src/server/api.js';

test('123', () => {
  getGitDir('C:/Muxa/Helper')
    .then(dir => console.log(dir))
    .catch(() => {})
    .finally(() => {});
});
