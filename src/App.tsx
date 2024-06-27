import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Layout } from "./layout";
import { TeamCreator } from "./components/teamCreator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <TeamCreator />
    </Layout>
  );
}

export default App;
