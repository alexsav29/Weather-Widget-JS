import { LANG } from './constants.js'
import { getOptions } from './utils.js'

class WeatherWidget {
    constructor() {
        this.widget = this.createHtmlWidget();
        const root = document.querySelector('#app');
        root.appendChild(this.widget);

        this.addEventGetWeather();
    };

    render({ error, current, location }) {
        const widgetBody = document.querySelector('.widget__body');

        if (error) {
            widgetBody.innerHTML = `<h2 style="background: red">${error.message}</h2>`;
            return undefined;
        };

        const { condition, wind_kph, wind_dir, gust_kph, temp_c } = current;
        const { country, name } = location;


        widgetBody.innerHTML = `
                                <div>
                                    <div class="widget__body__header">
                                        <div class="widget__place">
                                            <div class="widget__country">${country},&nbsp;</div>
                                            <div class="widget__name">${name}</div>
                                        </div>
                                        <div class="widget__body__info">
                                            <div class="widget__temp">${temp_c} &deg;C</div>
                                            <div class="widget__condition">
                                                <div class="text__condition">${condition.text}</div>
                                                <img class="image__condition" src="${condition.icon}" />
                                            </div>
                                        </div>
                                    </div>    

                                    <div class="widget__wind">Speed: ${wind_kph} km/h</div>
                                    <div class="widget__wind__dir">Direction: ${wind_dir}</div>
                                    <div class="widget__gust__kph">Gust: ${gust_kph} km/h</div>
                                </div>
                               `;
    };

    async getWeatherData(city, lang) {
        const url = `http://api.weatherapi.com/v1/current.json?key=27134c4d1c7d4800818192329210901&q=${city}&lang=${lang}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.log(error);
        };
    };

    addEventGetWeather() {
        const btn = document.querySelector('.widget__btn');
        const input = document.querySelector('.input__city');
        const select = document.querySelector('.widget__lang');

        btn.addEventListener('click', (event) => {
            this.getWeatherData(input.value, select.value);
        });
    };

    createHtmlWidget() {
        const widgetElement = document.createElement('div');
        widgetElement.classList.add('weather__widget');

        widgetElement.innerHTML = `
                                    <div class="weather__widget__content">
                                        <div class="widget__title">Weather Widget</div>
                                        <div class="widget__header">
                                            <input type="text" class="input__city" />
                                            <div class="widget__header__properties">
                                                <select class="widget__lang">
                                                    ${getOptions(LANG)}
                                                </select>
                                                <button class="widget__btn button">Получить погоду</button>
                                            </div>
                                        </div>
                                        <div class="widget__body"></div>
                                    </div>
                                  `;
        return widgetElement;
    };
};


new WeatherWidget();