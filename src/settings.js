import '@logseq/libs'

export const settingUI = () => {
    const settings =  [
        {
            key: "title_color",
            type: "color",
            description: "Color of document titles.",
            title: "Title Color"
        },
        {
            key: "custom_show_on_unfocus",
            type: "string",
            description:
                "CSS selector of elements you wish to show when exiting focus mode.",
            title: "Custom Show On Unfocus"
        }
    ];
    console.log('hello add settings', settings);
    logseq.useSettingsSchema(settings);
};