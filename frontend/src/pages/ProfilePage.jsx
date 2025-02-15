import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import ProfileForm from '../components/ProfileForm';
import { addCurrency } from '../utils/addCurrency';

const ProfilePage = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <>
      <Row>
        <Col md={12}>
          <Meta title={'User Profile'} />
          <h2>My Profile</h2>
          <ProfileForm />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
