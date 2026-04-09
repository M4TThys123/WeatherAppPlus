<script>
    import { t } from '$lib/stores/i18n.js';
    import { language } from '$lib/stores/i18n.js';

    /** @type {any} */
    export let weatherData;

    $: sunrise = weatherData?.sunrise ? new Date(weatherData.sunrise) : null;
    $: sunset = weatherData?.sunset ? new Date(weatherData.sunset) : null;
    $: now = new Date(weatherData?.currentTime || Date.now());

    $: sunriseTime = sunrise
        ? sunrise.toLocaleTimeString($language === 'nl' ? 'nl-NL' : 'en-US', { hour: '2-digit', minute: '2-digit' })
        : '--:--';
    $: sunsetTime = sunset
        ? sunset.toLocaleTimeString($language === 'nl' ? 'nl-NL' : 'en-US', { hour: '2-digit', minute: '2-digit' })
        : '--:--';

    // Sun position on arc (0 = sunrise, 1 = sunset)
    $: progress = (sunrise && sunset)
        ? Math.max(0, Math.min(1, (now.getTime() - sunrise.getTime()) / (sunset.getTime() - sunrise.getTime())))
        : 0;
    $: isDayTime = progress > 0 && progress < 1;

    // Arc math: semicircle from left to right
    const cx = 120;
    const cy = 80;
    const r = 70;

    $: angle = Math.PI - progress * Math.PI;
    $: sunX = cx + r * Math.cos(angle);
    $: sunY = cy - r * Math.sin(angle);
</script>

{#if sunrise && sunset}
    <div class="sun-card">
        <div class="sun-times">
            <div class="sun-time">
                <span class="sun-label">{$t('weather.sunrise')}</span>
                <span class="sun-value">{sunriseTime}</span>
            </div>
            <div class="sun-time right">
                <span class="sun-label">{$t('weather.sunset')}</span>
                <span class="sun-value">{sunsetTime}</span>
            </div>
        </div>

        <svg viewBox="0 0 240 100" class="sun-arc">
            <!-- Horizon line -->
            <line x1="30" y1={cy} x2="210" y2={cy} stroke="rgba(255,255,255,0.15)" stroke-width="1" />

            <!-- Arc path -->
            <path
                d="M {cx - r} {cy} A {r} {r} 0 0 1 {cx + r} {cy}"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                stroke-width="1.5"
                stroke-dasharray="4 3"
            />

            <!-- Traveled arc (filled portion) -->
            {#if isDayTime}
                <path
                    d="M {cx - r} {cy} A {r} {r} 0 0 1 {sunX} {sunY}"
                    fill="none"
                    stroke="rgba(255,200,50,0.5)"
                    stroke-width="2"
                />

                <!-- Sun dot -->
                <circle cx={sunX} cy={sunY} r="6" fill="#FFD93D" />
                <circle cx={sunX} cy={sunY} r="10" fill="rgba(255,217,61,0.2)" />
            {/if}

            <!-- Sunrise/sunset dots -->
            <circle cx={cx - r} cy={cy} r="3" fill="rgba(255,255,255,0.3)" />
            <circle cx={cx + r} cy={cy} r="3" fill="rgba(255,255,255,0.3)" />
        </svg>
    </div>
{/if}

<style>
    .sun-card {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 1em;
        grid-column: span 2;
    }

    @media (min-width: 768px) {
        .sun-card {
            grid-column: span 3;
        }
    }

    .sun-times {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25em;
    }

    .sun-time {
        display: flex;
        flex-direction: column;
    }

    .sun-time.right {
        text-align: right;
    }

    .sun-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 500;
        opacity: 0.6;
    }

    .sun-value {
        font-size: 22px;
        font-weight: 300;
    }

    .sun-arc {
        width: 100%;
        height: auto;
        max-height: 100px;
    }
</style>
