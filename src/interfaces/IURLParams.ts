import { ViewMode } from 'src/interfaces/ViewMode';

export default interface IURLParams {
  repositoryId?: string;
  path?: string;
  hash?: string;
  mode?: ViewMode;
}
