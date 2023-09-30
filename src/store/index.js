import { produce } from 'immer';
import { create } from 'zustand';
import { DataTypes, makeData, randomColor, shortId } from '../utils';

let INITIAL_DATA = makeData(10);

export const useTableStore = create(set => ({
  data: INITIAL_DATA.data,
  columns: INITIAL_DATA.columns,
  skipReset: INITIAL_DATA.skipReset,

  handleAddOptionToColumn: params =>
    set(
      produce(draft => {
        const optionIndex = draft.columns.findIndex(
          column => column.id === params.columnId
        );

        draft.skipReset = true;
        draft.columns[optionIndex].push({
          label: params.option,
          backgroundColor: params.backgroundColor,
        });
      })
    ),

  handleAddRow: () =>
    set(
      produce(draft => {
        draft.skipReset = true;
        // {
        //     ID: faker.mersenne.rand(),
        //     firstName: faker.name.firstName(),
        //     lastName: faker.name.lastName(),
        //     email: faker.internet.email(),
        //     age: Math.floor(20 + Math.random() * 20),
        //     music: faker.music.genre(),
        //   }
        draft.data.push({});
      })
    ),
  _handleUpdateColumnType: params =>
    set(
      produce(draft => {
        const typeIndex = draft.columns.findIndex(
          column => column.id === params.columnId
        );

        if (params.dataType === DataTypes.NUMBER) {
          if (draft.columns[typeIndex].dataType === DataTypes.NUMBER) {
            return draft;
          } else {
            draft.skipReset = true;
            draft.data = draft.data.map(row => ({
              ...row,
              [params.columnId]: isNaN(row[params.columnId])
                ? ''
                : Number.parseInt(row[params.columnId]),
            }));
          }
        }

        if (params.dataType === DataTypes.SELECT) {
          if (draft.columns[typeIndex].dataType === DataTypes.SELECT) {
            return draft;
          } else {
            let options = [];
            draft.data.forEach(row => {
              if (row[params.columnId]) {
                options.push({
                  label: row[params.columnId],
                  backgroundColor: randomColor(),
                });
              }
            });
            draft.skipReset = true;
            draft.columns[typeIndex].dataType = params.dataType;
            draft.columns[typeIndex].options = params.options;
          }
        }
        if (params.dataType === DataTypes.TEXT) {
          if (draft.columns[typeIndex].dataType === DataTypes.TEXT) {
            return draft;
          } else if (draft.columns[typeIndex].dataType === DataTypes.SELECT) {
            draft.skipReset = true;
            draft.columns[typeIndex].dataType = params.dataType;
          } else {
            draft.skipReset = true;
            draft.columns[typeIndex].dataType = params.dataType;
            draft.data = draft.data.map(row => ({
              ...row,
              [params.columnId]: row[params.columnId] + '',
            }));
          }
        }
      })
    ),
  get handleUpdateColumnType() {
    return this._handleUpdateColumnType;
  },
  set handleUpdateColumnType(value) {
    this._handleUpdateColumnType = value;
  },

  handleUpdateColumnHeader: params =>
    set(
      produce(draft => {
        const index = draft.columns.findIndex(
          column => column.id === params.columnId
        );
        draft.skipReset = true;
        draft.columns[index].label = params.label;
      })
    ),
  handleUpdateCell: params =>
    set(
      produce(draft => {
        draft.skipReset = true;
        draft.data[params.rowIndex][params.columnId] = params.value;
      })
    ),
  handleAddColumnToLeft: params =>
    set(
      produce(draft => {
        const leftIndex = draft.columns.findIndex(
          column => column.id === params.columnId
        );
        let leftId = shortId();

        draft.skipReset = true;
        draft.columns.splice(leftIndex, 0, {
          id: leftId,
          label: 'Column',
          accessor: leftId,
          dataType: DataTypes.TEXT,
          created: params.focus && true,
          options: [],
        });
      })
    ),
  handleAddColumnToRight: params =>
    set(
      produce(draft => {
        const rightIndex = draft.columns.findIndex(
          column => column.id === params.columnId
        );
        const rightId = shortId();

        draft.skipReset = true;

        draft.columns.splice(rightIndex + 1, 0, {
          id: rightId,
          label: 'Column',
          accessor: rightId,
          dataType: DataTypes.TEXT,
          created: params.focus && true,
          options: [],
        });
      })
    ),
  handleDeleteColumn: params =>
    set(
      produce(draft => {
        const deleteIndex = draft.columns.findIndex(
          column => column.id === params.columnId
        );

        draft.skipReset = true;
        draft.columns.splice(deleteIndex, 1);
      })
    ),
  handleEnableReset: () =>
    set(
      produce(draft => {
        draft.skipReset = true;
      })
    ),
}));

// DATA
export const selectData = state => state.data;
export const selectColumns = state => state.columns;
export const selectReset = state => state.skipReset;

// ACTIONS
export const selectHandleAddOptionToColumn = state =>
  state.handleAddOptionToColumn;
export const selectHandleAddRow = state => state.handleAddRow;
export const selectHandleUpdateColumnType = state =>
  state.handleUpdateColumnType;
export const selectHandleUpdateColumnHeader = state =>
  state.handleUpdateColumnHeader;
export const selectHandleUpdateCell = state => state.handleUpdateCell;
export const selectHandleAddColumnToLeft = state => state.handleAddColumnToLeft;
export const selectHandleAddColumnToRight = state =>
  state.handleAddColumnToRight;
export const selectHandleDeleteColumn = state => state.handleDeleteColumn;
export const selectHandleEnableReset = state => state.handleEnableReset;
