<script>
    import { _, locale } from "svelte-i18n";

    const changleLanguage = (lang) => {
        locale.set(lang);
    };
</script>

<div class="dropdown-bottom dropdown-end dropdown">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div
        tabindex="0"
        class="flex h-11 cursor-pointer select-none flex-row items-center gap-3 rounded-md bg-black bg-opacity-20 py-2 px-2 font-semibold text-gray-800 transition-all duration-300 hover:bg-opacity-25 dark:bg-white dark:bg-opacity-20 dark:text-slate-300 dark:hover:bg-opacity-25 md:px-3"
    >
        <div class="hidden lg:block">Language</div>
        <svg
            class="inline-block h-6 w-[22px] fill-current md:h-7 md:w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            ><path
                d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"
            /><path
                d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"
            /></svg
        >
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content menu mt-2 w-52 rounded-md bg-base-100 p-2 font-medium capitalize shadow"
    >
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            on:click={() => {
                changleLanguage("en");
            }}
        >
            <a class="flex flex-row gap-4">
                <svg
                    class="h-7 rounded-[4px] border"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icons-gb"
                    viewBox="0 0 640 480"
                >
                    <path fill="#012169" d="M0 0h640v480H0z" />
                    <path
                        fill="#FFF"
                        d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
                    />
                    <path
                        fill="#C8102E"
                        d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
                    />
                    <path
                        fill="#FFF"
                        d="M241 0v480h160V0H241zM0 160v160h640V160H0z"
                    />
                    <path
                        fill="#C8102E"
                        d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"
                    />
                </svg>
                <div>English</div>
            </a>
        </li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            on:click={() => {
                changleLanguage("fr");
            }}
        >
            <a class="flex flex-row gap-4">
                <svg
                    class="h-7 rounded-[4px] border"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icons-fr"
                    viewBox="0 0 640 480"
                >
                    <path fill="#fff" d="M0 0h640v480H0z" />
                    <path fill="#002654" d="M0 0h213.3v480H0z" />
                    <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
                </svg>
                <div>Français</div>
            </a>
        </li>
    </ul>
</div>
