import {createTransport} from "nodemailer"

export const sendMail = async( email,subject, text)=>{
    const  transporter = createTransport({
        host: process.env.Mail_Host,
        port: Number(process.env.Mail_Port),
        auth:{
            user: process.env.Mail_User,
            pass: process.env.Mail_Password
        }
    })

    await transport.sendmail({
        from:process.env.Mail_User,
        to:email,
        subject:`Register signup ${subject}`,
        text
    })
}