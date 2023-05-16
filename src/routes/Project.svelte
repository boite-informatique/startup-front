<script>
    import { getProjectByID } from "src/api/project";
    import { _ } from "svelte-i18n";

    export let projectID;
    let project = getProjectByID(projectID);
</script>

{#await project}
    <button class="btn loading">{$_("admin.users.loading")}</button>
{:then res}
    {#if res.status >= 200 && res.status < 300}
        <!-- main content goes here -->
        <div class="flex flex-col">
            {console.log(res.data)}
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.product")} :
                </div>
                <div>
                    {res.data.product_name}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.brand")} :
                </div>
                <div>
                    {res.data.brand_name}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.type")} :
                </div>
                <div>
                    {res.data.type}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.resume")} :
                </div>
                <div>
                    {res.data.resume}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.owner")} :
                </div>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                                src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                alt="Avatar of a user"
                            />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">
                            {res.data.owner.first_name}
                            {res.data.owner.last_name}
                        </div>
                        <div class="text-sm font-medium opacity-90">
                            {res.data.owner.email}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.members")} :
                </div>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                                src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                alt="Avatar of a user"
                            />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">
                            {res.data.owner.first_name}
                            {res.data.owner.last_name}
                        </div>
                        <div class="text-sm font-medium opacity-90">
                            {res.data.owner.email}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.supervisors")} :
                </div>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                                src="https://avatars.githubusercontent.com/u/100171494?v=4"
                                alt="Avatar of a user"
                            />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">
                            {res.data.owner.first_name}
                            {res.data.owner.last_name}
                        </div>
                        <div class="text-sm font-medium opacity-90">
                            {res.data.owner.email}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.created at")} :
                </div>
                <div>
                    {new Date(res.data.created_at).toLocaleString("en-UK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "UTC",
                    })}
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.validation")} :
                </div>
                <div>haja</div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.project progess")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.invited users")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.invited users")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.project history")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.project history")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.defense authorization")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.defense documents")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="w-44">
                    {$_("projects.defense planification")} :
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div tabindex="0" class="collapse">
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content">
                        <p>
                            tabindex="0" attribute is necessary to make the div
                            focusable
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <p class="text-gray-200 text-center text-lg capitalize font-semibold">
            {$_("projects.project unavailable")}
        </p>
    {/if}
{:catch error}
    <p
        class="text-red-800 dark:text-red-200 text-center text-lg capitalize font-semibold"
    >
        {error.message}
    </p>
{/await}
