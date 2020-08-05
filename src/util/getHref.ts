import IURLParams from 'src/interfaces/IURLParams';
import { ViewMode } from 'src/interfaces/ViewMode';

export const getHref = ({ repositoryId, mode, hash, path }: IURLParams): string => {
  const modeChunk = hash || path || mode ? `/${mode || ViewMode.TREE}` : '';
  const hashChunk = hash ? '/hash/' + hash : '';
  const pathChunk = path ? '/path/' + path : '';
  return `/${repositoryId}${modeChunk}${hashChunk}${pathChunk}`;
};
