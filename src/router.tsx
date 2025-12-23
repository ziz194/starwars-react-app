import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound.tsx';
import Films from './pages/Films/Films.tsx';
import MainLayout from './layout/MainLayout.tsx';
import FilmDetail from './pages/Films/FilmDetail/FilmDetail.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'films',
        children: [
          {
            index: true,
            element: <Films />,
          },
          {
            path: ':filmId',
            element: <FilmDetail />,
          },
        ],
      },
    ],
  },
]);
