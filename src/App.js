import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Question from "./pages/Question/Question";

import Redirect from "./compoents/Redirect/Redirect";

function App() {
  return (
    <Router>
      <Redirect />
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
        <Route path="/question/:id" Component={Question} />
      </Routes>
    </Router>
  );
}

export default App;
