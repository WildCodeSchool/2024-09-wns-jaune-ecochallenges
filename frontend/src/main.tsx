import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { client } from './lib/api.ts';
import Home from './pages/Home.tsx';
import { ApolloProvider } from '@apollo/client';

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
