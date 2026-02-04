'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CleanupStats {
  emails_found: number
  storage_freed_mb: number
  confidence: number
}

export function CleanupForm() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [step, setStep] = useState<'select' | 'preview' | 'execute'>('select')
  const [previewData, setPreviewData] = useState<CleanupStats | null>(null)
  const [onlyFromStrangers, setOnlyFromStrangers] = useState<boolean>(true)

  const cleanupTypes = [
    {
      id: 'auto_replies',
      name: 'Auto-Replies & Cold Responses',
      description: 'Remove out-of-office and generic cold outreach replies',
      icon: '🤖',
    },
    {
      id: 'bounces',
      name: 'Bounce Emails',
      description: 'Remove undeliverable and bounce notifications',
      icon: '↩️',
    },
    {
      id: 'duplicates',
      name: 'Duplicate Emails',
      description: 'Remove duplicate messages you already have',
      icon: '📋',
    },
    {
      id: 'inactive_newsletters',
      name: 'Inactive Newsletters',
      description: 'Remove unopened newsletters from 90+ days ago',
      icon: '📬',
    },
    {
      id: 'large_emails',
      name: 'Large Attachments',
      description: 'Remove emails with large attachments (>5MB)',
      icon: '📦',
    },
    {
      id: 'spam',
      name: 'Likely Spam',
      description: 'Remove emails flagged as spam',
      icon: '🚫',
    },
  ]

  // Preview mutation
  const previewMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/cleanup/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cleanup_type: selectedType,
          only_from_strangers: selectedType === 'auto_replies' ? onlyFromStrangers : undefined
        }),
      })

      if (!res.ok) throw new Error('Preview failed')
      const json = await res.json()
      return json.data
    },
    onSuccess: (data) => {
      setPreviewData(data)
      setStep('preview')
    },
  })

  // Execute mutation
  const executeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/cleanup/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cleanup_type: selectedType,
          only_from_strangers: selectedType === 'auto_replies' ? onlyFromStrangers : undefined
        }),
      })

      if (!res.ok) throw new Error('Execution failed')
      const json = await res.json()
      return json.data
    },
    onSuccess: () => {
      setStep('execute')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    },
  })

  if (step === 'select') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Clean Up Your Inbox</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Choose which type of emails you want to clean up
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {cleanupTypes.map((type) => (
            <Card
              key={type.id}
              className={`p-3 sm:p-4 cursor-pointer border-2 transition-all active:scale-[0.98] ${
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-xl sm:text-2xl">{type.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">{type.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{type.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedType === 'auto_replies' && (
          <Card className="p-3 sm:p-4 bg-blue-50 border-blue-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyFromStrangers}
                onChange={(e) => setOnlyFromStrangers(e.target.checked)}
                className="mt-1 w-5 h-5 sm:w-4 sm:h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  Only remove from people I haven't contacted
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Protects auto-replies from your actual contacts while removing junk from strangers
                </p>
              </div>
            </label>
          </Card>
        )}

        <Button
          onClick={() => previewMutation.mutate()}
          disabled={!selectedType || previewMutation.isPending}
          size="lg"
          className="w-full min-h-[48px] sm:min-h-[44px]"
        >
          {previewMutation.isPending ? 'Loading preview...' : 'Preview Cleanup'}
        </Button>

        {previewMutation.isError && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            Failed to preview cleanup. Please try again.
          </div>
        )}
      </div>
    )
  }

  if (step === 'preview') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Preview Cleanup</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            We found {previewData?.emails_found} emails to clean up
          </p>
        </div>

        <Card className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Emails to delete</p>
              <p className="text-2xl sm:text-3xl font-bold">{previewData?.emails_found}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Storage to free</p>
              <p className="text-2xl sm:text-3xl font-bold">{previewData?.storage_freed_mb} MB</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Confidence score</p>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div
                className="bg-green-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(previewData?.confidence || 0) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {Math.round((previewData?.confidence || 0) * 100)}% accuracy
            </p>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setStep('select')
              setPreviewData(null)
              setSelectedType('')
            }}
            className="w-full sm:flex-1 min-h-[48px] sm:min-h-[44px]"
          >
            Back
          </Button>
          <Button
            onClick={() => executeMutation.mutate()}
            disabled={executeMutation.isPending}
            className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 min-h-[48px] sm:min-h-[44px]"
          >
            {executeMutation.isPending ? 'Cleaning up...' : 'Execute Cleanup'}
          </Button>
        </div>

        {executeMutation.isError && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            Failed to execute cleanup. Please try again.
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div className="text-4xl sm:text-5xl mb-4">✅</div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Cleanup Complete!</h2>
        <p className="text-gray-600 text-sm sm:text-base">Your inbox has been cleaned successfully</p>
      </div>

      <Card className="p-4 sm:p-6 space-y-2">
        <p className="text-xs sm:text-sm text-gray-600">Cleanup ID</p>
        <p className="font-mono text-xs sm:text-sm break-all">{executeMutation.data?.cleanup_id}</p>
      </Card>

      <Button
        onClick={() => window.location.reload()}
        className="w-full min-h-[48px] sm:min-h-[44px]"
      >
        Return to Dashboard
      </Button>
    </div>
  )
}
