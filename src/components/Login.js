import { useState } from "react";

function Login(){
    const [Id, setId] = useState('')
    const [Pw, setPw] = useState('')

    const handleId = (e) => {
        setId(e.target.value)
    }

    const handlePw = (e) => {
        setPw(e.target.value)
    }
}