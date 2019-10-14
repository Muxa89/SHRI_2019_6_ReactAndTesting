import axios from 'axios';
import {
  setInfoTableItems,
  ISetInfoTableItems,
  SET_INFO_TABLE_ITEMS
} from './infoTableActions';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers/root';
import { Action } from 'redux';
import {
  InfoTableItem,
  InfoTableItemType
} from '../../components/InfoTable/InfoTableTypes';
import { Dispatch } from 'react';

function pad(num: number): string {
  var s = num + '';
  while (s.length < 2) s = '0' + s;
  return s;
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

export interface InfoTableItemResponse {
  name: string;
  type: InfoTableItemType;
  commit: string;
  message: string;
  commiter: string;
  timestamp: string;
}

export const GET_INFO_TABLE_ITEMS = 'GET_INFO_TABLE_ITEMS';
export type InfoTableItemRequestThunkAction = ThunkAction<
  Promise<ISetInfoTableItems>,
  AppState,
  null,
  Action<typeof SET_INFO_TABLE_ITEMS>
>

export function loadFiles(
  repositoryId?: string,
  hash?: string,
  treePath?: string
): InfoTableItemRequestThunkAction {
  return function(dispatch) {
    let requestAddress = 'http://localhost:3000/api/repos';
    if (repositoryId !== undefined) {
      requestAddress += `/${repositoryId}`;

      if (hash !== undefined) {
        requestAddress += `/tree/${hash}`;

        if (treePath !== undefined) {
          requestAddress += `/${treePath}`;
        }
      }
    }

    return axios
      .get<Array<InfoTableItemResponse>>(requestAddress)
      .then(response =>
        dispatch(
          setInfoTableItems(
            response.data.map(item => ({
              name: item.name,
              type: item.type,
              commit: item.commit ? item.commit.slice(0, 6) : '',
              message: item.message || '',
              commiter: item.commiter || '',
              date: item.timestamp
                ? formatDate(new Date(+item.timestamp * 1000))
                : ''
            }))
          )
        )
      );
  };
}
