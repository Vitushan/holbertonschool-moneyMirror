/**
 * Endpoint de santé (Health Check)
 *
 * Permet de vérifier rapidement que l'API fonctionne correctement.
 * Accessible via : GET /api/health
 *
 * Utilisations :
 * - Vérifier que le serveur Next.js répond
 * - Tester la configuration de base avant de debugger d'autres endpoints
 * - Monitoring en production (optionnel)
 *
 * Retourne un statut 200 si tout fonctionne normalement.
 */
export async function GET() {
  return Response.json({
    status: 'ok',
    message: 'API MoneyMirror est opérationnelle',
    timestamp: new Date().toISOString()
  }, { status: 200 })
}