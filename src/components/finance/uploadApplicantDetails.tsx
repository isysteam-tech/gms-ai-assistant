import React, { useState, useRef } from "react";
import { AiOutlineCloudUpload, AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineDownload } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdError } from "react-icons/md";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import axios from "axios";

interface UploadState {
  file: File | null;
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
  recordsProcessed: number;
}

const UploadApplicantDetails: React.FC = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploading: false,
    uploaded: false,
    error: null,
    recordsProcessed: 0,
  });

  const [detokenize, setDetokenize] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file type - Accept both CSV and Excel
      const validExtensions = ['.csv', '.xlsx', '.xls'];
      const isValidFile = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      
      if (!isValidFile) {
        setUploadState({
          file: null,
          uploading: false,
          uploaded: false,
          error: "Please select a CSV or Excel file",
          recordsProcessed: 0,
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
          recordsProcessed: 0,
        });
        return;
      }

      setUploadState({
        file,
        uploading: false,
        uploaded: false,
        error: null,
        recordsProcessed: 0,
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
      // Create FormData to send file
      const formData = new FormData();
      formData.append('file', uploadState.file);

      // Call finance export API with file upload
      const response = await axios.post(
        `http://localhost:3000/gms-core/applicants/finance-export?purpose=${detokenize}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Important for file download
        }
      );

      // Extract filename from Content-Disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let fileName = `finance_export_${detokenize ? 'detokenized' : 'tokenized'}_${Date.now()}.csv`;
      
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1].replace(/['"]/g, '');
        }
      }

      // Create blob URL for download
      const blob = new Blob([response.data], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Auto-download the file
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      // Update state to show success
      setUploadState({
        file: uploadState.file,
        uploading: false,
        uploaded: true,
        error: null,
        recordsProcessed: 0, // Backend doesn't return count in this flow
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      
      let errorMessage = "Upload failed. Please try again.";
      
      if (error.response) {
        const status = error.response.status;
        const responseData = error.response.data;
        
        // Handle blob error response
        if (responseData instanceof Blob) {
          try {
            const text = await responseData.text();
            const jsonError = JSON.parse(text);
            errorMessage = jsonError.message || errorMessage;
          } catch (e) {
            errorMessage = "Server error occurred";
          }
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (status === 400) {
          errorMessage = "Invalid file format or missing applicant IDs";
        } else if (status === 401) {
          errorMessage = "Unauthorized. Please login again.";
        } else if (status === 403) {
          errorMessage = "Access denied. Finance role required.";
        } else if (status === 404) {
          errorMessage = "No applicants found for provided IDs";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "Cannot connect to server. Please check your connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setUploadState(prev => ({
        ...prev,
        uploading: false,
        error: errorMessage,
      }));
    }
  };

  const handleDownloadAgain = async () => {
    if (!uploadState.file) return;

    try {
      const formData = new FormData();
      formData.append('file', uploadState.file);

      const response = await axios.post(
        `http://localhost:3000/api/applicants/finance-export?purpose=${detokenize}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `finance_export_${detokenize ? 'detokenized' : 'tokenized'}_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      setUploadState(prev => ({
        ...prev,
        error: "Download failed. Please try again.",
      }));
    }
  };

  const handleReset = () => {
    setUploadState({
      file: null,
      uploading: false,
      uploaded: false,
      error: null,
      recordsProcessed: 0,
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
          {/* Detokenization Toggle */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Detokenization</h4>
                <p className="text-sm text-gray-600">
                  {detokenize 
                    ? "Export will include decrypted NRIC, Bank Account, and Bank Code" 
                    : "Export will include tokenized (encrypted) data"}
                </p>
              </div>
              <button
                onClick={() => setDetokenize(!detokenize)}
                className="flex items-center gap-2 transition-colors duration-200"
                aria-label={`Toggle detokenization ${detokenize ? 'off' : 'on'}`}
              >
                {detokenize ? (
                  <BsToggleOn className="w-12 h-12 text-purple-600" />
                ) : (
                  <BsToggleOff className="w-12 h-12 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <HiOutlineDocumentText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">File Requirements</h4>
                <p className="text-sm text-gray-600">
                  Upload a CSV or Excel file with a column named <strong>"Applicants Ids"</strong> containing applicant IDs. 
                  The system will process the file and generate a finance export.
                </p>
              </div>
            </div>
          </div>

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
                  {uploadState.file ? uploadState.file.name : "Click to upload CSV or Excel file"}
                </p>
                <p className="text-sm text-gray-500">
                  CSV, XLSX, or XLS files (Max 10MB)
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Must contain "Applicants Ids" column
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
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Error Message */}
          {uploadState.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
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
                  Processing & Downloading...
                </>
              ) : (
                <>
                  <AiOutlineCloudUpload className="w-5 h-5" />
                  Upload & Export
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
                  Export Complete!
                </h3>
                <p className="text-gray-600 mb-1">
                  Finance export file has been downloaded successfully
                </p>
                <p className="text-sm text-gray-500">
                  Check your downloads folder
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownloadAgain}
                className="mt-4 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <AiOutlineDownload className="w-5 h-5" />
                Download Again
              </button>

              {/* Upload Another */}
              <button
                onClick={handleReset}
                className="mt-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Process Another File
              </button>
            </div>
          </div>

          {/* Export Details Card */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 mb-4">Export Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Source File:</span>
                <span className="font-medium text-gray-800">{uploadState.file?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">File Size:</span>
                <span className="font-medium text-gray-800">
                  {uploadState.file ? (uploadState.file.size / 1024).toFixed(2) : '0'} KB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Detokenization:</span>
                <span className={`font-medium ${detokenize ? 'text-green-600' : 'text-gray-600'}`}>
                  {detokenize ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Export Time:</span>
                <span className="font-medium text-gray-800">
                  {new Date().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <AiOutlineCheckCircle className="w-4 h-4" />
                  Downloaded
                </span>
              </div>
            </div>
          </div>

          {/* Export Includes Info */}
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Exported CSV includes:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>• SI No.</div>
              <div>• ID</div>
              <div>• Name</div>
              <div>• Phone</div>
              <div>• Email</div>
              <div>• Salary Band</div>
              <div>• Company Name</div>
              <div>• Title</div>
              <div>• Timeline</div>
              <div>• Total Cost</div>
              <div>• Funding Amount</div>
              <div>• NRIC</div>
              <div>• Bank Account</div>
              <div>• Bank Code</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadApplicantDetails;