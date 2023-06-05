<script lang="ts">
    // importing modules
    import { _ } from "svelte-i18n";
    import { Route, useNavigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";
    import { useLocation } from "svelte-navigator";

    import { currentUserInfo } from "src/stores/currentUserInfo";
    import Profile from "./Profile.svelte";
    import { getUserById } from "src/api/user";
    import Redirect from "src/lib/components/Redirect.svelte";
</script>

<Route path="/">
    <div class="flex w-full flex-col gap-4 p-4 md:gap-5 md:px-12 md:pt-7">
        <Profile user={$currentUserInfo} ownProfile={true} on:showIndicator />
    </div>
</Route>
<Route path="/:id/*" let:params>
    {#await getUserById(+params.id) then res}
        {#if res.status === 200}
            <Profile user={res.data} ownProfile={false} on:showIndicator />
        {:else}
            <Redirect path="/" />
        {/if}
    {/await}
</Route>
