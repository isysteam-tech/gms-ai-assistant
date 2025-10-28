import axios from "axios";
import React from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { PiLinkSimple, PiDotsThreeVertical } from "react-icons/pi";
import { toast } from "react-toastify";

const uploadButton = () => {
  const [messages, setMessages] = React.useState<
    Array<{ text: string; isUser: boolean; timestamp: string }>
  >([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast.loading("Uploading file...");

      const response = await axios.post(
        "http://localhost:3000/gms-core/pdf/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss();
      toast.success(`✅ File uploaded successfully: ${file.name}`);

      console.log("Upload response:", response.data);

      // Optionally: show message in chat
      setMessages((prev) => [
        ...prev,
        {
          text: `📎 File uploaded: ${file.name}`,
          isUser: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error: any) {
      toast.dismiss();
      console.error("Upload error:", error);
      toast.error("❌ File upload failed. Please try again.");
    } finally {
      e.target.value = ""; // reset input
    }
  };

  return (
    <div className="flex gap-4 items-center text-gray-600">
      <div className="relative">
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={(e) => handleFileUpload(e)}
          accept=".pdf,.docx,.jpg,.jpeg,.png"
        />
        <label
          htmlFor="fileUpload"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 rounded-lg hover:from-purple-100 hover:to-indigo-100 border border-purple-200 hover:border-purple-300 transition-all duration-200 cursor-pointer font-medium text-sm group"
          title="Upload a file"
        >
          <HiOutlineDocumentAdd className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span>Upload</span>
        </label>
      </div>

      {/* <button className="hover:text-purple-600 transition-colors duration-200">
        <FaRegShareSquare size={18} />
      </button>
      <button className="hover:text-purple-600 transition-colors duration-200">
        <PiLinkSimple size={20} />
      </button>
      <button className="hover:text-purple-600 transition-colors duration-200">
        <PiDotsThreeVertical size={20} />
      </button> */}
    </div>
  );
};

export default uploadButton;
