import { doc, deleteDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut, deleteUser } from "firebase/auth";

// Function to find a document by userId
const findUser = async (userId) => {
    try {
        const q = query(collection(db, "userinformation"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id; // Return the first document's ID
        } else {
            console.error("No document found for this user");
            return null;
        }
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
};

// Form
export const Form = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [documentId, setDocumentId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userDocId = await findUser(user?.uid);
            setDocumentId(userDocId);
        };

        if (user?.uid) {
            fetchUser();
        }
    }, [user]);

    const handleDelete = async () => {
        try {
            if (!documentId) {
                console.error("No document ID found for deletion");
                return;
            }

            // Step 1: Delete the document from Firestore
            await deleteDoc(doc(db, "userinformation", documentId));

            // Step 2: Delete the user's authentication record
            await deleteUser(auth.currentUser);

            // Step 3: Sign the user out (optional if already deleted)
            await signOut(auth);

            console.log("Account and user information deleted successfully");
            navigate("/");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="box">
            <h2>Are you sure you want to delete your account?</h2>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};
