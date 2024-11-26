import React, { useState } from "react";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  LinearProgress,
  Snackbar,
} from "@mui/material";

// Components
import BillingUpload from "./components/BillingUpload";
import IssueTable from "./components/IssueTable";

// Types
import { Issue, AlertState } from "../../types/billingNegotiationTypes";

// Services
import {
  processBillingUpload,
  initiateTwilioCall,
} from "../../services/BillingNegotiationAPIs";

const BillingNegotiationPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [billId, setBillId] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [progress, setProgress] = useState(0); // Track progress of file processing

  const [loading, setLoading] = useState(false);
  const [currentlyCalling, setCurrentlyCalling] = useState<number | null>(null);

  const [alert, setAlert] = useState<AlertState | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      setProgress(0); // Start progress at 0

      // Simulate gradual progress update
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 10;
          }
          clearInterval(timer);
          return 100; // When progress reaches 100, clear interval
        });
      }, 200);

      const result = await processBillingUpload(file);
      if (result.success) {
        const issues = result.data?.issues || [];
        if (issues.length > 0) {
          setIssues(issues);
          setAlert({
            type: "success",
            message: "Billing processed successfully.",
          });
        } else {
          setIssues([]);
          setAlert({
            type: "success",
            message: "No potential errors detected.",
          });
        }
        setBillId(result.data.bill_id);
        setPatientId(result.data.patient_id);
        setSnackbarOpen(true);
      } else {
        setAlert({ type: "error", message: result.message });
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Upload failed. Please try again." });
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setProgress(0); // Reset progress after the operation
    }
  };

  const handleNegotiation = async (index: number, issue: Issue) => {
    try {
      setCurrentlyCalling(index); // Start tracking which issue is calling
      console.log("Negotiating for issue:", issue);

      const result = await initiateTwilioCall(billId, patientId, issue);

      if (result.success) {
        setAlert({
          type: "success",
          message: `Twilio call initiated successfully for issue: ${issue.description}`,
        });
      } else {
        setAlert({ type: "error", message: result.message });
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Call failed:", error);
      setAlert({ type: "error", message: "Failed to initiate call." });
      setSnackbarOpen(true);
    } finally {
      setCurrentlyCalling(null); // Reset the currently calling index
    }
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
          <IssueTable
            currentlyCalling={currentlyCalling}
            issues={issues}
            onNegotiate={handleNegotiation}
          />
        </Box>
        <Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={alert?.type}
              sx={{ width: "100%" }}
            >
              {alert?.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};

export default BillingNegotiationPage;
