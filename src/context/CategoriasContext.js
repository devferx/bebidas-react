import Axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el context
export const CategoriasContext = createContext();

// Provider es sdonde se encuentran las funciones y state
const CategoriasProvider = (props) => {
  // crear el state del context
  const [categorias, setCategorias] = useState([]);

  // ejecutar el llamado a la api
  useEffect(() => {
    const getCategories = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categorias = await axios.get(url);
      setCategorias(categorias.data.drinks);
    };
    getCategories();
  }, []);

  return (
    <CategoriasContext.Provider value={categorias}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
