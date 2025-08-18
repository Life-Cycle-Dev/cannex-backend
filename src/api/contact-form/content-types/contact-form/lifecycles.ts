

export default {
    async afterCreate(event) {
        const { result } = event;

        try {
            const config = await strapi.service("api::contact-form-config.contact-form-config").findFirst()

            if (config.enable !== "true") {
                return;
            }

            const replyToEmail: string = config.replyTo;
            const replySubject: string = config.replySubject;
            let replyMessage: string = config.replyMessage;

            replyMessage = replyMessage.replace("{firstname}", result.firstname)
                .replace("{lastname}", result.lastname)
                .replace("{email}", result.email)
                .replace("{reason}", result.reason)
                .replace("{message}", result.message)

            await strapi.plugins['email'].services.email.send({
                to: result.email,
                from: process.env.SMTP_USERNAME,
                cc: replyToEmail,
                subject: replySubject,
                html: replyMessage,
            })
        } catch (err) {
            console.log(err);
        }
    },
};