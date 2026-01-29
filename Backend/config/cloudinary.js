const realCloudinary = require('cloudinary').v2;

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

console.log('Cloudinary Config Check:');
console.log('  Cloud Name:', CLOUDINARY_CLOUD_NAME || 'NOT SET');
console.log('  API Key:', CLOUDINARY_API_KEY || 'NOT SET');
console.log('  API Secret:', CLOUDINARY_API_SECRET ? `${CLOUDINARY_API_SECRET.substring(0, 5)}...` : 'NOT SET');

if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
    realCloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });
    console.log('Cloudinary configured successfully!');
    module.exports = realCloudinary;
} else {
    // Fallback stub so server doesn't crash when Cloudinary creds are missing.
    // Controllers already catch upload errors; this ensures upload_stream exists and returns
    // a stream object whose `end` calls the callback with an error.
    console.warn('Cloudinary credentials are not set. Uploads will be skipped.');

    const stub = {
        uploader: {
            upload_stream: (options, cb) => {
                return {
                    end: (buffer) => {
                        // call callback asynchronously to mimic real cloudinary behaviour
                        setImmediate(() => cb(new Error('Cloudinary not configured'), null));
                    },
                };
            },
        },
    };

    module.exports = stub;
}
