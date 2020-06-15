import React from 'react';
import Loadable from 'react-loadable';
import Home from '../Home';

function Loading() {
  return <div>Loading...</div>;
}

const News = Loadable({
  loader: () => import('../containers/news'),
  loading: Loading,
})
const User = Loadable({
  loader: () => import('../containers/user'),
  loading: Loading,
})
const CreateNews = Loadable({
  loader: () => import('../containers/news/create-update'),
  loading: Loading,
})
const CreateUser = Loadable({
  loader: () => import('../containers/user/create-update'),
  loading: Loading,
})
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin/news/create-news', exact: true, name: ("Thêm mới tin tức"), component: CreateNews },
  { path: '/admin/news/update/:id', exact: true, name: ("Chỉnh sửa tin tức"), component: CreateNews },
  { path: '/admin/user/create-user', exact: true, name: ("Thêm mới tài khoản"), component: CreateUser },
  { path: '/admin/user/update/:id', exact: true, name: ("Chỉnh sửa tài khoản"), component: CreateUser },
  { path: '/admin', exact: true, name: 'Trang chủ', component: Home },
  { path: '/admin/news', exact: true, name: ("Tin tức"), component: News },
  { path: '/admin/user', exact: true, name: ("Tin tức"), component: User }
]

export default routes;
