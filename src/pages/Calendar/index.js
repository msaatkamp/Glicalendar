import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Register } from "../../context";

const Calendar = () => {
    const {measures, handleMeasures} = useContext(Register)

    return(
        <View>
            <Text>Calendar</Text>

            {measures.map(e => {
                return <Text>
                    Data - {e.data}
                    Medição - {e.glicose} 
                    Insulina - {e.insulina} 
                </Text>
            })}
        </View>
    )
}

export default Calendar
