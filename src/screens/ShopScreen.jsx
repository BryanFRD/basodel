import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ShopArticle from '../components/layouts/shop/ShopArticle';
import ShopCategory from '../components/layouts/shop/ShopCategory';
import ShopNavBar from '../components/layouts/shop/ShopNavBar';
import { ThemeContext } from '../context/ThemeContext';
import { DataManager } from '../helpers/DataManager.helper';
import { Category } from '../models';
import './ShopScreen.scss';

const ShopScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [categories, setCategories] = useState({raw: {}, filtered: []});
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    DataManager.graphQL('query', 'getCategories', `id, title, articles {id, title, silver, gold, promo, image {src, alt}}`, 'Category', true)
      .then((value) => {
        setCategories(({raw: value.data, filtered: value.data}));
      });
  }, []);
  
  useEffect(() => {
    setCategories(prevValue => {
      return {
        ...prevValue,
        filtered: Object.entries(prevValue.raw).map(([key, value]) => {
          const articles = [...value.articles]?.filter(article => !search || article.title.toLowerCase().includes(search.toLowerCase()));
          
          return new Category({...value, articles});
        }).filter(category => category.articles.length > 0)
    }});
  }, [search]);
  
  return (
    <div>
      <ShopNavBar setSearch={setSearch} search={search}/>
      <div className='shop-container'>
        <Container fluid className={`d-flex m-3 m-lg-5 flex-column gap-5 ${theme.text} w-auto`}>
          {categories?.filtered?.map((category) => (
            <ShopCategory key={category.id} category={category}>
              {category.articles
                ?.map(article => (
                  <ShopArticle key={article.id} article={article}/>
                ))
                ?.sort((a, b) => a.props.article.title.localeCompare(b.props.article.title)) ?? <span>ssssssssss</span>
              }
            </ShopCategory>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default ShopScreen;