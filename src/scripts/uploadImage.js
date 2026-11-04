import { upload } from "@imagekit/javascript";

// UPLOAD AN IMAGE---------------------------------------------------------
export const imageUpload = async image => {
  if (!image) return;

  try {
    const response = await fetch("https://ananda-dairy-farm.onrender.com/auth");
    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const auth = await response.json();

    const result = await upload({
      file: image,
      fileName: image.name,
      publicKey: "public_6+ntLCADbIa/7dxvop1XwPkSIy4=",
      token: auth.token,
      expire: auth.expire,
      signature: auth.signature,
      useUniqueFileName: true,
    });
    // console.log("Image URL:", result.url);
    return result.url;
  } catch (error) {
    console.log("Upload failed:", error);
  }
};
