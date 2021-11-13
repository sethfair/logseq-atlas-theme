/** @jsx h */
import '@logseq/libs'
import {h, render} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import './ui.css';

import ColorInput from './ColorInput';

function App() {
    const [settings, setSettings] = useState(Object.assign({}, logseq.settings))
    const [errors, setErrors] = useState({})
    const [num, increment] = useState(0);
    const fields = [];

    useEffect(() => {
        logseq.on('settings:changed', (a) => {
            setSettings(a)
        })
    }, [])

    useEffect(() => {
        console.log('errors/settings', errors, settings);
    }, [errors, settings])

    const setError = ({message, name}) => {
        const newState = Object.assign(errors, {
            [name]: message
        });
        console.log(newState);
        setErrors(newState);
    }

    const clearError = (name) => {
        let newState = Object.assign({}, obj)
        delete newState[name]
        setErrors(newState);
    }

    const handleColorChange = (e) => {
        const newStyle = `.white-theme, html[data-theme=light] {
         --atlas-theme-sidebar: ${e.target.value};
    }`;
        logseq.updateSettings({'atlas-theme-color': e.target.value});
        console.log(logseq.settings);
        logseq.provideStyle(newStyle);
    }

    const addField = (field) => {
        if (field) {
            fields.push(field);
        }
    }

    const handleSave = () => {

        fields.forEach(field => {
            if (!settings[field]) {
                setError({
                    name: field,
                    message: 'Field is required.'
                })
            } else {
                clearError(field);
            }
        })


        //logseq.hideMainUI()
    };


    console.log('update');
    return (
        <div>
            <div className="popup-header">Atlas Theme Options</div>
            <div className="popup-body">
                <fieldset>
                    <legend>Presets</legend>
                    <select onChange={handleColorChange}>
                        <options>Default</options>
                        <option value={"red"}>Red</option>
                        <option value={"#182026"}>Steel Blue</option>
                        <option value={"grey"}>Grey</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Sidebar</legend>
                    <ColorInput
                        addField={addField}
                        label="Background"
                        name="sidebar-background-color"
                        error={errors['sidebar-background-color']}/>
                    <ColorInput addField={addField} label="Text" name="sidebar-text-color"
                                error={errors['sidebar-text-color']}/>
                </fieldset>
                <p className="ctl">
                    <button onClick={handleSave}>Save</button>
                </p>
                <span>Count: {{num}}</span>
            </div>
        </div>
    )
}

function main() {
    const doc = document
    render(<App/>, doc.querySelector('#app'))

    logseq.provideModel({
            openThemeSettings(e) {
                const {rect} = e
                logseq.setMainUIInlineStyle({
                    top: `${rect.top + 20}px`,
                    left: `${rect.right - 10}px`,
                })

                logseq.toggleMainUI()
            },
        },
    )

    const id = logseq.baseInfo.id


    if (logseq.settings && logseq.settings['atlas-theme-color']) {
        logseq.provideStyle(`
            .white-theme, html[data-theme=light] {
                  --atlas-theme-sidebar: ${logseq.settings['atlas-theme-color']};
             }\`;
        `)
    }
    logseq.provideStyle(`
    @import url("https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css");
    
    
    .atlas-theme-toolbar i {
      font-size: 1.3rem!important
    }
  `)

    logseq.setMainUIInlineStyle({
        position: 'fixed',
        width: '290px',
        zIndex: 999,
        transform: 'translateX(-50%)',
    })

    const icon = () => <button data-on-click="openFontsPanel">Click Me</button>

    logseq.App.registerUIItem('toolbar',
        {
            key: 'atlas-theme-toolbar',
            template: `

        
        <span class="atlas-theme-toolbar">
                <a
                   data-on-click="openThemeSettings"
                   class="button"
                   data-rect
                >
                    <i class="bx bxs-color-fill"></i>
                </a>
        </span>
     
    `,
        })

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
            logseq.hideMainUI()
        }
    }, false)
}

// bootstrap
logseq.ready(main).catch(console.error)




