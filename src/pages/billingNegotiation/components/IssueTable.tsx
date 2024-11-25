import React from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Components
import CallButton from "./CallButton";

// Types
import { IssueTableProps } from "../../../types/billingNegotiationTypes";

const IssueTable: React.FC<IssueTableProps> = ({
  currentlyCalling,
  issues,
  onNegotiate,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Charged</TableCell>
            <TableCell align="right">Expected</TableCell>
            <TableCell align="right">Flag</TableCell>
            <TableCell align="right">Confidence</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {issue.code}
              </TableCell>
              <TableCell align="right">{issue.description}</TableCell>
              <TableCell align="right">{issue.charged}</TableCell>
              <TableCell align="right">{issue.expected}</TableCell>
              <TableCell align="right">{issue.flag}</TableCell>
              <TableCell align="right">{`${(issue.confidence * 100).toFixed(
                2
              )}%`}</TableCell>
              <TableCell align="right">
                <Box>
                  {currentlyCalling === index ? (
                    <CircularProgress />
                  ) : (
                    <CallButton onCall={() => onNegotiate(index, issue)} />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IssueTable;
