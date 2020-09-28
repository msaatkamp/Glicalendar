import React, { useState } from "react";
import { Text, Switch } from "react-native";
import styled from "styled-components/native";
import DatePicker from "react-native-date-picker"

const RegisterData = () =>{

    const [insuline, setInsuline] = useState(0)
    const [glicose, setGlicose] = useState(0)
    const [date, setDate] = useState()

    const [basalInsuline, setBasalInsuline] = useState(0)
    const [showBasal, setShowBasal] = useState(false)

    const setInsulineValue = (text) => {
        if (/^\d+$/.test(text)) {
            setInsuline(text)
        }
    }

    const setGlicoseValue = (text) => {
        if (/^\d+$/.test(text)) {
            setGlicose(text)
        }
    }

    const setBasalInsulineValue = (text) => {
        if (/^\d+$/.test(text)) {
            setBasalInsuline(text)
        }
    }

    return (
        <Content>
            <Text>Home</Text>

            <FormContent>
            <FormData>
                <LabelText>
                    Data e Hora da medição
                </LabelText>
                <DatePicker date={date} onDateChange={setDate}/>
            </FormData>

            <FormData>
                <LabelText>
                    Glicose
                </LabelText>
                <TextBox keyboardType={'numeric'} value={glicose} onChangeText={setGlicoseValue}/> 
            </FormData>
            <FormData>
                <LabelText>
                    UL Insulina
                </LabelText>
                <TextBox keyboardType="numercic" numeric value={insuline} onChangeText={setInsulineValue}/> 
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
                    <TextBox keyboardType={'numeric'} value={basalInsuline} onChangeText={setBasalInsulineValue}/> 
                </FormData>
            }
            </FormContent>

            
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
`

const TextBox = styled.TextInput`
    display: flex;
    border: 1px solid black;
    margin: 4px;
    flex: 2;
    border-radius: 10px;
`

export default RegisterData
