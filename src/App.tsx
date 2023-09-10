import Header from './components/Header';
import Release from './components/Release';
import Status from './components/Status';

function App() {
  return (
    <main>
      <Header />
      <div className="application-wrapper">
        <Release />
        <Status />
      </div>
    </main>
  );
}

export default App;
