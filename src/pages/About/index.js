import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const About = () =>{
    return (
        <Content>
            <FormContent>
                

            <LabelText>Objetivo</LabelText>
            <FormData>
            <Text>
                Entregar uma ferramenta de controle para diabéticos, com o apoio da tecnologia os registros, tomadas de decisão e o suporte médcio devem ser facilitados.
            </Text>
            </FormData>

            <LabelText>
                    Glicose
            </LabelText>
            <FormData>
                <Text>
                    Glicose é a quantidade de açúcar medida no por gota de sangue, utilizamos a unidade mg/dl. Um paciente diabético saudável deve manter as variações entre 80 mg/dl e 220 mg/dl diariamente.
                    Alerta-se que valores diários acima de 250 mg/dl podem por o paciente em risco de complicações diabéticas diversas, como o desenvolvimento de cetoacidose diabética, com sintomas de enjôo,
                    náusea, vômitos e desidratação, em caso de suspeitas o médico deve ser consultado.
                </Text>
            </FormData>


            <LabelText>
                    Insulina
            </LabelText>
            <FormData>
                <Text>
                    A insulina é um hormônio produzido pelo corpo para metabolizar o açúcar, no caso de pacientes diabéticos este hormônio pode estar ausente.
                    A aplicação de insulina diariamente permite que o paciente diabético se mantenha saudável e nutrido, mantendo também o nível de ph do sangue normal, conforme o tratamento.
                </Text>
            </FormData>
            </FormContent>
        </Content>
    )
} 


const Content = styled.ScrollView`
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

const LabelText = styled.Text`
    font-size: 20px;
    flex: 1;
    display: flex;
    justify-content: space-around;
    padding: 4px;
    margin: 4px;
    width: 100%;
`


export default About
