import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Issue {
  description: string;
  charged: number;
  expected: number;
  confidence: number;
}

interface IssueTableProps {
  issues: Issue[];
}

const IssueTable: React.FC<IssueTableProps> = ({ issues }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Charged</TableCell>
            <TableCell align="right">Expected</TableCell>
            <TableCell align="right">Confidence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="right">{row.charged}</TableCell>
              <TableCell align="right">{row.expected}</TableCell>
              <TableCell align="right">{`${(row.confidence * 100).toFixed(2)}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IssueTable;