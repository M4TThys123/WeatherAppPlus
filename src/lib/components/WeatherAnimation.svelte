<script>
    /** @type {string} */
    export let type = 'none';
</script>

{#if type === 'rain' || type === 'thunderstorm'}
    <div class="animation-layer">
        {#each Array(80) as _, i}
            <div
                class="raindrop"
                style="left: {Math.random() * 100}%; animation-duration: {0.4 + Math.random() * 0.4}s; animation-delay: {Math.random() * 2}s; opacity: {0.2 + Math.random() * 0.4};"
            ></div>
        {/each}
        {#if type === 'thunderstorm'}
            <div class="lightning"></div>
        {/if}
    </div>
{/if}

{#if type === 'snow'}
    <div class="animation-layer">
        {#each Array(60) as _, i}
            <div
                class="snowflake"
                style="left: {Math.random() * 100}%; animation-duration: {3 + Math.random() * 3}s; animation-delay: {Math.random() * 4}s; width: {2 + Math.random() * 4}px; height: {2 + Math.random() * 4}px; opacity: {0.3 + Math.random() * 0.4};"
            ></div>
        {/each}
    </div>
{/if}

{#if type === 'sunny'}
    <div class="animation-layer">
        <div class="sun-glow"></div>
    </div>
{/if}

{#if type === 'clouds'}
    <div class="animation-layer">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
    </div>
{/if}

{#if type === 'stars'}
    <div class="animation-layer">
        {#each Array(50) as _, i}
            <div
                class="star"
                style="left: {Math.random() * 100}%; top: {Math.random() * 60}%; animation-delay: {Math.random() * 4}s; width: {1 + Math.random() * 2}px; height: {1 + Math.random() * 2}px;"
            ></div>
        {/each}
    </div>
{/if}

<style>
    .animation-layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    }

    /* Rain */
    .raindrop {
        position: absolute;
        top: -20px;
        width: 1.5px;
        height: 15px;
        background: rgba(255, 255, 255, 0.4);
        transform: rotate(15deg);
        animation: fall linear infinite;
    }

    @keyframes fall {
        to { transform: translateY(100vh) rotate(15deg); }
    }

    /* Lightning */
    .lightning {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        opacity: 0;
        animation: flash 8s infinite;
    }

    @keyframes flash {
        0%, 100% { opacity: 0; }
        1% { opacity: 0.15; }
        2% { opacity: 0; }
        3% { opacity: 0.1; }
        4% { opacity: 0; }
    }

    /* Snow */
    .snowflake {
        position: absolute;
        top: -10px;
        border-radius: 50%;
        background: white;
        animation: snowfall linear infinite;
    }

    @keyframes snowfall {
        to {
            transform: translateY(100vh) translateX(20px);
        }
    }

    /* Sun glow */
    .sun-glow {
        position: absolute;
        top: -80px;
        right: -80px;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,220,100,0.12) 0%, transparent 70%);
        animation: pulse-glow 4s ease-in-out infinite;
    }

    @keyframes pulse-glow {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }

    /* Clouds */
    .cloud {
        position: absolute;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 50%;
        filter: blur(30px);
        animation: drift linear infinite;
    }

    .cloud-1 { top: 10%; width: 300px; height: 100px; animation-duration: 35s; }
    .cloud-2 { top: 25%; width: 250px; height: 80px; animation-duration: 28s; animation-delay: 5s; }
    .cloud-3 { top: 40%; width: 200px; height: 70px; animation-duration: 40s; animation-delay: 12s; }

    @keyframes drift {
        from { transform: translateX(100vw); }
        to { transform: translateX(-400px); }
    }

    /* Stars */
    .star {
        position: absolute;
        border-radius: 50%;
        background: white;
        animation: twinkle 3s ease-in-out infinite;
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.8; }
    }
</style>
