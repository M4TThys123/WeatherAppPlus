<script>
    // Define your forecast data
    let forecastData = [
        {day: 'Today', temp: '6℃'},
        {day: 'Day 2', temp: '8℃'},
        {day: 'Day 3', temp: '10℃'},
        {day: 'Day 4', temp: '7℃'},
        {day: 'Day 5', temp: '4℃'}
    ];

    // Calculate next 5 days
    let today = new Date();
    for (let i = 0; i < 5; i++) {
        let nextDay = new Date();
        nextDay.setDate(today.getDate() + i);
        let dayOfWeek = nextDay.toLocaleDateString('en-US', {weekday: 'long'});
        forecastData[i].day = dayOfWeek;
    }
</script>

<section class="forecast-section mb-5">
    <div class="forecast-heading">
        <i class='bx bxs-calendar'></i>
        Next 5 days
    </div>

    {#each forecastData as forecast}
        <div class="forecast-row">
            <span class="forecast-day">{forecast.day}</span>
            <div class="forecast-icon__wrapper">
                <svg data-v-5ed3171e="" viewBox="0 0 148 148" class="owm-weather-icon">
                    <path d="M112.411 57.87c0 11.433-9.27 20.702-20.7 20.702-11.435 0-20.702-9.27-20.702-20.702 0-11.433 9.267-20.701 20.702-20.701 11.43 0 20.7 9.268 20.7 20.701"
                          fill="#f15d46"></path>
                    <path d="M48.874 61.244c.612 0 1.21.055 1.805.137a14.679 14.679 0 01-.332-3.087c0-8.152 6.607-14.759 14.759-14.759 7.93 0 14.38 6.26 14.725 14.104a8.81 8.81 0 015.936-2.298 8.854 8.854 0 018.854 8.856 8.772 8.772 0 01-.59 3.157 10.425 10.425 0 012.065-.207c5.707 0 10.331 4.625 10.331 10.33 0 5.706-4.624 10.331-10.33 10.331H48.873c-7.335 0-13.285-5.948-13.285-13.282s5.95-13.282 13.285-13.282"
                          fill="#efefed"></path>
                    <path d="M83.052 95.131l.423-1.13a2.172 2.172 0 10-4.069-1.523l-.422 1.132a2.172 2.172 0 104.068 1.521M77.548 109.845l1.483-3.962a1.517 1.517 0 00-.89-1.953l-1.226-.46a1.517 1.517 0 00-1.951.89l-1.483 3.965a1.515 1.515 0 00.889 1.951l1.226.459a1.514 1.514 0 001.952-.89M68.555 100.83l1.781-4.766a1.516 1.516 0 00-.89-1.953l-1.226-.458a1.515 1.515 0 00-1.952.89l-1.781 4.765a1.516 1.516 0 00.889 1.952l1.227.46a1.517 1.517 0 001.952-.89M65.864 108.023l.272-.73a2.173 2.173 0 00-4.068-1.523l-.274.732a2.172 2.172 0 004.07 1.521M60.885 89.073l.724-1.935a2.17 2.17 0 10-4.068-1.52l-.723 1.934a2.173 2.173 0 104.068 1.52M55.884 102.45l1.781-4.763a1.517 1.517 0 00-.889-1.955l-1.227-.458a1.519 1.519 0 00-1.953.89l-1.78 4.765a1.516 1.516 0 00.89 1.952l1.224.46a1.519 1.519 0 001.954-.89"
                          fill="#3b3c40"></path>
                </svg>
            </div>
            <span class="forecast-temp">{forecast.temp}</span>
        </div>
    {/each}
</section>


<style>
    .forecast-section {
        width: 100%;
        background: var(--dark-blue);
        border-radius: 25px;
        padding: 1em 1.5em;

    }

    .forecast-heading {
        position: relative;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 16px;
        color: var(--grey);
        margin-bottom: 6px;
    }



    .forecast-row {
        margin-top: 20px;
        font-size: 24px;
        font-weight: bold;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .forecast-row::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: var(--line-color);
        top: -12px;
        left: 0;
    }

    .forecast-icon__wrapper {
        width: 25px;
        height: 25px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forecast-icon__wrapper svg {
        position: absolute;
        width: 250%;
        height: 250%;
    }

    .forecast-temp {
        font-weight: normal;
    }

    /* SM (for tablets - screens ≥ than 768px wide) */
    @media (width >= 768px) {
        .forecast-section {
            max-width: 350px;
            width: 50% !important;

        }
    }

    /* MD (for small laptops - screens ≥ than 992px wide) */
    @media (width >= 992px) {
        .forecast-section{
        }
    }
</style>