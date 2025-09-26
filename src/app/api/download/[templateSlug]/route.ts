import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { templateSlug: string } }
) {
  try {
    const { templateSlug } = params
    
    // Get template details
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateSlug)
      .single()

    if (templateError || !template) {
      return NextResponse.json(
        { success: false, error: 'Template not found' },
        { status: 404 }
      )
    }

    // In a real application, you would:
    // 1. Generate a secure download link
    // 2. Create a temporary download token
    // 3. Serve the actual template files
    // 4. Track download analytics
    
    // For now, we'll simulate a download by returning template info
    // and redirecting to a placeholder download page
    
    const downloadData = {
      templateId: template.id,
      templateName: template.name,
      downloadUrl: `/downloads/${template.id}/template.zip`, // Placeholder
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      downloadToken: `dl_${template.id}_${Date.now()}`
    }

    // In production, you would:
    // 1. Generate actual download link
    // 2. Create secure token
    // 3. Serve file from CDN or storage
    
    return NextResponse.json({
      success: true,
      downloadData,
      message: 'Download link generated successfully'
    })

  } catch (error) {
    console.error('Download generation failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate download link' },
      { status: 500 }
    )
  }
}
