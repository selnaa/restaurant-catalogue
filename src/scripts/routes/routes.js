import Detail from '../view/pages/details';
import Like from '../view/pages/like';
import ListResto from '../view/pages/list-resto';

const routes = {
  '/': ListResto, // default page
  '/detail/:id' : Detail,
  '/favorite': Like,
};

export default routes;