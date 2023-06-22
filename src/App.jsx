import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLoaderData,
  useLocation,
} from 'react-router-dom';

export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

// Method to introduce an artificial delay
export async function homeLoader() {
  await sleep();
  return {
    message: 'home',
  };
}

export const About = () => <div>You are on the about page</div>;

export const Home = () => {
  let data = useLoaderData();
  return <div>You are {data.message}</div>;
};

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
        loader: homeLoader,
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
