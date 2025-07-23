import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
//console.log("Env check:", {
  //pub: process.env.IMAGEKIT_PUBLIC,
  //priv: process.env.IMAGEKIT_PRIVATE,
  //url: process.env.IMAGEKIT_URL_ENDPOINT,
//});

export default imagekit;
