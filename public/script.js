const apiUrl = '/api/books';

// Fungsi mengambil data dari REST API
async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error("Gagal mengambil data buku:", error);
    }
}

// Menampilkan data ke HTML
function renderBooks(books) {
    const list = document.getElementById('bookList');
    list.innerHTML = '';
    
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${book.title}</strong> <br> 
                <small>${book.author}</small>
            </div>
            <button class="delete-btn" onclick="deleteBook(${book.id})">Hapus</button>
        `;
        list.appendChild(li);
    });
}

// Fungsi mengirim data (POST) ke REST API
async function addBook() {
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    
    if (!titleInput.value || !authorInput.value) {
        alert("Judul dan Penulis tidak boleh kosong!");
        return;
    }

    const newBook = {
        title: titleInput.value,
        author: authorInput.value
    };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });
        
        titleInput.value = '';
        authorInput.value = '';
        fetchBooks(); // Refresh daftar buku
    } catch (error) {
        console.error("Gagal menambahkan buku:", error);
    }
}

// Fungsi menghapus data (DELETE) via REST API
async function deleteBook(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchBooks(); // Refresh daftar buku
    } catch (error) {
        console.error("Gagal menghapus buku:", error);
    }
}

// Panggil fungsi saat halaman pertama dimuat
fetchBooks();
