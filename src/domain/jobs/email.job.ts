import cron from 'node-cron';
import { EmailService } from '../services/email.service';
import { generateMonoMapEmailTemplate } from '../template/email.template';
import { MonoMapModel } from '../../data/models/monomap.models';
import { MonoMapDataSource } from '../datasources/monomap.datasource';

export const emailJob = () => {
    const emailService = new EmailService();
    const monomapDataSource = new MonoMapDataSource();

    cron.schedule('*/10 * * * * *', async () => {
        console.log("Cada 10 segundos");
        try {
            const monocases = await MonoMapModel.find({ isEmailSent: false });
            if (!monocases.length) {
                console.log("No hay casos pendientes de enviar");
                return;
            }

            console.log(`Procesando ${monocases.length} casos.`);

            await Promise.all(
                monocases.map(async (mono_case) => {
                    const htmlBody = generateMonoMapEmailTemplate(
                        mono_case.lat,
                        mono_case.lng,
                        mono_case.genre,
                        mono_case.age,
                    );

                    await emailService.sendEmail({
                        to: "estefymartinezc235y@gmail.com",
                        subject: `Caso de Viruela del Mono`,
                        htmlBody: htmlBody, 
                    });

                    console.log(`Email enviado para el caso con ID: ${mono_case._id}`);
                    
                    await monomapDataSource.updateMonoCase(mono_case._id.toString(), { isEmailSent: true });
                    console.log(`Caso actualizado para el ID: ${mono_case._id}`);
                })
            );
        } catch (error) {
            console.error("Error durante el trabajo de envío de correos:", error);
        }
    });
};