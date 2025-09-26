import { request, gql } from 'graphql-request'
import { supabase } from './supabase'

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`

// GraphQL Queries
export const GET_TEMPLATES = gql`
  query GetTemplates($category: String, $limit: Int, $offset: Int) {
    templates(
      where: { 
        is_active: { eq: true }
        ${category ? 'category: { eq: $category }' : ''}
      }
      orderBy: { created_at: { desc: true } }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      description
      price
      image_url
      category
      features
      rating
      downloads
      preview_url
      created_at
    }
  }
`

export const GET_TEMPLATE_BY_ID = gql`
  query GetTemplateById($id: UUID!) {
    templates(where: { id: { eq: $id } }) {
      id
      name
      description
      price
      image_url
      category
      features
      rating
      downloads
      preview_url
      created_at
    }
  }
`

export const GET_USER_PURCHASES = gql`
  query GetUserPurchases($userId: UUID!) {
    purchases(
      where: { user_id: { eq: $userId } }
      orderBy: { created_at: { desc: true } }
    ) {
      id
      amount
      status
      created_at
      template {
        id
        name
        image_url
        preview_url
      }
    }
  }
`

export const CREATE_PURCHASE = gql`
  mutation CreatePurchase(
    $userId: UUID!
    $templateId: UUID!
    $amount: Int!
    $paymentId: String!
  ) {
    insertIntopurchasesCollection(
      objects: {
        user_id: $userId
        template_id: $templateId
        amount: $amount
        payment_id: $paymentId
        status: "pending"
      }
    ) {
      records {
        id
        status
      }
    }
  }
`

export const UPDATE_PURCHASE_STATUS = gql`
  mutation UpdatePurchaseStatus(
    $paymentId: String!
    $status: String!
  ) {
    updatepurchasesCollection(
      filter: { payment_id: { eq: $paymentId } }
      set: { status: $status }
    ) {
      records {
        id
        status
      }
    }
  }
`

// GraphQL Client Functions
export class GraphQLClient {
  private endpoint: string
  private headers: Record<string, string>

  constructor() {
    this.endpoint = GRAPHQL_ENDPOINT
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  }

  private async getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    return {
      ...this.headers,
      'Authorization': `Bearer ${session?.access_token || ''}`,
    }
  }

  async query<T>(query: string, variables?: any): Promise<T> {
    const headers = await this.getAuthHeaders()
    return request<T>(this.endpoint, query, variables, headers)
  }

  async mutation<T>(mutation: string, variables?: any): Promise<T> {
    const headers = await this.getAuthHeaders()
    return request<T>(this.endpoint, mutation, variables, headers)
  }
}

// Template Service
export class TemplateService {
  private client: GraphQLClient

  constructor() {
    this.client = new GraphQLClient()
  }

  async getTemplates(category?: string, limit = 10, offset = 0) {
    return this.client.query<{ templates: any[] }>(GET_TEMPLATES, {
      category,
      limit,
      offset
    })
  }

  async getTemplateById(id: string) {
    return this.client.query<{ templates: any[] }>(GET_TEMPLATE_BY_ID, { id })
  }

  async searchTemplates(searchTerm: string, limit = 10) {
    // For now, we'll use the regular query and filter client-side
    // In production, you'd want to implement full-text search in Supabase
    const result = await this.getTemplates(undefined, limit)
    return {
      templates: result.templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }
}

// Purchase Service
export class PurchaseService {
  private client: GraphQLClient

  constructor() {
    this.client = new GraphQLClient()
  }

  async getUserPurchases(userId: string) {
    return this.client.query<{ purchases: any[] }>(GET_USER_PURCHASES, { userId })
  }

  async createPurchase(userId: string, templateId: string, amount: number, paymentId: string) {
    return this.client.mutation<{ insertIntopurchasesCollection: { records: any[] } }>(
      CREATE_PURCHASE,
      { userId, templateId, amount, paymentId }
    )
  }

  async updatePurchaseStatus(paymentId: string, status: 'completed' | 'failed' | 'refunded') {
    return this.client.mutation<{ updatepurchasesCollection: { records: any[] } }>(
      UPDATE_PURCHASE_STATUS,
      { paymentId, status }
    )
  }
}

// Export services
export const templateService = new TemplateService()
export const purchaseService = new PurchaseService()
