import React, { useState } from 'react';
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
    <div>
      <BillingUpload onUpload={handleFileUpload} />
      <IssueTable issues={issues} />
      <CallButton onCall={handleCallInitiation} />
    </div>
  );
};

export default BillingNegotiationPage;