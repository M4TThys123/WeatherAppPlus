# **WeatherAppPlus**

## **Description**

WeatherAppPlus is a modern web application that provides users with current weather information and a 5-day forecast for multiple locations. With a clean and intuitive user interface, users can effortlessly add and manage their favorite locations, toggle between Celsius and Fahrenheit for temperature display, and enjoy dynamic backgrounds that change based on weather conditions. Powered by the reliable OpenWeatherMap API, WeatherAppPlus seamlessly integrates weather data while maintaining code quality, modularity, and extensive test coverage. Experience the convenience and elegance of WeatherAppPlus on both desktop and mobile devices.

## **Installation**

To run WeatherAppPlus locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/WeatherAppPlus.git
    ```

2. Navigate to the project directory:

    ```bash
    cd WeatherAppPlus
    ```

3. Install dependencies:

    ```bash
    npm install
    ```


## **Usage**

To start the development server and view WeatherAppPlus in your browser, run:

```bash
npm run dev
```

Open your web browser and navigate to **`http://localhost:5174/`** to see the application.

## **Features**

- [ ]  Display current weather details for default location on app load.
- [ ]  Allow users to search and add multiple locations for weather information.
- [ ]  Provide a 5-day weather forecast for selected location(s).
- [ ]  Visually appealing and responsive design for desktop and mobile devices.
- [ ]  Geolocation to automatically detect user's location and display its weather.
- [ ]  Unit conversion allowing users to switch between Celsius and Fahrenheit.
- [ ]  Dynamic backgrounds changing based on weather conditions.

## **API Integration**

WeatherAppPlus utilizes the OpenWeatherMap API to fetch weather data. Handle API responses and errors gracefully, and implement a loading indicator while waiting for API data.

## **Project Structure**

The project is organized as follows:

```csharp
csharpCopy code
WeatherAppPlus/
│
├── public/            # Public assets
├── src/               # Source files
│   ├── components/    # Reusable UI components
│   ├── styles/        # CSS styles
│   ├── utils/         # Utility functions
│   └── App.svelte     # Main component
│
├── tests/             # Unit tests
├── .gitignore         # Git ignore file
├── LICENSE            # License file
└── README.md          # Project README

```

## **Testing**

WeatherAppPlus includes unit tests for critical parts of the application, such as data fetching and rendering components.

## **License**

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.

## **Contact**

For any inquiries or feedback, please contact Matthijs Blauw.

matthijs.blauw@gmail.com