'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Download, Star, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTemplates } from '@/lib/supabase'
import PaymentModal from './PaymentModal'

interface Template {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  features: string[]
  rating: number
  downloads: number
  preview: string
}

// Template interface matches Supabase schema
interface Template {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  features: string[]
  rating: number
  downloads: number
  preview_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function TemplateMarketplace() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      setLoading(true)
      const { data, error } = await getTemplates()
      if (error) throw error
      setTemplates(data || [])
    } catch (error) {
      console.error('Failed to load templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBuyNow = (template: Template) => {
    setSelectedTemplate(template)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setSelectedTemplate(null)
    // Optionally show success message or redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Template Marketplace</h1>
              <p className="text-muted-foreground">Premium website templates for your next project</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-primary mb-6">
            Professional Website Templates
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose from our collection of premium, responsive templates designed for modern businesses and creators. All payments processed securely via Razorpay.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-softorange hover:bg-sandyellow">
              Browse Templates
            </Button>
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={template.image_url}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-softorange">
                    {template.category}
                  </Badge>
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{template.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Download className="w-4 h-4 mr-1" />
                      {template.downloads} downloads
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">
                    ₹{template.price / 100}
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/templates/${template.id}`}>
                        Preview
                      </Link>
                    </Button>
                    <Button 
                      className="bg-softorange hover:bg-sandyellow" 
                      size="sm"
                      onClick={() => handleBuyNow(template)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">
              Why Choose Our Templates?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our templates are built with modern technologies and best practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Instant Download</h4>
              <p className="text-muted-foreground">Get your template immediately after purchase</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Premium Quality</h4>
              <p className="text-muted-foreground">Professionally designed with attention to detail</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Live Preview</h4>
              <p className="text-muted-foreground">See templates in action before you buy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedTemplate && (
        <PaymentModal
          template={{
            id: selectedTemplate.id,
            name: selectedTemplate.name,
            price: selectedTemplate.price / 100,
            image: selectedTemplate.image_url
          }}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  )
}
