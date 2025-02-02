import { useState } from 'react';
import { updateEmail, updatePassword, sendEmailVerification } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';



export const UpdatePersonal = () => {
    const [user] = useAuthState(auth);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Send verification email to the user
    const sendVerificationEmail = () => {
        sendEmailVerification(user)
            .then(() => {
                console.log("Verification email sent!");
                setSuccess('Verification email sent! Please verify before updating your email.');
                setError(null);
            })
            .catch((error) => {
                console.error("Error sending verification email:", error);
                setError('Error sending verification email: ' + error.message);
                setSuccess(null);
            });
    };

    // Update email function
    const handleEmailUpdate = async () => {
        if (newEmail === '') {
            setError('Please enter a new email address.');
            return;
        }
        try {
            // Send verification email first
            sendVerificationEmail();

            // Once verified, update the email
            // This part will happen after the user verifies their email manually.
            // You can continue using updateEmail() after the email is verified
        } catch (err) {
            setError('Error updating email: ' + err.message);
            setSuccess(null);
        }
    };

    // Update password function
    const handlePasswordUpdate = async () => {
        if (newPassword === '') {
            setError('Please enter a new password.');
            return;
        }
        try {
            await updatePassword(user, newPassword);
            setSuccess('Password updated successfully!');
            setError(null);
        } catch (err) {
            setError('Error updating password: ' + err.message);
            setSuccess(null);
        }
    };

    return (
        <div className="box">
            <h2>Update Your Email or Password</h2>

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Success Message */}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {/* Update Email Form */}
            <div>
                <input type="email" placeholder="Enter new email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <button onClick={handleEmailUpdate}>Update Email</button>
            </div>

            {/* Update Password Form */}
            <div>
                <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button onClick={handlePasswordUpdate}>Update Password</button>
            </div>
        </div>
    );
};
