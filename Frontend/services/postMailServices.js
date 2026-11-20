import api from "@/lib/axios";

export const PostMail = async(MailConent)=>{
    const response = await api.post("/client-mail",MailConent );
    return response.data ;
    
}