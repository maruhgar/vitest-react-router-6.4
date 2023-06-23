import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from './App';

test('full app rendering/navigating', async () => {
  const router = createBrowserRouter(routes);
  render(<RouterProvider router={router}></RouterProvider>);

  const user = userEvent.setup();
  // We need to wait for the loader data and then assert presence
  expect(await screen.findByText(/you are home/i)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await user.click(screen.getByText(/about/i));
  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});

test('landing on a bad page', () => {
  const badRoute = '/some/bad/route';
  const router = createMemoryRouter(routes, { initialEntries: [badRoute] });

  // use createMemoryRouter when you want to manually control the history
  render(<RouterProvider router={router}></RouterProvider>);

  // verify navigation to "no match" route
  expect(screen.getByText(/no match/i)).toBeInTheDocument();
});

test('rendering a component that uses useLocation', () => {
  const route = '/some-route';
  const router = createMemoryRouter(routes, { initialEntries: [route] });

  // use createMemoryRouter when you want to manually control the history
  render(<RouterProvider router={router}></RouterProvider>);

  // verify location display is rendered
  expect(screen.getByTestId('location-display')).toHaveTextContent(route);
});
