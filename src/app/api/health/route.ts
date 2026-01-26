import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    // Check database connection
    const dbHealthy = true // Placeholder - would query database in production

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: dbHealthy ? 'connected' : 'disconnected',
        version: '0.1.0',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}
