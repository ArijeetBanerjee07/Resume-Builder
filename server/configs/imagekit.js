import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ImageKitPkg = require("@imagekit/nodejs");
const ImageKit = ImageKitPkg.default || ImageKitPkg;
const toFile = ImageKitPkg.toFile;

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export { toFile };
export default imagekit;