import React, { useState } from "react";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

// Components
import BillingUpload from "./components/BillingUpload";
import IssueTable from "./components/IssueTable";
import CallButton from "./components/CallButton";

// Define interfaces
interface Issue {
  description: string;
  charged: number;
  expected: number;
  confidence: number;
}

interface AlertState {
  type: "success" | "error" | "info" | "warning"; 
  message: string; 
}

const BillingNegotiationPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [calling, setCalling] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null); 

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    console.log(file); // Simulate file processing
    setTimeout(() => {
      setLoading(false);
      setIssues([
        {
          description: "Duplicate Charge",
          charged: 350,
          expected: 175,
          confidence: 0.95,
        },
      ]);
    }, 2000);
  };

  const handleCallInitiation = () => {
    setCalling(true);
    setAlert({ type: "info", message: "Initiating call..." });
    console.log("Calling Twilio API to initiate call"); // Simulate API call
    setTimeout(() => {
      setCalling(false);
      setAlert({ type: "success", message: "Call initiated successfully!" });
    }, 2000);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ marginTop: 4, marginBottom: 2 }}
      >
        Billing Negotiation System
      </Typography>
      <Box display="flex" flexDirection="column" gap={3} alignItems="center">
        <Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <BillingUpload onUpload={handleFileUpload} />
          )}
        </Box>
        <Box flexGrow={1}>
          <IssueTable issues={issues} />
        </Box>
        <Box>
          {calling ? (
            <CircularProgress />
          ) : (
            <CallButton onCall={handleCallInitiation} />
          )}
          {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default BillingNegotiationPage;
