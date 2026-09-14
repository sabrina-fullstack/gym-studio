import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors()); // autorise les appels venant du frontend React
app.use(express.json()); // permet de lire le JSON envoyé dans les requêtes POST/PUT

// Route de test : vérifie que le serveur répond ET que Neon est joignable
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM branches");
    res.json({
      message: "Connexion OK",
      nombreSuccursales: result.rows[0].count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur de connexion à la base" });
  }
});

// 1. Toutes les succursales
app.get("/api/branches", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM branches ORDER BY branch_name",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 2. Tous les cours d'une succursale
app.get("/api/branches/:branchCode/classes", async (req, res) => {
  try {
    const { branchCode } = req.params;
    const result = await pool.query(
      "SELECT * FROM classes WHERE branch_code = $1 ORDER BY start_time",
      [branchCode],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 3. Un seul cours par son code
app.get("/api/classes/:classCode", async (req, res) => {
  try {
    const { classCode } = req.params;
    const result = await pool.query(
      "SELECT * FROM classes WHERE class_code = $1",
      [classCode],
    );

    // Aucune ligne trouvée : le cours n'existe pas
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 4. Ajouter un nouveau cours
app.post("/api/classes", async (req, res) => {
  try {
    const {
      branch_code,
      class_name,
      start_time,
      end_time,
      instructor_name,
      max_participants,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO classes (branch_code, class_name, start_time, end_time, instructor_name, max_participants)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        branch_code,
        class_name,
        start_time,
        end_time,
        instructor_name,
        max_participants,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 5. Modifier un cours existant
app.put("/api/classes/:classCode", async (req, res) => {
  try {
    const { classCode } = req.params;
    const {
      branch_code,
      class_name,
      start_time,
      end_time,
      instructor_name,
      max_participants,
    } = req.body;

    const result = await pool.query(
      `UPDATE classes
       SET branch_code = $1, class_name = $2, start_time = $3,
           end_time = $4, instructor_name = $5, max_participants = $6
       WHERE class_code = $7
       RETURNING *`,
      [
        branch_code,
        class_name,
        start_time,
        end_time,
        instructor_name,
        max_participants,
        classCode,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 6. Supprimer un cours
app.delete("/api/classes/:classCode", async (req, res) => {
  try {
    const { classCode } = req.params;

    const result = await pool.query(
      "DELETE FROM classes WHERE class_code = $1 RETURNING *",
      [classCode],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    res.json({ message: "Cours supprimé", cours: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
