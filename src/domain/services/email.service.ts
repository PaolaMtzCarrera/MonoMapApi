import nodemailer from 'nodemailer'
import { envs } from '../../config/env';


interface MailOptions {
    to: string;
    subject: string;
    htmlBody: string;
}

export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_ACCESS_TOKEN
        }
    });

    async sendEmail(options: MailOptions){
        try{
            const { to, subject,htmlBody} = options;
            const sentInfromation = await this.transporter.sendMail({
                to,
                subject,
                html:htmlBody
            });
            console.log(sentInfromation);
        }
        catch(error){
            console.error(error);

        }
    } 
}