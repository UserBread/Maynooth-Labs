import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/pre-login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // General error for email/password issues
    const [emailVerifiedError, setEmailVerifiedError] = useState(null); // Email verification error

    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();  // Prevent form from refreshing the page

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);  // Successful login

            // Reset errors
            setError(null);
            setEmailVerifiedError(null);

            // Check if the user's email is verified
            if (result.user.emailVerified) {
                navigate("/");  // Redirect after successful login
            } else {
                // Email is not verified, log out the user immediately
                await auth.signOut();
                setEmailVerifiedError("Please verify your email address before logging in.");
                // send a verification email
                await result.user.sendEmailVerification();
                console.log("Verification email sent.");
            }
        } catch (err) {
            // Check for email/password issues
            if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password. Please try again.");
            } else {
                // Handle other errors
                setError("An unexpected error occurred. Please try again later.");
            }
            console.error("Login Error:", err);
        }
    };

    return (
        <div className="flex-container">
            <div className="login-container">
                <div className="login-box">
                    <h1>Sign in</h1>
                    <p className="connect">Start making new connections today</p>

                    {/* Show error message for invalid email/password */}
                    {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

                    {/* Show email verification error if email is not verified */}
                    {emailVerifiedError && <p className="error-message" style={{ color: "red" }}>{emailVerifiedError}</p>}

                    <form className="login_form" onSubmit={handleSignIn}>
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                        <a href="/forgot-password" className="forgot-password"> Forgot Password? </a>

                        <button type="submit" className="sign-in-btn">Sign in</button>
                        <a href="/create-account" className="No-Account"> Don't have an account? </a>
                        <button type="button" className="create-account-btn" onClick={() => navigate("/create-account")}> Create New Account </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
