import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
