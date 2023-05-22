<script lang="ts">
    import { useNavigate } from "svelte-navigator";
    const navigate = useNavigate();
    export let path = "";
    navigate(path);
</script>
