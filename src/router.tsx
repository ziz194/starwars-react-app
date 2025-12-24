import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layout/MainLayout.tsx';
import FilmDetail from './pages/Films/FilmDetail/FilmDetail.tsx';
import Films from './pages/Films/Films.tsx';
import Home from './pages/Home';
import NotFound from './pages/NotFound.tsx';
import People from './pages/People/People.tsx';
import PersonDetail from './pages/People/PersonDetail/PersonDetail.tsx';
import PlanetDetail from './pages/Planets/PlanetDetail/PlanetDetail.tsx';
import Planets from './pages/Planets/Planets.tsx';
import SpeciesDetail from './pages/Species/SpeciesDetail/SpeciesDetail.tsx';
import SpeciesList from './pages/Species/SpeciesList.tsx';
import StarshipDetail from './pages/Starships/StarshipDetail.tsx/StarshipDetail.tsx';
import Starships from './pages/Starships/Starships.tsx';
import VehicleDetail from './pages/Vehicles/VehicleDetail.tsx/VehicleDetail.tsx';
import Vehicles from './pages/Vehicles/Vehicles.tsx';

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
      {
        path: 'planets',
        children: [
          {
            index: true,
            element: <Planets />,
          },
          {
            path: ':planetId',
            element: <PlanetDetail />,
          },
        ],
      },
      {
        path: 'people',
        children: [
          {
            index: true,
            element: <People />,
          },
          {
            path: ':personId',
            element: <PersonDetail />,
          },
        ],
      },
      {
        path: 'starships',
        children: [
          {
            index: true,
            element: <Starships />,
          },
          {
            path: ':starshipId',
            element: <StarshipDetail />,
          },
        ],
      },
      {
        path: 'vehicles',
        children: [
          {
            index: true,
            element: <Vehicles />,
          },
          {
            path: ':vehicleId',
            element: <VehicleDetail />,
          },
        ],
      },
      {
        path: 'species',
        children: [
          {
            index: true,
            element: <SpeciesList />,
          },
          {
            path: ':speciesId',
            element: <SpeciesDetail />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
