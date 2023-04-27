import React from 'react';

function useLocalStorage(itemName, initialValue) {

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
  
    React.useEffect(() => {
      // Simulamos un segundo de delay de carga 
        setTimeout(() => {
          // Manejamos la tarea dentro de un try/catch por si ocurre algún error
          try {
            const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;
            
            if (!localStorageItem) {
              localStorage.setItem(itemName, JSON.stringify(initialValue));
              parsedItem = initialValue;
            } else {
              parsedItem = JSON.parse(localStorageItem);
            }
    
            setItem(parsedItem);
          } catch(error) {
          // En caso de un error lo guardamos en el estado
            setError(error);
          } finally {
            // También podemos utilizar la última parte del try/cath (finally) para terminar la carga
            setLoading(false);
          }
        }, 1000);
      });
  
    
  
    const saveItem = (newItem) => {
      try {
        const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
      } catch(error) {
        setError(error);
      }
    };
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
  }

  export { useLocalStorage };