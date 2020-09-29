import React, { useState, useContext } from "react";
import { Text, Switch, Button } from "react-native";
import styled from "styled-components/native";
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { FontAwesome5 } from "@expo/vector-icons";
import { Register } from "../../context";

const RegisterData = () =>{

    const {measures, handleMeasures} = useContext(Register)
    const [insulina, setInsulina] = useState(0)
    const [glicose, setGlicose] = useState(0)
    const [date, setDate] = useState(new Date(Date.now()))
    const [hour, setHour] = useState(new Date(Date.now()))

    const [displayDate, setDisplayDate] = useState(false)
    const [displayHour, setDisplayHour] = useState(false)
    

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

    const handleHourChange = (event, date) => {
        if(date!==undefined){
            setDisplayHour(false)
            setHour(date)
        }
    }
    
    const Data = typeof date === "object" ? `${date.getDay().toString()}/${date.getMonth().toString()}/${date.getFullYear().toString()}` : "HAHA";
    const Hora = typeof hour === "object" ? `${date.getHours().toString()}:${date.getMinutes().toString()}` : "HAHA";

    return (
        <Content>
            <Text>-> Home</Text>

            <FormContent>
            <FormData>
                {/* <FontAwesome5 name="calendar" size={24} color="black" onPress={() => setDisplayDate(true)}/> */}
                <LabelText onPress={() => setDisplayDate(true)}>
                    Data medição - {Data}
                </LabelText>
                {displayDate === true && <RNDateTimePicker mode="date" onChange={handleDateChange} value={date || new Date()}/>}
            </FormData>
            {<FormData>
                {/* <FontAwesome5 name="clock" size={24} color="black" onPress={() => setDisplayHour(true)}/> */}
                <LabelText onPress={() => setDisplayHour(true)}>
                    Hora medição - {Hora}
                </LabelText>
                {displayHour === true && <RNDateTimePicker mode="time" onChange={handleHourChange} value={hour || new Date()}/>}
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
            </FormContent>

            <Button onPress={() => {
                setMeasures(...measures, {glicose, insulina: insulina, data: new Date()})
            }} title="Registrar">
            </Button>
        </Content>
    )
} 

const Content = styled.View`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-content: flex-start;
    width: 100%;
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
