import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Profile from '@/sections/Profile';
import Classes from '@/sections/Classes';
import Teachers from '@/sections/Teachers';
import Gallery from '@/sections/Gallery';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Profile />
        <Classes />
        <Teachers />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
