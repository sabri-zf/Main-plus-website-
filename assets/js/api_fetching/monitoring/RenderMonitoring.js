import { mockLoadEffect } from "../analytic/FetichKPI";
import { HasData } from "../Assets/assetRender";
import { fetchAPI } from "../FetchApi";
import { readSvgDeletIcon } from "../work_order/work_order_api_read";
import { renderRealTimeMonitoring } from "./realtimeTrack";

const MainURL = 'http://192.168.43.111:5189/api/v1/monitoring/';


async function RenderMonitoringCards() {

  mockLoadEffect('.monitoring-machine-card');
  const succeed = await fetchAPI(MainURL + 'card-view');

  if (!HasData(succeed)) return;

  Fill_In_MonitoringCard(succeed);
}

function Fill_In_MonitoringCard(data) {

  const GridList = document.querySelector(".monitoring-machine-grid");
  GridList.innerHTML = '';


  data.forEach(e => {

    const IsActive = e.active ? 'active' : 'disactive';
    const InstalltedData = new Date(e.installedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    let Card = `
         <article class="monitoring-machine-card ">
      <header class="monitoring-machine-card__header">
        <div class="monitoring-machine-card__title-wrap">
          <h2 class="monitoring-machine-card__name">${e.assetName}</h2>
          <span class="monitoring-machine-badge monitoring-machine-badge--${IsActive}">${IsActive}</span>
        </div>
        <button class="monitoring-machine-card__menu" type="button" aria-label="More options">⋮</button>
      </header>
      <p class="monitoring-machine-card__id">${e.tagNumber}</p>

      <div class="monitoring-machine-card__body">
        <img class="monitoring-machine-card__image" src="./assets/images/PMP-101.jpg" alt="motor electric" />
        <ul class="monitoring-machine-card__meta">
          <li><img src="./assets/icons/location.svg" alt="" /><span>Location: ${e.locationName}</span></li>
          <li><img src="./assets/icons/calender.svg" alt="" /><span>Installed: ${InstalltedData}</span></li>
          <li><img src="./assets/icons/time.svg" alt="" /><span>Uptime: ${e.uptime}%</span></li>
        </ul>
      </div>
      <div class="monitoring-machine-card__sensors">
        <h3 class="monitoring-machine-card__sensors-title">Sensors (${e.sensorsData.length})</h3>
        <ul class="monitoring-sensor-list machine">
        `;

    let ListItems = ``;

    e.sensorsData.forEach(e => {
      const SensorData = ` 
          <li class="monitoring-sensor-item monitoring-sensor-item--${e.active ? 'active' : 'disactive'}">
            <span class="monitoring-sensor-item--${e.active ? 'active' : 'out'} monitoring-sensor-item__dot "></span>
            <span class="monitoring-sensor-item__name">${e.sensorName} Sensor</span>
            <span class="monitoring-sensor-item--${e.active ? 'active' : 'disactive'} monitoring-sensor-item__status">${e.active ? 'active' : 'disactive'}</span>
          </li>`;
      ListItems += SensorData;
    });

    ListItems += ` </ul>
        </div>
         <footer class="monitoring-machine-card__actions">
        <button class="monitoring-action-btn monitoring-action-btn--monitor" type="button">
           Monitor Now
        </button>
        <button class="monitoring-action-btn monitoring-action-btn--delete" type="button">
          ${readSvgDeletIcon('#ba0e0e', '15')} Delete
        </button>
      </footer>
    </article>`;

    Card += ListItems;

    GridList.insertAdjacentHTML('beforeend', Card);
  });

  renderRealTimeMonitoring();
}

export function RenderRealMonitoring() {

  const mainContiner = document.querySelector('.main-container');

  mainContiner.innerHTML = '';

  const HtmlContant = `<main class="monitoring-page">
  <header class="monitoring-header">
    <div class="monitoring-header__text">
      <h1 class="monitoring-header__title">Real Monitoring</h1>
      <p class="monitoring-header__subtitle">Monitor your connected machines and sensors in real-time.</p>
    </div>

    <div class="monitoring-header__actions">
      <button class="monitoring-btn monitoring-btn--outline" type="button" id="monitoring-filters-btn">
        <span>Filters</span>
      </button>
      <button class="monitoring-btn monitoring-btn--primary" type="button" id="monitoring-add-machine-btn">
        <span>+ Add Machine</span>
      </button>
    </div>
  </header>

  <section class="monitoring-machine-grid" aria-label="Machine monitoring cards">

    <article class="monitoring-machine-card">
      <header class="monitoring-machine-card__header">
        <div class="monitoring-machine-card__title-wrap">
          <h2 class="monitoring-machine-card__name">Air Compressor #2</h2>
          <span class="monitoring-machine-badge monitoring-machine-badge--active">Active</span>
        </div>
        <button class="monitoring-machine-card__menu" type="button" aria-label="More options">⋮</button>
      </header>
      <p class="monitoring-machine-card__id">CMP-002</p>

      <div class="monitoring-machine-card__body">
        <img class="monitoring-machine-card__image" src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=200&fit=crop" alt="Air Compressor #2" />
        <ul class="monitoring-machine-card__meta">
          <li><img src="./assets/icons/location.png" alt="" /><span>Production - Zone 1</span></li>
          <li><img src="./assets/icons/calendar.svg" alt="" /><span>Installed: May 12, 2024</span></li>
          <li><img src="./assets/icons/clock.png" alt="" /><span>Uptime: 98%</span></li>
        </ul>
      </div>

      <div class="monitoring-machine-card__sensors">
        <h3 class="monitoring-machine-card__sensors-title">Sensors (3)</h3>
        <ul class="monitoring-sensor-list">
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Vibration Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Temperature Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Pressure Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
        </ul>
      </div>

      <footer class="monitoring-machine-card__actions">
        <button class="monitoring-action-btn monitoring-action-btn--monitor" type="button">
          <img src="./assets/icons/analysis.png" alt="" /><span>Monitor Now</span>
        </button>
        <button class="monitoring-action-btn monitoring-action-btn--delete" type="button">
          <img src="./assets/icons/trash.svg" alt="" /><span>Delete</span>
        </button>
      </footer>
    </article>


     <article class="monitoring-machine-card">
      <header class="monitoring-machine-card__header">
        <div class="monitoring-machine-card__title-wrap">
          <h2 class="monitoring-machine-card__name">Air Compressor #2</h2>
          <span class="monitoring-machine-badge monitoring-machine-badge--active">Active</span>
        </div>
        <button class="monitoring-machine-card__menu" type="button" aria-label="More options">⋮</button>
      </header>
      <p class="monitoring-machine-card__id">CMP-002</p>

      <div class="monitoring-machine-card__body">
        <img class="monitoring-machine-card__image" src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=200&fit=crop" alt="Air Compressor #2" />
        <ul class="monitoring-machine-card__meta">
          <li><img src="./assets/icons/location.png" alt="" /><span>Production - Zone 1</span></li>
          <li><img src="./assets/icons/calendar.svg" alt="" /><span>Installed: May 12, 2024</span></li>
          <li><img src="./assets/icons/clock.png" alt="" /><span>Uptime: 98%</span></li>
        </ul>
      </div>

      <div class="monitoring-machine-card__sensors">
        <h3 class="monitoring-machine-card__sensors-title">Sensors (3)</h3>
        <ul class="monitoring-sensor-list">
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Vibration Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Temperature Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Pressure Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
        </ul>
      </div>

      <footer class="monitoring-machine-card__actions">
        <button class="monitoring-action-btn monitoring-action-btn--monitor" type="button">
          <img src="./assets/icons/analysis.png" alt="" /><span>Monitor Now</span>
        </button>
        <button class="monitoring-action-btn monitoring-action-btn--delete" type="button">
          <img src="./assets/icons/trash.svg" alt="" /><span>Delete</span>
        </button>
      </footer>
    </article>


    <article class="monitoring-machine-card">
      <header class="monitoring-machine-card__header">
        <div class="monitoring-machine-card__title-wrap">
          <h2 class="monitoring-machine-card__name">Centrifugal Pump #1</h2>
          <span class="monitoring-machine-badge monitoring-machine-badge--active">Active</span>
        </div>
        <button class="monitoring-machine-card__menu" type="button" aria-label="More options">⋮</button>
      </header>
      <p class="monitoring-machine-card__id">PMP-001</p>

      <div class="monitoring-machine-card__body">
        <img class="monitoring-machine-card__image" src="https://images.unsplash.com/photo-1581092160562-40aa08f7881a?w=200&h=200&fit=crop" alt="Centrifugal Pump #1" />
        <ul class="monitoring-machine-card__meta">
          <li><img src="./assets/icons/location.png" alt="" /><span>Production - Zone 1</span></li>
          <li><img src="./assets/icons/calendar.svg" alt="" /><span>Installed: May 12, 2024</span></li>
          <li><img src="./assets/icons/clock.png" alt="" /><span>Uptime: 98%</span></li>
        </ul>
      </div>

      <div class="monitoring-machine-card__sensors">
        <h3 class="monitoring-machine-card__sensors-title">Sensors (3)</h3>
        <ul class="monitoring-sensor-list">
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Vibration Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Temperature Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Pressure Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
        </ul>
      </div>

      <footer class="monitoring-machine-card__actions">
        <button class="monitoring-action-btn monitoring-action-btn--monitor" type="button">
          <img src="./assets/icons/analysis.png" alt="" /><span>Monitor Now</span>
        </button>
        <button class="monitoring-action-btn monitoring-action-btn--delete" type="button">
          <img src="./assets/icons/trash.svg" alt="" /><span>Delete</span>
        </button>
      </footer>
    </article>

    <article class="monitoring-machine-card">
      <header class="monitoring-machine-card__header">
        <div class="monitoring-machine-card__title-wrap">
          <h2 class="monitoring-machine-card__name">Cooling Tower #1</h2>
          <span class="monitoring-machine-badge monitoring-machine-badge--active">Active</span>
        </div>
        <button class="monitoring-machine-card__menu" type="button" aria-label="More options">⋮</button>
      </header>
      <p class="monitoring-machine-card__id">CTW-001</p>

      <div class="monitoring-machine-card__body">
        <img class="monitoring-machine-card__image" src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=200&h=200&fit=crop" alt="Cooling Tower #1" />
        <ul class="monitoring-machine-card__meta">
          <li><img src="./assets/icons/location.png" alt="" /><span>Production - Zone 1</span></li>
          <li><img src="./assets/icons/calendar.svg" alt="" /><span>Installed: May 12, 2024</span></li>
          <li><img src="./assets/icons/clock.png" alt="" /><span>Uptime: 98%</span></li>
        </ul>
      </div>

      <div class="monitoring-machine-card__sensors">
        <h3 class="monitoring-machine-card__sensors-title">Sensors (3)</h3>
        <ul class="monitoring-sensor-list">
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Vibration Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Temperature Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
          <li class="monitoring-sensor-item monitoring-sensor-item--active">
            <span class="monitoring-sensor-item__dot"></span>
            <span class="monitoring-sensor-item__name">Pressure Sensor</span>
            <span class="monitoring-sensor-item__status">Active</span>
          </li>
        </ul>
      </div>

      <footer class="monitoring-machine-card__actions">
        <button class="monitoring-action-btn monitoring-action-btn--monitor" type="button">
          <img src="./assets/icons/analysis.png" alt="" /><span>Monitor Now</span>
        </button>
        <button class="monitoring-action-btn monitoring-action-btn--delete" type="button">
          <img src="./assets/icons/trash.svg" alt="" /><span>Delete</span>
        </button>
      </footer>
    </article>

  </section>
</main>`;

  mainContiner.insertAdjacentHTML('beforeend', HtmlContant);
  RenderMonitoringCards();
}