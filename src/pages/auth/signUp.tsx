import { useState } from "react";
import "./signUp.scss";
import { signUpWithEmail } from "../../api/auth";
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetValues = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signUpContainer">
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
          onClick={(e) => signUpWithEmail(e, email, password, resetValues)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
