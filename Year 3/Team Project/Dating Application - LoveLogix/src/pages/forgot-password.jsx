import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/pre-login.css";

export const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleResetPassword = async (event) => {
        event.preventDefault();  // Prevent form from refreshing the page

        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent successfully");
            navigate("/login");  // Redirect after successful login
        }
        catch (err) {
            setError("Invalid email. Please try again.");
            console.error("Reset Password Error:", err);
        }
    }

    return (
        <div className="flex-container">
            <div className='login-container'>
                <div className='login-box'>
                    <h1>Forgot Password</h1>
                    <form onSubmit={handleResetPassword}>
                        <label>Enter your email:</label><br />
                        <input type="email" id="email" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                        <button type="submit" className='reset-password-btn'>Reset Password</button>
                    </form>
                </div>
            </div>
        </div >
    );
};