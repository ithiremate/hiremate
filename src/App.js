import RootGuard from "./components/guards/RootGuard";
import Navigation from "./Navigation";

function App() {
  return (
    <RootGuard>
      <Navigation />
    </RootGuard>
  );
}

export default App;
