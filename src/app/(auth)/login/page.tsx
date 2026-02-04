'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const handleSignIn = () => {
    signIn('microsoft-entra', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">InboxClean</h1>
          <p className="text-gray-600">Smart Email Cleanup for Outlook</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Microsoft Login Button */}
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
            </svg>
            Sign in with Microsoft
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Secure login</span>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              What you can do:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Remove auto-replies & cold outreach responses
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Detect bounce emails
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Find duplicate messages
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Clean up inactive newsletters & spam
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Delete large emails to save storage
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>By signing in, you agree to our Terms of Service</p>
          <p className="mt-2">and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
