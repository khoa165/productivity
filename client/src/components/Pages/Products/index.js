import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import './index.scss';

const Products = () => {
  return (
    <div id='homePage'>
      <Row>
        <Col xs='12' md='6' lg='4' xl='3'>
          <Link to={ROUTES.TASKS_VIEW}>
            <div className='product-card'>
              <div className='product-name'>
                <p>Task management</p>
              </div>
              <div className='product-hanging'></div>
              <div className='product-image'>
                <img src='https://res.cloudinary.com/khoa165/image/upload/q_100/v1598466008/productivity/todolist.png' />
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
