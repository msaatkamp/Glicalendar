import React, { useState, useContext } from "react";
import { Text, Switch, Button } from "react-native";
import styled from "styled-components/native";
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Register } from "../../context";

const RegisterData = () =>{
    const inicialDate = new Date(Date.now())
    const {measures, handleMeasures} = useContext(Register)
    const [insulina, setInsulina] = useState(0)
    const [glicose, setGlicose] = useState(0)
    const [date, setDate] = useState(inicialDate)

    const [displayDate, setDisplayDate] = useState(false)   

    const [basalinsulina, setBasalinsulina] = useState(0)
    const [showBasal, setShowBasal] = useState(false)

    const setInsulinaValue = (text) => {
        if (/^(\s*|\d+)$/.test(text)) {
            setInsulina(text)
        }
    }

    const setGlicoseValue = (text) => {
        if (/^(\s*|\d+)$/.test(text)) {
            setGlicose(text)
        }
    }

    const setBasalinsulinaValue = (text) => {
        if (/^(\s*|\d+)$/.test(text)) {
            setBasalinsulina(text)
        }
    }

    const handleDateChange = (event, date) => {
        if(date!==undefined){
            setDisplayDate(false)
            setDate(date)
        }
    }
    
    const Data = typeof date === "object" ? `${date.getDate().toString()}/${(date.getMonth() + 1).toString()}/${date.getFullYear().toString()}` : "HAHA";
    const hour = `${date.getHours() <= "9" ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() <= "9" ? "0" + date.getMinutes() : date.getMinutes()}`
    return (
        <Content>
            <FormContent>
            <FormData>
                {/* <FontAwesome5 name="calendar" size={24} color="black" onPress={() => setDisplayDate(true)}/> */}
                <LabelText onPress={() => setDisplayDate("date")}>
                    Data medição - {Data}
                </LabelText>
                {displayDate && <RNDateTimePicker mode={displayDate === "date" ? "date" : "time"} onChange={handleDateChange} value={date}/>}
            </FormData>
            {<FormData>
                {/* <FontAwesome5 name="clock" size={24} color="black" onPress={() => setDisplayHour(true)}/> */}
                <LabelText onPress={() => setDisplayDate("hour")}>
                    Hora medição - {hour}
                </LabelText>
            </FormData>}

            <FormData>
                <LabelText>
                    Glicose
                </LabelText>
                <TextBox keyboardType="numeric" value={glicose} color={glicose && glicose >= 160 || glicose <= 60 ? "red" : "green"} onChangeText={setGlicoseValue}/> 
            </FormData>
            <FormData>
                <LabelText>
                    UL Insulina
                </LabelText>
                <TextBox keyboardType="numeric" value={insulina} color={insulina && (glicose > 160 && insulina == 0 || (glicose <= 120 && insulina >= 1 || (glicose - insulina * 20) < 80)) ? "red" : "green"} onChangeText={setInsulinaValue}/> 
            </FormData>
            </FormContent>

            <FormContent>
            <FormData>
                <LabelText>
                    Insulina Basal
                </LabelText>
                <Switch value={showBasal} onValueChange={() => setShowBasal(!showBasal)}/>
            </FormData>

            {
                showBasal && 
                <FormData>
                    <LabelText>Unidades </LabelText>
                    <TextBox keyboardType={'numeric'} value={basalinsulina} onChangeText={setBasalinsulinaValue}/> 
                </FormData>
            }

            <Button onPress={() => {
                if(
                    insulina >= 0 && glicose > 0
                ) {
                    setGlicose(null)
                    setInsulina(null)
                    setDate(new Date())
                    handleMeasures([...measures, {glicose, insulina: insulina, data: date, id: (measures.length + 1)}])
                    alert("Medida registrada.")
                } else {
                    alert("Valores nao definidos para glicose ou insulina")
                }
            }} title="Registrar">
            </Button>
            </FormContent>


            <FormContent>
            <FormData>
                <GlicoseCell>
                    <Text>
                        Glicose
                    </Text>
                </GlicoseCell>
                <GlicoseCell>
                <Text>
                    Insulina UI
                </Text>
                </GlicoseCell>
                <GlicoseCell>

                <Text>
                    Data/Hora
                </Text>
                </GlicoseCell>
            </FormData>
            {measures.length > 0 && measures.reverse().map((e, i) => {
                    if(i<3) {
                    const data = typeof e.data === "object" ? `${e.data.getDate().toString()}/${(e.data.getMonth() + 1).toString()}/${e.data.getFullYear().toString()}` : "";
                    const hora = `${e.data.getHours() <= "9" ? "0" + e.data.getHours() : e.data.getHours()}:${e.data.getMinutes() <= "9" ? "0" + e.data.getMinutes() : e.data.getMinutes()}`

                    return (                        
                        <FormData key={i}>
                            <GlicoseCell>
                                <TextSpan color={e.glicose && e.glicose > 160 || e.glicose <= 60 ? "red" : "green"}>
                                    {e.glicose}
                                </TextSpan>
                                <Text>
                                     mg/dl
                                </Text>
                            </GlicoseCell>
                            
                            <GlicoseCell>
                            <TextSpan color={e.insulina && e.insulina > 14 ? "red" : "green"}>
                                {e.insulina} 
                                <TextSpan color="black">
                                    UI
                                </TextSpan>
                            </TextSpan>
                            </GlicoseCell>

                            <GlicoseCell>

                            <Text>
                                {data} {hora}
                            </Text>
                            </GlicoseCell>
                            
                        </FormData>
                    )
                }
                })}
                
            </FormContent>
        </Content>
    )
} 


const Content = styled.View`
  display: flex;
  flex-flow: column;
  background-color: #EEE;
  width: 100%;
  max-width: 100%;
  padding: 16px;
`

const TextSpan = styled.Text`
    color: ${(props) => props.color ? props.color : "black"}
`

const FormContent = styled.View`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-content: flex-start;
    background-color: white;
    width: 100%;
    max-width: 100%;
    margin-top: 12px;
    padding: 6px;
`

const FormData = styled.View`
    padding: 4px;
    margin: 4px;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const GlicoseCell = styled.View`
    padding: 4px;
    margin: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const LabelText = styled.Text`
    font-size: 20px;
    flex: 1;
    display: flex;
    justify-content: space-around;
`


const TextBox = styled.TextInput`
    display: flex;
    border: 1px solid black;
    margin: 4px;
    flex: 2;
    border-radius: 10px;
    padding: 0px 4px;
    ${(props) => props.color ? props.color : "black" }
`

export default RegisterData
