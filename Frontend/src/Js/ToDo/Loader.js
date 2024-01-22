import React from 'react';
import Content from './Content';

const Loader = ({items,setItems,showLoader}) => {

  return (
    <div className="loader-container">
      {showLoader ? (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <Content
        items={items}
        setItems={setItems}
        />
      )}
    </div>
  );
};

export default Loader;
