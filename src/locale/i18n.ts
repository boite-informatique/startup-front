import { addMessages, init } from "svelte-i18n";
import en from "./en.json";
import fr from "./fr.json";
import ar from "./ar.json";

addMessages("en", en);
addMessages("fr", fr);
addMessages("ar", ar);

init({ initialLocale: "en", fallbackLocale: "en" });
