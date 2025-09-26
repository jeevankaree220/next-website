import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      templateId,
      userId 
    } = await request.json()

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (!isAuthentic) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Get template details
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateId)
      .single()

    if (templateError || !template) {
      return NextResponse.json(
        { success: false, error: 'Template not found' },
        { status: 404 }
      )
    }

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        template_id: templateId,
        amount: template.price,
        payment_id: razorpay_payment_id,
        status: 'completed'
      })
      .select()
      .single()

    if (purchaseError) {
      console.error('Purchase creation failed:', purchaseError)
      return NextResponse.json(
        { success: false, error: 'Failed to create purchase record' },
        { status: 500 }
      )
    }

    // Update template download count
    await supabase
      .from('templates')
      .update({ downloads: template.downloads + 1 })
      .eq('id', templateId)

    return NextResponse.json({
      success: true,
      purchase,
      message: 'Payment verified and purchase completed successfully'
    })

  } catch (error) {
    console.error('Payment verification failed:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
