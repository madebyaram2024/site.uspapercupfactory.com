
import * as React from 'react';

interface OrderConfirmationEmailProps {
    customerName: string;
    orderId: string;
    totalAmount: number;
    productName: string;
    quantity: number;
}

export const OrderConfirmationTemplate: React.FC<OrderConfirmationEmailProps> = ({
    customerName,
    orderId,
    totalAmount,
    productName,
    quantity,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5', color: '#333' }}>
        <h1 style={{ color: '#003366' }}>Thank you for your order!</h1>
        <p>Hi {customerName},</p>
        <p>We have received your order and are getting it ready for production.</p>

        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
            <h3 style={{ marginTop: 0 }}>Order Summary</h3>
            <p><strong>Order ID:</strong> {orderId}</p>
            <p><strong>Product:</strong> {productName}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <p><strong>Total:</strong> ${totalAmount.toFixed(2)}</p>
        </div>

        <p><strong>Next Steps:</strong></p>
        <ul>
            <li>Our design team will review your files.</li>
            <li>You will receive a digital proof for approval shortly.</li>
        </ul>

        <p>If you have any questions, reply to this email or call us at 747.338.8959.</p>

        <p style={{ fontSize: '12px', color: '#999', marginTop: '30px' }}>
            US Paper Cup Factory<br />
            uspapercupfactory.com
        </p>
    </div>
);
