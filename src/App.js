import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Search from "./pages/Search";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col min-h-[100dvh]  ">
        <Navbar className="sticky " />
          <div className="content flex grow ">
           
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />

              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
      </div>
    </div>
  );
}

export default App;
