import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Template {
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

export interface Purchase {
  id: string
  user_id: string
  template_id: string
  amount: number
  payment_id: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  created_at: string
  updated_at: string
  template?: Template
  user?: User
}

export interface CartItem {
  template_id: string
  quantity: number
  template?: Template
}

// Auth helpers
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Template helpers
export const getTemplates = async (category?: string, limit = 10, offset = 0) => {
  let query = supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  return { data, error }
}

export const getTemplateById = async (id: string) => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  return { data, error }
}

export const searchTemplates = async (searchTerm: string, limit = 10) => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}

// Purchase helpers
export const getUserPurchases = async (userId: string) => {
  const { data, error } = await supabase
    .from('purchases')
    .select(`
      *,
      template:templates(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const createPurchase = async (userId: string, templateId: string, amount: number, paymentId: string) => {
  const { data, error } = await supabase
    .from('purchases')
    .insert({
      user_id: userId,
      template_id: templateId,
      amount,
      payment_id: paymentId,
      status: 'pending'
    })
    .select()
    .single()

  return { data, error }
}

export const updatePurchaseStatus = async (paymentId: string, status: 'completed' | 'failed' | 'refunded') => {
  const { data, error } = await supabase
    .from('purchases')
    .update({ status })
    .eq('payment_id', paymentId)
    .select()

  return { data, error }
}

export const getPurchaseByPaymentId = async (paymentId: string) => {
  const { data, error } = await supabase
    .from('purchases')
    .select(`
      *,
      template:templates(*)
    `)
    .eq('payment_id', paymentId)
    .single()

  return { data, error }
}