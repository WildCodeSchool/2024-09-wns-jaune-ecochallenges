import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { client } from './lib/api.ts';
import { App } from './App.tsx';
import { Home, ActionList, ChallengeList, ChallengeCreation } from '@/pages';

import './index.css';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="/" replace />,
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
        path: '/challenge/new',
        element: <ChallengeCreation />,
      },
      {
        path: '/actions',
        element: <ActionList />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
  // </StrictMode>
);
