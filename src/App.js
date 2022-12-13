import Router from "./routes";
import useAuth from "./hooks/useAuth";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { isInitialized } = useAuth();

  return (
    <div className="overflow-auto">
      {" "}
      {isInitialized ? <Router /> : <LoadingScreen />}{" "}
    </div>
  );
}

export default App;
