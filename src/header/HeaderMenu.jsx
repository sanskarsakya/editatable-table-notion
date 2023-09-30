import React, { useEffect, useState } from 'react';
import ArrowUpIcon from '../img/ArrowUp';
import ArrowDownIcon from '../img/ArrowDown';
import ArrowLeftIcon from '../img/ArrowLeft';
import ArrowRightIcon from '../img/ArrowRight';
import TrashIcon from '../img/Trash';
import { grey } from '../colors';
import TypesMenu from './TypesMenu';
import { usePopper } from 'react-popper';
import { ActionTypes, shortId } from '../utils';
import DataTypeIcon from './DataTypeIcon';
import {
  selectHandleAddColumnToLeft,
  selectHandleAddColumnToRight,
  selectHandleDeleteColumn,
  selectHandleUpdateColumnHeader,
  useTableStore,
} from '../store';

export default function HeaderMenu({
  label,
  dataType,
  columnId,
  setSortBy,
  popper,
  popperRef,
  setShowHeaderMenu,
}) {
  const handleUpdateColumnHeader = useTableStore(
    selectHandleUpdateColumnHeader
  );
  const handleAddColumnToLeft = useTableStore(selectHandleAddColumnToLeft);
  const handleAddColumnToRight = useTableStore(selectHandleAddColumnToRight);
  const handleDeleteColumn = useTableStore(selectHandleDeleteColumn);

  const [inputRef, setInputRef] = useState(null);
  const [header, setHeader] = useState(label);
  const [typeReferenceElement, setTypeReferenceElement] = useState(null);
  const [typePopperElement, setTypePopperElement] = useState(null);
  const typePopper = usePopper(typeReferenceElement, typePopperElement, {
    placement: 'right',
    strategy: 'fixed',
  });
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  function onTypeMenuClose() {
    setShowTypeMenu(false);
    setShowHeaderMenu(false);
  }

  useEffect(() => {
    setHeader(label);
  }, [label]);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  const buttons = [
    {
      onClick: e => {
        handleUpdateColumnHeader({
          columnId,
          label: header,
        });
        setSortBy([{ id: columnId, desc: false }]);
        setShowHeaderMenu(false);
      },
      icon: <ArrowUpIcon />,
      label: 'Sort ascending',
    },
    {
      onClick: e => {
        handleUpdateColumnHeader({
          columnId,
          label: header,
        });
        setSortBy([{ id: columnId, desc: true }]);
        setShowHeaderMenu(false);
      },
      icon: <ArrowDownIcon />,
      label: 'Sort descending',
    },
    {
      onClick: e => {
        handleUpdateColumnHeader({
          columnId,
          label: header,
        });

        handleAddColumnToLeft({
          columnId: columnId,
          focus: true,
        });
        setShowHeaderMenu(false);
      },
      icon: <ArrowLeftIcon />,
      label: 'Insert left',
    },
    {
      onClick: e => {
        handleUpdateColumnHeader({
          columnId,
          label: header,
        });

        handleAddColumnToRight({
          columnId,
          focus: false,
        });
        setShowHeaderMenu(false);
      },
      icon: <ArrowRightIcon />,
      label: 'Insert right',
    },
    {
      onClick: e => {
        handleDeleteColumn({
          columnId,
        });
        setShowHeaderMenu(false);
      },
      icon: <TrashIcon />,
      label: 'Delete',
    },
  ];

  function handleColumnNameKeyDown(e) {
    if (e.key === 'Enter') {
      handleUpdateColumnHeader({
        columnId,
        label: header,
      });
      setShowHeaderMenu(false);
    }
  }

  function handleColumnNameChange(e) {
    setHeader(e.target.value);
  }

  function handleColumnNameBlur(e) {
    e.preventDefault();

    handleUpdateColumnHeader({
      columnId,
      label: header,
    });
  }

  return (
    <div
      ref={popperRef}
      style={{ ...popper.styles.popper, zIndex: 3 }}
      {...popper.attributes.popper}
    >
      <div
        className="bg-white shadow-5 border-radius-md"
        style={{
          width: 240,
        }}
      >
        <div
          style={{
            paddingTop: '0.75rem',
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
          }}
        >
          <div className="is-fullwidth" style={{ marginBottom: 12 }}>
            <input
              className="form-input is-fullwidth"
              ref={setInputRef}
              type="text"
              value={header}
              onChange={handleColumnNameChange}
              onBlur={handleColumnNameBlur}
              onKeyDown={handleColumnNameKeyDown}
            />
          </div>
          <span className="font-weight-600 font-size-75 color-grey-500 text-transform-uppercase">
            Property Type
          </span>
        </div>
        <div className="list-padding">
          <button
            className="sort-button"
            type="button"
            onMouseEnter={() => setShowTypeMenu(true)}
            onMouseLeave={() => setShowTypeMenu(false)}
            ref={setTypeReferenceElement}
          >
            <span className="svg-icon svg-text icon-margin">
              <DataTypeIcon dataType={dataType} />
            </span>
            <span className="text-transform-capitalize">{dataType}</span>
          </button>
          {showTypeMenu && (
            <TypesMenu
              popper={typePopper}
              popperRef={setTypePopperElement}
              onClose={onTypeMenuClose}
              setShowTypeMenu={setShowTypeMenu}
              columnId={columnId}
            />
          )}
        </div>
        <div style={{ borderTop: `2px solid ${grey(200)}` }} />
        <div className="list-padding">
          {buttons.map(button => (
            <button
              type="button"
              className="sort-button"
              onMouseDown={button.onClick}
              key={shortId()}
            >
              <span className="svg-icon svg-text icon-margin">
                {button.icon}
              </span>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
