// Local copy of generated Supabase types (trimmed or regenerated as needed)
// Keeping this file self-contained so the /web app can build independently of root Vite project.

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	__InternalSupabase: { PostgrestVersion: '13.0.4' }
	public: {
		Tables: {
			breeds: {
				Row: { id: string; name: string; name_en: string | null; active: boolean; order_index: number; created_at: string; updated_at: string }
				Insert: { id?: string; name: string; name_en?: string | null; active?: boolean; order_index?: number; created_at?: string; updated_at?: string }
				Update: { id?: string; name?: string; name_en?: string | null; active?: boolean; order_index?: number; created_at?: string; updated_at?: string }
				Relationships: []
			}
			cooking_types: {
				Row: { id: string; name: string; name_en: string | null; category: string; active: boolean; order_index: number; created_at: string; updated_at: string }
				Insert: { id?: string; name: string; name_en?: string | null; category?: string; active?: boolean; order_index?: number; created_at?: string; updated_at?: string }
				Update: { id?: string; name?: string; name_en?: string | null; category?: string; active?: boolean; order_index?: number; created_at?: string; updated_at?: string }
				Relationships: []
			}
			side_dishes: {
				Row: { id: string; name: string; price: number; active: boolean; order_index: number; created_at: string; updated_at: string }
				Insert: { id?: string; name: string; price?: number; active?: boolean; order_index?: number; created_at?: string; updated_at?: string }
				Update: { id?: string; name?: string; price?: number; active?: boolean; order_index?: number; created_at?: string; updated_at?: string }
				Relationships: []
			}
			app_settings: {
				Row: { key: string; value: string | null; description: string | null; created_at: string; updated_at: string; updated_by: string | null }
				Insert: { key: string; value?: string | null; description?: string | null; created_at?: string; updated_at?: string; updated_by?: string | null }
				Update: { key?: string; value?: string | null; description?: string | null; created_at?: string; updated_at?: string; updated_by?: string | null }
				Relationships: []
			}
			user_roles: {
				Row: { id: string; user_id: string; role: Database['public']['Enums']['app_role'] }
				Insert: { id?: string; user_id: string; role: Database['public']['Enums']['app_role'] }
				Update: { id?: string; user_id?: string; role?: Database['public']['Enums']['app_role'] }
				Relationships: []
			}
		}
		Views: { [_ in never]: never }
		Functions: {
			has_role: { Args: { _role: Database['public']['Enums']['app_role']; _user_id: string }; Returns: boolean }
			has_any_role: { Args: { _roles: Database['public']['Enums']['app_role'][]; _user_id: string }; Returns: boolean }
		}
		Enums: { app_role: 'admin' | 'moderator' | 'user' }
		CompositeTypes: { [_ in never]: never }
	}
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends { Row: infer R }
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends { Row: infer R }
			? R
			: never
		: never

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema['Enums']
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never

export const Constants = {
	public: { Enums: { app_role: ['admin', 'moderator', 'user'] } }
} as const

// Explicit re-export (sometimes improves isolatedModules edge cases on CI)
// Marker value (ensures module side-effect presence if tooling alters pure type-only file)
export const __supabaseTypesMarker = 1 as const;
