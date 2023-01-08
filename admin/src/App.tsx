import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutPage from './layout';
import { routes } from './router';
import type { IRoute } from './router';

function App() {
  const [newRoutes, setNewRoutes] = React.useState<IRoute[]>([]);

  React.useEffect(() => {
    setNewRoutes(flatRoutes(routes));
  }, [routes]);

  const flatRoutes = (items: IRoute[], data: IRoute[] = []) => {
    items.map((v) => {
      data.push(v);
      if (v.children) {
        flatRoutes(v.children, data);
      }
    });
    return data;
  };

  return (
    <div className="App">
      <LayoutPage>
        <Routes>
          {newRoutes.map((route) => (
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
