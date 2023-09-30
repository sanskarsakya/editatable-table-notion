import React from 'react';
import { DataTypes } from '../utils';
import TextCell from './TextCell';
import NumberCell from './NumberCell';
import SelectCell from './SelectCell';

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, options },
}) {
  function getCellElement() {
    switch (dataType) {
      case DataTypes.TEXT:
        return (
          <TextCell
            initialValue={initialValue}
            rowIndex={index}
            columnId={id}
          />
        );
      case DataTypes.NUMBER:
        return (
          <NumberCell
            initialValue={initialValue}
            rowIndex={index}
            columnId={id}
          />
        );
      case DataTypes.SELECT:
        return (
          <SelectCell
            initialValue={initialValue}
            options={options}
            rowIndex={index}
            columnId={id}
          />
        );
      default:
        return <span></span>;
    }
  }

  return getCellElement();
}
