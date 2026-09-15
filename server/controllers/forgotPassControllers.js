import crypto from "crypto";
import User from "../models/userModel.js";
import transporter from "../config/email.js";


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        // Security reason:
        // Don't reveal whether email exists or not
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset link has been sent."
            });
        }

        // Generate random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash token before saving into DB
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;

        // 15 minutes expiry
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            from: `"Recipe App" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Reset Your Password",

            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>

                <body style="
                    margin:0;
                    padding:0;
                    background:#f4f7fb;
                    font-family:Arial, sans-serif;
                ">

                    <div style="
                        max-width:600px;
                        margin:40px auto;
                        background:white;
                        border-radius:16px;
                        padding:40px;
                        box-shadow:0 5px 20px rgba(0,0,0,0.08);
                    ">

                        <h1 style="
                            color:#2563eb;
                            text-align:center;
                            margin-bottom:20px;
                        ">
                            Reset Your Password
                        </h1>

                        <p style="
                            color:#555;
                            font-size:16px;
                            line-height:1.6;
                        ">
                            Hello ${user.name || "User"},
                        </p>

                        <p style="
                            color:#555;
                            font-size:16px;
                            line-height:1.6;
                        ">
                            We received a request to reset your password.
                            Click the button below to create a new password.
                        </p>

                        <div style="text-align:center; margin:30px 0;">
                            <a
                                href="${resetUrl}"
                                style="
                                    display:inline-block;
                                    padding:14px 28px;
                                    background:#2563eb;
                                    color:white;
                                    text-decoration:none;
                                    border-radius:8px;
                                    font-weight:bold;
                                "
                            >
                                Reset Password
                            </a>
                        </div>

                        <p style="
                            color:#777;
                            font-size:14px;
                            line-height:1.6;
                        ">
                            This link will expire in <strong>15 minutes</strong>.
                        </p>

                        <p style="
                            color:#777;
                            font-size:14px;
                            line-height:1.6;
                        ">
                            If you didn't request a password reset,
                            you can safely ignore this email.
                        </p>

                        <hr style="
                            border:none;
                            border-top:1px solid #eee;
                            margin:30px 0;
                        "/>

                        <p style="
                            text-align:center;
                            color:#999;
                            font-size:12px;
                        ">
                            © 2026 Recipe App
                        </p>

                    </div>

                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Password reset link has been sent to your email."
        });

    } catch (error) {
        // console.error("Forgot password error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};