import {useEffect, useState} from "preact/hooks";
import {TwitterPicker} from "react-color";
import {h, render} from 'preact'
import React from "preact/compat";

const ColorInput = (props) => {
    const {label, name, error, addField} = props;
    const [showColor, setShowColor] = useState(false);

    useEffect(() => {
        addField(name);
    }, []);

    useEffect(() => {
        console.log('===> update use effect');
        console.log('===> ColorInput props', props);
        console.log('===> ColorInput error', error);
    })

    return (
        <div className="text-input-wrapper">
            <label>{label}</label>
            <input type="text" onClick={() => setShowColor(!showColor)}/>
            <button onClick={() => setShowColor(true)}>Show</button>

            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default ColorInput;