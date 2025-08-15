
const getValueByKey = async (key: string): Promise<string> => {
    try {
        const document = await strapi.documents("api::web-config.web-config").findFirst({
            filters: {
                key: key
            }
        });
        return document.value;
    } catch (error) {
        console.log(error);
        return ""
    }
}

export default {
    async afterCreate(event) {
        const { result } = event;

        try {
            const enable: string = await getValueByKey("contact-form.enable")

            if (enable !== "true") {
                return;
            }

            const replyToEmail: string = await getValueByKey("contact-form.reply-to")
            const replySubject: string = await getValueByKey("contact-form.reply-subject")
            let replyMessage: string = await getValueByKey("contact-form.reply-message")

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