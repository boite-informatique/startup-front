<script lang="ts">
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import { createEventDispatcher } from "svelte";
    import { createAnnouncement } from "src/api/announcements";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import SelectSearchAnnouncements from "src/lib/components/SelectSearchAnnouncements.svelte";

    const today = new Date().toISOString().split("T")[0];

    let title = "";
    let description = "";
    let dateStart = today;
    let dateEnd;

    let establishment_id: number;
    const dispatch = createEventDispatcher();

    let fileUpload;
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
            let response = await createAnnouncement({
                title,
                description,
                dateStart: new Date(dateStart).toISOString().split("T")[0],
                dateEnd: new Date(dateEnd).toISOString().split("T")[0],
                image,
                establishement: [establishment_id],
            });

            console.log(response);
            switch (response.status) {
                case 201:
                    indicateSuccess(
                        dispatch,
                        "Announcement created succesfully"
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

<div class="container flex items-center justify-center">
    <div class="rounded-lg py-8">
        <h2 class="mb-4 text-center text-2xl font-bold">Create Announcement</h2>
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
                    ><span class="label-text">Announcement Start Date</span
                    ></label
                >
                <input
                    bind:value={dateStart}
                    type="date"
                    min={today}
                    class="input-bordered input w-full max-w-xs"
                    name="dateStart"
                />
            </div>
            <div>
                <label class="label" for="deadline"
                    ><span class="label-text">Announcement End Date</span
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

            <SelectSearchAnnouncements
                bind:selectedEstablishment={establishment_id}
            />
            <div>
                <label class="label" for="image"
                    ><span class="label-text">Image</span></label
                >
                <UploadComponent
                    type="image"
                    required={true}
                    bind:handleFormSubmit={fileUpload}
                />
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </div>
</div>
