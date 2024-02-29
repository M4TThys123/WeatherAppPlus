<script>
    let checked = true;
    let unit = "Celsius";

    export let toggleTemperatureUnit

    function handleChange(event) {
        checked = event.target.checked;
        unit = checked ? "Fahrenheit" : "Celsius";
    }
</script>

<div class="switch-container" on:click={toggleTemperatureUnit}>
    <span>Temperature unit</span>

    <div class="temperature-wrapper">
        <span>°F</span>

        <input id="switch-shadow" class="switch switch--shadow" type="checkbox" bind:checked>
        <label for="switch-shadow" on:change={handleChange}></label>

        <span>°C</span>
    </div>
</div>
<style>
    .switch-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 8px 10px;
        border-radius: 10px;
        background: var(--search-secondary-background);
    }

    .temperature-wrapper{
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .switch {
        visibility: hidden;
        position: absolute;
        margin-left: -9999px;
    }

    .switch + label {
        display: block;
        position: relative;
        cursor: pointer;
        outline: none;
        user-select: none;
    }

    .switch--shadow + label {
        padding: 1px;
        width: 60px;
        height: 30px;
        background-color: #dddddd;
        border-radius: 30px;
    }

    .switch--shadow + label:before,
    .switch--shadow + label:after {
        display: block;
        position: absolute;
        top: 1px;
        left: 1px;
        bottom: 1px;
        content: "";
    }

    .switch--shadow + label:before {
        right: 1px;
        background-color: #f1f1f1;
        border-radius: 30px;
        transition: background 0.4s;
    }

    .switch--shadow + label:after {
        width: 30px;
        background-color: #fff;
        border-radius: 100%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        transition: all 0.4s;
    }

    .switch--shadow:checked + label:before {
        background-color: var(--blue);
        /*background-color: var(--dark-blue);*/

    }

    .switch--shadow:checked + label:after {
        transform: translateX(30px);
    }
</style>
