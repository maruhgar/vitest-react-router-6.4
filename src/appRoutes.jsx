import App, { About, Home, NoMatch } from './App';

const AppRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
];

export default AppRoutes;
