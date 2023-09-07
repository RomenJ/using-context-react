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

// Definimos un nuevo componente StyledButton utilizando styled-components
const StyledButton = styled.button`
 

	box-shadow:inset 0px -3px 7px 0px #29bbff;
	background:linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);
	background-color:#2dabf9;
	border-radius:3px;
	border:1px solid #0b0e07;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	padding:9px 23px;
	text-decoration:none;
	text-shadow:0px 1px 0px #263666;

&:hover {
	background:linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);
	background-color:#0688fa;
}
:active {
	position:relative;
	top:1px;
}

`;

const Incrementar = memo(() => {
  console.log('incrementar');
  const { incrementar } = useContext(Context);
  return (
    
    <StyledButton onClick={incrementar}>Incrementar (+)</StyledButton>
  );
});

const Decrementar = memo(() => {
  console.log('decrementar');
  const { decrementar } = useContext(Context);
  return (
    <StyledButton onClick={decrementar}>Decrementar (-)</StyledButton>
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





