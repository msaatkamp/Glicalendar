import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Router, Route, Link, useLocation  } from "./react-router";
import styled from "styled-components/native";
import Main from "./src/pages/Main"
import About from "./src/pages/About"
import Calendar from "./src/pages/Calendar"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Register } from "./src/context";

const App = () => {
  const [measures, setMeasures] = useState([])

  return (  
  <Register.Provider value={{measures: measures, handleMeasures: setMeasures}}>
    
    <Container>
      <Header>Glicalendar</Header>
    <Router>
      <Content>
          <Route exact path="/" component={Main} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/about" component={About} />
      </Content>
      <NavigationMenu/>
    
  </Router>
  </Container>
  </Register.Provider>
)};

const NavigationMenu = () => {
  const location = useLocation().pathname

  return (
  <Navbar>
        <Link to="/">
          <MenuButton selected={"/" === location}>
          <FontAwesome5 name="home" size={24} color="black" />{"\n"}
            Início 
          </MenuButton>
        </Link>
        <Link to="/calendar">
          <MenuButton selected={"/calendar" === location} >
          <FontAwesome5 name="calendar" size={24} color="black" />{"\n"}
            Calendar
          </MenuButton>
        </Link>
        <Link to="/about" >
          <MenuButton selected={"/about" === location}>
          <FontAwesome5 name="address-card" size={24} color="black" />{"\n"}
            Sobre
          </MenuButton>
        </Link>
    </Navbar>)
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  height: 100%;
  background-color: #FFF;
`

const Header = styled.Text`
  display: flex;
  flex-flow: row wrap;
  height: 40px;
  margin: 8px;
  justify-content: space-around;
  font-size: 28px;
  text-align: center;
`

const Navbar = styled.View`
  display: flex;
  flex-flow: row wrap;
  height: 40px;
  justify-content: space-around;
  margin: 8px;
  > Link, a, View {
    text-decoration: none;
  }
`

const Content = styled.View`
  display: flex;
  flex-flow: column wrap;
  background-color: #EEE;
  flex-grow: 8;
  padding: 16px;
`

const MenuButton = styled.Text`
  text-align: center;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  border-width: 1px;
  border-color: white;
  border-bottom-color: ${({selected}) => selected ? `black` : `white`};
  color: ${({selected}) => selected ? `black` : `#222`}
`


export default App;
