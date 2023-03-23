import { addMessages, init } from "svelte-i18n";
import en from "./en.json";
import fr from "./fr.json";

addMessages("en", en);
addMessages("fr", fr);

init({ initialLocale: "en", fallbackLocale: "en" });
