export interface Issue {
    description: string;
    charged: number;
    expected: number;
    confidence: number;
 }
 
export interface IssueTableProps {
   calling: boolean;
   issues: Issue[];
   onNegotiate: (issue: Issue) => void;  // Function to initiate negotiation
 }

 export interface AlertState {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
 }