import { useState } from "react";
import { auth, db } from "../config/firebase";  // db from Firestore config
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";  // Firebase Auth
import { collection, addDoc } from "firebase/firestore";  // Firestore functions
import { useNavigate } from "react-router-dom";
import "../styles/pre-login.css";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    try {
      // Create Firebase Authentication User
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Send verification email
      await sendEmailVerification(result.user);

      const postRef = collection(db, "userinformation");

      // Save additional data to Firestore
      await addDoc(postRef, {
        username: username,
        emailAddress: result.user.email,
        userId: result.user.uid,
        createdAt: new Date(),
      });

      console.log("Account created:", result);
      setLoading(false); // Set loading to false once the account is created

      // Navigate to userForm (or wherever you want the user to go)
      navigate("/userForm");

    } catch (error) {
      console.error("Error creating account:", error.message);
      setErrorMessage(error.message); // Display error message on the form
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div className="flex-container">
      <div className="login-container">
        <div className="login-box">
          <h1>Create Account</h1>
          <p className="connect">Start making new connections today</p>

          {/* Display error message if there was an issue */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form className="login_form" onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="create-account-btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Instruction for the user */}
          <p className="info-text">
            After signing up, please check your email inbox (and spam folder) for the verification link.
          </p>
        </div>
      </div>
    </div>
  );
};
