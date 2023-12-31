export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          created_at: string
          email: string
          fullName: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string
          fullName?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          fullName?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
