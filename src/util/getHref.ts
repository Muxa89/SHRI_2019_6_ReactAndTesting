import { URLParams } from 'src/interfaces/URLParams';

export const getHref = ({ repositoryId, mode, hash, path }: URLParams): string => {
  const modeChunk = hash || path || mode ? (mode === undefined ? '/tree' : `/${mode}`) : '';
  const hashChunk = hash ? '/hash/' + hash : '';
  const pathChunk = path ? '/path/' + path : '';
  return `/${repositoryId}${modeChunk}${hashChunk}${pathChunk}`;
};
