import React from 'react';

const ShopCategory = ({category, children}) => {
  return (
    <div>
      <h3>{category?.title}</h3>
      <div className='d-flex flex-wrap gap-5'>{children}</div>
    </div>
  );
};

export default ShopCategory;