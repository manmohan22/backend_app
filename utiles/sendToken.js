export const sendToken = (res, user, statusCode, message) => { 
    const token = user.getJWTToken()

    const options={
        httpOnly: true,
        expire: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE *24*60*60*1000)
    }

    const userData={
        _id: user.id,
        name:user.name,
        email:user.email,
        avtar:user.avtar,
        
    }

    res.status(statusCode) 
    .cookie("token",token,{
        options
    })
    .json({
        sucess:true,
        message,
        user:userData,
    })
}