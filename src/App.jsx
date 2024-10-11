/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [listado, setListado] = useState([]);
  const [busquedaState, setBusquedaState] = useState('')

  let tasa = 38;
  let porcentaje = 1.20;

  useEffect(() => {
    conseguirLista();
  }, []);

  const conseguirLista = () => {
    let objeto = data.map((dato) => {
      return {
        ...dato,
        id: data.indexOf(dato),
        precioDolar: (parseFloat(dato.precio) / dato.unidades) * porcentaje,
      };
    });

    setListado(objeto);
  };

  const buscar = e => {
    setBusquedaState(e.target.value)
    
    let nuevoListado = listado.filter(item => item.producto.toLowerCase().includes(busquedaState.toLowerCase()));

    if(busquedaState.length < 2){
      conseguirLista()
    }else{
      setListado(nuevoListado);
    }

    
    
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listado de precios</h1>

        <input onChange={buscar} className="ring-2 w-40 p-2 rounded-sm mb-4" type="text" name="busqueda" placeholder="Busca un producto"/>
        {/* <input className="border-solid border-2 mb-4 p-2 w-28" type="submit" value="Buscar"/> */}

      <div className="flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {listado.map((item) => {
          return (
            <article
              key={item.id}
              className="w-72 h-40 text-veryDarkBlue mb-4 border-2 shadow p-2"
            >
              <h3 className="ml-8 mt-6 text-xl font-bold">{item.producto}</h3>
              <p className="ml-8 mt-2">
                Precio Dolares: {item.precioDolar.toFixed(3)} $
              </p>
              <p className="ml-8 mt-2">
                Precio Bolivares: {(item.precioDolar * tasa).toFixed(3)} Bs
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default App;
