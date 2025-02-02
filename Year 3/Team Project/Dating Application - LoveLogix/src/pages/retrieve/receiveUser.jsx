import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"; // To get the logged-in user
import "../../styles/FindAMatch.css";
const matches = require("./usage"); // Import matches

export const ReceiveUser = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]); // Add state for sorted users
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [acceptedProfiles, setAcceptedProfiles] = useState([]);
  const [currentUserBio, setCurrentUserBio] = useState(null); // Store logged-in user's bio
  const placeholderImages = [
    "https://via.placeholder.com/400x300?text=Photo+1",
    "https://via.placeholder.com/400x300?text=Photo+2",
    "https://via.placeholder.com/400x300?text=Photo+3",
  ];

  const [user] = useAuthState(auth); // Get the logged-in user

  // Fetch all users except the logged-in user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userinformation"));
        const userData = querySnapshot.docs.map(doc => doc.data());

        // Filter out the logged-in user from the list of users
        const filteredUsers = userData.filter(userItem => userItem.userId !== user?.uid);

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users from Firestore:", error);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  // Fetch the logged-in user's bio
  useEffect(() => {
    const fetchUserBio = async () => {
      try {
        if (user) {
          const userQuery = query(
            collection(db, "userinformation"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data(); // Assuming one document per user
            setCurrentUserBio(userDoc.bio); // Save the bio in state
            console.log("Logged-in User Bio:", userDoc.bio); // Debugging
          }
        }
      } catch (error) {
        console.error("Error fetching user bio:", error);
      }
    };

    if (user) {
      fetchUserBio();
    }
  }, [user]);

  // Calculate Top 5 Matches
  useEffect(() => {
    const calculateTopMatches = async () => {
      if (currentUserBio && users.length > 0) {
        const sortedScores = await TopFiveAlgorithm(currentUserBio, users);
        setSortedUsers(sortedScores.map(item => item.userDetails)); // Extract user details
        console.log("Top Matches:", sortedScores);
      }
    };

    calculateTopMatches();
  }, [currentUserBio, users]);

  const handleNextUser = () => {
    setCurrentImageIndex(0); // Reset image index for new user
    if (currentUserIndex < sortedUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      alert("No more users available!");
    }
  };

  const handleAcceptUser = () => {
    setAcceptedProfiles(prev => [...prev, sortedUsers[currentUserIndex]]);
    handleNextUser();
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? placeholderImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === placeholderImages.length - 1 ? 0 : prev + 1));
  };

  if (sortedUsers.length === 0) {
    return <p>Loading users...</p>;
  }

  const { firstName, surname, age, region, bio } = sortedUsers[currentUserIndex];

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="card">
        <div className="photo-carousel">
          <button className="arrow left-arrow" onClick={handlePrevImage}>
            &lt;
          </button>
          <img src={placeholderImages[currentImageIndex]} alt={`User Photo ${currentImageIndex + 1}`} />
          <button className="arrow right-arrow" onClick={handleNextImage}>
            &gt;
          </button>
        </div>

        <h3>
          {firstName} {surname}, {age}
        </h3>
        <p className="region">
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Bio:</strong> {bio}
        </p>

        <button className="reject-button" onClick={handleNextUser}>
          Reject
        </button>
        <button className="accept-button" onClick={handleAcceptUser}>
          Accept
        </button>
      </div>

      {/* Accepted Matches Section */}
      <div className="accepted-profiles">
        <h3>Accepted Matches</h3>
        {acceptedProfiles.length > 0 ? (
          <ul>
            {acceptedProfiles.map(profile => (
              <li key={profile.userId}>
                {profile.firstName} {profile.surname}, {profile.age}
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches accepted yet. Try accepting some profiles!</p>
        )}
      </div>
    </div>
  );
};

// Calculate Top 5 Matches
const TopFiveAlgorithm = async (currentBio, usersArray) => {
  const sortedUserScores = [];
  for (const user of usersArray) {
    const bio2 = user.bio.toLowerCase();
    let score = await matches.matches(currentBio.toLowerCase(), bio2) * 100;

    if (isNaN(score)) {
      score = Math.floor(Math.random() * 26); // Assign a random score if NaN
      console.log(`Score was NaN. Assigning random score: ${score}`);
    }

    sortedUserScores.push({
      userDetails: user,
      score,
    });
  }

  sortedUserScores.sort((a, b) => b.score - a.score); // Sort by descending score
  return sortedUserScores.slice(0, 5); // Return top 5 matches
};
