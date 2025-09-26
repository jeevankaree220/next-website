import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Download, Star, Eye, CreditCard, Smartphone, IndianRupee } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: <IndianRupee className="w-6 h-6" />,
    description: 'Pay with UPI, Cards, Net Banking, Wallets'
  }
]

interface Template {
  id: string
  name: string
  price: number
  image: string
}

interface PaymentModalProps {
  template: Template
  isOpen: boolean
  onClose: () => void
}

export default function PaymentModal({ template, isOpen, onClose }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async (method: string) => {
    setIsProcessing(true)
    
    try {
      if (method === 'razorpay') {
        await handleRazorpayPayment()
      }
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRazorpayPayment = async () => {
    try {
      // Get current user (you'll need to implement user auth)
      const userId = 'temp-user-id' // Replace with actual user ID from auth

      // Create Razorpay order
      const orderResponse = await fetch('/api/payment/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          userId: userId
        })
      })

      const orderData = await orderResponse.json()
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Template Marketplace',
        description: `Purchase: ${template.name}`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/razorpay-verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                templateId: template.id,
                userId: userId
              })
            })

            const verifyData = await verifyResponse.json()
            
            if (verifyData.success) {
              console.log('Payment verified successfully:', verifyData)
              alert('Payment successful! Template purchased.')
              onClose()
            } else {
              console.error('Payment verification failed:', verifyData.error)
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F4A261'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed')
          }
        }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
      
    } catch (error) {
      console.error('Payment initiation failed:', error)
      alert('Failed to initiate payment. Please try again.')
    }
  }


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>
            Choose your preferred payment method
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <img src={template.image} alt={template.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-2xl font-bold text-primary">₹{template.price}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Payment Method:</h4>
            <div className="p-4 border rounded-lg bg-primary/5 border-primary">
              <div className="flex items-center space-x-3">
                <IndianRupee className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">Razorpay</p>
                  <p className="text-sm text-muted-foreground">Pay with UPI, Cards, Net Banking, Wallets</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="p-6 pt-0 flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => handlePayment('razorpay')}
            disabled={isProcessing}
            className="flex-1 bg-softorange hover:bg-sandyellow"
          >
            {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
