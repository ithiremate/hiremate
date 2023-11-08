import ToastContainer from "./components/containers/ToastContainer";
import RootGuard from "./components/guards/RootGuard";
import Navigation from "./Navigation";

function App() {
  return (
    <ToastContainer>
      <RootGuard>
        <Navigation />
      </RootGuard>
    </ToastContainer>
  );
}

export default App;
