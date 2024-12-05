
// tutte le funzioni del posts.js

// importiamo i post
const posts = require("../dati/array");
const { post } = require("../router/posts");

// fa una copia e filtra 
function index(req, res) {
    const itemTitolo = req.query.titolo;
    const tagsIngredient = req.query.tags;
    // copia del posts per lavorarci 
    let postsCopy = [...posts];
    if (itemTitolo) {
        postsCopy = posts.filter((item) =>
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

// funzione che trova per l'id
function show(req, res) {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post non trovato" });
    }
};

// Create - Store - crea uno nuovo
function store(req, res) {
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i].id;
        }
    }
    newId += 1;
    const newPost = {
        id: newId,
        titolo: req.body.titolo,
        contenuto: req.body.contenuto,
        immagine: req.body.immagine,
        tags: req.body.tags
    }
    posts.push(newPost)
    res.status(201).json(newPost)
};

// Update totale - Update - Modifica 
function update(req, res) {
    const id = parseInt(req.params.id);
    const item = posts.find((item) => item.id === id);
    if(!item){
        res.status(404).json({ success:false, message: "Post non trovato" });
        return;
    }
    console.log(req.body);
    item.titolo = req.body.titolo,
    item.contenuto = req.body.contenuto,
    item.immagine = req.body.immagine,
    item.tags = req.body.tags 
    console.log(post);    
    res.json(item);
} 

// Update parziale - Modify - modifica solo parziale
function modify(req, res) {
    res.send("Modifica parziale del post" + req.params.id);
};

// Delete (cancellazione) - Destroy - elimina
function destroy(req, res) {
    const id = parseInt(req.params.id);

    // Trova l'indice del post con l'ID corrispondente
    const index = posts.findIndex(item => item.id === id);
    if (index !== -1) {
        const postToDelete = posts[index];
        posts.splice(index, 1);
        res.status(200).json({
            message: "Post eliminato: " + postToDelete.id
        });
    } else {
        res.status(404).json({ message: "Post non trovato" });
    }
}

module.exports = { index, show, store, update, modify, destroy };