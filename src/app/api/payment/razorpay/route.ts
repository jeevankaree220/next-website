import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { supabase } from '@/lib/supabase'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { templateId, userId } = await request.json()

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

    // Create order with template price
    const options = {
      amount: template.price, // Price is already in paise in database
      currency: 'INR',
      receipt: `template_${templateId}_${Date.now()}`,
      notes: {
        template_id: templateId,
        user_id: userId,
        template_name: template.name
      }
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      order: order,
      template: {
        id: template.id,
        name: template.name,
        price: template.price
      }
    })
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
