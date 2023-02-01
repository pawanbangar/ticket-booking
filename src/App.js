import ResponsiveAppBar from "./components/AppBar";
import RoutesPage from "./pages/RoutesPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import React from "react";
import Loader from "./components/Loader";
function App() {
  return (
    <>
     <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      {/* <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}> */}
      <PersistGate persistor={persistor}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={
          <Loader />
        }
        ></React.Suspense>
       <ResponsiveAppBar/>
       <BrowserRouter>
       <RoutesPage/>
       </BrowserRouter>
       </PersistGate>
       </Provider>
    </>

  );
}

export default App;
