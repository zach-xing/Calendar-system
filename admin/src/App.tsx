import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutPage from "./layout";
import { routes } from "./router";

function App() {
  return (
    <div className='App'>
      <LayoutPage>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path?.slice(1)}
              element={route.element}
            />
          ))}
        </Routes>
      </LayoutPage>
    </div>
  );
}

export default App;
