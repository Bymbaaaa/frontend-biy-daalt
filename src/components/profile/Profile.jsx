import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use this if you're using a version that doesn't support default export

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // Decode the JWT to get userId from the token
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; // Assuming 'userId' is in the payload of your JWT

      // Fetch the profile data from the backend
      fetch(`http://localhost:4000/api/users/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setProfile(data.user);
          } else {
            alert('Error: Profile not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert('Please log in');
      window.location.href = '/login'; // Redirect to login page if not logged in
    }
  }, [token]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      {profile ? (
        <div>
          <h2>Welcome, {profile.name}</h2>
          <p>Email: {profile.email}</p>
          <img src={profile.image} alt="Profile" />
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default Profile;
