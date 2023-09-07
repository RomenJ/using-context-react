import { createContext, useContext, useState, memo, useCallback } from "react";
import styled from 'styled-components'
import logo from './logo.svg';
import './App.css';
import Background from './components/Background'
import Container from './components/Container'
import HeaderApp from './components/HeaderApp'

const Context = createContext();

const ContadorProvider = ({ children }) => {
  const [contador, setCont] = useState(0);
  const [ultimaAccion, setUltimaAccion] = useState(null);
  const [ultimaFecha, setUltimaFecha] = useState(null);

  const incrementar = useCallback(() => {
    setCont(x => x + 1);
    setUltimaAccion("Incrementar (+)");
    setUltimaFecha(new Date().toLocaleString());
  }, []);

  const decrementar = useCallback(() => {
    setCont(x => x - 1);
    setUltimaAccion("Decrementar (-)");
    setUltimaFecha(new Date().toLocaleString());
  }, []);

  return (
    <Context.Provider value={{ contador, incrementar, decrementar, ultimaAccion, ultimaFecha }}>
      {children}
    </Context.Provider>
  );
}

const Incrementar = memo(() => {
  console.log('incrementar');
  const { incrementar } = useContext(Context);
  return (
    <button onClick={incrementar}>Incrementar (+)</button>
  );
});

const Decrementar = memo(() => {
  console.log('decrementar');
  const { decrementar } = useContext(Context);
  return (
    <button onClick={decrementar}>Decrementar (-)</button>
  );
});


const Label = () => {
  console.log('label render');
  const { contador, ultimaAccion, ultimaFecha } = useContext(Context);
  
const valores = [contador, ultimaAccion, ultimaFecha];

return (
  <div>
    <h1>{contador}</h1>
    
    {/* Mostrar los valores al final de Label */}
    <div>
      <p>Valor: {contador}</p>
      <p>Última acción: {ultimaAccion}</p>
      <p>Fecha: {ultimaFecha}</p>
    </div>
    
  </div>

  
);
}


const App = () => {
  return (
    <Background>
      <HeaderApp> Aumentador y reductor en React </HeaderApp>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container>
        <ContadorProvider>
        <table>
        <tr>
        <td> <Incrementar /></td>
        <td> <Decrementar /></td>
        </tr>
        <tr>
          <td> <Label /> </td>
          </tr>
        </table>
        </ContadorProvider>
      </Container>
    </Background>
  );
}

export default App;





