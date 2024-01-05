export const uploadImage = async (imageFile: File): Promise<{ data: string | null, error: string | null }> => {
    const formData = new FormData();
    formData.append("key", "615f27c756399eee809b14e9b5fa3814");
    formData.append("image", imageFile);

    let data: string | null = null;
    let error: string | null = null;

    try {
        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        const responseData = await response.json();

        if (responseData?.data?.url) {
            data = responseData.data.url;
        } else {
            error = "No URL in response data";
        }
    } catch (err) {
        error = `Error uploading image: ${err}`;
    }

    return { data, error };
};
