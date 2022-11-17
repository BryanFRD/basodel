import React, { useMemo } from 'react';
import { useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';

const ShopArticle = ({article, onClick}) => {
  const {theme} = useContext(ThemeContext);
  const {user} = useContext(UserContext);
  const hasBoughtArticle = useMemo(() => user?.hasBoughtArticle(article.id), [article, user]);
  
  return (
    <>
      <Card
        className={`shop-article ${theme.bgClass} ${theme.shadow} border-0 shadow-0 ${
          (user && !hasBoughtArticle) ? `${theme.bgHover} cursor-pointer` : hasBoughtArticle && 'shop-bought'}`}
        onClick={() => (user && !hasBoughtArticle) && onClick()}>
          {article.promo !== 0 &&
            <Badge bg text='warning' className={`position-absolute position-right fs-4 fw-bold shop-promo`}>{`-${article.promo} %`}</Badge>
          }
        <Card.Img
          src={article.image?.src}
          alt={article.image?.alt}
          className={`img-thumbnail border-0 shadow-0 bg-transparent h-100 pixelated-image`}/>
        <Card.Body className='p-1'>
          <Card.Text>
            {article.silver !== 0 &&
              <span className='d-flex justify-content-between me-1'>
                <span className='d-flex'>
                  <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='silver coin' className='pixelated-image'/>
                  <span className={`align-bottom ${article.promo !== 0 ? 'text-muted fst-italic text-decoration-line-through' : ''}`}>
                    {article.silver}
                  </span>
                </span>
                {article.promo !== 0 &&
                  <span>
                    <span className='text-warning'>{Math.floor(article.silver * ((100 - article.promo) / 100))}</span>
                  </span> 
                }
              </span>
            }
            {article.gold !== 0 &&
              <span className='d-flex justify-content-between me-1'>
                <span className='d-flex'>
                  <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='gold coin' className='pixelated-image'/>
                  <span className={`align-bottom ${article.promo !== 0 ? 'text-muted fst-italic text-decoration-line-through' : ''}`}>
                    {article.gold}
                  </span>
                </span>
                {article.promo !== 0 &&
                  <span>
                    <span className='text-warning'>{Math.floor(article.gold * ((100 - article.promo) / 100))}</span>
                  </span>
                }
              </span>
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ShopArticle;