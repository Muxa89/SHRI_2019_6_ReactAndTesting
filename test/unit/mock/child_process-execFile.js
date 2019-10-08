/* eslint-disable no-undef */
jest.mock('child_process');

require('child_process').execFile.mockImplementation((command, args, cb) => {
  if (command === 'git') {
    if (args[2] === 'rev-parse') {
      if (args[1] && args[1].indexOf('Repo4') !== -1) {
        throw new Error('not found');
      } else {
        cb(null, { stdout: '.git  \n' });
      }
    } else if (args[2] === 'show') {
      cb(null, {
        stdout: `tree master:

.babelrc
.dockerignore
.gitignore
.gitlab/
README.md
build.sh
config/
dockerfiles/
increment_version.sh
package-lock.json
package.json
push.sh
run.sh
server/
src/
webpack.config.js
`
      });
    } else if (args[2] === 'log') {
      cb(null, {
        stdout: `abc123
Message
Author
1545059710
        `
      });
    }
  }
});
