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
        if (/^\d+$/.test(text)) {
            setInsulina(text)
        }
    }

    const setGlicoseValue = (text) => {
        if (/^\d+$/.test(text)) {
            setGlicose(text)
        }
    }

    const setBasalinsulinaValue = (text) => {
        if (/^\d+$/.test(text)) {
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
            <Text>-> Início</Text>

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
                <TextBox keyboardType="numeric" value={glicose} onChangeText={setGlicoseValue}/> 
            </FormData>
            <FormData>
                <LabelText>
                    UL Insulina
                </LabelText>
                <TextBox keyboardType="numeric" value={insulina} onChangeText={setInsulinaValue}/> 
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
            <Text> - Últimos registros</Text>
            <FormData>
                <GlicoseCell>
                    <Text>
                        Glicose
                    </Text>
                </GlicoseCell>
                
                <Text>
                    Insulina UI
                </Text>
                <Text>
                    Data/Hora
                </Text>
            </FormData>
            {measures.length > 0 && measures.reverse().map((e, i) => {
                    if(i<3) {
                    const data = typeof e.data === "object" ? `${e.data.getDate().toString()}/${(e.data.getMonth() + 1).toString()}/${e.data.getFullYear().toString()}` : "";
                    const hora = `${e.data.getHours() <= "9" ? "0" + e.data.getHours() : e.data.getHours()}:${e.data.getMinutes() <= "9" ? "0" + e.data.getMinutes() : e.data.getMinutes()}`

                    return (
                        <FormData>
                            <GlicoseCell>
                                <Text>
                                    {e.glicose}
                                </Text>
                                <Text>
                                     mg/dl
                                </Text>
                            </GlicoseCell>
                            
                            <Text>
                                {e.insulina} UI
                            </Text>
                            <Text>
                                {data} {hora}
                            </Text>
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
  flex-flow: column wrap;
  background-color: #EEE;
  width: 100%;
  padding: 16px;
`

const FormContent = styled.View`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-content: flex-start;
    background-color: white;
    width: 100%;
    margin-top: 12px;
    padding: 6px;
`

const FormData = styled.View`
    padding: 4px;
    margin: 4px;
    width: 100%;
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
`

export default RegisterData
