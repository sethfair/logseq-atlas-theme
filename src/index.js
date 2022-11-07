import '@logseq/libs'
import main from "./main";

logseq.ready(() => {
    console.log('Hello world, logseq atlas theme');
    main();
}).catch(console.error)