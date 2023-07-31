import Settings from '../config'

let langFile = {};

export function updateSelectLanguage() {
    let langFileName = undefined;
    switch (Settings.selectLanguage) {
        case 1:
            langFileName = "zh_tw";
            break;
        default:
            undefined
    }

    if (!langFileName) {
        langFile = undefined;
        return;
    }

    langFile = JSON.parse(FileLib.read(`./config/ChatTriggers/modules/TranslateSkyblock/resource/lang/${langFileName}.json`));
}

export function getTooltipsTranslate() {
    return langFile?.tooltips;
}