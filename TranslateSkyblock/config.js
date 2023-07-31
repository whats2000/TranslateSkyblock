import { @Vigilant, @ButtonProperty, @TextProperty, @SwitchProperty, @DecimalSliderProperty @SliderProperty, @SelectorProperty, @ColorProperty, Color } from "Vigilance";

@Vigilant("TranslateSkyblock", "Help translate on github", {
})
class Settings {


    @SwitchProperty({
        name: "Translate Hover Item",
        description: "When hover in inventory, the tooltips will be translate",
        category: "Translate",
        subcategory: "Translate Hover Item",
    })
    toolTipsTranslate = false;

    @SelectorProperty({
        name: "Language Setting",
        description: "Select the language you want load",
        category: "Language Setting",
        subcategory: "Language Setting",
        options: ["Default", "繁體中文"],
    })
    selectLanguage = 0;

    constructor() {
        this.initialize(this);
    }

    sync() {
        ChatLib.command("GriffinOWO sync", true);
    }
}

export default new Settings();