// ListProperties.jsx
import React, { useEffect, useState } from "react";
import CardProperty from "./CardProperty";

export default function ListProperties({ addToPanier, properties }) {
    const propertiesList = properties.map(property => (
        <CardProperty key={property.id} property={property} addToPanier={addToPanier} />
    ));

    return (
        <section>
            <h1 className="Titre">Liste des Produits</h1>
            {properties.length === 0 && <p>Chargement en cours...</p>}
            <div className="grid grid-cols-4 gap-2">
                {propertiesList}
            </div>
        </section>
    );
}