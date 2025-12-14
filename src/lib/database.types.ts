export interface Database {
  public: {
    Tables: {
      owners: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          motor_model: string;
          motor_serial: string;
          purchase_date: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          motor_model: string;
          motor_serial: string;
          purchase_date: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          motor_model?: string;
          motor_serial?: string;
          purchase_date?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      payment_history: {
        Row: {
          id: string;
          owner_id: string;
          amount: number;
          payment_type: string;
          payment_method: string;
          status: string;
          transaction_date: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          amount: number;
          payment_type: string;
          payment_method: string;
          status?: string;
          transaction_date?: string;
          description?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          amount?: number;
          payment_type?: string;
          payment_method?: string;
          status?: string;
          transaction_date?: string;
          description?: string;
          created_at?: string;
        };
      };
      call_center_logs: {
        Row: {
          id: string;
          owner_id: string;
          issue_type: string;
          priority: string;
          status: string;
          description: string;
          resolution: string;
          call_date: string;
          resolved_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          issue_type: string;
          priority?: string;
          status?: string;
          description: string;
          resolution?: string;
          call_date?: string;
          resolved_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          issue_type?: string;
          priority?: string;
          status?: string;
          description?: string;
          resolution?: string;
          call_date?: string;
          resolved_date?: string | null;
          created_at?: string;
        };
      };
      charger_stations: {
        Row: {
          id: string;
          name: string;
          location: string;
          latitude: number;
          longitude: number;
          total_ports: number;
          available_ports: number;
          power_output: string;
          status: string;
          operator: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          latitude: number;
          longitude: number;
          total_ports?: number;
          available_ports?: number;
          power_output: string;
          status?: string;
          operator: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          latitude?: number;
          longitude?: number;
          total_ports?: number;
          available_ports?: number;
          power_output?: string;
          status?: string;
          operator?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
