"use client";

import { useState } from "react";
import {  Mail,  Phone,  MapPin,  Send,  MessageCircle, } from "lucide-react";
import { PostMail } from "@/services/postMailServices";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";



export default function ContactPage() {

  // Contact form
  const [isLoading,setIsLoading]=useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleProblemSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      //Create new object for post mail
      const MailConent = {
        name:form.name,
        email:form.email,
        subject:form.subject,
        message:form.message,
      }
      const response = await PostMail(MailConent);
      if(response.success){
        toast.success("Email Send successFully ")

      }else{
        toast.error("Network Issue,Sorry! Try again later")
      }

  } catch (error) {
    console.error("Failed to send email:", error);
  }finally{
    setIsLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-yellow-50 px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col justify-center text-center mb-12">

          <div className="flex items-center justify-center gap-2 text-4xl font-bold">
            <MessageCircle  size={35}  className="text-orange-500"/>
            Contact Us
          </div>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Have a question, suggestion, or feedback?
            We'd love to hear from you.
          </p>

        </div>


        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-2xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="text-gray-600 mb-8">
              Feel free to contact us. Our team will get back
              to you as soon as possible.
            </p>

            <ContactInfo icon={<Mail className="text-orange-500" />} title="Email" text="support@yourfoodapp.com" />

            <ContactInfo icon={<Phone className="text-orange-500" />} title="Phone" text="+91 98765 43210" />

            <ContactInfo  icon={<MapPin className="text-orange-500" />}  title="Location"  text="New Delhi, India"/>

          </div>


          {/* Contact Form */}
          <div className="bg-green-50 rounded-2xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleProblemSubmit} className="space-y-5" >
              <InputField  label="Name"  name="name"  value={form.name}  onChange={handleChange}  placeholder="Enter your name"/>

              <InputField  label="Email"  name="email"  type="email"  value={form.email}  onChange={handleChange}  placeholder="Enter your email"/>

              <InputField  label="Subject"  name="subject"  value={form.subject}  onChange={handleChange}  placeholder="Enter subject"/>

              <TextareaField  label="Message"  name="message"  value={form.message}  onChange={handleChange}  placeholder="Write your message..."/>

              <Button  isDisabled={isLoading}  type="submit"  className="w-full bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition">
                <Send size={18} />
                  {isLoading? "Sending..." : "Send Message"}
              </Button>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}





// REUSE FUNCTIONS
function InputField({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div>

      <label className="block font-medium mb-2">
        {label}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"/>

    </div>
  );
}



function TextareaField({  label,  name,  value,  onChange,  placeholder,  rows = 5,}) {
  return (
    <div>

      <label className="block font-medium mb-2">
        {label}
      </label>
      <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} required className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-orange-400"/>

    </div>
  );
}

function ContactInfo({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4 mb-6">

      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-500">{text}</p>
      </div>

    </div>
  );
}
