import { IEntryType } from 'src/interfaces/IEntryType';

export default interface ITreeEntryInfo {
  type: IEntryType;
  name: string;
  hash: string;
  lastMessage: string;
  author: string;
  timestamp: number;
}
