// Date: 04/08/2021
// Description: Create form for user to input their information

// Import necessary libraries
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateDoc, doc, collection, getDocs, where, query, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/editprofile.css";

// Find user ID
const findUser = async (userId) => {
    try {
        const q = query(collection(db, "userinformation"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q)
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

// Create form for user to input their information
export const Form = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [documentId, setDocumentId] = useState(null);
    const [existingData, setExistingData] = useState(null);

    // Get users document
    useEffect(() => {
        const fetchUser = async () => {
            const userDocId = await findUser(user?.uid);
            if (userDocId) {
                setDocumentId(userDocId);

                // Get the existing document data
                const docRef = doc(db, "userinformation", userDocId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setExistingData(docSnap.data());
                } else {
                    console.error("Document not found!");
                }
            }
        };

        if (user?.uid) {
            fetchUser();
        }
    }, [user]);

   // Create schema for form validation
    const schema = yup.object().shape({
        firstName: yup.string().required("Enter a first name"),
        surname: yup.string().required("Enter a surname"),
        age: yup.number().required("Enter an age"),
        religion: yup.string().optional(),
        region: yup.string().optional(),
        dob: yup.string().required("Enter a date of birth"),
        height: yup.number().required("Enter a height"),
        weight: yup.number().required("Enter a weight"),
        gender: yup.string().optional(),
        sexuality: yup.string().optional(),
        bio: yup.string().required("Enter a bio"),
    });

    // Register form and handle submit
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    })

    // Submit form
    const onSubmit = async (data) => {
        try {
            if (documentId && existingData) {
                const docRef = doc(db, "userinformation", documentId);

                // Merge existing data with the updated data
                const updatedData = {
                    ...existingData, // Keep existing values
                    ...data,         // Overwrite with new data
                };

                // Update the document with merged data
                await updateDoc(docRef, updatedData);
                console.log("Document updated:", updatedData);
                navigate("/");
            } else {
                console.error("No document ID or existing data found");
            }
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    // Return form
    return (    
        <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="First Name..." {...register("firstName")}/>
            <p style={{ color:"red" }}>{errors.firstName?.message}</p>

            <input placeholder="Surname..." {...register("surname")}/>
            <p style={{ color:"red" }}>{errors.surname?.message}</p>

            <input placeholder="Age..." type="number"{...register("age")}/>
            <p style={{ color:"red" }}>{errors.age?.message}</p>

            <input placeholder="Religion..." {...register("religion")}/>
            <p></p>

            <input placeholder="Region..." {...register("region")}/>
            <p></p>

            <input placeholder="Date of Birth..." type="date" {...register("dob")}/>
            <p style={{ color:"red" }}>{errors.dob?.message}</p>

            <input placeholder="Height in cm..." type="number"{...register("height")}/>
            <p style={{ color:"red" }}>{errors.height?.message}</p>

            <input placeholder="Weight in kg..." type="number"{...register("weight")}/>
            <p style={{ color:"red" }}>{errors.weight?.message}</p>

            <input placeholder="Gender..." {...register("gender")}/>
            <p></p>

            <input placeholder="Sexuality..." {...register("sexuality")}/>
            <p></p>

            <textarea placeholder="Bio..." {...register("bio")}/>
            <p></p>

            <input type="submit"/>
        </form>
    );
}