import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Guestbook API functions
export const guestbookAPI = {
  // Get all approved messages
  async getMessages() {
    try {
      const { data, error } = await supabase
        .from('guestbook_messages')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching messages:', error)
        return { success: false, error: error.message }
      }

      return { success: true, messages: data || [] }
    } catch (error) {
      console.error('Error in getMessages:', error)
      return { success: false, error: error.message }
    }
  },

  // Add new message (pending approval)
  async addMessage(messageData) {
    try {
      const { data, error } = await supabase
        .from('guestbook_messages')
        .insert([{
          name: messageData.name,
          content: messageData.content,
          email: messageData.email || null,
          phone: messageData.phone || null,
          approved: true // Default to pending approval
        }])
        .select()

      if (error) {
        console.error('Error adding message:', error)
        return { success: false, error: error.message }
      }

      return { success: true, message: data[0] }
    } catch (error) {
      console.error('Error in addMessage:', error)
      return { success: false, error: error.message }
    }
  },

  // Subscribe to real-time changes (approved messages only)
  subscribeToMessages(callback) {
    const subscription = supabase
      .channel('guestbook_messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'guestbook_messages',
          filter: 'approved=eq.true'
        },
        (payload) => {
          console.log('Real-time update:', payload)
          callback(payload)
        }
      )
      .subscribe()

    return subscription
  },

  // Unsubscribe from real-time changes
  unsubscribe(subscription) {
    if (subscription) {
      supabase.removeChannel(subscription)
    }
  }
}
