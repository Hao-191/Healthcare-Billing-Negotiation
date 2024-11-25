import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';

// Components
import BillingUpload from './components/BillingUpload';
import IssueTable from './components/IssueTable';
import CallButton from './components/CallButton';

const BillingNegotiationPage: React.FC = () => {
  const [issues, setIssues] = useState([]);

  const handleFileUpload = (file: File) => {
    // Process file and update issues
    console.log(file); // Placeholder for file processing logic
  };

  const handleCallInitiation = () => {
    console.log('Calling Twilio API to initiate call'); // Placeholder for Twilio API call
    setIssues([]); // Placeholder for updating issues
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4, marginBottom: 2 }}>
        Billing Negotiation System
      </Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box>
          <BillingUpload onUpload={handleFileUpload} />
        </Box>
        <Box flexGrow={1}>
          <IssueTable issues={issues} />
        </Box>
        <Box>
          <CallButton onCall={handleCallInitiation} />
        </Box>
      </Box>
    </Container>
  );
};

export default BillingNegotiationPage;