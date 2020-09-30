import React, { useContext } from "react";
import { Text } from "react-native";
import { Register } from "../../context";
import styled from "styled-components/native";

const Calendar = () => {
    const {measures, handleMeasures} = useContext(Register)

    return(
        <Content>
            <Text>Calendar</Text>

            <FormContent>
                {measures.length > 0 ? measures.map(e => {
                    const data = typeof e.data === "object" ? `${e.data.getDate().toString()}/${(e.data.getMonth() + 1).toString()}/${e.data.getFullYear().toString()}` : "HAHA";
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
                }) : <Text>
                        No records registered.
                    </Text>}
            </FormContent>
        </Content>
    )
}
const Content = styled.View`
  display: flex;
  flex-flow: column wrap;
  background-color: #EEE;
  flex-grow: 8;
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

export default Calendar
