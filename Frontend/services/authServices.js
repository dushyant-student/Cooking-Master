import api from "@/lib/axios";


export const registerUser = async(registerData)=>{
    const response = await api.post("/auth/register",registerData);
    return  response.data;

};

export const loginUser = async(loginData)=>{
    const response = await api.post("/auth/login",loginData);
    return response.data;

}

export const logOutUser = async(logOutData)=>{
   const response = await api.get("/auth/logout",logOutData) 
   return response.data;

}


export const updateProfileUser = async (formData) => {
    const response = await api.put( "/auth/update-profile", formData );
    return response.data;
};




export const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
};


export const resetPassword = async (token, password) => {
    const response = await api.post( `/auth/reset-password/${token}`,
        {
            password
        }
    );

    return response.data;
};