import pg from "pg";
import dotenv from "dotenv";

// Le type 1114 = TIMESTAMP sans fuseau horaire.
// Par défaut, pg le convertit en Date JS, ce qui décale les heures en UTC.
// On demande à recevoir la chaîne brute telle qu'elle est stockée.
pg.types.setTypeParser(1114, (value: string) => value);

// Charge les variables du fichier .env dans process.env
dotenv.config();

// Le "pool" est un ensemble de connexions réutilisables vers Neon.
// On en crée un seul pour toute l'application.
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
