import Settings from '../config';
import { registerEventListener } from '../utils/EventListener';

const replaceList = {
    "Ability Damage": "技能傷害",
    "Item Ability": "物品技能",
    "Ability": "技能",
    "Bonus Attack Speed": "攻速加成",
    "Crit Chance": "爆擊率",
    "Crit Damage": "爆擊傷害",
    "Damage": "傷害",
    "damage": "傷害",
    "Ferocity": "連擊率",
    "Fishing Speed": "釣魚速度",
    "Farming Fortune": "農業幸運值",
    "Gear Score": "裝備評價",
    "Health Regen": "回血量",
    "Health": "血量",
    "Intelligence": "智力",
    "Magic Find": "魔法尋找",
    "Mending": "治療效率",
    "Sea Creature Chance": "海怪機率",
    "Shot Cooldown": "射擊冷卻",
    "Strength": "力量",
    "Mining Fortune": "挖礦幸運值",
    "Mining Speed": "挖礦速度",
    "Pristine": "品質提升",
    "Speed": "速度",
    "Swing Range": "攻擊範圍",
    "True Defense": "真傷防禦力",
    "Defense": "防禦力",
    "Vitality": "回血效率",
    "Mana Cost": "魔力消耗",
    "Cooldown": "冷卻",
    "cooldown": "冷卻",
    "Soulflow Cost": "靈魂力消耗",
    "SNEAK RIGHT CLICK": "蹲下右鍵",
    "RIGHT CLICK": "右鍵",
    "LEFT CLICK": "左鍵",
    "Soulbound": "靈魂綁定",
    "mana regeneration": "魔力回復",
    "mana regen": "魔力回復",
    "Tiered Bonus": "累積加成",
    "Full Set Bonus": "整套加成",
    "max mana": "最大魔力量",
    "seconds": "秒",
    "enemies": "敵人",
    "mobs": "怪物",
    "dealing": "造成",
    "deal": "造成",
    "Mining Wisdom": "挖礦經驗加成",
    "Fishing Wisdom": "釣魚經驗加成",
    "Combat Wisdom": "戰鬥經驗加成",
    "Farming Wisdom": "農業經驗加成",
    "Foraging Wisdom": "砍樹經驗加成",
    "Shortbow": "短弓"
};

const rare = {
    "COMMON": "普通",
    "UNCOMMON": "罕見",
    "RARE": "稀有",
    "EPIC": "史詩",
    "LEGENDARY": "傳奇",
    "MYTHIC": "神話",
    "DIVINE": "神聖",
    "VERY SPECIAL": "非常特殊",
    "SPECIAL": "特殊"
};

let changedItem = [];

function addItemToChangedList(itemId) {
    if (changedItem.indexOf(itemId) === -1) {
        changedItem.push(itemId);
    }
}

registerEventListener(() => Settings.toolTipsTranslate,
    register("itemTooltip", (lore, item, event) => {
        if (changedItem.indexOf(item.getNBT()?.toObject()?.tag?.ExtraAttributes?.uuid) !== -1) return;
        let newLore = [];
        let index = 0;
        for (let i = 1; i < 50; i++) {
            if (lore[i] === undefined || lore[i] === "§5§o§oDyed") return;

            if (lore[i].replace("§5§o", "").includes("RARITY UPGRADE") ||
                lore[i].replace("§5§o", "").includes("Dyed")) {
                continue;
            }

            newLore[index] = lore[i].replace("§5§o", "");

            for (let key in rare) {
                if (lore[i]?.includes(key)) {
                    addItemToChangedList(item.getNBT()?.toObject()?.tag?.ExtraAttributes?.uuid);
                    item.setLore(newLore);
                    return;
                }
            }

            for (let key in replaceList) {
                if (lore[i]?.includes(key)) {
                    newLore[index] = newLore[index].replace(key, replaceList[key]);
                }
            }

            index++;
        }
    })
);

register("worldUnload", () => {
    changedItem = [];
});