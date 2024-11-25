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
import { IssueTableProps } from "../types";

const IssueTable: React.FC<IssueTableProps> = ({ calling, issues, onNegotiate }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Charged</TableCell>
            <TableCell align="right">Expected</TableCell>
            <TableCell align="right">Confidence</TableCell>
            <TableCell align="right">Actions</TableCell>{" "}
            {/* Added cell for actions */}
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {issue.description}
              </TableCell>
              <TableCell align="right">{issue.charged}</TableCell>
              <TableCell align="right">{issue.expected}</TableCell>
              <TableCell align="right">{`${(issue.confidence * 100).toFixed(
                2
              )}%`}</TableCell>
              <TableCell align="right">
                <Box>
                  {calling ? (
                    <CircularProgress />
                  ) : (
                    <CallButton
                      onCall={() => onNegotiate(issue)}
                    />
                  )}
                </Box>
                {/* Pass the specific issue to the negotiate function */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IssueTable;
