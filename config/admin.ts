export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env("CLIENT_URL"),
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({ documentId });

        if (status === "published") {
          if (uid === "api::newsroom.newsroom") {
            return `${env('CLIENT_URL')}/newsroom/${document.slug}`
          } else if (uid === "api::event.event") {
            return `${env('CLIENT_URL')}/events/${document.slug}`
          }
        } else if (status === "draft") {
          if (uid === "api::newsroom.newsroom") {
            return `${env('CLIENT_URL')}/newsroom/${document.slug}?preview=true`
          } else if (uid === "api::event.event") {
            return `${env('CLIENT_URL')}/events/${document.slug}?preview=true`
          }
        }

        return `${env('CLIENT_URL')}`
      },
    }
  }
});
