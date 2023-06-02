<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { updateProject } from "src/api/project/project";
    import type { PopulatedProject } from "src/api/project/types/project-types";

    export let project: PopulatedProject;

    const dispatch = createEventDispatcher();

    let product: string = project.product_name;
    let brand: string = project.brand_name;
    let type: "startup" | "patent" = project.type;
    let resume: string = project.resume;

    let fileUpload; // upload function binded from UploadComponent

    let handleAddingProject = async (e) => {
        let logo: string = null;
        try {
            const files = await fileUpload();
            logo = files || null;
        } catch (error) {
            e.preventDefault();
            indicateError(dispatch, error.message);
            return;
        }
        let response = await updateProject(project.id, {
            resume,
            brand_name: brand,
            product_name: product,
            type,
            logo,
        });

        switch (response.status) {
            case 200:
                indicateSuccess(dispatch, $_("project.updated successfully"));
                break;

            case 400:
                indicateError(dispatch, $_("project.invalid data"));
                break;
            default:
                indicateError(dispatch);
                break;
        }
    };
</script>

<div class="flex items-center justify-center">
    <div class="rounded-lg py-8">
        <h2 class="mb-4 text-center text-2xl font-bold">
            {$_("projects.modify project")}
        </h2>
        <form class="flex flex-col justify-start space-y-4">
            <div>
                <label class="label" for="title"
                    ><span class="label-text">{$_("projects.product")}</span
                    ></label
                >
                <input
                    bind:value={product}
                    type="text"
                    placeholder="Title"
                    name="title"
                    class="input-bordered input w-full max-w-xs"
                />
            </div>
            <div>
                <label class="label" for="description"
                    ><span class="label-text">{$_("projects.brand")}</span
                    ></label
                >
                <input
                    bind:value={brand}
                    class="input-bordered input w-full max-w-xs"
                    placeholder="Description"
                    name="description"
                />
            </div>
            <div>
                <label class="label" for="description"
                    ><span class="label-text">{$_("projects.resume")}</span
                    ></label
                >
                <textarea
                    bind:value={resume}
                    class="textarea-bordered textarea w-full max-w-xs"
                    placeholder="Description"
                    name="description"
                />
            </div>

            <div>
                <label class="label" for="description"
                    ><span class="label-text">{$_("projects.type")}</span
                    ></label
                >
                <div class="w-full max-w-xs">
                    <button
                        class="btn {type == 'startup' ? 'btn-primary' : ''}"
                        on:click|preventDefault={() => {
                            type = "startup";
                        }}>{$_("projects.startup")}</button
                    >
                    <button
                        class="btn {type == 'patent' ? 'btn-primary' : ''}"
                        on:click|preventDefault={() => {
                            type = "patent";
                        }}>{$_("projects.patent")}</button
                    >
                </div>
            </div>

            <div class="form-control w-full max-w-xs">
                <label class="label" for="file">
                    <span class="label-text">{$_("projects.logo")}</span>
                </label>
                <UploadComponent
                    bind:handleFormSubmit={fileUpload}
                    type="image"
                    required={false}
                />
            </div>
            <button class="btn" on:click|preventDefault={handleAddingProject}
                >Submit</button
            >
        </form>
    </div>
</div>
