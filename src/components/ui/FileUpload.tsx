import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  selectedFile?: File | null;
  error?: string;
  loading?: boolean;
  success?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = ".pdf,.doc,.docx",
  maxSize = 5,
  onFileSelect,
  onFileRemove,
  selectedFile,
  error,
  loading = false,
  success = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {!selectedFile ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
            ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}
            ${error ? 'border-error-500 bg-error-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
          />
          
          <div className="space-y-2">
            <Upload className={`w-8 h-8 mx-auto ${dragOver ? 'text-primary-600' : 'text-gray-400'}`} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {dragOver ? 'Drop your file here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">
                {accept.replace(/\./g, '').toUpperCase()} up to {maxSize}MB
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            flex items-center justify-between p-4 border rounded-lg
            ${success ? 'border-success-200 bg-success-50' : 'border-gray-200 bg-gray-50'}
            ${error ? 'border-error-200 bg-error-50' : ''}
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded ${success ? 'bg-success-100' : 'bg-gray-100'}`}>
              {success ? (
                <CheckCircle className="w-5 h-5 text-success-600" />
              ) : error ? (
                <AlertCircle className="w-5 h-5 text-error-600" />
              ) : (
                <File className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {loading && (
              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            )}
            {onFileRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileRemove();
                }}
                icon={<X className="w-4 h-4" />}
              />
            )}
          </div>
        </motion.div>
      )}
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FileUpload;