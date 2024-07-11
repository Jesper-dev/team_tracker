import { Layout } from "./layout";
import { TeamCreator } from "./components/teamCreator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/auth/signUp";
import { SignIn } from "./pages/auth/signIn";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TeamCreator />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
