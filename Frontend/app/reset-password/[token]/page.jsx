
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";


export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset-password/${token}`,
        { password }
      );

      alert(response.data.message);
      router.push("/login");

    } catch (error) {
      alert(
        error.response?.data?.message || "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleReset} className="p-6 shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-5">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full mb-3"
          required
          minLength={8}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-3 w-full mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-3 w-full rounded-lg"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
