import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import ShopArticle from '../components/layouts/shop/ShopArticle';
import ShopCategory from '../components/layouts/shop/ShopCategory';
import ShopNavBar from '../components/layouts/shop/ShopNavBar';
import { ThemeContext } from '../context/ThemeContext';
import { DataManager } from '../helpers/DataManager.helper';

const ShopScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    DataManager.graphQL('query', 'getCategories', `id, title, articles {id, silver, gold, promo, image {src, alt}}`, 'Category')
      .then((value) => setCategories(value.data));
  }, []);
  
  return (
    <div>
      <ShopNavBar />
      <Container fluid className={`d-flex m-3 m-lg-5 flex-column gap-3 ${theme.text} w-auto`}>
        {categories?.map((category) => (
          <ShopCategory key={category.id} category={category}>
            {category.articles?.map(article => (
              <ShopArticle key={article.id} article={article} />
            ))}
          </ShopCategory>
        ))}
      </Container>
    </div>
  );
}

export default ShopScreen;