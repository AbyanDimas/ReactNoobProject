import React, { useState } from 'react';
import axios from 'axios';

const Home3 = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Prefix the URL with cors-anywhere proxy
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fetch Data from URL</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full px-4 py-2 border rounded-l-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
          >
            Fetch
          </button>
        </div>
      </form>

      {loading && <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>}
      {error && <div className="flex justify-center items-center h-screen"><div>Error: {error}</div></div>}

      {data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <pre className="text-gray-600">{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home3;
