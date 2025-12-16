import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const hideOnRoutes = ["/", "/login"];
  if (hideOnRoutes.includes(location.pathname)) return null;

  return (
    <header className="py-4 text-center">
      <h1 className="text-2xl font-bold brand">Welcome to SnapShop</h1>
      <p className="muted mt-1">Find the best products at unbeatable prices</p>
    </header>
  );
};

export default Header;
