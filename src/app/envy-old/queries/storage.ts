import { supabase } from "src/lib/supabase-client";

const avatarbucketName = 'avatars';
const listImageBucketName = 'list-images';


const getPublicUrl = (bucketName: string, filePath: string) => {
    const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
    return data.publicUrl;
}

export const uploadAvatarAndGetUrl = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from(avatarbucketName).upload(fileName, file);

    if (error) throw error;
    return getPublicUrl(avatarbucketName, fileName);
}

export const uploadListImageAndGetUrl = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from(listImageBucketName).upload(fileName, file);

    if (error) throw error;
    return getPublicUrl(listImageBucketName, fileName);
}