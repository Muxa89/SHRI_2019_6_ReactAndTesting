export const blobPath = '/:repositoryId/:mode(blob)/:hash/:path*';

export const treeModePath = [
  '/:repositoryId/:mode(tree)/hash/:hash/path/:path*',
  '/:repositoryId/:mode(tree)/path/:path*',
  '/:repositoryId/:mode(tree)/hash/:hash',
  '/:repositoryId/:mode(tree)',
  '/:repositoryId'
];

export const HUMAN_READABLE_DATE_TIME_FORMAT = 'Do MMM YY HH:mm:ss';
export const FULL_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm:ss';
