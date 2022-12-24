import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import ShopArticle from '../components/layouts/shop/ShopArticle';
import ShopCategory from '../components/layouts/shop/ShopCategory';
import ShopNavBar from '../components/layouts/shop/ShopNavBar';
import ShopArticleModal from '../components/layouts/shop/ShopArticleModal';
import Footer from '../components/layouts/Footer';
import { ThemeContext } from '../context/ThemeContext';
import { DataManager } from '../helpers/DataManager.helper';
import { Category } from '../models';
import './ShopScreen.scss';
import { gql } from '../helpers/GraphQL.helper';

const ShopScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [categories, setCategories] = useState({default: [], filtered: []});
  const [search, setSearch] = useState('');
  const {t} = useTranslation(['translation', 'items']);
  const [modal, setModal] = useState({show: false});
  
  useEffect(() => {
    DataManager.graphQL(gql`query getCategories {
      getCategories {
        id title articles {
          id title silver gold promo image {
            src alt
          }
        }
      }
    }`)
      .then(value => {
        setCategories(({default: value.getCategories, filtered: value.getCategories}));
        setSearch('');
      });
  }, []);
  
  useEffect(() => {
    setCategories(prevValue => {
      return {
        ...prevValue,
        filtered: Object.entries(prevValue?.default?.values()).map(category => {
          const articles = [...category.articles]
          ?.filter(article => !search || t(article.title).toLowerCase().includes(search.toLowerCase()))
          ?.sort((a, b) => t(a.title, {ns: 'items'}).toLowerCase().localeCompare(t(b.title, {ns: 'items'}).toLowerCase()));
          
          return new Category({...category, articles});
        }).filter(category => category.articles.length > 0)
    }});
  }, [t, search]);
  
  return (
    <div className='shop-container'>
      <ShopNavBar setSearch={setSearch} search={search}/>
      <div className={`shop-categories d-flex flex-column ${theme.customScrollbarLighter}`}>
        <Container fluid className={`d-flex m-3 m-lg-5 flex-column flex-grow-1 gap-5 ${theme.text} w-auto`}>
          {(categories.filtered.length > 0) ? 
          categories?.filtered?.map((category) => (
            <ShopCategory key={category.id} category={category}>
              {category.articles
                ?.map(article => (
                  <ShopArticle key={article.id} article={article} onClick={() => setModal({show: true, article})}/>
                ))
              }
            </ShopCategory>
          ))
          :
          <h4 className='text-center'>{t('shop.category.nothing')}</h4>
          }
        </Container>
        <Footer/>
      </div>
      <ShopArticleModal setModal={setModal} modal={modal}/>
    </div>
  );
}

export default ShopScreen;