import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import './index.scss';

const products = [
  {
    route: ROUTES.TASKS_MANAGEMENT,
    name: 'Tasks management',
    illustration:
      'https://res.cloudinary.com/khoa165/image/upload/q_100/v1598466008/productivity/todolist.png',
  },
  {
    route: ROUTES.BOOKMARKS_MANAGEMENT,
    name: 'Bookmarks management',
    illustration:
      'https://res.cloudinary.com/khoa165/image/upload/q_100/v1598878568/productivity/bookmark.png',
  },
];

const Products = () => {
  return (
    <div id='homePage'>
      <Row>
        {products.map((product, index) => (
          <Col xs='12' md='6' xl='4' key={index}>
            <Link to={product.route}>
              <div className='product-card'>
                <div className='product-name'>
                  <p>{product.name}</p>
                </div>
                <div className='product-hanging'></div>
                <div className='product-image'>
                  <img src={product.illustration} alt={product.name} />
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
