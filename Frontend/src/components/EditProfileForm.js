import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input `
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: white;
`;

const Button = styled.button `
  background: #a4f59f;
  color: black;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const EditProfileForm = ({ onClose }) => {
    const [name, setName] = useState("Ivetta");
    const [email, setEmail] = useState("ivetta34@gmail.com");
    const [password, setPassword] = useState("ivetta1999.23");

    return ( <
        Form >
        <
        Input value = { name }
        onChange = {
            (e) => setName(e.target.value) }
        /> <
        Input value = { email }
        disabled / >
        <
        Input type = "password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        /> <
        Button onClick = { onClose } > Save < /Button> <
        /Form>
    );
};

export default EditProfileForm;