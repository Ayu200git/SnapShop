import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      <main className="flex container-xl px-6 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
