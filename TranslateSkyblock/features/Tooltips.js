import Settings from '../config';
import { getTooltipsTranslate } from '../utils/LoadLanguage';
import { registerEventListener } from '../utils/EventListener';

let changedItem = [];

function addItemToChangedList(itemId) {
    if (changedItem.indexOf(itemId) === -1) {
        changedItem.push(itemId);
    }
}

registerEventListener(() => Settings.toolTipsTranslate,
    register("itemTooltip", (lore, item, event) => {
        if (!getTooltipsTranslate()) return;
        if (changedItem.indexOf(item.getNBT()?.toObject()?.tag?.ExtraAttributes?.uuid) !== -1) return;

        const tooltip = getTooltipsTranslate();
        let newLore = [];
        let index = 0;
        for (let i = 1; i < 50; i++) {
            if (lore[i] === undefined || lore[i] === "§5§o§oDyed") return;

            if (lore[i].replace("§5§o", "").includes("RARITY UPGRADE") ||
                lore[i].replace("§5§o", "").includes("Dyed")) {
                continue;
            }

            newLore[index] = lore[i].replace("§5§o", "");

            for (let key in tooltip.rare) {
                if (lore[i]?.includes(key)) {
                    addItemToChangedList(item.getNBT()?.toObject()?.tag?.ExtraAttributes?.uuid);
                    item.setLore(newLore);
                    return;
                }
            }

            for (let key in tooltip.replaceList) {
                if (lore[i]?.includes(key)) {
                    newLore[index] = newLore[index].replace(key, tooltip.replaceList[key]);
                }
            }

            index++;
        }
    })
);

register("worldUnload", () => {
    changedItem = [];
});