import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

export const About = () => <div>You are on the about page</div>;
export const Home = () => <div>You are home</div>;
export const NoMatch = () => <div>No match</div>;

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export const Layout = () => (
  <div>
    <Link to="/">Home</Link>

    <Link to="/about">About</Link>

    <Outlet />

    <LocationDisplay />
  </div>
);

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
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

const router = createBrowserRouter(routes);

const App = () => <RouterProvider router={router}></RouterProvider>;

export default App;
