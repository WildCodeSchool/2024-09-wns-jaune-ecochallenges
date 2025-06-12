import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { client } from './lib/api.ts';
import { App } from './App.tsx';
import {
  Home,
  ActionList,
  ChallengeList,
  ChallengePage,
  ChallengeCreation,
  ChallengeEdition,
  UserPortal,
  NotFoundRedirect,
  ActionCreation,
  ActionEdition,
} from '@/pages';

import './index.css';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundRedirect />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/challenges',
        element: <ChallengeList />,
      },
      {
        path: '/challenge/:challengeId',
        element: <ChallengePage />,
      },
      {
        path: '/challenge/new',
        element: <ChallengeCreation />,
      },
      {
        path: '/challenge/:challengeId/edit',
        element: <ChallengeEdition />,
      },
      {
        path: '/actions',
        element: <ActionList />,
      },
      {
        path: '/action/new',
        element: <ActionCreation />,
      },
      {
        path: '/action/:actionId/edit',
        element: <ActionEdition />,
      },
      {
        path: '/user',
        element: <UserPortal />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
