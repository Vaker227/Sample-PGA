import React from 'react';
import { Redirect } from 'react-router';
import { ROUTES } from '../../../configs/routes';

const HomePage = () => {
  // const params = useParams();
  // console.log(params);
  return <Redirect to={ROUTES.listUsers}></Redirect>;
};

export default HomePage;
