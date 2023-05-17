<script lang="ts">
    import {
        indicateError,
        indicateSuccess,
    } from "src/lib/utils/indicatorDispatchers";
    import UploadComponent from "src/lib/upload/UploadComponent.svelte";
    import { createEventDispatcher } from "svelte";
    import { currentUserInfo } from "src/stores/currentUserInfo";
    import { modifyProfile } from "src/api/user";

    let phone = "";
    let password = "";

    let fileUpload;
    const dispatch = createEventDispatcher();

    const handleFormSubmit = async () => {
        if (password.length > 0 && password.length < 6) {
            indicateError(
                dispatch,
                "Password must be at least 6 characters long"
            );
            return;
        }

        let avatar: string = null;
        try {
            const files = await fileUpload();
            avatar = files || null;
            console.log(files);
        } catch (error) {
            indicateError(dispatch, error.message);
            return;
        }

        console.log(phone, phone || undefined);
        try {
            let response = await modifyProfile($currentUserInfo.id, {
                password: password || undefined,
                phone: phone || undefined,
                avatar: avatar || undefined,
            });

            console.log(response);
            switch (response.status) {
                case 200:
                    indicateSuccess(dispatch, "Profile modified successfully");
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
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
        <!-- modal content starts here -->
        <div class="flex items-center justify-center">
            <div class="rounded-lg py-8">
                <h2 class="mb-4 text-center text-2xl font-bold">
                    Edit Profile
                </h2>
                <form class="flex flex-col justify-start space-y-4">
                    <div>
                        <label class="label" for="title"
                            ><span class="label-text">Phone Number</span></label
                        >
                        <input
                            bind:value={phone}
                            type="text"
                            name="title"
                            class="input-bordered input w-full max-w-xs"
                        />
                    </div>
                    <div>
                        <label class="label" for="deadline"
                            ><span class="label-text">Password</span></label
                        >
                        <input
                            bind:value={password}
                            type="password"
                            class="input-bordered input w-full max-w-xs"
                            name="password"
                        />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label" for="file">
                            <span class="label-text">Change Avatar</span>
                        </label>
                        <UploadComponent
                            bind:handleFormSubmit={fileUpload}
                            type="image"
                            required={false}
                        />
                    </div>
                    <button
                        class="btn"
                        on:click|preventDefault={handleFormSubmit}
                        >Submit</button
                    >
                </form>
            </div>
        </div>
    </label>
</label>

<label for="my-modal-4" class="btn-primary btn">Edit Profile</label>
