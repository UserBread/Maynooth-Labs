import { auth, db } from "../config/firebase";
import { doc, collection, getDocs, where, query, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import '../styles/my-account.css';

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

export const MyAccount = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    religion: '',
    dob: '',
    sexuality: '',
    gender: '',
    name: '',
    age: '',
    region: '',
  });

  // Get the document and data of the user
  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        const userId = await findUser(user.uid);
        if (userId) {
          const docRef = doc(db, "userinformation", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFormData({
              height: docSnap.data().height || '',
              weight: docSnap.data().weight || '',
              religion: docSnap.data().religion || '',
              dob: docSnap.data().dob || '',
              sexuality: docSnap.data().sexuality || '',
              gender: docSnap.data().gender || '',
              name: `${docSnap.data().firstName || ''} ${docSnap.data().surname || ''}`.trim() || '',
              age: docSnap.data().age || '',
              region: docSnap.data().region || '',
            });
          }
        }
      }
    };
    fetchData();
  }, [user]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e) => {
    console.log(e.target.files);
  };

  return (
    <div className="App">
      <main className="main-container">
        <section className="new-section">
          <aside className="sidebar">
            <div className="image-content">
              <div className="profile-photo">
                <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
                <input className="file-uploader" type="file" onChange={handleFileUpload} accept="image/*" />
              </div>
            </div>

            <div className="profile-details-content">
              <h3>Personal Details</h3>
              <ul className="profile-details">
                {Object.entries(formData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                    <p>{value}</p>
                    <button onClick={() => handleInputChange(key, prompt(`Update ${key}:`, value))} className="hBTN">✎</button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="profile-content">
            <div className="user-info">
              <h1>{formData.name}</h1>
              <div className="sameline">
                <p>{formData.age} &#8226;</p>
                <p>{formData.region} &#8226;</p>
              </div>
            </div>

            <div className="content">
              <div className="section">
                <h2>My Self Summary</h2>
                <p>{formData.selfSummary}</p>
                <button onClick={() => handleInputChange('selfSummary', prompt("Update self-summary:", formData.selfSummary))} className="hBTN">✎</button>
              </div>

              <div className="section">
                <h2>What I am doing with my life</h2>
                <p>{formData.whatDoing}</p>
                <button onClick={() => handleInputChange('whatDoing', prompt("Update what you're doing:", formData.whatDoing))} className="hBTN">✎</button>
              </div>
            </div>
          </section>

          <aside className="personality-questions">
            <h3>Personality Questions</h3>
            <form>
              <label>Favourite hobby?</label>
              <input type="text" placeholder="Your answer..." />
              <label>Describe yourself in 3 words</label>
              <input type="text" placeholder="Your answer..." />
              <label>Dream job?</label>
              <input type="text" placeholder="Your answer..." />
              <label>Greatest Strength</label>
              <input type="text" placeholder="Your answer..." />
            </form>
          </aside>
        </section>
      </main>
    </div>
  );
};
