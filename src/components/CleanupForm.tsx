'use client'

import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Email } from '@/types'

interface CleanupStats {
  emails_found: number
  storage_freed_mb: number
  confidence: number
}

export function CleanupForm() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [step, setStep] = useState<'select' | 'preview' | 'execute'>('select')
  const [previewData, setPreviewData] = useState<CleanupStats | null>(null)

  const cleanupTypes = [
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
        body: JSON.stringify({ cleanup_type: selectedType }),
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
        body: JSON.stringify({ cleanup_type: selectedType }),
      })

      if (!res.ok) throw new Error('Execution failed')
      const json = await res.json()
      return json.data
    },
    onSuccess: (data) => {
      setStep('execute')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    },
  })

  if (step === 'select') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Clean Up Your Inbox</h2>
          <p className="text-gray-600">
            Choose which type of emails you want to clean up
          </p>
        </div>

        <div className="grid gap-4">
          {cleanupTypes.map((type) => (
            <Card
              key={type.id}
              className={`p-4 cursor-pointer border-2 transition-all ${
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{type.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => previewMutation.mutate()}
          disabled={!selectedType || previewMutation.isPending}
          size="lg"
          className="w-full"
        >
          {previewMutation.isPending ? 'Loading preview...' : 'Preview Cleanup'}
        </Button>

        {previewMutation.isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
            Failed to preview cleanup
          </div>
        )}
      </div>
    )
  }

  if (step === 'preview') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Preview Cleanup</h2>
          <p className="text-gray-600">
            We found {previewData?.emails_found} emails to clean up
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Emails to delete</p>
              <p className="text-3xl font-bold">{previewData?.emails_found}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Storage to free</p>
              <p className="text-3xl font-bold">{previewData?.storage_freed_mb} MB</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Confidence score</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
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

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setStep('select')
              setPreviewData(null)
              setSelectedType('')
            }}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={() => executeMutation.mutate()}
            disabled={executeMutation.isPending}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {executeMutation.isPending ? 'Cleaning up...' : 'Execute Cleanup'}
          </Button>
        </div>

        {executeMutation.isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
            Failed to execute cleanup
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Cleanup Complete! ✅</h2>
        <p className="text-gray-600">Your inbox has been cleaned successfully</p>
      </div>

      <Card className="p-6 space-y-2">
        <p className="text-sm text-gray-600">Cleanup ID</p>
        <p className="font-mono text-sm">{executeMutation.data?.cleanup_id}</p>
      </Card>

      <Button onClick={() => window.location.reload()} className="w-full">
        Return to Dashboard
      </Button>
    </div>
  )
}
