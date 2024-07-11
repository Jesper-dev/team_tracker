import { useState } from "react";
import "./signIn.scss";
import { signInWithEmail } from "../../api/auth";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const resetValues = () => {
    setEmail("");
    setPassword("");
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="signInContainer">
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={(e) =>
            signInWithEmail(e, email, password, resetValues, navigateToHomePage)
          }
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
