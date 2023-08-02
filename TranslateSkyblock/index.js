import Settings from "./config";
import { initializeEventListeners, updateEventListeners } from "./utils/EventListener";
import { updateSelectLanguage } from "./utils/LoadLanguage";

import "./utils/command";

import "./features/Tooltips";

let settingOpen = false;

register("command", () => {
    settingOpen = true;
    Settings.openGUI();
}).setName("translate_skyblock").setAliases("ts");

register("guiKey", (char, key, gui, event) => {
    if (key == 1 && settingOpen) {
        updateEventListeners();
        updateSelectLanguage();
        settingOpen = false;
    }
});

initializeEventListeners();

updateSelectLanguage()
