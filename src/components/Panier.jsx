import React from 'react';

export default function Panier({ panier, removeFromPanier }) {
    // Fonction pour calculer le nombre total d'articles dans le panier
    const calculateTotalItems = () => {
        return panier.reduce((total, item) => total + item.quantity, 0);
    };

    // Fonction pour calculer le montant total du panier
    const calculateTotalAmount = () => {
        return panier.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="panier">
            <h2 className='Titre'>Panier</h2>
            <p>{calculateTotalItems()} élément{calculateTotalItems() !== 1 ? 's' : ''}</p>
            <ul>
                {panier.map((item, index) => (
                    <li key={index}>
                        <span>{item.name}</span>
                        <button onClick={() => removeFromPanier(index)} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Supprimer</button>
                    </li>
                ))}
            </ul>
            <p>Total: {calculateTotalAmount()} €</p>
        </div>
    );
}