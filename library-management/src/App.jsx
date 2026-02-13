import { useState } from 'react';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addBook = () => {
    if (newTitle && newAuthor) {
      setBooks([...books, { id: Date.now(), title: newTitle, author: newAuthor }]);
      setNewTitle('');
      setNewAuthor('');
    }
  };

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
          Library Management System
        </h1>
        
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-8 border border-white/50">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search books..."
              className="flex-1 p-4 border-2 border-indigo-200 rounded-2xl focus:border-indigo-400 focus:outline-none text-lg shadow-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Book Title"
              className="flex-1 p-4 border-2 border-indigo-200 rounded-2xl focus:border-indigo-400 focus:outline-none shadow-lg"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              className="flex-1 p-4 border-2 border-indigo-200 rounded-2xl focus:border-indigo-400 focus:outline-none shadow-lg"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
            <button
              onClick={addBook}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all text-lg"
            >
              Add Book
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all hover:-translate-y-2 group">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {book.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6 italic">by {book.author}</p>
              <button
                onClick={() => removeBook(book.id)}
                className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <p className="col-span-full text-center text-xl text-gray-500 py-12">No books found. Try adding or searching differently.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
