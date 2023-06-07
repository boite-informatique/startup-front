<script lang="ts">
    import { _ } from "svelte-i18n";
    import type { Announcement } from "src/api/types/announcement-types";
    import UploadComponent from "../upload/UploadComponent.svelte";
    import { createEventDispatcher } from "svelte";
    import {
        indicateError,
        indicateSuccess,
    } from "../utils/indicatorDispatchers";
    import { modifyAnnouncement } from "src/api/announcements";
    const dispatch = createEventDispatcher();

    export let announcement: Announcement;
    let title = announcement.title;
    let description = announcement.description;
    let dateStart = new Date(announcement.dateStart)
        .toISOString()
        .split("T")[0];
    let dateEnd = new Date(announcement.dateEnd).toISOString().split("T")[0];
    let fileUpload;

    $: console.log(dateStart);
    const handleFormSubmit = async () => {
        let image: string = null;
        try {
            const files = await fileUpload();
            image = files || null;
            console.log(files);
        } catch (error) {
            indicateError(dispatch, error.message);
            return;
        }

        try {
            let response = await modifyAnnouncement(announcement.id, {
                title: title || undefined,
                description: description || undefined,
                dateStart:
                    new Date(dateStart).toISOString().split("T")[0] ||
                    undefined,
                dateEnd:
                    new Date(dateEnd).toISOString().split("T")[0] || undefined,
                image: image || undefined,
            });

            console.log(response);
            switch (response.status) {
                case 200:
                    indicateSuccess(
                        dispatch,
                        "Announcement modified succesfully"
                    );
                    break;
                case 400:
                    indicateError(dispatch, (response.data as any).message);
                    break;
                default:
                    indicateError(dispatch);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-123" class="modal-toggle" />
<label for="my-modal-123" class="modal z-[9999] cursor-pointer">
    <label class="modal-box relative" for="">
        <!-- modal content -->
        <div class="container flex items-center justify-center">
            <div class="rounded-lg py-8">
                <h2 class="mb-4 text-center text-2xl font-bold">
                    Modify Announcement
                </h2>
                <form
                    class="flex flex-col justify-start space-y-4"
                    action="#"
                    on:submit|preventDefault={handleFormSubmit}
                >
                    <div>
                        <label class="label" for="title"
                            ><span class="label-text">Title</span></label
                        >
                        <input
                            bind:value={title}
                            type="text"
                            name="title"
                            class="input-bordered input w-full max-w-xs"
                        />
                    </div>
                    <div>
                        <label class="label" for="description"
                            ><span class="label-text">Description</span></label
                        >
                        <textarea
                            bind:value={description}
                            class="textarea-bordered textarea w-full max-w-xs"
                            name="description"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text"
                                >Announcement Start Date</span
                            ></label
                        >
                        <input
                            bind:value={dateStart}
                            type="date"
                            class="input-bordered input w-full max-w-xs"
                            name="dateStart"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text"
                                >Announcement End Date</span
                            ></label
                        >
                        <input
                            bind:value={dateEnd}
                            type="date"
                            min={dateStart}
                            class="input-bordered input w-full max-w-xs"
                            name="dateEnd"
                        />
                    </div>

                    <div>
                        <label class="label" for="image"
                            ><span class="label-text">Image</span></label
                        >
                        <UploadComponent
                            type="image"
                            required={false}
                            bind:handleFormSubmit={fileUpload}
                        />
                    </div>
                    <button class="btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </label>
</label>

<!-- modal button -->

<label for="my-modal-123" class="btn-sm btn">Edit</label>
