import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, ShoppingCart, Star, Eye, Users, Clock, Palette, Code, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTemplateById } from '@/lib/supabase'
import TemplateActions from '@/app/components/TemplateActions'

interface TemplatePreviewProps {
  params: {
    slug: string
  }
}

export default async function TemplatePreview({ params }: TemplatePreviewProps) {
  const { slug } = params
  
  // Fetch template data
  const { data: template, error } = await getTemplateById(slug)
  
  if (error || !template) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Marketplace</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" className="bg-softorange hover:bg-sandyellow">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now - ₹{template.price / 100}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Badge className="bg-softorange text-white">{template.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{template.rating}</span>
                  <span className="mx-2">•</span>
                  <Download className="w-4 h-4 mr-1" />
                  <span>{template.downloads} downloads</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {template.name}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {template.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <div className="text-3xl font-bold text-primary">
                  ₹{template.price / 100}
                </div>
                <div className="text-sm text-muted-foreground">
                  One-time purchase • Lifetime access
                </div>
              </div>

              <TemplateActions template={template} />
            </div>

            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={template.image_url}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Template Preview</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how this template looks in action with real content and layouts
            </p>
          </div>

          {/* Hero Section Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">Hero Section</h3>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-12 text-center">
              <h4 className="text-4xl font-bold mb-4">Welcome to {template.name}</h4>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                This is a preview of how the hero section will look with your content
              </p>
              <Button className="bg-softorange hover:bg-sandyellow">
                Get Started
              </Button>
            </div>
          </div>

          {/* Features Section Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">Features Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {template.features.slice(0, 3).map((feature, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature}</h4>
                  <p className="text-muted-foreground">
                    Professional implementation of {feature.toLowerCase()}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* About Section Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">About Section</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-3xl font-bold mb-4">Why Choose This Template?</h4>
                <p className="text-lg text-muted-foreground mb-6">
                  This template is designed with modern web standards and best practices. 
                  It's fully responsive, SEO optimized, and built for performance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-softorange rounded-full mr-3"></div>
                    Mobile-first responsive design
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-softorange rounded-full mr-3"></div>
                    SEO optimized structure
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-softorange rounded-full mr-3"></div>
                    Fast loading performance
                  </li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-12 h-12 text-primary" />
                </div>
                <h5 className="text-xl font-semibold mb-2">Customizable Design</h5>
                <p className="text-muted-foreground">
                  Easy to customize colors, fonts, and layouts to match your brand
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">Stats Section</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Responsive</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">A+</div>
                <div className="text-muted-foreground">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">SEO</div>
                <div className="text-muted-foreground">Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Purchase this template and start building your amazing website today
            </p>
            
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold">{template.name}</h3>
                  <p className="text-muted-foreground">{template.category} Template</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">₹{template.price / 100}</div>
                  <div className="text-sm text-muted-foreground">One-time payment</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <h4 className="font-semibold">What's Included:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-softorange rounded-full mr-3"></div>
                      Complete source code
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-softorange rounded-full mr-3"></div>
                      Documentation & setup guide
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-softorange rounded-full mr-3"></div>
                      Free updates for 1 year
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-softorange rounded-full mr-3"></div>
                      Commercial license
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Technical Details:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-3" />
                      Mobile responsive
                    </li>
                    <li className="flex items-center">
                      <Code className="w-4 h-4 mr-3" />
                      Clean, commented code
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 mr-3" />
                      Fast loading
                    </li>
                    <li className="flex items-center">
                      <Users className="w-4 h-4 mr-3" />
                      User-friendly
                    </li>
                  </ul>
                </div>
              </div>

              <TemplateActions template={template} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Generate static params for all templates (optional - for static generation)
export async function generateStaticParams() {
  // This would fetch all template slugs for static generation
  // For now, we'll use dynamic rendering
  return []
}
