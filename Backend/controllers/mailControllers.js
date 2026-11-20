import { sendMail } from "../backendServices/mailServices.js";

export const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    await sendMail({
      to: "comaker008@gmail.com",
      replyTo: email,
      subject: `Website Issue Report - ${name}`,

      // Fallback for email clients that don't support HTML
      text: `
    Name: ${name}
      Email: ${email}

      Website Issue:
      ${message}
            `,

        // Beautiful HTML email
        html: `
          <div style="
            background-color: #f4f4f5;
            padding: 40px 20px;
            font-family: Arial, sans-serif;
          ">

            <div style="
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          ">

            <!-- Header -->
            <div style="
              background-color: #18181b;
              padding: 25px;
              text-align: center;
            ">
              <h1 style="
                color: white;
                margin: 0;
                font-size: 24px;
              ">
              From Wesite Resify
              </h1>

              <p style="
                color: #d4d4d8;
                margin: 8px 0 0;
                font-size: 14px;
              ">
                A New User contact with you 
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">

              <h2 style="
                color: #18181b;
                margin-top: 0;
              ">
                User Information
              </h2>

              <div style="
                background-color: #f4f4f5;
                padding: 18px;
                border-radius: 8px;
              ">

                <p style="margin: 8px 0;">
                  <strong>Name:</strong> ${name}
                </p>

                <p style="margin: 8px 0;">
                  <strong>Email:</strong> ${email}
                </p>

              </div>

              <h2 style="
                color: #18181b;
                margin-top: 30px;
              ">
                Subject:- ${subject}
              </h2>

              <div style="
                background-color: #fafafa;
                border-left: 4px solid #18181b;
                padding: 15px 18px;
                border-radius: 6px;
              ">
                <p style="
                  margin: 0;
                  color: #3f3f46;
                  line-height: 1.6;
                  white-space: pre-line;
                ">
                  ⚠️ ${message}
                </p>
              </div>

            </div>

            <!-- Footer -->
            <div style="
              background-color: #f4f4f5;
              padding: 18px;
              text-align: center;
            ">

              <p style="
                margin: 0;
                color: #71717a;
                font-size: 13px;
              ">
                This message was sent from your website contact form.
              </p>

              <p style="
                margin: 6px 0 0;
                color: #a1a1aa;
                font-size: 12px;
              ">
                Please reply to this email to contact the user.
              </p>

            </div>

          </div>

        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    // console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};