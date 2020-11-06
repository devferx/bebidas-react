import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = ({ children }) => {
  const [recetas, setRecetas] = useState([]);
  const [busqueda, findBusqueda] = useState({
    ingrediente: "",
    categoria: "",
  });
  const [consultar, setConsultar] = useState(false);

  useEffect(() => {
    if (consultar) {
      const { nombre, categoria } = busqueda;
      const obtnerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado = await axios.get(url);
        // console.log(resultado.data.drinks);
        setRecetas(resultado.data.drinks);
      };
      obtnerRecetas();
    }
  }, [busqueda, consultar]);
  return (
    <RecetasContext.Provider value={{ recetas, findBusqueda, setConsultar }}>
      {children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
