import Dashboard from "@/components/studentmanage/dashboard";
import UploadData from "@/components/uploadfile/imageFile";

export default function Home () {
  return (
    <>
       <Dashboard /> 
      <div className="m-10 textce">
      <UploadData/>
      </div>
    </>
  )
}