import Header from './components/Header';
import Release from './components/Release';
import Services from './components/Services';
import Status from './components/Status';

function App() {
  return (
    <main>
      <Header />
      <div className="application-wrapper">
        <Status />
        <Services />
        <Release />
        <Status />
      </div>
    </main>
  );
}

export default App;
