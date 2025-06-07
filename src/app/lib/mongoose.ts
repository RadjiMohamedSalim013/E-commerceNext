import mongoose from 'mongoose'

// Cette variable globale permet de conserver une seule connexion
// pendant le développement (sinon Next.js recharge souvent et ouvre trop de connexions)
let isConnected: boolean = false



/**
 * Connecte l'application Next.js à la base de données MongoDB.
 * Utilise la variable d'environnement MONGODB_URI.
 * N'essaie de se reconnecter que si la connexion n'a pas déjà été établie.
 * @returns Une promesse qui se résout lorsque la connexion est établie.
 */
export const connectToDatabase = async (): Promise<void> => {
  // Si la connexion est déjà faite, on évite de se reconnecter
  if (isConnected) {
    console.log(' Déjà connecté à MongoDB.')
    return
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(' La variable MONGODB_URI est manquante dans .env.local')
  }

  try {
    // Connexion à MongoDB
    const db = await mongoose.connect(process.env.MONGODB_URI, {
    })

    isConnected = true
    console.log(`Connecté à MongoDB : ${db.connection.name}`)
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error)
    throw error
  }
}
