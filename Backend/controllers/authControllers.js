import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"


const generateToken = (res, payload) => {
    try {
        //payload = user._id //mongodb dov id 
        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: "3d"
            }
        );

        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    });

        // console.log("Cookie set:", token);
        return token;

    }
    catch (err) {
        return res.status(401).send({ message: err.message, success: false })
    }
}


// Register Form Logics
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).send({ message: "please all fields", success: false })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await User.findOne({ email });
        if (result) {
            return res.status(409).send({
                message: "User Already Exitst",
                status: false
            })
        }
        await User.create({
            name,
            email,
            password: hashPassword
        })


        return res.status(201).send({
            message: "Register Successfully",
            success: true
        })

    } catch (err) {
        // console.log(err)
        return res.status(500).send({
            message: err.message,
            success: false
        })
    }

}

//Login logics
export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send({
                message: "Please fill all details",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                message: "Account/profile doesn't exist",
                success: false
            });
        }

        const matchPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!matchPassword) {
            return res.status(401).send({
                message: "PassWord do no Match !",
                success: false
            });
        }

        // JWT generate + cookie set
        generateToken(res, {
            id: user._id //mongo db doc id 
        });

        return res.status(200).send({
            message: "Login Successfully",
            success: true
        });

    } catch (err) {
        return res.status(500).send({
            message: "Server Error",
            success: false
        });
    }
};



// Google login controllers 
export const GoogleLogin = async (req, res) => {
    try {

        // Firebase verified user
        const firebaseUser = req.firebaseUser;

        const { uid, email, name, picture} = firebaseUser;

        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Google email not available"
            });
        }

        // Find existing MongoDB user
        let user = await User.findOne({ email });

        // Create user if not exists
        if (!user) {

            user = await User.create({
                name: name || "Google User",
                email: email,
                firebaseUid: uid,
                imageURL: picture || "",
            });

        } else {

            // If existing account
            // connect Firebase UID
            if ( !user.firebaseUid ) {
                user.firebaseUid = uid;
            }

            // Update Google profile image if available
            if ( picture && !user.imageURL ) {
                user.imageURL = picture;
            }

            await user.save();
        }

        // EXISTING JWT SYSTEM
        generateToken(res, {
            id: user._id
        });

        return res.status(200).send({
            success: true,
            message: "Google Login Successfully",
        });

    } catch (err) {
        // console.error("Google Login Error:", err);
        return res.status(500).send({
            success: false,
            message: "Google login failed",
            error: err.message
        });
    }
};




//get profile of specifice User by id through sending userId in request
export const getServerProfile = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!req.user) {
            return res.status(401).send(
                {
                    message: "Unauthorized User Credientials",
                    success: false,
                }
            );
        }

        const profile = await User.findById(userId).select("-password");

        if (!profile) {
            return res.status(404).send(
                {
                    message: "User Not Found",
                    success: false,
                }
            );
        }

        return res.status(200).send(
            {
                success: true,
                profile: profile
            }
        );

    } catch (err) {

        return res.status(500).send({
            message: err.message,
            success: false
        })
    }
};




//update profile Data useing sending request for updating profile through sending his profile id 
export const updateProfile = async (req, res) => {

    try {
        const user = req.user; // user has been send from protected middleware 
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.description = req.body.description || user.description;
        

        
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return res.status(400).send(
                    {
                        message: "Password must be at least 6 characters long",
                        success: false
                    }
                );
            }
            user.password = await bcrypt.hash(
                req.body.password,
                10
            );
        };

        const userId = user.id;
        const userProfile = await User.findById(userId);

        if (req.file && user?.public_id ) {
            if (user?.public_id) {
                //destroy proFilePicture 
                await cloudinary.uploader.destroy(userProfile.public_id);
            }

            //add new ProfileOicture 
            const result = await cloudinary.uploader.upload(req.file.path);
            user.public_id = result.public_id;
            user.imageURL = result.secure_url;

        }

        await user.save();
        return res.status(200).send(
            {
                success: true,
                message: "Profile Updated Successfully",
                updateProfile: user

            }
        );

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message

        });
    }
}



export const Logout = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        return res.status(200).send(
            {
                message: "Logout successfully", success: true
            }
        );

    } catch (err) {
        return res.status(500).send({
            message: err.message,
            success: false
        })
    }
}


