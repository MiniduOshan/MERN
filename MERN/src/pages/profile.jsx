// src/pages/profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/me"
        );
        setProfile(data.user);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load profile."
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          User Profile
        </h2>

        {loadingProfile && (
          <p className="text-gray-600 text-center">Loading profile...</p>
        )}

        {error && (
          <p className="text-red-600 text-center mb-4">
            {error}
          </p>
        )}

        {!loadingProfile && !error && (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-medium text-gray-800">
                {profile?.name || user?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-800">
                {profile?.email || user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-medium text-gray-800">
                {profile?.role || user?.role || "user"}
              </p>
            </div>

            {profile?.createdAt && (
              <div>
                <p className="text-sm text-gray-500">Member since</p>
                <p className="text-lg font-medium text-gray-800">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
