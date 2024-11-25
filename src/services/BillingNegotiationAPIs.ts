const BASE_URL = 'https://az-healthcare-backend.azurewebsites.net/api';
const LOCAL_URL = 'http://localhost:7071/api';

import { Issue } from "../types/billingNegotiationTypes";

interface BillingUploadResponse {
    success: boolean;
    message: string;
    data?: {
        issues: Issue[];
    };
}

interface TwilioCallResponse {
    success: boolean;
    message: string;
}

// Function to handle uploading of billing data
export const processBillingUpload = async (file: File): Promise<BillingUploadResponse> => {
    const url = `${LOCAL_URL}/processbillingupload`;
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to process billing upload');
    }

    return response.json();
};

// Function to initiate a Twilio call
export const initiateTwilioCall = async (): Promise<TwilioCallResponse> => {
    const url = `${BASE_URL}/twiliocall?code=TbAFwtKKN_ZliH-m_h6PS6WYtCsBozYnMROILX1MKfF5AzFutCFtGA%3D%3D`;

    const response = await fetch(url, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to initiate Twilio call');
    }

    return response.json();
};