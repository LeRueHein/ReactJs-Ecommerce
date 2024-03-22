// CardProperty.jsx
import React from "react";

export default function CardProperty({ property, addToPanier }) {
    const propertyName = property.name;

    const handleClick = () => {
        addToPanier(property);
    };

    return (
        <article>
            <img src={'http://ecommerce.api.pierre-jehan.com/' + property.image.contentUrl} alt={propertyName} />
            <h2>{propertyName}</h2>
            <p>{property.price}</p>
            <p>{property.quantity}</p>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Ajouter au Panier</button>
        </article>
    );
}