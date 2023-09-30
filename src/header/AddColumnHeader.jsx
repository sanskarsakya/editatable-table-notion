import PlusIcon from '../img/Plus';
import React from 'react';
import { ActionTypes, Constants } from '../utils';
import { selectHandleAddColumnToLeft, useTableStore } from '../store';

export default function AddColumnHeader({ getHeaderProps }) {
  const handleAddColumnToLeft = useTableStore(selectHandleAddColumnToLeft);
  return (
    <div {...getHeaderProps()} className="th noselect d-inline-block">
      <div
        className="th-content flex justify-center"
        onClick={e =>
          handleAddColumnToLeft({
            columnId: Constants.ADD_COLUMN_ID,
            focus: true,
          })
        }
      >
        <span className="svg-icon-sm svg-gray">
          <PlusIcon />
        </span>
      </div>
    </div>
  );
}
