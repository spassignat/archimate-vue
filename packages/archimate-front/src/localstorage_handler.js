const express = require('express');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Configurer la connexion à la base de données
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'votre_nom_utilisateur_mysql',
	password: 'votre_mot_de_passe_mysql',
	database: 'nom_de_votre_base_de_donnees'
});

// Fonction générique pour exécuter une requête SQL
function query(sql, params, callback) {
	connection.query(sql, params, (error, results) => {
		if (error) {
			console.error(error);
			return callback(error, null);
		}
		return callback(null, results);
	});
}

// Endpoint pour récupérer tous les enregistrements de la table spécifiée
router.get('/:table', (req, res) => {
	const table = req.params.table;
	const sql = `SELECT * FROM ${table}`;
	query(sql, null, (error, results) => {
		if (error) {
			return res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
		}
		return res.json(results);
	});
});

// Endpoint pour ajouter un enregistrement à la table spécifiée
router.post('/:table', (req, res) => {
	const table = req.params.table;
	const sql = `INSERT INTO ${table} SET ?`;
	const params = req.body;
	query(sql, params, (error, results) => {
		if (error) {
			return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'enregistrement.' });
		}
		return res.status(201).json({ message: 'Enregistrement ajouté avec succès.' });
	});
});

// Endpoint pour supprimer un enregistrement de la table spécifiée
router.delete('/:table/:id', (req, res) => {
	const table = req.params.table;
	const id = req.params.id;
	const sql = `DELETE FROM ${table} WHERE id = ?`;
	query(sql, [id], (error, results) => {
		if (error) {
			return res.status(500).json({ error: 'Erreur lors de la suppression de l\'enregistrement.' });
		}
		return res.json({ message: 'Enregistrement supprimé avec succès.' });
	});
});

module.exports = router;
