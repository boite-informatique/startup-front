<script>
    import { _ } from "svelte-i18n";
    import { useNavigate, useLocation } from "svelte-navigator";

    const navigate = useNavigate();
    const location = useLocation();

    let handleClick = (route) => {
        const segments = $location.pathname.split("/");
        const segmentIndex = segments.indexOf(route);
        if (segmentIndex !== -1) {
            const newPath = segments.slice(0, segmentIndex + 1).join("/");
            navigate(newPath);
        }
    };

    export let breadcrumbItems = [];
</script>

<div class="flex items-center justify-start">
    <div
        class="breadcrumbs rounded-full bg-black bg-opacity-5 px-4 text-sm outline outline-1 outline-accent"
    >
        <ul>
            <li>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <div
                    class="flex flex-row items-center no-underline hover:cursor-default hover:no-underline"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="mr-2 h-4 w-4 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        /></svg
                    >
                    <p class="hover:no-underline">Innovium</p>
                </div>
            </li>

            {#each breadcrumbItems as breadcrumbItem}
                <li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a
                        on:click={() => handleClick(breadcrumbItem)}
                        class="capitalize"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="mr-2 h-4 w-4 stroke-current"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            /></svg
                        >
                        {$_(`breadcrumb.${breadcrumbItem}`)}
                    </a>
                </li>
            {:else}
                {#each $location.pathname
                    .split("/")
                    .filter((n) => n !== "") as item, i}
                    <li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                            on:click={() =>
                                handleClick(item.replace(/%20/g, " "))}
                            class="capitalize"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="mr-2 h-4 w-4 stroke-current"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                /></svg
                            >
                            {#if $location.pathname
                                .split("/")
                                .filter((n) => n !== "")[$location.pathname
                                    .split("/")
                                    .filter((n) => n !== "").length - 1] == item}
                                {$_(
                                    `sidebar.${
                                        $location.pathname
                                            .split("/")
                                            .filter((n) => n !== "")[i - 1]
                                    }.${item}`
                                )}
                            {:else}
                                {$_(`navbar.${item}`)}
                            {/if}
                        </a>
                    </li>
                {/each}
            {/each}
        </ul>
    </div>
</div>
