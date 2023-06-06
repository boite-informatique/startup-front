<script>
        // importing Modules
        import { _ } from "svelte-i18n";
    import authenticateUser from "../api/authentication";
    import fetchUserPermissions from "../api/userPermissions";
    import fetchPeriods from "src/api/periods";
    import { Link, navigate } from "svelte-navigator";
    import { createEventDispatcher } from "svelte";

    // importing components
    import DarkModeToggler from "src/lib/components/layout/navbar/DarkModeToggler.svelte";
    import LanguageMenu from "src/lib/components/layout/navbar/LanguageMenu.svelte";
    import logo from "../assets/innovium_logos/innovium_light.png";
    import MesrsLogo from "src/lib/components/MesrsLogo.svelte";
    import { getCurrentUserInfoAndStore } from "src/api/user";
    import { indicateError } from "src/lib/utils/indicatorDispatchers";
    ////////////////////////////////:
    
    
  </script>
      <MesrsLogo />
     
    
  <main>
     
   
    
    <div>
        <div class="absolute top-5 right-5 flex gap-4">
            <DarkModeToggler />
            <LanguageMenu />
        
        </div>
        <img
            class="mx-auto mb-10 h-16 md:h-24"
            src={logo}
            alt="Innovium logo with text"
        />
        <div
            class="-mx-1 mt-6 text-center text-3xl font-bold tracking-tight"
        >
            {$_("landing.title")}
        </div>
    </div>
   
    <div class="description">{$_("landing.description")}</div>
   
    <!-- svelte-ignore missing-declaration -->
    <div class="btns">
    <button  class="group relative flex w-full justify-center rounded-md bg-light px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
    on:click={() => navigate("/login")}>
        {$_("landing.login")}</button>
    <button
    class="group relative flex w-full justify-center rounded-md bg-light px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
    on:click={() => navigate("/register")}>
        {$_("landing.register")}
    </button>
</div>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: Arial, sans-serif;
    }
  
    .description{
      font-size: 1.2rem;
      margin-bottom: 2rem;
      width: 50%;
      color: #666;
    }
   
     .btns{
        display: flex;
     }
    button{
        width: 120px;
        margin-left: 25px;
        padding: 10px;
    }
  
    
  
    
  
  </style>
  