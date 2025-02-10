import { Route, Routes } from "react-router-dom";
import MainFlights from "./layouts/main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainFlights />} />
      </Routes>
    </>
  );
}

export default App;
