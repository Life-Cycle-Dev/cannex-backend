export default ({ env }) => ({
    upload: {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            baseUrl: env('S3_PUBLIC_URL'),
            rootPath: env('S3_ROOT_PATH'),
            s3Options: {
              endpoint: env("S3_ENDPOINT"),
              credentials: {
                accessKeyId: env('S3_ACCESS_KEY_ID'),
                secretAccessKey: env('S3_ACCESS_SECRET'),
              },
              region: env('S3_REGION'),
              params: {
                ACL: env('S3_ACL', 'public-read'),
                Bucket: env('S3_BUCKET'),
              },
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
});
