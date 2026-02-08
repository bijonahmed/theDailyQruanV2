<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation-W3programmer.net</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .code {
            display: inline-block;
            font-size: 1.2em;
            color: #ffffff;
            background-color: #007bff;
            padding: 10px 15px;
            border-radius: 4px;
            margin-top: 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #888888;
            text-align: center;
        }
        .company-name {
            font-weight: bold;
            color: #007bff;
        }
    </style>
</head>
<body>
   <div class="container">
    <h2>Hello,</h2>
    <p>Thank you for your order with <span class="company-name">W3programmer.net</span>! We’re excited to let you know that your order has been successfully received and is currently being processed.</p>
    <p class="code">Order ID: {{ $checkOrderId }}</p>
    <p>You’ll receive another email once your order has been shipped. If you have any questions or need assistance, please don’t hesitate to reach out to our support team.</p>
    <div class="footer">
        <p>&copy; {{ date('Y') }} W3programmer.net All rights reserved.</p>
    </div>
</div>

</body>

</html>
