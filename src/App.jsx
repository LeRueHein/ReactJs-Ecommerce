// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ListProperties from './components/ListProperties';
import Panier from './components/Panier';

function App() {
    const [panier, setPanier] = useState([]);
    const [properties, setProperties] = useState([]);
    const firstLoad = useRef(true);
    
    useEffect(() => {

        let savedCart = localStorage.getItem('panier');
        if (savedCart) {
          savedCart = JSON.parse(savedCart);
          setPanier(savedCart);
        }
  
        fetch('http://ecommerce.api.pierre-jehan.com/products')
        .then(response => response.json())
        .then(data => {
          if (savedCart) {
            setProperties(data['hydra:member'].map(product => {
              const existingProduct = savedCart.find(item => item.id === product.id);
              if (existingProduct) {
                return {...product, quantity: product.quantity - existingProduct.quantity};
              }
              return product;
            }));
          } else {
            setProperties(data['hydra:member']);
          }
        });
      }, []);


      useEffect(() => {
        // Stocker le panier dans le localStorage chaque fois que le panier change
        if (firstLoad.current) {
            firstLoad.current = false;
          return;
        }
        localStorage.setItem('panier', JSON.stringify(panier));
    }, [panier]);




    // Fonction pour ajouter un élément au panier
    const addToPanier = (property) => {
        const existingItemIndex = panier.findIndex(item => item.id === property.id);
        if (existingItemIndex === -1 && property.quantity > 0) {
            const newPanier = [...panier, { ...property, quantity: 1 }];
            setPanier(newPanier);
            updatePropertyQuantity(property.id, -1); // Réduire la quantité dans la liste des biens
        } else if (existingItemIndex !== -1 && property.quantity > 0) {
            const newPanier = [...panier];
            newPanier[existingItemIndex].quantity++;
            setPanier(newPanier);
            updatePropertyQuantity(property.id, -1); // Réduire la quantité dans la liste des biens
        }
    };

    // Fonction pour supprimer un élément du panier
    const removeFromPanier = (index) => {
        const item = panier[index];
        const newPanier = [...panier.slice(0, index), ...panier.slice(index + 1)];
        setPanier(newPanier);
        updatePropertyQuantity(item.id, item.quantity); // Augmenter la quantité dans la liste des biens
    };

    // Fonction pour mettre à jour la quantité dans la liste des biens
    const updatePropertyQuantity = (id, change) => {
        const updatedProperties = properties.map(property =>
            property.id === id ? { ...property, quantity: property.quantity + change } : property
        );
        setProperties(updatedProperties);
    };

    return (
        <div className="container">
            <div className="left-section">
                <ListProperties properties={properties} addToPanier={addToPanier} />
            </div>
            <div className="right-section">
                <Panier panier={panier} removeFromPanier={removeFromPanier} />
            </div>
        </div>
    );
}

export default App;