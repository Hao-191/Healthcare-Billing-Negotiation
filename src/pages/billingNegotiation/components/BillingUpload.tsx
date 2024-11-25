import React from 'react';
import { Button } from '@mui/material';

interface BillingUploadProps {
  onUpload: (file: File) => void;
}

const BillingUpload: React.FC<BillingUploadProps> = ({ onUpload }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  return (
    <Button variant="contained" component="label">
      Upload File
      <input
        type="file"
        hidden
        onChange={handleChange}
      />
    </Button>
  );
};

export default BillingUpload;