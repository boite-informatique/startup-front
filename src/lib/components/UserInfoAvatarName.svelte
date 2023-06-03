<script lang="ts">
    import type { User } from "src/api/types/user-types";
    import Avatar from "./Avatar.svelte";

    export let user: User;
</script>

<div class="flex items-center gap-4">
    <div>
        <div class="mask mask-squircle avatar h-12 w-12">
            <Avatar src={user.avatar} altText={user.first_name} />
        </div>
    </div>
    <div>
        <div class="font-bold">
            {user.first_name}
            {user.last_name}
        </div>
        <div class="text-sm font-medium opacity-90">
            {user.email}
        </div>
    </div>
</div>
