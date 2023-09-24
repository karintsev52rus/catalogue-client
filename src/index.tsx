import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';
import { App } from './components/app';
import { ErrorPage } from './pages/ErrorPage';
import { CategoryPage } from './pages/categoryPage';
import { Layout } from './components/common/layout';
import { Provider } from 'react-redux';
import { store } from "./store/index"
import { SinglePartPage } from './pages/singlePartPage';
import { SearchPage } from './pages/searchPage';
import { routesData } from './routes/routes';
import { CartPage } from './pages/cartPage';
import {OrdersPage} from './pages/ordersPage'
import { NewOrderPage } from './pages/newOrderPage';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <App/>
        },
        {
          path: "cart",
          element: <CartPage/>
        },
        {path: "orders",
          children: [
            {
              element: <OrdersPage/>,
              
              index: true
            },
            {
            element: <NewOrderPage/>,
            path: "new_order"
            }
          ]
        },
        {
          path: "jac",
          handle: {
            breadscrumbs: "Запчасти JAC"
          },
          children: [
            {
              element: <CategoryPage pageTitle={routesData.jac.title} categoryData={routesData.jac.categoryData} />,
              index: true
            },
            {
              path: ":partNumber",
              element: <SinglePartPage />
            }
          ]
        },
        {
          path: "usa",
          handle: {
            breadscrumbs: "Запчасти Америка"
          },
          children: [
            {
              element: <CategoryPage pageTitle= {routesData.usa.title} categoryData = {routesData.usa.categoryData} />,
              index: true
            },
            {
              path: ":partNumber",
              element: <SinglePartPage />
            }
          ]
        },
        {
          path: "europe",
          handle: {
            breadscrumbs: "Запчасти Европа"
          },
          children: [
            {
              element: <CategoryPage pageTitle = {routesData.usa.title} categoryData={routesData.europe.categoryData} />,
              index: true
            },
            {
              path: ":partNumber",
              element: <SinglePartPage/>
            }
          ]
        },
        {
          path: "search/:searchPhrase",
          element: <SearchPage/>
        }
      ]
    }
  ]);

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading = {null}>
      <RouterProvider router = {router} />
    </PersistGate>
    
  </Provider>
    
);

