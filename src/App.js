import ToastContainer from "./components/containers/ToastContainer";
import ModalContainer from "./components/containers/ModalContainer";
import RootGuard from "./components/guards/RootGuard";
import Navigation from "./Navigation";

function App() {
  return (
    <ToastContainer>
      <ModalContainer>
        <RootGuard>
          <Navigation />
        </RootGuard>
      </ModalContainer>
    </ToastContainer>
  );
}

export default App;
