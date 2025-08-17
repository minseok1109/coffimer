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
            recipes: {
                Row: {
                    id: string
                    owner_id: string
                    name: string
                    total_time: number
                    coffee: number
                    water: number
                    water_temperature: number
                    dripper: string | null
                    filter: string | null
                    ratio: number | null
                    description: string | null
                    micron: number | null
                    youtube_url: string | null
                    is_public: boolean | null
                    created_at: string
                    updated_at: string
                    brewing_type: 'hot' | 'ice' | null
                    deleted_at: string | null
                    grinder_model: string | null
                    grinder_clicks: number | null
                }
                Insert: {
                    id?: string
                    owner_id: string
                    name: string
                    total_time: number
                    coffee: number
                    water: number
                    water_temperature: number
                    dripper?: string | null
                    filter?: string | null
                    ratio?: number | null
                    description?: string | null
                    micron?: number | null
                    youtube_url?: string | null
                    is_public?: boolean | null
                    created_at?: string
                    updated_at?: string
                    brewing_type?: 'hot' | 'ice' | null
                    deleted_at?: string | null
                    grinder_model?: string | null
                    grinder_clicks?: number | null
                }
                Update: {
                    id?: string
                    owner_id?: string
                    name?: string
                    total_time?: number
                    coffee?: number
                    water?: number
                    water_temperature?: number
                    dripper?: string | null
                    filter?: string | null
                    ratio?: number | null
                    description?: string | null
                    micron?: number | null
                    youtube_url?: string | null
                    is_public?: boolean | null
                    created_at?: string
                    updated_at?: string
                    brewing_type?: 'hot' | 'ice' | null
                    deleted_at?: string | null
                    grinder_model?: string | null
                    grinder_clicks?: number | null
                }
            }
            recipe_steps: {
                Row: {
                    id: number
                    recipe_id: string
                    step_index: number
                    time: number
                    title: string | null
                    description: string | null
                    water: number | null
                    total_water: number | null
                    duration: number | null
                }
                Insert: {
                    id?: number
                    recipe_id: string
                    step_index: number
                    time: number
                    title?: string | null
                    description?: string | null
                    water?: number | null
                    total_water?: number | null
                    duration?: number | null
                }
                Update: {
                    id?: number
                    recipe_id?: string
                    step_index?: number
                    time?: number
                    title?: string | null
                    description?: string | null
                    water?: number | null
                    total_water?: number | null
                    duration?: number | null
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
            brewing_type: 'hot' | 'ice'
        }
    }
}