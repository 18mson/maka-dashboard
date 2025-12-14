/*
  # Maka Dashboard - EV Motor Owner Monitoring System

  ## Overview
  This migration sets up the complete database schema for the Maka Dashboard application,
  which monitors EV motor owners, their payment history, support interactions, and charging stations.

  ## 1. New Tables
  
  ### `owners`
  Stores EV motor owner information
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Owner's full name
  - `email` (text, unique) - Contact email
  - `phone` (text) - Contact phone number
  - `motor_model` (text) - EV motor model name
  - `motor_serial` (text, unique) - Motor serial number
  - `purchase_date` (date) - Date of motor purchase
  - `status` (text) - Account status (active, inactive, suspended)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `payment_history`
  Tracks all payment transactions for motor services
  - `id` (uuid, primary key) - Unique identifier
  - `owner_id` (uuid, foreign key) - References owners table
  - `amount` (numeric) - Payment amount
  - `payment_type` (text) - Type of payment (subscription, maintenance, charging, etc.)
  - `payment_method` (text) - Payment method used (credit_card, debit_card, bank_transfer)
  - `status` (text) - Payment status (completed, pending, failed)
  - `transaction_date` (timestamptz) - When payment was made
  - `description` (text) - Payment description
  - `created_at` (timestamptz) - Record creation timestamp

  ### `call_center_logs`
  Records all support calls and issues reported
  - `id` (uuid, primary key) - Unique identifier
  - `owner_id` (uuid, foreign key) - References owners table
  - `issue_type` (text) - Type of issue (battery, motor, electrical, software, other)
  - `priority` (text) - Priority level (low, medium, high, critical)
  - `status` (text) - Current status (open, in_progress, resolved, closed)
  - `description` (text) - Detailed description of the issue
  - `resolution` (text) - How the issue was resolved
  - `call_date` (timestamptz) - When the call was made
  - `resolved_date` (timestamptz) - When the issue was resolved
  - `created_at` (timestamptz) - Record creation timestamp

  ### `charger_stations`
  Manages charging station locations and details
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Station name
  - `location` (text) - Full address
  - `latitude` (numeric) - GPS latitude coordinate
  - `longitude` (numeric) - GPS longitude coordinate
  - `total_ports` (integer) - Total number of charging ports
  - `available_ports` (integer) - Currently available ports
  - `power_output` (text) - Power output specification (e.g., "50kW", "150kW")
  - `status` (text) - Operational status (operational, maintenance, offline)
  - `operator` (text) - Station operator name
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
  
  All tables have Row Level Security (RLS) enabled with policies that:
  - Allow authenticated users to read all records
  - Allow authenticated users to insert, update, and delete records
  
  Note: In production, these policies should be refined based on actual role requirements
  (e.g., regular users vs administrators)
*/

-- Create owners table
CREATE TABLE IF NOT EXISTS owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  motor_model text NOT NULL,
  motor_serial text UNIQUE NOT NULL,
  purchase_date date NOT NULL,
  status text DEFAULT 'active' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payment_history table
CREATE TABLE IF NOT EXISTS payment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  amount numeric(10, 2) NOT NULL,
  payment_type text NOT NULL,
  payment_method text NOT NULL,
  status text DEFAULT 'completed' NOT NULL,
  transaction_date timestamptz DEFAULT now(),
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create call_center_logs table
CREATE TABLE IF NOT EXISTS call_center_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  issue_type text NOT NULL,
  priority text DEFAULT 'medium' NOT NULL,
  status text DEFAULT 'open' NOT NULL,
  description text NOT NULL,
  resolution text DEFAULT '',
  call_date timestamptz DEFAULT now(),
  resolved_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create charger_stations table
CREATE TABLE IF NOT EXISTS charger_stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  latitude numeric(10, 8) NOT NULL,
  longitude numeric(11, 8) NOT NULL,
  total_ports integer DEFAULT 0 NOT NULL,
  available_ports integer DEFAULT 0 NOT NULL,
  power_output text NOT NULL,
  status text DEFAULT 'operational' NOT NULL,
  operator text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payment_history_owner_id ON payment_history(owner_id);
CREATE INDEX IF NOT EXISTS idx_call_center_logs_owner_id ON call_center_logs(owner_id);
CREATE INDEX IF NOT EXISTS idx_owners_status ON owners(status);
CREATE INDEX IF NOT EXISTS idx_charger_stations_status ON charger_stations(status);

-- Enable Row Level Security
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_center_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE charger_stations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for owners table
CREATE POLICY "Allow authenticated users to read owners"
  ON owners FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert owners"
  ON owners FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update owners"
  ON owners FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete owners"
  ON owners FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for payment_history table
CREATE POLICY "Allow authenticated users to read payment history"
  ON payment_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert payment history"
  ON payment_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update payment history"
  ON payment_history FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete payment history"
  ON payment_history FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for call_center_logs table
CREATE POLICY "Allow authenticated users to read call center logs"
  ON call_center_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert call center logs"
  ON call_center_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update call center logs"
  ON call_center_logs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete call center logs"
  ON call_center_logs FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for charger_stations table
CREATE POLICY "Allow authenticated users to read charger stations"
  ON charger_stations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert charger stations"
  ON charger_stations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update charger stations"
  ON charger_stations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete charger stations"
  ON charger_stations FOR DELETE
  TO authenticated
  USING (true);