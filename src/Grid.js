import React, { useState } from 'react';

const Grid = ({ config, data }) => {

  const ENTRIES_PER_PAGE = 10;
  const [currPage, setCurrPage] = useState(0);
  const [currData, setCurrData] = useState(data.slice(0, ENTRIES_PER_PAGE))
  const pageNum = Math.ceil(data.length  / ENTRIES_PER_PAGE);
  const dataFields = config.map(data => data.field);

  const setPageAndData = (idx) => {
    if(idx < 0 || idx === pageNum) return;
    setCurrPage(idx);
    const startIndex = idx * ENTRIES_PER_PAGE;
    setCurrData(data.slice(startIndex, startIndex + ENTRIES_PER_PAGE));
  }

  const headerData = config.map((col, idx) => {
    return <th key={idx}>{col.title}</th>
  });

  const bodyData = currData.map((row,idx) => {
    return (
      <tr key={idx}>
        {dataFields.map((field, idx) => {
          if(config[idx].component) {
            return <td>{config[idx].component({data: row[field]})}</td> 
          }
          return <td key={idx}>{row[field]}</td>
        })}
      </tr>
    );
  });
  const pages = Array.from({ length: pageNum }, (_, i) => i + 1).map(idx => {
    return (
      <span key={idx} onClick={() => {setPageAndData(idx - 1)}} className={ currPage === idx - 1 ? 'selected' : '' }>
        {idx}
      </span>
    );
  });

  return (
    <div className="table-container">
       <table>
        <thead>
          <tr>
            {headerData}
          </tr>
        </thead>
        <tbody>
          {bodyData}
        </tbody>
      </table>
      <div className="pages-container">
          <span onClick={() => setPageAndData(currPage - 1)} className={ currPage === 0 ? 'disabled' : ''}>Prev</span>
          {pages}
          <span onClick={() => setPageAndData(currPage + 1)} className={ currPage === pageNum - 1 ? 'disabled' : ''}>Next</span>
      </div>
    </div>
   
  );
}
 
export default Grid;