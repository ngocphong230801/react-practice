// Assuming you have a type definition for the image file
// For instance, it could be a File object from a file input element in a web application
export const uploadImage = async (imageFile: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("key", "615f27c756399eee809b14e9b5fa3814");
    formData.append("image", imageFile);

    try {
        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        // Check if the URL is present in the response data
        if (data?.data?.url) {
            return data.data.url;
        } else {
            console.error("No URL in response data");
            return null;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
