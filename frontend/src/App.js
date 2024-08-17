import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Include your CSS for styling

const QueryGenerator = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [sqlQuery, setSqlQuery] = useState(''); // State to store the SQL query

    const handleSubmit = async () => {
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/generate', { data: query });
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setData(response.data);
                setSqlQuery(response.data.sql_query); // Set SQL query state
            }
        } catch (error) {
            setError('Error generating query');
        }
    };

    return (
        <div className="container">
            <h1>SQL Query Generator</h1>
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query prompt here"
            />
            <button onClick={handleSubmit}>Generate and Execute Query</button>
            {error && <div className="error">{error}</div>}
            {sqlQuery && (
                <div className="sql-query">
                    <h2>Generated SQL Query:</h2>
                    <pre>{sqlQuery}</pre>
                </div>
            )}
            {data && (
                <table className="result-table">
                    <thead>
                        <tr>
                            {data.columns.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, index) => (
                            <tr key={index}>
                                {data.columns.map((col, colIndex) => (
                                    <td key={colIndex}>{row[col]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default QueryGenerator;
