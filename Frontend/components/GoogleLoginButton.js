"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthProvider";

function GoogleLoginButton() {
    const { refreshUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {

        if (loading) return;

        try {
            setLoading(true);

            const provider = new GoogleAuthProvider();

            provider.setCustomParameters({
                prompt: "select_account",
            });

            const result = await signInWithPopup( auth, provider);

            const firebaseToken = await result.user.getIdToken()
            const response = await api.post(
                "/auth/google",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${firebaseToken}`,
                    },
                    withCredentials: true,
                }
            );
            await refreshUser()
            toast.success("Google Login Successfully");
            router.push("/");
             


        } catch (error) {

            if (error.code === "auth/popup-closed-by-user") {
                toast.info("Google login cancelled");
            } else if (
                error.code === "auth/cancelled-popup-request"
            ) {
                toast.info("Google login is already opening");
            } else {
                toast.error(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Google login failed"
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
        >
            {loading
                ? "Connecting to Google..."
                : "Continue with Google"}
        </button>
    );
}

export default GoogleLoginButton;