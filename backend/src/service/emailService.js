const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.GMAIL_EMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const send = async(to, subject, body)=>{
    const emailOptions={
        to: to,
        subject: subject,
        text: body,
        from: process.env.GMAIL_EMAIL_ID
    }

    try{
        await transporter.sendMail(emailOptions);
    }catch(error){
        console.log(error);
        throw error;
    }
};

module.export={send};