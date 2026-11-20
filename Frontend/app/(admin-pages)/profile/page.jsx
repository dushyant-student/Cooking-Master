"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { updateProfileUser } from "@/services/authServices";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

const emptyProfile = {
    name: "",
    email: "",
    password: "",
    description: "",
    imageURL: null
}

export default function Page() {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState(emptyProfile);
    const [image, setImage] = useState("");
    const inputref = useRef()

    const { userProfile, profileError, userProfileMutate } = useAuth();

    const ProfileData = userProfile?.profile || emptyProfile;
    useEffect(() => {
    if (profileError) {
        toast.error("Failed to fetch profile. Please try again.");
    }
   }, [profileError]);

   useEffect(() => {
       if (ProfileData) {
            setForm({
                name: ProfileData.name || "",
                email: ProfileData.email || "",
                password: ProfileData.password || "",
                description: ProfileData.description || "",
                imageURL: ProfileData.imageURL || ""
            })
        }
    }, [ProfileData]);
    


    const handleChange = (key, value) => {
        setForm((prev) => (
            {
                ...prev,
                [key]: value
            }
        )
        );
    };

    const openInputBox = (e) => {
        inputref.current?.click()
    }

    const handleUpdateProfile = async () => {

        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("description", form.description);

            if (form.imageURL instanceof File) {
            formData.append("imageURL", form.imageURL);
        }

            const response = await updateProfileUser(formData);
            if (response.success) {
                toast.success("Profile SuccessFully Update");
                userProfileMutate("/auth/profile")
            }


        } catch (err) {
            toast.error(err?.response?.data?.message || "Update Profile Failed")
            console.log(err)
        } finally {
            setLoading(false)
        }
    };


    return (

        <div className="px-8 md:px-30 py-10 ">
            <p className=" px-4 py-2 font-bold text-2xl">{userProfile ? "Edit Profile" : ""} </p>
            <div className="flex gap-10 items-center">
                <div className="relative flex ">
                    <img
                        
                        src={image || ProfileData?.imageURL?.replace("=s96-c", "=s400-c")  || "https://res.cloudinary.com/rpksfcbq/image/upload/v1788420836/iur59teuipxvqrhtedwq.png"}
                        className=" w-30 h-30 rounded-full object-cover border"
                        onError={(e) => {
                            
                            e.currentTarget.src = "/defaultUserImage/defaultImage.png";
                        }}
                    />

                    <button type="button" title="Change profile picture" className="absolute bottom-3 right-3 bg-black text-white p-2 rounded-full hover:bg-gray-800" onClick={openInputBox}>
                        <Camera size={16} />
                    </button>

                </div>

                <input className="hidden" ref={inputref} type="file"
                    onChange={(e) => {
                        handleChange("imageURL", e.target.files[0]);
                        const file = e.target.files[0];

                        if (file) {
                            setImage(URL.createObjectURL(file));
                        }
                        return
                    }}
                />

            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile();
            }} >

                <div className="mt-10 flex flex-col gap-5 w-full ">

                    <input required className="border p-2" placeholder="Name" value={form.name || ""} onChange={(e) => handleChange("name", e.target.value)} />

                    <input required className="border p-2" placeholder="Email" value={form.email || ""} onChange={(e) => handleChange("email", e.target.value)} />

                    <input required className="border p-2" placeholder="Password Reset?" value={form.password || ""} onChange={(e) => handleChange("password", e.target.value)} />

                    <textarea className="border p-2" placeholder="Description" value={form.description || ""} onChange={(e) => handleChange("description", e.target.value)} />

                    <Button color="primary" type="submit" isDisabled={loading}    >
                        {loading ? "Updating profile..." : "Save Profile"}
                    </Button>
                </div>

            </form>


        </div>

    );
}