import { combineReducers } from 'redux';
import {
  SET_INFO_TABLE_ITEMS,
  ISetInfoTableItems
} from '../actions/infoTableActions';
import { InfoTableItem } from '../../components/InfoTable/InfoTableTypes';

export interface AppState {
  infoTableItems: Array<InfoTableItem>;
}

const initialTableState: Array<InfoTableItem> = [];

function infoTableItems(state = initialTableState, action: ISetInfoTableItems) {
  switch (action.type) {
    case SET_INFO_TABLE_ITEMS:
      return action.items;
  }

  return state;
}

export default combineReducers({
  infoTableItems
});
