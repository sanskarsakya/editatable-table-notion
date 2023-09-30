import React, { useEffect } from 'react';
import Table from './Table';
import {
  selectColumns,
  selectData,
  selectHandleEnableReset,
  selectReset,
  useTableStore,
} from './store';
import './style.css';

function App() {
  const columns = useTableStore(selectColumns);
  const data = useTableStore(selectData);
  const skipReset = useTableStore(selectReset);
  const handleEnableReset = useTableStore(selectHandleEnableReset);

  useEffect(() => {
    handleEnableReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, columns]);

  return (
    <div className="overflow-hidden w-screen h-screen p-2">
      <Table columns={columns} data={data} skipReset={skipReset} />
      <div id="popper-portal"></div>
    </div>
  );
}

export default App;
