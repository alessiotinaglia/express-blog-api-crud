const express = require("express");
const posts = require("../dati/array");
const router = express.Router();
const checkTime = require("../middlewares/checkTime")

// mi collego con il postController.js
const { index, show, store, update, modify, destroy } = require('../controllers/postController');

// per i middlewares
router.use(checkTime);

// fa una copia e filtra 
router.get("/", index);

// fa una copia e filtra 
router.get("/:id", checkTime, show);

// Create - Store
router.post("/", store);

// Update totale - Update
router.put("/:id", update);

// Update parziale - Modify
router.patch("/:id", modify);

// Delete (cancellazione) - Destroy
router.delete("/:id", destroy);


module.exports = router;