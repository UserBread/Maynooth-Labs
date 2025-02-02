import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export const Main = () => {
    const navigate = useNavigate();
    return (

        <section className="main-area">
            <main className="main-content">
                <h1 className="welcome-title">Welcome to App</h1>
                <p className="subtitle">What would you like to do?</p>
                <div className="buttons">
                    <button className="action-button" onClick={() => navigate("/findAMatch")}>Find a match</button>
                    <button className="action-button" onClick={() => navigate("/WIP")}>My chats</button>
                    <button className="action-button" onClick={() => navigate("/updateForm")}>Edit Profile</button>
                    <button className="action-button" onClick={() => navigate("/deleteAccount")}>Account settings</button>
                </div>
            </main>
        </section>

    );
};