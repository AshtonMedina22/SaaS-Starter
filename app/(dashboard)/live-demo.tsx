'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function LiveDemo() {
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const { data, error: queryError } = await supabase
        .from('test_connection')
        .select('message, created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (queryError) {
        setError(`Database connection issue: ${queryError.message}`)
      } else if (data) {
        setMessage(data.message)
        setLastUpdated(new Date(data.created_at).toLocaleString())
      } else {
        setError('No data available in the database')
      }
    } catch (err) {
      setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Refresh data every 30 seconds to show live connection
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">Live Backend Connection</h3>
            <p className="text-blue-100 mt-1">Real-time data from CloudGather infrastructure</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : error ? 'bg-red-400' : 'bg-green-400'}`}></div>
            <span className="text-blue-100 text-sm font-medium">
              {loading ? 'Connecting...' : error ? 'Error' : 'Connected'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Establishing connection to CloudGather database...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-red-800">Connection Issue</h4>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
                <div className="mt-4">
                  <button
                    onClick={fetchData}
                    className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md transition-colors"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {message && !loading && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-green-800">Database Connected Successfully</h4>
                  <div className="mt-2">
                    <p className="text-sm text-green-700 font-medium">Message from CloudGather Database:</p>
                    <p className="text-lg text-green-800 mt-2 font-semibold bg-white p-3 rounded border">
                      "{message}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">✓</div>
                <div className="text-sm text-blue-800 font-medium mt-1">Database</div>
                <div className="text-xs text-blue-600">Connected</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">✓</div>
                <div className="text-sm text-green-800 font-medium mt-1">API</div>
                <div className="text-xs text-green-600">Active</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">✓</div>
                <div className="text-sm text-purple-800 font-medium mt-1">Real-time</div>
                <div className="text-xs text-purple-600">Live</div>
              </div>
            </div>
            
            {lastUpdated && (
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Last updated: {lastUpdated}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Auto-refreshes every 30 seconds
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
