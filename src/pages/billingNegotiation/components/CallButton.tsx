import React from 'react';
import { Button } from '@mui/material';

interface CallButtonProps {
  onCall: () => void;
}

const CallButton: React.FC<CallButtonProps> = ({ onCall }) => {
  return (
    <Button variant="contained" color="primary" onClick={onCall}>
      Negotiate
    </Button>
  );
};

export default CallButton;