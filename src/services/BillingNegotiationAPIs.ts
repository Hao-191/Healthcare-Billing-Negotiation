const BASE_URL = "https://az-healthcare-backend.azurewebsites.net/api";

import { Issue } from "../types/billingNegotiationTypes";

interface BillingUploadResponse {
  success: boolean;
  message: string;
  data: {
    bill_id: string;
    patient_id: string;
    issues?: Issue[];
  };
}

interface TwilioCallResponse {
  success: boolean;
  message: string;
}

// Function to handle uploading of billing data
export const processBillingUpload = async (
  file: File
): Promise<BillingUploadResponse> => {
  if (!file.type.match("application/json") && !file.type.match("text/plain")) {
    throw new Error(
      "Unsupported file type. Please upload JSON or plain text files."
    );
  }

  if (file.size > 1024 * 1024 * 5) {
    throw new Error("File too large. Please upload a file smaller than 5MB.");
  }

  const url = `${BASE_URL}/processbillingupload`;
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to process billing upload");
  }

  return response.json();
};

// Function to initiate a Twilio call
export const initiateTwilioCall = async (
  // to:string,
  billId: string,
  patientId: string,
  issue: Issue
): Promise<TwilioCallResponse> => {
  const url = `${BASE_URL}/twiliocall?code=TbAFwtKKN_ZliH-m_h6PS6WYtCsBozYnMROILX1MKfF5AzFutCFtGA%3D%3D`;

  const body = JSON.stringify({
    // to: to,
    bill_id: billId,
    patient_id: patientId,
    description: issue.description,
    charged: issue.charged,
    expected: issue.expected,
    flag: issue.flag,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("Failed to initiate Twilio call");
  }

  return response.json();
};
