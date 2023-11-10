import { useState, useEffect, createContext } from "react";
import clienteAxios from '../config/axios';

export const DataContext = createContext();

export const DataProvider = (props) =>{
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const obtenerProducto = async () => {
          try {
            const {data} = await clienteAxios('/cliente')
            setProductos(data)
          } catch (error) {
            console.log(error);
          }
        }
        obtenerProducto();
      }, [])

      const value = {
        productos : [productos]
      }

      return (
        <DataContext.Provider value = {value}>
            {props.children}
        </DataContext.Provider>
      )
}
