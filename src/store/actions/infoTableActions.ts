import { InfoTableItem } from '../../components/InfoTable/InfoTableTypes';

export const SET_INFO_TABLE_ITEMS = 'SET_INFO_TABLE_ITEMS';

export interface ISetInfoTableItems {
  type: typeof SET_INFO_TABLE_ITEMS;
  items: Array<InfoTableItem>;
}

export function setInfoTableItems(
  items: Array<InfoTableItem>
): ISetInfoTableItems {
  return {
    type: SET_INFO_TABLE_ITEMS,
    items
  };
}
