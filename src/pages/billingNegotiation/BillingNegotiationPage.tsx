import React, { useState } from "react";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  LinearProgress,
} from "@mui/material";

// Components
import BillingUpload from "./components/BillingUpload";
import IssueTable from "./components/IssueTable";
import CallButton from "./components/CallButton";

// types
import { Issue, AlertState } from "./types";

const BillingNegotiationPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [calling, setCalling] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [progress, setProgress] = useState(0); // Track progress of file processing

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setProgress(0);
    console.log("Uploaded file:", file.name);

    // Simulate file processing progress
    const interval = setInterval(
      () =>
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval); // Stop the interval when progress reaches 100%
            return 100;
          }
          return prev + 20;
        }),
      500
    );

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
      setProgress(0); // Reset progress after completing the simulation
    }, 2500);
  };

  const handleCallInitiation = () => {
    setCalling(true);
    setAlert({ type: "info", message: "Initiating call..." });
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
          {loading && <LinearProgress variant="determinate" value={progress} />}
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
