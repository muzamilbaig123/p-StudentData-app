"use client"
import { storage } from "@/firebase/firebaseconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";


export default function UploadData () {
    const [selectFile, setSelectFile] = useState<File | null | undefined>(null)
    const [imgURL, setImgURL] = useState<string>("") 

    const uploadFileHandler = (event:ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectFile(file)
    }
    
    const uploadToFirebase = async () => {
        if(!selectFile) return console.log("No File Selected");

        const storageRef = ref(storage, `images/${selectFile?.name}`)    
        try{ 
        const uplFirebaseSto = await uploadBytes(storageRef, selectFile);
        const imageUrl = await getDownloadURL(storageRef);
        setImgURL(imageUrl);

        console.log("Upload Succefully", uplFirebaseSto)
        }catch(e){
            console.log("Error upload time ", e)
        }
        
    }

    console.log(selectFile)
    return (
        <>
            <h1 className="text-center text-3xl font-bold">Upload data</h1>

            <input type="file"
            onChange={uploadFileHandler}
            />
            <button className="btn-primary bg-black p-2 rounded-xl" onClick={uploadToFirebase}>Upload</button>
            <div>
                <Image src={imgURL} 
                width={200}
                height={200}
                alt="first image upload"
                />
            </div>
        </>
    )
}