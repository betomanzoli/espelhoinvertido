export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      automation_logs: {
        Row: {
          action_type: string
          chronicle_id: string | null
          created_at: string
          error_message: string | null
          id: string
          platform: string
          response_data: Json | null
          status: string
        }
        Insert: {
          action_type: string
          chronicle_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          platform: string
          response_data?: Json | null
          status?: string
        }
        Update: {
          action_type?: string
          chronicle_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          platform?: string
          response_data?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_logs_chronicle_id_fkey"
            columns: ["chronicle_id"]
            isOneToOne: false
            referencedRelation: "chronicles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_settings: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      chronicles: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          publish_date: string | null
          sources: string[] | null
          status: string
          theme: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          publish_date?: string | null
          sources?: string[] | null
          status?: string
          theme: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          publish_date?: string | null
          sources?: string[] | null
          status?: string
          theme?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_adaptations: {
        Row: {
          chronicle_id: string
          content_data: Json
          content_type: string
          created_at: string
          engagement_metrics: Json | null
          id: string
          platform: string
          published_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          chronicle_id: string
          content_data: Json
          content_type: string
          created_at?: string
          engagement_metrics?: Json | null
          id?: string
          platform: string
          published_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          chronicle_id?: string
          content_data?: Json
          content_type?: string
          created_at?: string
          engagement_metrics?: Json | null
          id?: string
          platform?: string
          published_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_adaptations_chronicle_id_fkey"
            columns: ["chronicle_id"]
            isOneToOne: false
            referencedRelation: "chronicles"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          additional_data: Json | null
          chronicle_id: string | null
          id: string
          measurement_date: string
          metric_type: string
          metric_value: number
          platform: string
        }
        Insert: {
          additional_data?: Json | null
          chronicle_id?: string | null
          id?: string
          measurement_date?: string
          metric_type: string
          metric_value: number
          platform: string
        }
        Update: {
          additional_data?: Json | null
          chronicle_id?: string | null
          id?: string
          measurement_date?: string
          metric_type?: string
          metric_value?: number
          platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_chronicle_id_fkey"
            columns: ["chronicle_id"]
            isOneToOne: false
            referencedRelation: "chronicles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_integrations: {
        Row: {
          api_credentials: Json
          created_at: string
          error_count: number | null
          id: string
          is_enabled: boolean
          last_error: string | null
          last_successful_post: string | null
          platform_name: string
          rate_limits: Json | null
          updated_at: string
          webhook_urls: Json | null
        }
        Insert: {
          api_credentials: Json
          created_at?: string
          error_count?: number | null
          id?: string
          is_enabled?: boolean
          last_error?: string | null
          last_successful_post?: string | null
          platform_name: string
          rate_limits?: Json | null
          updated_at?: string
          webhook_urls?: Json | null
        }
        Update: {
          api_credentials?: Json
          created_at?: string
          error_count?: number | null
          id?: string
          is_enabled?: boolean
          last_error?: string | null
          last_successful_post?: string | null
          platform_name?: string
          rate_limits?: Json | null
          updated_at?: string
          webhook_urls?: Json | null
        }
        Relationships: []
      }
      prompt_templates: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          parameters: Json | null
          performance_score: number | null
          prompt_content: string
          template_name: string
          template_type: string
          updated_at: string
          usage_count: number | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          parameters?: Json | null
          performance_score?: number | null
          prompt_content: string
          template_name: string
          template_type: string
          updated_at?: string
          usage_count?: number | null
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          parameters?: Json | null
          performance_score?: number | null
          prompt_content?: string
          template_name?: string
          template_type?: string
          updated_at?: string
          usage_count?: number | null
          version?: number
        }
        Relationships: []
      }
      theme_suggestions: {
        Row: {
          created_at: string
          detection_date: string
          id: string
          polarization_indicators: Json | null
          relevance_score: number
          source_urls: string[] | null
          status: string
          suggested_theme: string
          theme_category: string | null
          used_chronicle_id: string | null
        }
        Insert: {
          created_at?: string
          detection_date?: string
          id?: string
          polarization_indicators?: Json | null
          relevance_score?: number
          source_urls?: string[] | null
          status?: string
          suggested_theme: string
          theme_category?: string | null
          used_chronicle_id?: string | null
        }
        Update: {
          created_at?: string
          detection_date?: string
          id?: string
          polarization_indicators?: Json | null
          relevance_score?: number
          source_urls?: string[] | null
          status?: string
          suggested_theme?: string
          theme_category?: string | null
          used_chronicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "theme_suggestions_used_chronicle_id_fkey"
            columns: ["used_chronicle_id"]
            isOneToOne: false
            referencedRelation: "chronicles"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
