import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateDoc, doc, collection, getDocs, where, query, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/editprofile.css";

// Function to find the user's document ID
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

export const Form = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [documentId, setDocumentId] = useState(null);
    const [existingData, setExistingData] = useState(null);

    // Fetch the user document ID and data when the user is authenticated
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

    // Validation schema for form
    const schema = yup.object().shape({
        firstName: yup.string().nullable().default(""),
        surname: yup.string().nullable().default(""),
        age: yup.number().nullable(),
        religion: yup.string().nullable().default(""),
        region: yup.string().nullable().default(""),
        dob: yup.string().nullable().default(""),
        height: yup.number().nullable(),
        weight: yup.number().nullable(),
        gender: yup.string().nullable().default(""),
        sexuality: yup.string().nullable().default(""),
        bio: yup.string().nullable().default(""),
      });
      

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            if (documentId && existingData) {
                console.log(documentId);
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

    if (!documentId || !existingData) {
        return <p>Loading...</p>;
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="First Name..." defaultValue={existingData.firstName} {...register("firstName")} />
            <p style={{ color: "red" }}>{errors.firstName?.message}</p>

            <input placeholder="Surname..." defaultValue={existingData.surname} {...register("surname")} />
            <p style={{ color: "red" }}>{errors.surname?.message}</p>

            <input placeholder="Age..." type="number" defaultValue={existingData.age} {...register("age")} />
            <p style={{ color: "red" }}>{errors.age?.message}</p>

            <input placeholder="Religion..." defaultValue={existingData.religion} {...register("religion")} />
            <p></p>

            <input placeholder="Region..." defaultValue={existingData.region} {...register("region")} />
            <p></p>

            <input placeholder="Date of Birth..." type="date" defaultValue={existingData.dob} {...register("dob")} />
            <p style={{ color: "red" }}>{errors.dob?.message}</p>

            <input placeholder="Height in cm..." type="number" defaultValue={existingData.height} {...register("height")} />
            <p style={{ color: "red" }}>{errors.height?.message}</p>

            <input placeholder="Weight in kg..." type="number" defaultValue={existingData.weight} {...register("weight")} />
            <p style={{ color: "red" }}>{errors.weight?.message}</p>

            <input placeholder="Gender..." defaultValue={existingData.gender} {...register("gender")} />
            <p></p>

            <input placeholder="Sexuality..." defaultValue={existingData.sexuality} {...register("sexuality")} />
            <p></p>

            <textarea placeholder="Bio..." defaultValue={existingData.bio} {...register("bio")} />
            <p></p>

            <input type="submit" />
        </form>
    );
};
