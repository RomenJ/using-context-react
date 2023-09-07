import React, { createContext, useContext } from "react";

const ContextDefault = createContext('Valor por defecto'); // Corregido: Debes usar `React.createContext`
const Context2 = createContext('Valor por defecto 2 '); // Corregido: Debes usar `React.createContext`



const DefaultProvider = ({ children }) => {
  return (
    <ContextDefault.Provider value={'Mi valor'}> {/* Corregido: Debes retornar el Provider */}
      {children}
    </ContextDefault.Provider>
  );
};

const Contenido = () => {
  const ctx = useContext(ContextDefault);
  return <div>{ctx}</div>;
};

const Contenido2 = () => {
  const ctx = useContext(Context2);
  return <div>{ctx}</div>;
};

function App() {
  return (
    <DefaultProvider>
      <Contenido />
      <Contenido2 />
    </DefaultProvider>
  );
}

export default App;