import {
  createBrowserRouter,
  Form,
  Link,
  Outlet,
  redirect,
  RouterProvider,
  useLoaderData,
  useLocation,
} from 'react-router-dom';

// Method to introduce an artificial delay
export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

// Loader to return after a small delay
export async function homeLoader() {
  await sleep();
  return {
    message: 'home',
  };
}

// Action to get user input
export async function aboutAction({ request }) {
  await sleep();
  let formData = await request.formData();
  let name = formData.get('name');
  console.log(name);
  // Call an async method to add and so on
  return redirect('/');
}

export const About = () => {
  return (
    <>
      <div>You are on the about page</div>
      <Form method="post">
        <input name="person" placeholder="Name" />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

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
        action: aboutAction,
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
