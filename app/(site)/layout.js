import Nav from '../../components/site/Nav';
import Footer from '../../components/site/Footer';

export default function SiteLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
