import { createContext, useContext, useState, memo, useCallback } from "react";
import styled from 'styled-components'
import logo from './logo.svg';
import './App.css';
import Background from './components/Background'
import Container from './components/Container'
import HeaderApp from './components/HeaderApp'


const Context = createContext()
/**Context se usará generalmente para variables que no cambian */
const ContadorProvider = ({children}) => {
    const [contador, setCont] =useState(0)
    const incrementar =useCallback(()=> setCont (x =>x+1), [])
    const decrementar = useCallback(() => setCont (x=> x-1, []))
    return(
        <Context.Provider value={{contador, incrementar, decrementar}}>
            {children}
        </Context.Provider>
    )
}

const Incrementar =memo(() =>{
    console.log ('incrementar')
    const {incrementar} = useContext (Context)
    return(
        <button onClick= {incrementar}> Incrementar (+)</button>
    )

})

const Decrementar = memo(()=>{
    console.log ('decrementar')
     const {decrementar}= useContext(Context)
     return(
        <button onClick={decrementar}> Decrementar (-)</button>
     )
})


const Label =() =>{

        console.log ('label render')
        const {contador} = useContext(Context)
        return (

            <h1> {contador}</h1>
        )       

}

const App = ()=>{
    return(
        <Background>
            <HeaderApp> Aumentador y reductor en React </HeaderApp>
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Container>
                <ContadorProvider>
                    <Label /> 
                    <Incrementar />
                    <Decrementar/>
                </ContadorProvider>
        </Container>
        </Background>
    )

}
export default App