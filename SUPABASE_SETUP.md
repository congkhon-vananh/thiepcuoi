# Supabase Setup Guide for Wedding Guestbook

## 1. Database Schema Setup

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create guestbook_messages table
CREATE TABLE guestbook_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guestbook_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert messages (for guests to submit)
CREATE POLICY "Anyone can insert messages" ON guestbook_messages
  FOR INSERT WITH CHECK (true);

-- Policy: Only approved messages are visible (for public display)
CREATE POLICY "Only approved messages visible" ON guestbook_messages
  FOR SELECT USING (approved = true);

-- Optional: Create an index for better performance
CREATE INDEX idx_guestbook_approved_created ON guestbook_messages(approved, created_at DESC);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_guestbook_messages_updated_at
    BEFORE UPDATE ON guestbook_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 2. Environment Variables Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Get your Supabase credentials:
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy the Project URL and anon/public key

3. Update `.env.local` with your actual values:
```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Test Data (Optional)

Insert some sample approved messages for testing:

```sql
INSERT INTO guestbook_messages (name, content, approved) VALUES  t cuộc đời. Chúc hai con sớm có tin vui!', true),
('Bạn bè thân thiết', 'Tình yêu của hai bạn thật đẹp và trong sáng! Chúc mừng hạnh phúc mới và chúc hai bạn trăm năm hạnh phúc bên nhau!', true),
('Đồng nghiệp', 'Chúc mừng đám cưới của hai bạn! Chúc hai bạn luôn hạnh phúc và thành công trong cuộc sống!', true);
```

## 4. Admin Panel (Optional)

To approve messages, you can:

1. Use Supabase Dashboard → Table Editor
2. Or create a simple admin interface
3. Update `approved` column to `true` for messages you want to show

## 5. Real-time Features

The guestbook will automatically update when new approved messages are added, thanks to Supabase real-time subscriptions.

## 6. Security Notes

- Row Level Security (RLS) is enabled
- Guests can only insert messages (not read unapproved ones)
- Only approved messages are visible to the public
- All database operations are logged in Supabase

## 7. Migration from Google Sheets

The new Supabase implementation will:
- ✅ Eliminate CORS issues
- ✅ Provide real-time updates
- ✅ Better security with RLS
- ✅ Proper database with relationships
- ✅ No more fallback logic needed
