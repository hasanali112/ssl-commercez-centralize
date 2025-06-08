import { Request, Response } from "express";
import { PaymentHistory } from "../PaymentHistory/paymentHistory.model";
import { Store } from "../Store/store.model";

const successMessage = async (req: Request, res: Response) => {
  const query = req.query;
  const transactionId = query.transactionId;
  const amount = query.amount;
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const paymentDate = date.toLocaleDateString("en-US", options);

  const findOrder = await PaymentHistory.findOne({ transactionId }).select(
    "storeId"
  );
  const findStore = await Store.findOne({ storeId: findOrder?.storeId });

  const baseUrl = findStore?.storeFrontendUrl;

  const message = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Successful</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-x: hidden;
        }

        .container {
            max-width: 500px;
            width: 90%;
            position: relative;
        }

        .success-card {
            background: white;
            border-radius: 24px;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
            animation: slideUp 0.8s ease-out;
        }

        .success-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: shine 2s ease-in-out 1s;
        }

        .checkmark-container {
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            position: relative;
        }

        .checkmark {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, #48bb78, #38a169);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(72, 187, 120, 0.3);
            animation: bounce 0.6s ease-out 0.2s both;
            position: relative;
            overflow: hidden;
        }

        .checkmark::before {
            content: '';
            position: absolute;
            width: 120%;
            height: 120%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            animation: pulse 2s ease-in-out infinite;
        }

        .checkmark svg {
            width: 50px;
            height: 50px;
            fill: white;
            z-index: 1;
            animation: drawCheck 0.5s ease-out 0.8s both;
        }

        .title {
            font-size: 2.0rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #2d3748, #4a5568);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        .subtitle {
            font-size: 1.0rem;
            color: #4a5568;
            margin-bottom: 2rem;
            line-height: 1.6;
            animation: fadeInUp 0.6s ease-out 0.6s both;
        }

        .transaction-details {
            background: rgba(79, 70, 229, 0.05);
            border: 1px solid rgba(79, 70, 229, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            animation: fadeInUp 0.6s ease-out 0.8s both;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .detail-row:last-child {
            margin-bottom: 0;
        }

        .detail-label {
            color: #718096;
            font-size: 0.9rem;
        }

        .detail-value {
            color: #2d3748;
            font-weight: 600;
        }

        .amount {
            font-size: 1.2rem;
            color: #48bb78;
            font-weight: 700;
        }

        .security-badge {
            display: inline-flex;
            align-items: center;
            background: rgba(72, 187, 120, 0.1);
            color: #38a169;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 2rem;
            animation: fadeInUp 0.6s ease-out 1s both;
        }

        .security-badge svg {
            width: 16px;
            height: 16px;
            margin-right: 0.5rem;
            fill: currentColor;
        }

        .actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .btn {
            padding: 0.75rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            animation: fadeInUp 0.6s ease-out 1.2s both;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.8);
            color: #4a5568;
            border: 1px solid rgba(0, 0, 0, 0.1);
            animation: fadeInUp 0.6s ease-out 1.4s both;
        }

        .btn-secondary:hover {
            background: white;
            transform: translateY(-1px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }



        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: scale(1);
            }
            40%, 43% {
                transform: scale(1.1);
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.05);
            }
        }

        @keyframes drawCheck {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }


        @media (max-width: 480px) {
            .success-card {
                padding: 2rem 1.5rem;
            }
            
            .title {
                font-size: 2rem;
            }
            
            .actions {
                justify-content: center;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-card">
            <div class="checkmark-container">
                <div class="checkmark">
                    <svg viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                </div>
            </div>

            <h1 class="title">Payment Successful!</h1>
            <p class="subtitle">Your transaction has been completed successfully. A confirmation sms has been sent to you.</p>


            <div class="transaction-details">
                <div class="detail-row">
                    <span class="detail-label">Transaction ID</span>
                    <span class="detail-value">#${transactionId}</span>
                </div>
               
                <div class="detail-row">
                    <span class="detail-label">Payment Date</span>
                    <span class="detail-value">${paymentDate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount Paid</span>
                    <span class="detail-value amount">৳${amount}</span>
                </div>
            </div>

            <div class="actions">
                <a href="${baseUrl}/" class="btn btn-primary" target="_blank">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
    </svg>
    Back to Home
</a>
            </div>
        </div>
    </div>


</body>
</html>`;
  res.send(message);
};

const failureMessage = async (req: Request, res: Response) => {
  const query = req.query;
  const transactionId = query.transactionId || "N/A";
  const amount = query.amount || "0";
  const errorReason = query.reason || "Transaction failed";
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  } as const;
  const attemptDate = date.toLocaleDateString("en-US", options);

  // Try to find the order and store info (if transaction exists)
  let baseUrl = "/"; // Default fallback
  try {
    const findOrder = await PaymentHistory.findOne({ transactionId }).select(
      "storeId"
    );
    if (findOrder) {
      const findStore = await Store.findOne({ storeId: findOrder.storeId });
      baseUrl = findStore?.storeFrontendUrl || "/";
    }
  } catch (error) {
    // If database lookup fails, use default baseUrl
    console.log("Failed to lookup store info for failed transaction");
  }

  const message = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Failed</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-x: hidden;
        }

        .container {
            max-width: 550px;
            width: 90%;
            position: relative;
        }

        .failure-card {
            background: white;
            border-radius: 24px;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
            animation: slideUp 0.8s ease-out;
        }

        .failure-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: shine 2s ease-in-out 1s;
        }

        .error-icon-container {
            width: 50px;
            height: 50px;
            margin: 0 auto 2rem;
            position: relative;
        }

        .error-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #e53e3e, #c53030);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(229, 62, 62, 0.3);
            animation: bounce 0.6s ease-out 0.2s both;
            position: relative;
            overflow: hidden;
        }

        .error-icon::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            animation: pulse 2s ease-in-out infinite;
        }

        .error-icon svg {
            width: 40px;
            height: 40px;
            fill: white;
            z-index: 1;
            animation: drawError 0.5s ease-out 0.8s both;
        }

        .title {
            font-size: 2.0rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #e53e3e, #c53030);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        .subtitle {
            font-size: 1.0rem;
            color: #4a5568;
            margin-bottom: 2rem;
            line-height: 1.6;
            animation: fadeInUp 0.6s ease-out 0.6s both;
        }

        .error-details {
            background: rgba(229, 62, 62, 0.05);
            border: 1px solid rgba(229, 62, 62, 0.15);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            animation: fadeInUp 0.6s ease-out 0.8s both;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.75rem;
        }

        .detail-row:last-child {
            margin-bottom: 0;
        }

        .detail-label {
            color: #718096;
            font-size: 0.9rem;
        }

        .detail-value {
            color: #2d3748;
            font-weight: 600;
            text-align: right;
            max-width: 60%;
        }

        .error-reason {
            color: #e53e3e;
            font-weight: 600;
        }

        .reference-id {
            font-family: monospace;
            font-size: 0.85rem;
            background: rgba(0, 0, 0, 0.05);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
        }

        .help-section {
            background: rgba(66, 153, 225, 0.1);
            border: 1px solid rgba(66, 153, 225, 0.2);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            animation: fadeInUp 0.6s ease-out 1s both;
        }

        .help-title {
            color: #2b6cb0;
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
        }

        .help-text {
            color: #4a5568;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .btn {
            padding: 0.75rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: linear-gradient(135deg, #e53e3e, #c53030);
            color: white;
            box-shadow: 0 8px 25px rgba(229, 62, 62, 0.3);
            animation: fadeInUp 0.6s ease-out 1.2s both;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(229, 62, 62, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.8);
            color: #4a5568;
            border: 1px solid rgba(0, 0, 0, 0.1);
            animation: fadeInUp 0.6s ease-out 1.4s both;
        }

        .btn-secondary:hover {
            background: white;
            transform: translateY(-1px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: scale(1);
            }
            40%, 43% {
                transform: scale(1.1);
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.05);
            }
        }

        @keyframes drawError {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shine {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
            }
        }

        @media (max-width: 480px) {
            .failure-card {
                padding: 2rem 1.5rem;
            }
            
            .title {
                font-size: 2rem;
            }
            
            .actions {
                justify-content: center;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="failure-card">
            <div class="error-icon-container">
                <div class="error-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                </div>
            </div>

            <h1 class="title">Payment Failed!</h1>
            <p class="subtitle">Unfortunately, your transaction could not be processed. Please check the details below and try again.</p>

            <div class="error-details">
                <div class="detail-row">
                    <span class="detail-label">Reference ID</span>
                    <span class="detail-value reference-id">#${transactionId}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Attempt Date</span>
                    <span class="detail-value">${attemptDate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount</span>
                    <span class="detail-value">৳${amount}</span>
                </div>
              
            </div>

            <div class="help-section">
                <div class="help-title">Need Help?</div>
                <div class="help-text">
                    If you continue to experience issues, please contact our support team with the reference ID above. We're here to help resolve this quickly.  
                </div>
            </div>

            <div class="actions">
                <a href="https://infinityhubbd.online/" class="btn btn-primary" target="_blank">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H19V9Z"/>
                    </svg>
                    Contact Us
                </a>
                <a href="${baseUrl}/" class="btn btn-secondary" target="_blank">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                    </svg>
                    Back to Home
                </a>
            </div>
        </div>
    </div>
</body>
</html>`;

  res.send(message);
};

export const MessageController = {
  successMessage,
  failureMessage,
};
