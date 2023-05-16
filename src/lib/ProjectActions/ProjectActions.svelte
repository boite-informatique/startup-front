<script lang="ts">
    import { actions } from "./actionsList";

    let component;
    const setModalComponent = (newComponent) => {
        component = newComponent;
    };
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
        {#if component}
            <svelte:component this={component} />
        {/if}
    </label>
</label>

<div class="dropdown">
    <label tabindex="1" class="btn m-1">Actions</label>
    <ul
        tabindex="0"
        class="dropdown-content menu rounded-box w-56  bg-base-100 p-2 shadow"
    >
        {#each actions.owner as action}
            <li>
                <label
                    for="my-modal-4"
                    on:click={() => setModalComponent(action.component)}
                    >{action.name}
                </label>
            </li>
        {/each}
    </ul>
</div>
