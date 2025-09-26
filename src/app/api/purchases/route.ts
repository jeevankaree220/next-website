import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { templateId, userId, amount, paymentId } = await request.json()

    // Create purchase record
    const { data: purchase, error } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        template_id: templateId,
        amount: amount,
        payment_id: paymentId,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      purchase
    })
  } catch (error) {
    console.error('Purchase creation failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create purchase' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { paymentId, status } = await request.json()

    // Update purchase status
    const { data: purchase, error } = await supabase
      .from('purchases')
      .update({ status })
      .eq('payment_id', paymentId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      purchase
    })
  } catch (error) {
    console.error('Purchase update failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update purchase' },
      { status: 500 }
    )
  }
}
