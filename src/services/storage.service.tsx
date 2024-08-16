import { Storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { makeThumbnail } from "utils/thumbnail";

export const StorageService = {
    upload: async (file: any, extension: string) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const storageRef = ref(Storage, `${year}/${month}/${uuidv4()}.${extension}`);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);
        return url;
    },
    uploadDetails: async (file: any, filename: string, onProgress: any, onSuccess: any, onError: any) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const extension = file.name.split('.').pop();
        const storageRef = ref(Storage, `${year}/${month}/${uuidv4()}.${extension}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress({ percent: progress });
            },
            (error) => {
                onError(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onSuccess(downloadURL);
                });
            }
        );
    },
    uploadThumbnail: async (file: any) => {
        const thumbnail = await makeThumbnail(file);
        return StorageService.upload(thumbnail, 'jpg');
    },
    uploadThumbnailDetails: async (file: any, onProgress: any, onSuccess: any, onError: any) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const storageRef = ref(Storage, `${year}/${month}/${uuidv4()}.jpg`);

        const thumbnail = await makeThumbnail(file);
        const uploadTask = uploadBytesResumable(storageRef, thumbnail);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress({ percent: progress });
            },
            (error) => {
                onError(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onSuccess(downloadURL);
                });
            }
        );
    }
}

export default StorageService;