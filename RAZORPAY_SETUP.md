# Razorpay Test Configuration

## Environment Variables Setup

Create a `.env.local` file in your project root:

```bash
# Razorpay Test Keys
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_test_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

## Getting Test Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up/Login to your account
3. Switch to **Test Mode** (toggle in top right)
4. Go to Settings → API Keys
5. Generate new API Keys
6. Copy the **Key ID** and **Key Secret**

## Test Payment Methods

### UPI Testing
- Use: `success@razorpay` (successful payment)
- Use: `failure@razorpay` (failed payment)

### Card Testing
- **Visa**: `4111 1111 1111 1111`
- **Mastercard**: `5555 5555 5555 4444`
- **Any future expiry date** (e.g., 12/25)
- **Any CVV** (e.g., 123)

### Net Banking
- Select any bank from the list
- Use test credentials provided by Razorpay

## Payment Flow

1. User clicks "Buy Now" on any template
2. Payment modal opens with Razorpay option
3. User selects payment method (UPI/Card/Net Banking)
4. Razorpay checkout opens
5. User completes payment
6. Success/failure callback handled

## Pricing

All templates are priced in Indian Rupees (₹):
- Portfolio: ₹1,999
- Business: ₹2,999  
- Travel: ₹3,499
- Restaurant: ₹3,999
- E-commerce: ₹4,999
- SaaS: ₹5,999
