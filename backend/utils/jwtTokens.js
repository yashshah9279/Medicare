export const generateToken = (user, message, statusCode, res)=>{
    const token =user.generateJsonWebToken();
    const cookirName = user.role === "Admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookirName, token, {
        expires: new Date(
            Date.now()+ process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
        ),
    }).json({
        success: true,
        message,
        user,
        token,
    });
}