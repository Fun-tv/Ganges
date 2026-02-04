-- Ganges Lite - Additional Features Migration
-- Run this AFTER running 001_initial_schema.sql

-- Add locker_number to user_profiles
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS locker_number TEXT UNIQUE;

-- Add courier and delivery tracking fields to packages
ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS courier_partner TEXT DEFAULT 'Ganges Express',
ADD COLUMN IF NOT EXISTS expected_delivery TEXT;

-- Create function to auto-assign sequential locker numbers starting from GL-1001
CREATE OR REPLACE FUNCTION assign_locker_number()
RETURNS TRIGGER AS $$
DECLARE
  next_locker INT;
BEGIN
  IF NEW.locker_number IS NULL THEN
    -- Get the highest locker number and increment
    SELECT COALESCE(
      MAX(CAST(REPLACE(locker_number, 'GL-', '') AS INT)),
      1000
    ) + 1
    INTO next_locker
    FROM public.user_profiles
    WHERE locker_number IS NOT NULL
    AND locker_number ~ '^GL-[0-9]+$';
    
    -- Assign the new locker number with GL- prefix
    NEW.locker_number := 'GL-' || next_locker;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-assign locker number on user creation
DROP TRIGGER IF EXISTS assign_locker_trigger ON public.user_profiles;
CREATE TRIGGER assign_locker_trigger
BEFORE INSERT ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION assign_locker_number();

-- Create documents storage bucket for ID proof uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS for documents bucket
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can upload their own documents
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can view their own documents
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Admins can view all documents
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  auth.jwt() ->> 'email' = 'gangescompany@gmail.com'
);

-- Policy: Users can delete their own documents
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Update existing users to have locker numbers (if any exist without them)
DO $$
DECLARE
  user_record RECORD;
  locker_num INT := 1001;
BEGIN
  FOR user_record IN 
    SELECT id FROM public.user_profiles 
    WHERE locker_number IS NULL 
    ORDER BY created_at
  LOOP
    UPDATE public.user_profiles
    SET locker_number = 'GL-' || locker_num
    WHERE id = user_record.id;
    
    locker_num := locker_num + 1;
  END LOOP;
END $$;

-- Add index on locker_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_locker_number 
ON public.user_profiles(locker_number);

-- Add index on courier_partner for admin filtering
CREATE INDEX IF NOT EXISTS idx_packages_courier_partner 
ON public.packages(courier_partner);

COMMENT ON COLUMN public.user_profiles.locker_number IS 'Unique locker identifier (GL-1001, GL-1002, etc.)';
COMMENT ON COLUMN public.packages.courier_partner IS 'Name of courier company handling delivery';
COMMENT ON COLUMN public.packages.expected_delivery IS 'Expected delivery date/time range';


