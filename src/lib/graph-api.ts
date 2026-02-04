/**
 * Microsoft Graph API client
 * Handles all communication with Microsoft's email APIs
 */

interface GraphEmail {
  id: string
  from: {
    emailAddress: {
      address: string
    }
  }
  subject: string
  receivedDateTime: string
  isRead: boolean
  size: number
  hasAttachments: boolean
}

interface GraphFolder {
  id: string
  displayName: string
}

export class GraphAPIClient {
  private accessToken: string
  private baseUrl = 'https://graph.microsoft.com/v1.0'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  /**
   * Get user's mailbox folders
   */
  async getFolders(): Promise<GraphFolder[]> {
    try {
      const response = await fetch(`${this.baseUrl}/me/mailFolders`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Graph API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.value || []
    } catch (error) {
      console.error('Failed to get folders:', error)
      throw error
    }
  }

  /**
   * Get emails from a folder with optional filter
   */
  async getMessages(
    folderId: string = 'inbox',
    filter?: string,
    top: number = 50
  ): Promise<GraphEmail[]> {
    try {
      let url = `${this.baseUrl}/me/mailFolders/${folderId}/messages?$top=${top}`

      if (filter) {
        url += `&$filter=${encodeURIComponent(filter)}`
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Graph API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.value || []
    } catch (error) {
      console.error('Failed to get messages:', error)
      throw error
    }
  }

  /**
   * Delete a single email
   */
  async deleteMessage(messageId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/me/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      return response.ok
    } catch (error) {
      console.error('Failed to delete message:', error)
      return false
    }
  }

  /**
   * Move message to folder (soft delete to trash)
   */
  async moveMessage(messageId: string, destinationFolderId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/me/messages/${messageId}/move`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destinationId: destinationFolderId,
          }),
        }
      )

      return response.ok
    } catch (error) {
      console.error('Failed to move message:', error)
      return false
    }
  }

  /**
   * Batch delete multiple messages
   */
  async batchDeleteMessages(messageIds: string[]): Promise<{
    successful: number
    failed: number
  }> {
    let successful = 0
    let failed = 0

    // Microsoft Graph doesn't support true batch delete, so we do sequential
    // In production, use batch request API for better performance
    for (const messageId of messageIds) {
      const deleted = await this.deleteMessage(messageId)
      if (deleted) {
        successful++
      } else {
        failed++
      }
    }

    return { successful, failed }
  }

  /**
   * Get inbox size statistics
   */
  async getInboxStats(): Promise<{
    totalMessages: number
    unreadCount: number
    totalSize: number
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/me/mailFolders/inbox/statistics`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        return {
          totalMessages: data.totalItemCount || 0,
          unreadCount: data.unreadItemCount || 0,
          totalSize: 0, // Not directly available in stats
        }
      }

      return { totalMessages: 0, unreadCount: 0, totalSize: 0 }
    } catch (error) {
      console.error('Failed to get inbox stats:', error)
      return { totalMessages: 0, unreadCount: 0, totalSize: 0 }
    }
  }
}

/**
 * Create Graph API client from session
 */
export function createGraphClient(accessToken: string) {
  return new GraphAPIClient(accessToken)
}
