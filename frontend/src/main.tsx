import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import { client } from './lib/api.ts';
import { Actions } from './pages/Actions.tsx';
import { ChallengeList } from './pages/ChallengeList.tsx';
import { Home } from './pages/Home.tsx';

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
        path: '/actions',
        element: <Actions />,
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
