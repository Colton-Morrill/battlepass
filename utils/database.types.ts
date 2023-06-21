export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
        }
      }
      points: {
        Row: {
          id: string
          points: string | null
          email: any | null
        }
        Insert: {
          id: string
          points?: string | null
          email?: any | null
        }
        Update: {
          id?: string
          points?: string | null
          email?: any | null
        }
      }
        tasks: {
          Row: {
            id: string
            title: string | null
            description: any | null
            imageUrl: any | null
            points: any | null
            datetime: any | null
            category: any | null
          }
          Insert: {
            id: string
            title?: string | null
            description?: any | null
            imageUrl?: any | null
            points?: any | null
            datetime?: any | null
            category?: any | null
          }
          Update: {
            id: string
            title?: string | null
            description?: any | null
            imageUrl?: any | null
            points?: any | null
            datetime?: any | null
            category?: any | null
          }
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
  }
}