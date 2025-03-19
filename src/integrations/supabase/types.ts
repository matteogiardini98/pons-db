export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_tool_staging: {
        Row: {
          ai_act_compliant: boolean | null
          created_at: string | null
          data_residency: boolean | null
          function: string[]
          id: string
          linkedin: string[] | null
          name: string
          problem_solved_description: string
          role: string[] | null
          technical_level: string | null
          updated_at: string | null
          use_case_tag: string | null
          website: string | null
        }
        Insert: {
          ai_act_compliant?: boolean | null
          created_at?: string | null
          data_residency?: boolean | null
          function: string[]
          id?: string
          linkedin?: string[] | null
          name: string
          problem_solved_description: string
          role?: string[] | null
          technical_level?: string | null
          updated_at?: string | null
          use_case_tag?: string | null
          website?: string | null
        }
        Update: {
          ai_act_compliant?: boolean | null
          created_at?: string | null
          data_residency?: boolean | null
          function?: string[]
          id?: string
          linkedin?: string[] | null
          name?: string
          problem_solved_description?: string
          role?: string[] | null
          technical_level?: string | null
          updated_at?: string | null
          use_case_tag?: string | null
          website?: string | null
        }
        Relationships: []
      }
      ai_tools: {
        Row: {
          ai_act_compliant: boolean | null
          created_at: string | null
          data_residency: boolean | null
          function: string[]
          id: string
          linkedin: string[]
          name: string
          problem_solved_description: string
          role: string[]
          technical_level: string | null
          updated_at: string | null
          use_case_tag: string
          website: string | null
        }
        Insert: {
          ai_act_compliant?: boolean | null
          created_at?: string | null
          data_residency?: boolean | null
          function: string[]
          id?: string
          linkedin: string[]
          name: string
          problem_solved_description: string
          role: string[]
          technical_level?: string | null
          updated_at?: string | null
          use_case_tag: string
          website?: string | null
        }
        Update: {
          ai_act_compliant?: boolean | null
          created_at?: string | null
          data_residency?: boolean | null
          function?: string[]
          id?: string
          linkedin?: string[]
          name?: string
          problem_solved_description?: string
          role?: string[]
          technical_level?: string | null
          updated_at?: string | null
          use_case_tag?: string
          website?: string | null
        }
        Relationships: []
      }
      email_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      ent_input: {
        Row: {
          challenge: string | null
          created_at: string
          email: string
          id: string
        }
        Insert: {
          challenge?: string | null
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          challenge?: string | null
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string | null
          created_at: string | null
          id: string
          rating: number | null
          text: string
          tool_id: string
        }
        Insert: {
          author_name?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          text: string
          tool_id: string
        }
        Update: {
          author_name?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          text?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_queries: {
        Row: {
          created_at: string | null
          email: string
          id: string
          query: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          query: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          query?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
