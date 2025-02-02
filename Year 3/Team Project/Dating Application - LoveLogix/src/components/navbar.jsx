import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import '../styles/navbar.css';

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div>
            <div className="App">
                <div className="welcome">
                    <h3 onClick={() => navigate("/")}>LoveLogix</h3>
                </div>
            </div>

            <div className="user">
                {user && (
                    <>
                        <button type="button" className="about_button" onClick={() => navigate("/about_us")}> About Us </button>
                        <button onClick={() => navigate("/myAccount")} className="about_button"> My Account</button>
                        <button onClick={handleSignOut} className="login_button"> Sign Out </button>
                    </>
                )}
            </div>
        </div>
    );
};
