import Footer from './components/containers/Footer';
import Header from './components/containers/Header';
import Release from './components/containers/Release';
import Roadmap from './components/containers/Roadmap';
import Services from './components/containers/Services';
import Status from './components/containers/Status';

function App() {
  return (
    <main>
      <Header />
      <div className="application-wrapper">
        <Status />
        <Services />
        <Release />
        <Roadmap />
      </div>
      <Footer />
    </main>
  );
}

export default App;
