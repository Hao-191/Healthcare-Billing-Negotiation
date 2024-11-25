export interface Issue {
    code: number;
    description: string;
    charged: number;
    expected: number;
    flag: string;
    confidence: number;
 }
 
export interface IssueTableProps {
   currentlyCalling: number | null;
   issues: Issue[];
   onNegotiate: (index: number, issue: Issue) => void;  // Function to initiate negotiation
 }

 export interface AlertState {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
 }