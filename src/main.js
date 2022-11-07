import { updateLogseqState } from './util';
import { settingUI } from './settings';
import {stateContains} from "./util";

export let model;
const main = () => {
    console.log('hello main');
    settingUI();

    model = {};
    logseq.provideModel(model)

console.log('hello, providing toolbar')
    logseq.App.registerUIItem('toolbar',
        {
            key: 'logseq-atlas-theme-toolbar',
            template: `
                <span class="logseq-focus-toolbar">
                        <a
                           data-on-click="toggleFocus"
                           class="button"
                           data-rect
                        >
                            <i class="ti ti-maximize"></i>
                        </a>
                </span>`
        })
}

export default main;