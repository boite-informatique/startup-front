<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { actions } from "./actionsList";
    import { getUserType, type UserType } from "./usertype";
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import { userPermissions } from "src/stores/userPermissions";

    export let project: PopulatedProject;
    console.log(project);
    export let userType: UserType = getUserType(
        project,
        $currentUserInfo,
        $userPermissions
    );

    let component;
    const setModalComponent = (newComponent) => {
        component = newComponent;
    };
</script>

{#if userType != "member"}
    <div
        class="absolute right-0 flex w-full -translate-y-16 flex-row items-center justify-end px-3 lg:-translate-y-6"
    >
        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal-4" class="modal-toggle" />
        <label for="my-modal-4" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
                {#if component}
                    <svelte:component this={component} on:showIndicator />
                {/if}
            </label>
        </label>

        <div class="dropdown-end dropdown">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <!-- svelte-ignore a11y-positive-tabindex -->
            <label tabindex="1" class="btn-primary btn m-1">Actions</label>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul
                tabindex="0"
                class="dropdown-content menu rounded-box w-56 bg-base-100 p-2"
            >
                {#each actions[userType] as action}
                    {#if !action.disabled(project)}
                        <li>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <label
                                for="my-modal-4"
                                on:click={() =>
                                    setModalComponent(action.component)}
                                >{action.name}
                            </label>
                        </li>
                    {:else}
                        <li>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label
                                class="cursor-default text-neutral-400"
                                on:click={() =>
                                    setModalComponent(action.component)}
                                >{action.name}
                            </label>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
{/if}
