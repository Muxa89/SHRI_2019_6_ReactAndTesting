import { IEntryType } from 'src/interfaces/IEntryType';

export default interface IFileInfo {
  type: IEntryType;
  name: string;
  hash: string;
  lastMessage: string;
  author: string;
  timestamp: number;
}
