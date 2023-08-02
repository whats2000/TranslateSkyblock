import Settings from '../config';
import { getUUID } from '../utils/function';
import { getTooltipsTranslate } from '../utils/LoadLanguage';
import { registerEventListener } from '../utils/EventListener';

let changedItem = "";

registerEventListener(() => Settings.toolTipsTranslate,
    register("itemTooltip", (lore, item, event) => {
        if (!getTooltipsTranslate()) return;
        const UUID = getUUID(item);

        // ChatLib.chat(`${itemIndex} ${changedItem}`)
        if (UUID === changedItem) return;

        const tooltip = getTooltipsTranslate();
        let newLore = [];
        let index = 0;
        for (let i = 1; i < 100; i++) {
            if (lore[i] === undefined || lore[i] === "§5§o§oDyed") return;

            if (lore[i].replace("§5§o", "").includes("RARITY UPGRADE") ||
                lore[i].replace("§5§o", "").includes("Dyed")) {
                continue;
            }

            newLore[index] = lore[i].replace("§5§o", "");

            for (let key in tooltip.rare) {
                if (lore[i]?.includes(key)) {
                    changedItem = UUID;
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
    changedItem = "";
});