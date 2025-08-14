import Header from './components/Header';
import Hero from './components/Hero';
import WhyNow from './components/WhyNow';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Outputs from './components/Outputs';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/globals.css';

function App() {
  return (
    <LanguageProvider>
      <div className="antialiased">
        <Header />
        <main className="overflow-x-hidden">
          <Hero />
          <WhyNow />
          <HowItWorks />
          <UseCases />
          <Outputs />
          <CTA />
        </main>
        <Footer />
        <AdminPanel />
      </div>
    </LanguageProvider>
  );
}

export default App;