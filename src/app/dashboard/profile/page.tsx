"use client";

import { useAppSelector } from '@/lib/hooks';
import React from 'react'
import { useState, useEffect } from 'react';
import type { User } from '@/interfaces/user';
import Image from 'next/image';

export default function Page() {
  const user = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<User>({
    username: "",
    mail: "",
    password: "",
    role: "",
    avatar: "",
    createdAt: "",
    current_families: [],
    biography: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.name || "",
        mail: user.email || "",
        biography: user.biography || "",
        avatar: user.avatar || "",
        password: "",
        role: "",
        createdAt: "",
        current_families: [],
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Replace with actual API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      // Update user in state if needed
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.mail}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="biography" className="block mb-1">biography</label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {formData.avatar && (
            <div className="mb-4">
              <Image
                src={formData.avatar}
                height={100}
                width={100}
                alt="Profile avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold">Name</h2>
            <p>{formData.username || 'Not set'}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p>{formData.mail || 'Not set'}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">biography</h2>
            <p className="whitespace-pre-wrap">{formData.biography || 'No biography yet'}</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
