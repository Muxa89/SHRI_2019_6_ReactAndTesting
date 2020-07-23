export const InfoTableClassName = 'InfoTable';

export enum TableState {
  READY = 'ready',
  LOADING = 'loading'
}

export enum TableColumn {
  TYPE = 'type',
  NAME = 'name',
  HASH = 'hash',
  MESSAGE = 'message',
  AUTHOR = 'author',
  TIMESTAMP = 'timestamp'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}
