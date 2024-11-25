export interface Issue {
    description: string;
    charged: number;
    expected: number;
    confidence: number;
 }
 
 export interface AlertState {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
 }