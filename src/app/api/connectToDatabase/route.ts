import { connectToDatabase } from '@/app/lib/mongoose'
import { NextResponse } from 'next/server'



/**
 * API qui tente de se connecter à MongoDB.
 * Utile pour débugger la connexion à la base de données.
 * @returns Un JSON avec un message de confirmation ou d'erreur.
 * @throws Si une erreur survient lors de la connexion.
 */
export async function GET() {
  try {
    await connectToDatabase()
    return NextResponse.json({ message: 'Connexion à MongoDB réussie ' })
  } catch (error) {
    console.error('Erreur dans test-mongo API :', error)
    return NextResponse.json({ message: 'Échec de la connexion MongoDB', error }, { status: 500 })
  }
}
