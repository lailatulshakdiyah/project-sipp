"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function Profile() {
  const userDetail = useAuthStore((state) => state.detail);
  const token = useAuthStore((state) => state.token);
  // const user = useAuthStore((state) => state.user);

  const [profile, setProfile] = useState({
    accessLevel: "",
    registrationNumber: "",
    name: "",
    email: "",
    phone: "",
    photo: null,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (userDetail) {
      setProfile({
        accessLevel: userDetail?.roles?.[0]?.nama || "",
        registrationNumber: userDetail?.no_registrasi || "",
        name: userDetail?.nama || "",
        email: userDetail?.email || "",
        phone: userDetail?.no_telepon || "",
        photo: userDetail?.foto
          ? `https://api.sipp-karhutla.com/${userDetail.foto}`
          : null,
      });
    }
  }, [userDetail]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, photo: file });
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", userDetail.username || "");
      formData.append("password", userDetail.passwords || "");
      formData.append("accessLevel", profile.accessLevel);
      formData.append("registrationNumber", profile.registrationNumber);
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("id", userDetail.id || "");
      formData.append("aktif", userDetail.aktif ? "true" : "false");
      formData.append("instansi", userDetail.instansi || "");

      if (profile.photo instanceof File) {
        formData.append("photo", profile.photo);
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await fetch("/api/proxy/sipp-karhutla/api_v2/user/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log("Update profile:", data);

      if (res.ok) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } else {
        alert(`Gagal update profile: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error update profile:", error);
      alert("Tidak dapat terhubung ke server");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
      {/* Tab Menu */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-1/2 py-2 text-center font-semibold ${
            activeTab === "profile"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Data Pengguna
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`w-1/2 py-2 text-center font-semibold ${
            activeTab === "password"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Ubah Kata Sandi
        </button>
      </div>

      {/* Form Data Pengguna */}
      {activeTab === "profile" && (
        <form onSubmit={handleSubmitProfile} className="flex gap-6">
          {/* Foto Profil */}
          <div className="w-2/5 flex flex-col items-center">
            {profile.photo ? (
              <Image
                src={
                  profile.photo instanceof File
                    ? URL.createObjectURL(profile.photo)
                    : profile.photo
                }
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border border-gray-300 object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">
                No Photo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="mt-2 text-sm text-gray-600"
              onChange={handlePhotoUpload}
            />
          </div>

          {/* Form Input */}
          <div className="w-3/5 space-y-4">
            {[
              {
                label: "Hak Akses *",
                name: "accessLevel",
                type: "select",
                options: ["Super Admin", "Guest"],
              },
              {
                label: "Nomor Registrasi/NIP *",
                name: "registrationNumber",
                type: "text",
              },
              { label: "Nama *", name: "name", type: "text" },
              { label: "Email *", name: "email", type: "email" },
              { label: "Nomor Telepon *", name: "phone", type: "text" },
            ].map((field) => (
              <div key={field.name} className="relative">
                {field.type === "select" ? (
                  <div className="relative border border-gray-300 rounded-xl focus-within:border-blue-500">
                    <select
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleProfileChange}
                      className="w-full px-3 pt-6 pb-2 bg-transparent appearance-none focus:outline-none"
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <label className="absolute top-2 left-3 text-sm text-gray-500">
                      {field.label}
                    </label>
                  </div>
                ) : (
                  <div className="relative border border-gray-300 rounded-xl focus-within:border-blue-500">
                    <input
                      type={field.type}
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleProfileChange}
                      className="w-full px-3 pt-6 pb-2 bg-transparent focus:outline-none"
                      required
                    />
                    <label className="absolute top-2 left-3 text-sm text-gray-500">
                      {field.label}
                    </label>
                  </div>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      )}

      {/* Form Ubah Kata Sandi */}
      {activeTab === "password" && (
        <form className="space-y-4">
          {[
            { label: "Kata Sandi Lama *", name: "oldPassword" },
            { label: "Kata Sandi Baru *", name: "newPassword" },
            { label: "Konfirmasi Kata Sandi *", name: "confirmPassword" },
          ].map((field) => (
            <div
              key={field.name}
              className="relative border border-gray-300 rounded-xl focus-within:border-blue-500"
            >
              <input
                type="password"
                name={field.name}
                className="w-full px-3 pt-6 pb-2 bg-transparent focus:outline-none"
                value={passwords[field.name]}
                onChange={handlePasswordChange}
                required
              />
              <label className="absolute top-2 left-3 text-sm text-gray-500">
                {field.label}
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Simpan Perubahan
          </button>
        </form>
      )}

      {/* Notifikasi */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h5 className="text-lg font-bold text-green-600">
              Perubahan Berhasil Disimpan!
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}