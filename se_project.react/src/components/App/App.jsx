import "./App.css";
import Header from "../Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
      </div>
    </div>
  );
}

export default App;
