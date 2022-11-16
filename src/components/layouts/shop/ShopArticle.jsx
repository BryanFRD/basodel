import React from 'react';
import { useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { ThemeContext } from '../../../context/ThemeContext';
import './ShopArticle.scss';

const ShopArticle = ({article}) => {
  const {theme} = useContext(ThemeContext);
  
  return (
    <>
    
    <Card className={`shop-article ${theme.bgClass} ${theme.shadow} border-0 shadow-0 ${theme.bgHover} cursor-pointer`}>
      {article.promo !== 0 &&
        <Badge bg='' text='warning' className={`position-absolute position-right fs-4 fw-bold shop-promo`}>{`-${article.promo} %`}</Badge>
      }
      <Card.Img src={article.image?.src} alt={article.image?.alt} className={`img-thumbnail border-0 shadow-0 bg-transparent h-100`}/>
      <Card.Body className='p-1'>
        <Card.Text>
          {article.silver !== 0 &&
            <div className='d-flex justify-content-between me-1'>
              <div className='d-flex gap-1'>
                <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='silver coin'/>
                <span className={`align-bottom ${article.promo !== 0 ? 'text-muted fst-italic text-decoration-line-through' : ''}`}>
                  {article.silver}
                </span>
              </div>
              {article.promo !== 0 &&
                <div>
                  <span className='text-warning'>{Math.floor(article.silver * ((100 - article.promo) / 100))}</span>
                </div> 
              }
            </div>
          }
          {article.gold !== 0 &&
            <div className='d-flex justify-content-between me-1'>
              <div className='d-flex gap-1'>
                <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='gold coin'/>
                <span className={`align-bottom ${article.promo !== 0 ? 'text-muted fst-italic text-decoration-line-through' : ''}`}>
                  {article.gold}
                </span>
              </div>
              {article.promo !== 0 &&
                <div>
                  <span className='text-warning'>{Math.floor(article.gold * ((100 - article.promo) / 100))}</span>
                </div> 
              }
            </div>
          }
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  );
};

export default ShopArticle;