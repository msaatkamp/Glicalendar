import React, { useContext } from "react";
import { Text } from "react-native";
import { Register } from "../../context";
import styled from "styled-components/native";

const Calendar = () => {
    const {measures, handleMeasures} = useContext(Register)

    return(
        <Content>
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
                {measures.length > 0 ? measures.map((e, i) => {
                    const data = typeof e.data === "object" ? `${e.data.getDate().toString()}/${(e.data.getMonth() + 1).toString()}/${e.data.getFullYear().toString()}` : "HAHA";
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
                }) : <GlicoseCell>
                    <Text>
                        Não há registros disponíveis.
                    </Text>
                    </GlicoseCell>}
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

const TextSpan = styled.Text`
    color: ${(props) => props.color ? props.color : "black"}
`

export default Calendar
