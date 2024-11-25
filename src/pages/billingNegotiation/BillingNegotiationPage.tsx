import React, { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";

// Components
import BillingUpload from "./components/BillingUpload";
import IssueTable from "./components/IssueTable";
import CallButton from "./components/CallButton";

const BillingNegotiationPage: React.FC = () => {
  const [issues, setIssues] = useState([]);

  const handleFileUpload = (file: File) => {
    // Process file and update issues
    console.log(file); // Placeholder for file processing logic
  };

  const handleCallInitiation = () => {
    console.log("Calling Twilio API to initiate call"); // Placeholder for Twilio API call
    setIssues([]); // Placeholder for updating issues
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ marginTop: 4 }}
      >
        Billing Negotiation System
      </Typography>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BillingUpload onUpload={handleFileUpload} />
          </Grid>
          <Grid item xs={12}>
            <IssueTable issues={issues} />
          </Grid>
          <Grid item xs={12}>
            <CallButton onCall={handleCallInitiation} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BillingNegotiationPage;
