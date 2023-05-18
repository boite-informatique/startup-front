<script lang="ts">
    import type { PopulatedProject } from "src/api/project/types/project-types";
    import { actions } from "./actionsList";

    export let project: PopulatedProject;
    console.log(project);
    export let userType: "owner" | "supervisor" | "sc" | "member" = "member";

    let component;
    const setModalComponent = (newComponent) => {
        component = newComponent;
    };
</script>

{#if userType != "member"}
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
            {#if component}
                <svelte:component this={component} on:showIndicator />
            {/if}
        </label>
    </label>

    <div class="dropdown">
        <label tabindex="1" class="btn m-1">Actions</label>
        <ul
            tabindex="0"
            class="dropdown-content menu rounded-box w-56  bg-base-100 p-2 shadow"
        >
            {#each actions[userType] as action}
                {#if !action.disabled(project)}
                    <li>
                        <label
                            for="my-modal-4"
                            on:click={() => setModalComponent(action.component)}
                            >{action.name}
                        </label>
                    </li>
                {:else}
                    <li>
                        <label
                            class="cursor-default text-neutral-900"
                            on:click={() => setModalComponent(action.component)}
                            >{action.name}
                        </label>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
{/if}
