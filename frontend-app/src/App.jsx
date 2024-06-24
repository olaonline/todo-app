import "./App.css";
import TaskMain from "./components/TaskMain";
import "bootstrap/dist/css/bootstrap.min.css";
// import ParticlesComponent from "./components/Particles";

function App() {
  return (
<>
      {/* <ParticlesComponent /> */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <TaskMain />
      </div>
    </>
  );
}

export default App;