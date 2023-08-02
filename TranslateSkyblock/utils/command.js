import { getID } from './function';

const stopWord = [
    "COMMON",
    "UNCOMMON",
    "RARE",
    "EPIC",
    "LEGENDARY",
    "MYTHIC",
    "DIVINE",
    "VERY SPECIAL",
    "SPECIAL"
];

register("command", () => {
    const Item = Player.getHeldItem();
    const Lore = Item?.getLore();
    let stop = false;

    if (!Lore) {
        ChatLib.chat(`&2[TraslateSkyblock] &fFail to get lore, do you use a empty hand?`);
        return;
    }

    ChatLib.chat(`"${getID(Item)}": {`);
    console.log(`"${getID(Item)}": {`);
    for (i = 1; i < Lore.length; i++) {
        stopWord.forEach(word => {
            if (Lore[i].includes(word)) stop = true;
        });
        if (stop) break;
        Lore[i] = Lore[i].replace("§5§o", "");
        ChatLib.chat(`    "${Lore[i]}": "",`)
        console.log(`    "${Lore[i]}": "",`);
    }
    ChatLib.chat(`}`);
    console.log(`}`);
    let show_message = new Message(
        "&2[TraslateSkyblock] &fClick to opne console to copy. ",
        new TextComponent("&a[Open Console]")
            .setClick("run_command", `/ct console js`)
            .setHover("show_text", "Click to send"),
    );

    ChatLib.chat(show_message);
}).setName("lore");