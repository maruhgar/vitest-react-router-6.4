import { Link, Outlet, useLocation } from 'react-router-dom';

export const About = () => <div>You are on the about page</div>;
export const Home = () => <div>You are home</div>;
export const NoMatch = () => <div>No match</div>;

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const App = () => (
  <div>
    <Link to="/home">Home</Link>

    <Link to="/about">About</Link>

    <Outlet />

    <LocationDisplay />
  </div>
);

export default App;
