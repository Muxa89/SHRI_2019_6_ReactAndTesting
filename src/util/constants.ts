export const blobPath = '/:repositoryId/:mode(blob)/:hash/:path*';

export const treeModePath = [
  '/:repositoryId/:mode(tree)/hash/:hash/path/:path*',
  '/:repositoryId/:mode(tree)/path/:path*',
  '/:repositoryId/:mode(tree)/hash/:hash',
  '/:repositoryId/:mode(tree)',
  '/:repositoryId'
];
