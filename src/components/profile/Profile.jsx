import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; 

      fetch(`http://localhost:4000/api/users/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
      window.location.href = '/login'; 
    }
  }, [token]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      {profile ? (
        <div>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile" width="100px" />
          <h2>Welcome, {profile.name}</h2>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default Profile;
