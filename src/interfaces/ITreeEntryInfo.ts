import { IEntryType } from 'src/interfaces/IEntryType';
import ICommitInfo from 'src/interfaces/ICommitInfo';

export default interface ITreeEntryInfo {
  type: IEntryType;
  name: string;
  lastCommit: ICommitInfo;
}
