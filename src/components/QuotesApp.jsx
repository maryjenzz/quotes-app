import React, { use, useEffect, useState } from 'react'
import './QuotesApp.css'

function QuotesApp() {
    const [quote, setQuote] = useState([])
    const [favorites, setFavorites] = useState([])
    const [showFavorites, setShowFavorites] = useState(false)

    const fetchNewQuote = () => {
        fetch('https://api-quotes-69tf.onrender.com/quote/')
            .then(response => response.json())
            .then(data => setQuote(data))
            .catch(error => console.error('Erro ao buscar citação', error))
    };

    useEffect(() => {
        fetchNewQuote();
    }, []);

    const addToFavorites = () => {
        const isAlreadyInFavorites = favorites.some((fav) => fav.text === quote.text && fav.author === quote.author);

        if (!isAlreadyInFavorites) {
            setFavorites([...favorites, quote]);
        }
        fetchNewQuote();
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    }

    return (
        <div className='container'>
            <div className="quotes-app">
                <h1 className="app-heading">
                    Citações.
                </h1>
                <i className='bx  bxs-heart fav-icon' onClick={toggleFavorites} ></i>
                <div className="quote">
                    <i className='bx  bxs-quote-left-alt'  ></i>
                    <p className="quote-text">{quote.text}</p>
                    <p className="quote-author">{quote.author}</p>
                    <i className='bx  bxs-quote-right-alt'  ></i>

                </div>
                <div className="circles">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
                <div className="buttons">
                    <button className='btn btn-new' onClick={fetchNewQuote}>
                        Nova Citação
                    </button>
                    <button className='btn btn-fav' onClick={addToFavorites}>
                        Favoritar
                    </button>
                </div>
                {showFavorites && (
                    <div className="favorites">
                        <button className='btn-close' onClick={toggleFavorites}>
                            <i className='bx  bx-x'></i>
                        </button>
                        {favorites.map((favQuote, index) => (
                            <div className="fav-quote" key={index}>
                                <div className="fav-quote-delete">
                                    <i className='bx  bx-trash'
                                        onClick={() => {
                                            const updateFavorites = favorites.filter((item, i) => i !== index);
                                            setFavorites(updateFavorites);
                                        }}
                                    ></i>
                                </div>
                                <div className="fav-quote-content">
                                    <div className="fav-quote-text">
                                        {favQuote.text}
                                    </div>
                                    <div className="fav-quote-author">
                                        {favQuote.author}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default QuotesApp
