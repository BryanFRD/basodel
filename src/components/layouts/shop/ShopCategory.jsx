import React from 'react';
import { useTranslation } from 'react-i18next';

const ShopCategory = ({category, children}) => {
  const {t} = useTranslation();
  
  return (
    <div>
      <h3 className='mb-4'>{t(category?.title)}</h3>
      <div className='d-flex flex-wrap gap-5'>{children}</div>
    </div>
  );
};

export default ShopCategory;