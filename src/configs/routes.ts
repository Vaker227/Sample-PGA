const productRoute = '/products'
const userRoute = "/user"

export const ROUTES = {
  home: '/',
  login: '/login',
  listProducts: productRoute + "/manage-product",
  createProduct: productRoute + "/new-product",
  detailProduct: productRoute + "/product-detail",
  listUsers: userRoute + "/manager-user",
  createUser: userRoute + "/add-user",
  detailUser: userRoute + "/user-detail",
};
