import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Sun, Moon, Search } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../serviceProvider/hook";
import { setSearchTerm } from "../serviceProvider/slices/productSlice";
import { logout } from "../serviceProvider/slices/authSlice";
import logo from "../assets/snapshop.png";
import { buttonClass, badgeClass, getTheme, toggleTheme } from "../theme";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState(getTheme());
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum: any, item: any) => sum + item.quantity, 0)
  );
  const wishlistCount = useSelector(
    (state: any) => state.wishlist.items.length
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchTerm(search));
    }, 400);
    return () => clearTimeout(debounceTimer);
  }, [search, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
      else { setMenuOpen( true);}
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
  <nav className="navbar border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-1 select-none">
          <img src={logo} alt="SnapShop Logo" className="w-6 h-6 object-contain" />
          <span className="text-lg font-bold brand">SnapShop</span>
        </Link>
      </div>

      <div className="flex-1 mx-2 md:hidden">
        <div className="relative">
          <Search size={16} className="absolute left-2 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-7 pr-3 py-1.5 border rounded text-sm focus:outline-none focus:ring w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <div className="relative md:hidden flex items-center gap-2" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={user?.photo || "https://i.pravatar.cc/40"}
                alt="User"
                className="w-8 h-8 rounded-full border"
              />
            </button>

            <button
              aria-label="Toggle theme"
              title="Toggle theme"
              onClick={() => setMode(toggleTheme())}
              className={buttonClass("ghost")}
            >
              {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-100">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  👤 Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}

        <div className="hidden md:flex items-center gap-5 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>

          <div className="relative">
            <Search size={16} className="absolute left-2 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-3 py-1.5 border rounded text-sm focus:outline-none focus:ring w-40 lg:w-56"
            />
          </div>

          <Link
            to="/cart"
            className="relative inline-flex items-center hover:text-blue-600 transition"
          >
            <ShoppingCart size={18} className="mr-1" />
            Cart
            {cartCount > 0 && (
              <span
                className={`${badgeClass("danger")} absolute -top-2 -right-3 text-xs`}
              >
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="hover:text-blue-600 transition">
            ❤️ ({wishlistCount})
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 focus:outline-none hover:opacity-90"
              >
                <img
                  src={user?.photo || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm">{user?.username || "User"}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-100 ">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm dark:hover:bg-gray-700 light:bg-white"
                  >
                    👤 Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm dark:hover:bg-gray-700 light:bg-white"
                  >
                    📊 Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={buttonClass("primary")}>
              Login
            </Link>
          )}

          <button
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={() => setMode(toggleTheme())}
            className={buttonClass("ghost")}
          >
            {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </div>

               

    {menuOpen && (
      <div className="md:hidden flex flex-col items-start gap-3 px-5 py-3 border-t border-gray-200 dark:border-gray-700">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link
          to="/cart"
          onClick={() => setMenuOpen(false)}
          className="relative inline-flex items-center hover:text-blue-600 transition"
        >
          <ShoppingCart size={18} className="mr-1" /> Cart ({cartCount})
        </Link>
        <Link
          to="/wishlist"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition"
        >
          ❤️ ({wishlistCount})
        </Link>
        {!isAuthenticated && (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className={buttonClass("primary")}
          >
            Login
          </Link>
        )}
      </div>
    )}
  </nav>
);


   
};

export default Navbar;
