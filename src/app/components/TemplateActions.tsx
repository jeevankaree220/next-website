'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, ShoppingCart, CheckCircle, AlertCircle, Lock } from "lucide-react"
import { supabase } from '@/lib/supabase'

interface Template {
  id: string
  name: string
  price: number
  image_url: string
}

interface TemplateActionsProps {
  template: Template
}

export default function TemplateActions({ template }: TemplateActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)

  const handleBuyNow = async () => {
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
              // Optionally redirect to success page or download
              window.location.href = `/templates/${template.id}?purchased=true`
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

  const checkPurchaseStatus = async (templateId: string, userId: string) => {
    try {
      const { data: purchase, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', userId)
        .eq('template_id', templateId)
        .eq('status', 'completed')
        .single()

      return { hasPurchase: !!purchase && !error, purchase }
    } catch (error) {
      console.error('Error checking purchase status:', error)
      return { hasPurchase: false, purchase: null }
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadStatus('idle')
    
    try {
      // Get current user (you'll need to implement user auth)
      const userId = 'temp-user-id' // Replace with actual user ID from auth
      
      // Check if user has purchased this template
      const { hasPurchase } = await checkPurchaseStatus(template.id, userId)
      
      if (!hasPurchase) {
        setShowPurchaseDialog(true)
        setIsDownloading(false)
        return
      }

      // User has purchased, proceed with download
      const downloadResponse = await fetch(`/api/download/${template.id}`)
      const downloadData = await downloadResponse.json()
      
      if (downloadData.success) {
        // In a real app, you would trigger the actual download
        // For now, we'll simulate it
        setDownloadStatus('success')
        
        // Simulate file download
        const link = document.createElement('a')
        link.href = downloadData.downloadData.downloadUrl
        link.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setDownloadStatus('idle')
        }, 3000)
      } else {
        throw new Error(downloadData.error || 'Download failed')
      }
      
    } catch (error) {
      console.error('Download failed:', error)
      setDownloadStatus('error')
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus('idle')
      }, 3000)
    } finally {
      setIsDownloading(false)
    }
  }

  const getDownloadButtonContent = () => {
    if (isDownloading) {
      return (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Checking...
        </>
      )
    }
    
    if (downloadStatus === 'success') {
      return (
        <>
          <CheckCircle className="w-4 h-4 mr-2" />
          Downloaded!
        </>
      )
    }
    
    if (downloadStatus === 'error') {
      return (
        <>
          <AlertCircle className="w-4 h-4 mr-2" />
          Error
        </>
      )
    }
    
    return (
      <>
        <Download className="w-4 h-4 mr-2" />
        Download Template
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-softorange hover:bg-sandyellow"
          onClick={handleBuyNow}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Buy Now - ₹{template.price / 100}
        </Button>
        
        <Button 
          size="lg" 
          variant="outline"
          onClick={handleDownload}
          disabled={isDownloading}
          className={downloadStatus === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 
                   downloadStatus === 'error' ? 'bg-red-50 border-red-200 text-red-700' : ''}
        >
          {getDownloadButtonContent()}
        </Button>
      </div>

      {/* Purchase Required Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center space-x-2">
              <Lock className="w-6 h-6 text-softorange" />
              <DialogTitle>Purchase Required</DialogTitle>
            </div>
            <DialogDescription>
              You need to purchase this template before downloading it.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg bg-muted/50">
              <img 
                src={template.image_url} 
                alt={template.name} 
                className="w-16 h-16 object-cover rounded" 
              />
              <div>
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-2xl font-bold text-primary">₹{template.price / 100}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPurchaseDialog(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowPurchaseDialog(false)
                handleBuyNow()
              }}
              className="w-full sm:w-auto bg-softorange hover:bg-sandyellow"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}