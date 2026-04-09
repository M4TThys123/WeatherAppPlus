<script>
    /** @type {string} */
    export let icon = 'clear-day';
    /** @type {number} */
    export let size = 48;
</script>

<svg width={size} height={size} viewBox="0 0 48 48" fill="none" class="weather-icon">
    {#if icon === 'clear-day'}
        <circle cx="24" cy="24" r="10" fill="#FFD93D" />
        {#each Array(8) as _, i}
            <line
                x1="24" y1="{6}" x2="24" y2="{2}"
                stroke="#FFD93D" stroke-width="2.5" stroke-linecap="round"
                transform="rotate({i * 45} 24 24)"
            />
        {/each}
    {:else if icon === 'clear-night'}
        <path d="M30 10a14 14 0 1 0 8 18 10 10 0 0 1-8-18z" fill="#E8D98E" />
    {:else if icon === 'partly-cloudy-day'}
        <circle cx="20" cy="18" r="7" fill="#FFD93D" />
        {#each Array(8) as _, i}
            <line x1="20" y1="{6}" x2="20" y2="{3}" stroke="#FFD93D" stroke-width="2" stroke-linecap="round" transform="rotate({i * 45} 20 18)" />
        {/each}
        <ellipse cx="26" cy="32" rx="14" ry="8" fill="rgba(255,255,255,0.9)" />
        <ellipse cx="20" cy="30" rx="8" ry="7" fill="rgba(255,255,255,0.95)" />
    {:else if icon === 'partly-cloudy-night'}
        <path d="M16 12a8 8 0 1 0 5 12 6 6 0 0 1-5-12z" fill="#E8D98E" />
        <ellipse cx="28" cy="32" rx="14" ry="8" fill="rgba(255,255,255,0.85)" />
        <ellipse cx="22" cy="30" rx="8" ry="7" fill="rgba(255,255,255,0.9)" />
    {:else if icon === 'overcast'}
        <ellipse cx="24" cy="28" rx="16" ry="9" fill="rgba(255,255,255,0.7)" />
        <ellipse cx="18" cy="26" rx="10" ry="8" fill="rgba(255,255,255,0.8)" />
        <ellipse cx="30" cy="24" rx="8" ry="7" fill="rgba(255,255,255,0.75)" />
    {:else if icon === 'fog'}
        <line x1="8" y1="20" x2="40" y2="20" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round" />
        <line x1="10" y1="26" x2="38" y2="26" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-linecap="round" />
        <line x1="12" y1="32" x2="36" y2="32" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-linecap="round" />
    {:else if icon === 'drizzle'}
        <ellipse cx="24" cy="18" rx="14" ry="8" fill="rgba(255,255,255,0.7)" />
        <ellipse cx="18" cy="16" rx="8" ry="7" fill="rgba(255,255,255,0.8)" />
        <line x1="16" y1="30" x2="15" y2="34" stroke="rgba(150,200,255,0.6)" stroke-width="1.5" stroke-linecap="round" />
        <line x1="24" y1="30" x2="23" y2="34" stroke="rgba(150,200,255,0.6)" stroke-width="1.5" stroke-linecap="round" />
        <line x1="32" y1="30" x2="31" y2="34" stroke="rgba(150,200,255,0.6)" stroke-width="1.5" stroke-linecap="round" />
    {:else if icon === 'rain' || icon === 'rain-showers'}
        <ellipse cx="24" cy="16" rx="14" ry="8" fill="rgba(200,210,220,0.8)" />
        <ellipse cx="18" cy="14" rx="8" ry="7" fill="rgba(200,210,220,0.9)" />
        <line x1="14" y1="28" x2="12" y2="36" stroke="rgba(130,180,255,0.7)" stroke-width="2" stroke-linecap="round" />
        <line x1="22" y1="28" x2="20" y2="36" stroke="rgba(130,180,255,0.7)" stroke-width="2" stroke-linecap="round" />
        <line x1="30" y1="28" x2="28" y2="36" stroke="rgba(130,180,255,0.7)" stroke-width="2" stroke-linecap="round" />
        <line x1="36" y1="28" x2="34" y2="34" stroke="rgba(130,180,255,0.5)" stroke-width="2" stroke-linecap="round" />
    {:else if icon === 'snow'}
        <ellipse cx="24" cy="16" rx="14" ry="8" fill="rgba(220,225,235,0.8)" />
        <ellipse cx="18" cy="14" rx="8" ry="7" fill="rgba(220,225,235,0.9)" />
        <circle cx="14" cy="32" r="2" fill="white" opacity="0.7" />
        <circle cx="22" cy="34" r="2.5" fill="white" opacity="0.8" />
        <circle cx="30" cy="31" r="2" fill="white" opacity="0.6" />
        <circle cx="36" cy="35" r="1.5" fill="white" opacity="0.5" />
    {:else if icon === 'thunderstorm'}
        <ellipse cx="24" cy="14" rx="14" ry="8" fill="rgba(100,110,130,0.9)" />
        <ellipse cx="18" cy="12" rx="8" ry="7" fill="rgba(110,120,140,0.95)" />
        <polygon points="22,22 18,32 23,30 20,40 28,28 23,30 26,22" fill="#FFD93D" />
        <line x1="14" y1="26" x2="12" y2="34" stroke="rgba(130,180,255,0.6)" stroke-width="2" stroke-linecap="round" />
        <line x1="34" y1="26" x2="32" y2="34" stroke="rgba(130,180,255,0.6)" stroke-width="2" stroke-linecap="round" />
    {:else}
        <circle cx="24" cy="24" r="10" fill="#FFD93D" />
    {/if}
</svg>

<style>
    .weather-icon {
        display: block;
        flex-shrink: 0;
    }
</style>
