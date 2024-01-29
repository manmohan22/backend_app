import { user } from "../models/model.users.js"
import { sendMail } from "../utiles/sendMail.js"
import { sendToken } from "../utiles/sendToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let userExist = await user.findOne({ email: email });
        // const { avtar } = req.files;
        let user = await user.findOne({ email });

        if (user) {
            return req.status(400).json({
                sucess: false,
                message: "user already exist",
            })
        }

        const otp = Math.floor(Math.random() * 1000000)

        user = await user.create(
            {
                name,
                email,
                password,
                avtar: {
                    public_id: "",
                    url: "",
                },
                otp,
                otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRY * 60 * 1000)
            });

        await sendMail(
            eamil,
            "verify your account", ` your OTP is ${otp}`
        )

        sendToken(
            res,
            user,
            201,
            "OTP sent to your mail, please verify your account."
        )

    } catch (error) {res.status(500).json({
            sucess: false,
            message: error.message
        })

    }
}
export const verify = async(req,res)=>{
    try {
        const otp= number(req.body.otp);

        const user= await user.findById(req.user._id)

        if(user.otp !== otp || user.otp_expiry < Date.now()){
            return res.status(400).json({sucess:false,message:"invalid OTP or has been expired"})
        }
        user.Verified=true;
        user.otp=null;
        user.otp_expiry=null;

        await user.save();
        sendToken(res,user,200, "account verified")

    } catch (error) {
        res.status(500).json({
            sucess : false,
            message : error.message
        })
        
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const { avtar } = req.files;
        const user = await user.findOne({ email }).select("+password");

        if (!user) {
            return req.status(400).json({
                sucess: false,
                message: "invalid user & password",
            })
        }

        const ismatch= await user.comarePassword(password)
        
        if(!ismatch) {
            return req.status(400).json({
                success: false,
                message:"Invalid email or password"})

        sendToken(res,user,200,"login successfully.")

    }} catch (error) {res.status(500).json({sucess: false,message: error.message})

    }
}
