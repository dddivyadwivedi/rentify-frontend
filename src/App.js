import "./App.css";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupForm from "./pages/SignUp/Signup";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/reduxIndex";
import LoginForm from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import ManageProperty from "./pages/ManageProperty/ManageProperty";
import Properties from "./pages/Property/Property";
import Property from "./pages/Property/Property";
import GlobalError from "./components/GlobalError/GlobalError";


function App() {
  const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.UserAuth);
    let Authorized = auth !== undefined && auth.accessToken;
    return Authorized ? children : <Navigate to="/" />;
  };
  return (
    <div className="App">
      <Provider store={store}>
        <GlobalError/>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/managepost" element={<ManageProperty />} />
            <Route exact path="/managepost/:id" element={<ManageProperty />} />
            <Route exact path="/post/:id" element={<PrivateRoute><Property /></PrivateRoute>} />

          </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
