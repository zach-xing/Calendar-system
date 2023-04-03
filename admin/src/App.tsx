import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutPage from "./layout";
import { routes } from "./router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
