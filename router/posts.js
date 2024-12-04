
const express = require("express");
const posts = require("../dati/array");
const router = express.Router();

// mi collego con il postController.js
const  { index, store, update, modify, destroy } = require('../controllers/postController');

// fa una copia e filtra 
router.get("/", index);

// Create - Store
router.post("/", store);

// Update totale - Update
router.put("/:id", update);

// Update parziale - Modify
router.patch("/:id", modify);

// Delete (cancellazione) - Destroy
router.delete("/:id", destroy);

module.exports = router;