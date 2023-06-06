<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { actions } from "./actionsList";
    import { getUserType, type UserType } from "./usertype";
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import { userPermissions } from "src/stores/userPermissions";
    import { _ } from "svelte-i18n";

    export let project: PopulatedProject;
    let userType: UserType = getUserType(
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
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="modal z-[9999] cursor-pointer">
        <label class="modal-box relative" for="">
            {#if component}
                <svelte:component this={component} on:showIndicator {project} />
            {/if}
        </label>
    </label>

    <div class="dropdown-end dropdown absolute right-6">
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
                <li>
                    {#if !action.disabled(project)}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <label
                            for="my-modal-4"
                            class="tooltip active:bg-base-content"
                            on:click={() => setModalComponent(action.component)}
                            >{action.name}
                        </label>
                    {:else}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label
                            class="tooltip tooltip-left tooltip-warning cursor-default text-neutral-400 active:bg-base-content"
                            data-tip={action.disabled(project)}
                            on:click={() => setModalComponent(action.component)}
                            >{action.name}
                        </label>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
{/if}
