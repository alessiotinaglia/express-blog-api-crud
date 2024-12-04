
// tutte le funzioni del posts.js
// importiamo i post
const posts = require("../dati/array");

// fa una copia e filtra 
function index(req, res) {
    const itemTitolo = req.query.titolo;
    const tagsIngredient = req.query.tags;
    // copia del posts per lavorarci 
    let postsCopy = [...posts];
    if (itemTitolo) {
        postsCopy = menu.filter((item) =>
            item.titolo.toLowerCase().includes(itemTitolo.toLowerCase())
        );
    } if (tagsIngredient) {
        postsCopy = postsCopy.filter((item) =>
            item.tags.includes(tagsIngredient)
        );
    }
    const response = {
        totalCount: posts.length,
        data: postsCopy,
    };
    res.json(response);
};

// Create - Store
function store(req, res) {
    res.send("Creazione nuova post" + req.params.id);
};

// Update totale - Update
function update(req, res) {
    res.send("Modifica integrale del post" + req.params.id);
}

// Update parziale - Modify
function modify(req, res) {
    res.send("Modifica parziale del post" + req.params.id);
};

// Delete (cancellazione) - Destroy
function destroy(req, res) {
    res.send("Cancellazione del post :" + req.params.id);
    const id = parseInt(req.params.id);
    const index = posts.findIndex(item => item.id === id)
    if (index !== -1) {
        posts.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).res.json({
            error: '404',
            message: "Post non trovato"
        })
    }
};

module.exports = { index, store, update, modify, destroy };