import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Invalid reset token"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Hash token received from frontend
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find valid token + check expiry
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or expired"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;

        // Token can no longer be reused
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        // console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};