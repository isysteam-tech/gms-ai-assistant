import React, { useState, useRef } from "react";
import { AiOutlineCloudUpload, AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineDownload } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdError } from "react-icons/md";

interface UploadState {
  file: File | null;
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
  downloadUrl: string | null;
}

const UploadApplicantDetails: React.FC = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploading: false,
    uploaded: false,
    error: null,
    downloadUrl: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file type
      if (!file.name.endsWith('.csv')) {
        setUploadState({
          file: null,
          uploading: false,
          uploaded: false,
          error: "Please select a CSV file",
          downloadUrl: null,
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadState({
          file: null,
          uploading: false,
          uploaded: false,
          error: "File size must be less than 10MB",
          downloadUrl: null,
        });
        return;
      }

      setUploadState({
        file,
        uploading: false,
        uploaded: false,
        error: null,
        downloadUrl: null,
      });
    }
  };

  const handleUpload = async () => {
    if (!uploadState.file) {
      setUploadState(prev => ({
        ...prev,
        error: "Please select a file first",
      }));
      return;
    }

    setUploadState(prev => ({
      ...prev,
      uploading: true,
      error: null,
    }));

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', uploadState.file);

      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/api/applicants/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      // Simulate getting download URL from backend
      // Replace this with actual response data
      const downloadUrl = result.downloadUrl || URL.createObjectURL(uploadState.file);

      setUploadState(prev => ({
        ...prev,
        uploading: false,
        uploaded: true,
        downloadUrl,
      }));
    } catch (error: any) {
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        error: error.message || "Upload failed. Please try again.",
      }));
    }
  };

  const handleDownload = () => {
    if (uploadState.downloadUrl) {
      const link = document.createElement('a');
      link.href = uploadState.downloadUrl;
      link.download = `processed_${uploadState.file?.name || 'applicants.csv'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setUploadState({
      file: null,
      uploading: false,
      uploaded: false,
      error: null,
      downloadUrl: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Upload Area */}
      {!uploadState.uploaded ? (
        <div className="w-full max-w-2xl">
          {/* Drag & Drop Area */}
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                <AiOutlineCloudUpload className="w-10 h-10 text-purple-600" />
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {uploadState.file ? uploadState.file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-gray-500">
                  CSV files only (Max 10MB)
                </p>
              </div>

              {uploadState.file && (
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                  <HiOutlineDocumentText className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">
                    {uploadState.file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({(uploadState.file.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Error Message */}
          {uploadState.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <MdError className="w-5 h-5 flex-shrink-0" />
                <span>{uploadState.error}</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleUpload}
              disabled={!uploadState.file || uploadState.uploading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {uploadState.uploading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                  Uploading...
                </>
              ) : (
                <>
                  <AiOutlineCloudUpload className="w-5 h-5" />
                  Upload File
                </>
              )}
            </button>

            {uploadState.file && (
              <button
                onClick={handleReset}
                disabled={uploadState.uploading}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      ) : (
        // Success State with Download
        <div className="w-full max-w-2xl">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <AiOutlineCheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Upload Successful!
                </h3>
                <p className="text-gray-600 mb-1">
                  Your file has been processed successfully
                </p>
                <p className="text-sm text-gray-500">
                  {uploadState.file?.name}
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="mt-4 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <AiOutlineDownload className="w-5 h-5" />
                Download Processed File
              </button>

              {/* Upload Another */}
              <button
                onClick={handleReset}
                className="mt-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Upload Another File
              </button>
            </div>
          </div>

          {/* File Details Card */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 mb-4">Upload Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">File Name:</span>
                <span className="font-medium text-gray-800">{uploadState.file?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">File Size:</span>
                <span className="font-medium text-gray-800">
                  {uploadState.file ? (uploadState.file.size / 1024).toFixed(2) : '0'} KB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Upload Time:</span>
                <span className="font-medium text-gray-800">
                  {new Date().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <AiOutlineCheckCircle className="w-4 h-4" />
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadApplicantDetails;