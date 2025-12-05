import { supabase } from "src/lib/supabase-client";

const bucketName = 'avatars';

const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
    return data.publicUrl;
}

export const uploadAvatarAndGetUrl = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file);
    console.log(data, error)

    if (error) throw error;
    return getPublicUrl(fileName);
}