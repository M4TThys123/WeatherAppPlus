<script>
    import { t } from '$lib/stores/i18n.js';

    /** @type {any} */
    export let weatherData;

    const width = 600;
    const height = 120;
    const padX = 30;
    const padY = 20;

    /** @type {string} */
    let path = '';
    /** @type {string} */
    let areaPath = '';
    /** @type {{ x: number, y: number, temp: number, hour: string }[]} */
    let points = [];

    $: if (weatherData?.hourly) {
        const hours = weatherData.hourly.slice(0, 24);
        const temps = hours.map((/** @type {any} */ h) => h.temp);
        const minT = Math.min(...temps) - 1;
        const maxT = Math.max(...temps) + 1;
        const rangeT = maxT - minT || 1;

        const chartW = width - padX * 2;
        const chartH = height - padY * 2;

        points = hours.map((/** @type {any} */ h, /** @type {number} */ i) => ({
            x: padX + (i / (hours.length - 1)) * chartW,
            y: padY + chartH - ((h.temp - minT) / rangeT) * chartH,
            temp: Math.round(h.temp),
            hour: new Date(h.currentTime).toLocaleTimeString('en-us', { hour: 'numeric' })
        }));

        // Smooth cubic bezier path
        if (points.length > 1) {
            let d = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const cpx = (prev.x + curr.x) / 2;
                d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
            }
            path = d;
            areaPath = `${d} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
        }
    }
</script>

{#if points.length > 0}
    <section class="chart-section">
        <h2 class="section-label">24h Temperature</h2>
        <div class="chart-wrapper">
            <svg viewBox="0 0 {width} {height}" preserveAspectRatio="none" class="chart-svg">
                <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="rgba(255,255,255,0.15)" />
                        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                    </linearGradient>
                </defs>

                <path d={areaPath} fill="url(#tempGrad)" />
                <path d={path} fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" />

                {#each points.filter((_, i) => i % 4 === 0) as p}
                    <circle cx={p.x} cy={p.y} r="2.5" fill="white" opacity="0.8" />
                    <text x={p.x} y={p.y - 8} text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.6)">{p.temp}&deg;</text>
                {/each}
            </svg>
        </div>
    </section>
{/if}

<style>
    .chart-section {
        width: 100%;
        padding: 1em 0;
        display: none;
    }

    @media (min-width: 768px) {
        .chart-section {
            display: block;
        }
    }

    .section-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 500;
        opacity: 0.6;
        margin-bottom: 0.5em;
    }

    .chart-wrapper {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 1em;
        overflow: hidden;
    }

    .chart-svg {
        width: 100%;
        height: 120px;
    }
</style>
