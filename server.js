const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware untuk mem-parsing JSON dan melayani file statis
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory database sederhana
let books = [
    { id: 1, title: "Belajar Linux Dasar", author: "Anonim" },
    { id: 2, title: "Jaringan Komputer Lanjut", author: "Admin" }
];

// --- RESTful API Endpoints ---

// GET: Mengambil semua buku
app.get('/api/books', (req, res) => {
    res.json(books);
});

// POST: Menambahkan buku baru
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: "Judul dan penulis wajib diisi!" });
    }
    
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// DELETE: Menghapus buku berdasarkan ID
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Buku tidak ditemukan!" });
    }
    
    books.splice(bookIndex, 1);
    res.json({ message: "Buku berhasil dihapus" });
});

// Mulai server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
