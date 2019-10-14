export interface InfoTableItem {
  type: InfoTableItemType;
  name: string;
  commit?: string;
  message?: string;
  commiter?: string;
  date?: string;
}

export interface InfoTableItemProps {
  item: InfoTableItem;
}

export enum InfoTableItemType {
  FOLDER = 'folder',
  FILE = 'file',
  PARENT = 'parent'
}

export interface InfoTableUrlParams {
  repositoryId?: string;
  hash?: string;
  path?: string;
}
