import { mockLoadEffect } from '../analytic/FetichKPI.js';
import { fetchAPI } from '../FetchApi.js';
import { readSvgDeletIcon, readSvgUpdateIcon, readSvgShowIcon } from '../work_order/work_order_api_read.js'
import { bulid_doughnut_chart } from '../../chart_manipulation/dashboard_render.js';
import { adjustTotalState } from '../dashBoard/dashboardRender.js';

const MainAssetURL = 'http://192.168.43.111:5189/api/v1/assets/'

export function HasData(data) {
  if (data == null || data == undefined) {
    console.error("Status 404, Bad Request: failed fething data");
    return false;
  }

  return true;
}

async function RenderAssetCard() {

  mockLoadEffect('.assets-card-grid> .asset-card');

  const succeed = await fetchAPI(MainAssetURL + 'asset-cards');

  if (!HasData(succeed)) return;


  console.log(succeed);

  fill_In_AssetsCard(succeed);
}
function fill_In_AssetsCard(data) {

  if (data == undefined || data == []) return;

  const assetCardContainer = document.querySelector('.assets-card-grid');
  assetCardContainer.innerHTML = '';

  data.forEach(e => {

    let imageValue = ``;
    if (e.assetTag.length < 10) {
      imageValue = e.assetTag;
    } else {
      imageValue = 'PMP-101';
    }

    let Health = (e.assetHealthy < 80 && e.assetHealthy > 50) ? 'warn'
      : e.assetHealthy < 50 ? 'critical' : 'good';


    const Card = `      
     <article class="asset-card">
          <div class="asset-card-top">
            <img class="asset-thumb" src="./assets/images/${imageValue}.jpg" alt="Centrifugal Pump #1" />
            <span class="badge-status status-${e.status.toLowerCase()}">${e.status}</span>
          </div>
          <div class="asset-card-content">
            <h3 class="asset-name">${e.assetName}</h3>
            <p class="asset-id">${e.assetTag}</p>
            <p class="asset-meta"><span class="meta-label">Category</span> ${e.categoryName}</p>
            <p class="asset-meta"><span class="meta-label">Location</span> ${e.locationName}</p>
          </div>
          <div class="asset-health">
            <div class="health-row"><span>Health</span><strong>${e.assetHealthy}%</strong></div>
            <div class="health-bar"><span class="health-fill health-${Health}" style="width: ${e.assetHealthy}%"></span></div>
          </div>
          <div class="asset-card-actions">
             <button type="button" class="card-btn card-btn-see">
              ${readSvgShowIcon('#8D4FFF')}
            </button>
            <button type="button" class="card-btn card-btn-update">
               ${readSvgUpdateIcon('#cc8a0f', "15")}
            </button>
            <button type="button" class="card-btn card-btn-delete">
              ${readSvgDeletIcon('#c3120b')}
            </button>
          </div>
        </article>
        `;

    assetCardContainer.insertAdjacentHTML('beforeend', Card);
  });
}


async function RenderAssetStatusRate() {

  mockLoadEffect('.sidebar-box.dount');

  const succeed = await fetchAPI(MainAssetURL + 'assets-status-rate');
  if (!HasData(succeed)) return;

  Fill_IN_StatusRate(succeed);
}
function Fill_IN_StatusRate(data) {

  const config_doughnut3 =
  {
    data: [0, 0, 0],
    bg_colors: ['#16A34A', '#D97706', '#DC2626'],
    Lable: ['Online', 'Warning', 'Offline']
  }

  const assetOverview = document.querySelector('.sidebar-box.dount');
  assetOverview.innerHTML = "";

  const StatusRateList = [0, 0, 0];
  data.forEach(e => {
    switch (e.status) {
      case 'Online':
        config_doughnut3.data[0] = e.statusCount;
        StatusRateList[0] = e.statusReate;
        break;

      case 'Warning':
        config_doughnut3.data[1] = e.statusCount;
        StatusRateList[1] = e.statusReate;
        break;

      case 'Offline':
        config_doughnut3.data[2] = e.statusCount;
        StatusRateList[2] = e.statusReate;
        break;
    }

  });

  const containt = `
     <h4>Asset Overview</h4>
        <div class="doughnut-container asset-overview">
        <div class="total-state">
          <p>156</p>
        </div>

        <div class ="doughnut-container">
          <canvas id="dount-chart-3"></canvas>
        </div>
        </div>
        <ul class="donut-legend">
          <li><span class="dot dot-online"></span> Online <b>${StatusRateList[0]}%</b></li>
          <li><span class="dot dot-warning"></span> Warning <b>${StatusRateList[1]}%</b></li>
          <li><span class="dot dot-offline"></span> Offline <b>${StatusRateList[2]}%</b></li>
        </ul>
        `;


  console.log(config_doughnut3.data)
  assetOverview.insertAdjacentHTML('beforeend', containt);

  bulid_doughnut_chart('#dount-chart-3', config_doughnut3);

  adjustTotalState(config_doughnut3.data, '.doughnut-container.asset-overview>.total-state>p');


}

async function TopFiveAssetByDownTime() {
  mockLoadEffect('.sidebar-box top-five-Downtime');

  const succeed = await fetchAPI('http://192.168.43.111:5189/api/v1/dashboad/top-five-asset-downtime');

  if (!HasData(succeed)) return;

  console.log(succeed);
  Fill_IN_TopFiveDowntime(succeed);
}

function Fill_IN_TopFiveDowntime(data) {

  const downtimesList = document.querySelector(".downtime-list");
  downtimesList.innerHTML = '';
  // {assetName: 'Server Rack UPS', downtime: 11.083333, percentage: 32.5}

  for (const obj of data) {
    const ListItme = ` 
              <li>
                <span>${obj.assetName}</span>
                <div class="downtime-bar"><i style="width:${obj.percentage.toFixed(2)}%"></i></div>
                <strong>${obj.downtime.toFixed(2)} hrs</strong>
              </li>`;

    downtimesList.insertAdjacentHTML('beforeend', ListItme);
  }
}

export function RenderAsssetsDemo() {

  const mainContiner = document.querySelector('.main-container');

  mainContiner.innerHTML = '';

  const renderHtml = `<main class="assets-page">
  <header class="main-head">
  <h1>Assets</h1>
  <p>Manage and track all your assets and their performance.</p>
  </header>

  <section class="kpi-cards assets-kpis">
    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon">
          <img class="icon" src="./assets/icons/assets.png" alt="Total assets" />
        </div>
        <div class="title">
          <p class="title-text">Total Assets</p>
          <div class="value">
            <p>156</p>
            <div class="sub-details">
              <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
              <span class="green">12%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon green">
          <img class="icon" src="./assets/icons/check.png" alt="Online assets" />
        </div>
        <div class="title">
          <p class="title-text">Online Assets</p>
          <div class="value">
            <p>98</p>
            <div class="sub-details">
              <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
              <span class="green">8%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon orange">
          <img class="icon" src="./assets/icons/clock.png" alt="Maintenance due" />
        </div>
        <div class="title">
          <p class="title-text">Maintenance Due</p>
          <div class="value">
            <p>24</p>
            <div class="sub-details">
              <img class="icon arrow-red" src="./assets/icons/arrow-down.svg" alt="down" />
              <span class="red">3%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon red">
          <img class="icon" src="./assets/icons/downtime.png" alt="Critical assets" />
        </div>
        <div class="title">
          <p class="title-text">Critical Assets</p>
          <div class="value">
            <p>6</p>
            <div class="sub-details">
              <img class="icon arrow-red" src="./assets/icons/arrow-down.svg" alt="down" />
              <span class="red">2%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon blue">
          <img class="icon blue" src="./assets/icons/pause-circle.svg" alt="Downtime" />
        </div>
        <div class="title">
          <p class="title-text">Downtime (hrs)</p>
          <div class="value">
            <p>45.6</p>
            <div class="sub-details">
              <img class="icon arrow-red" src="./assets/icons/arrow-down.svg" alt="down" />
              <span class="red">5%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="assets-toolbar">
    <div class="assets-toolbar-left">
      <select id="assets_category_selector">
        <option selected value="">All Categories</option>
        <option value="pump">Pump</option>
        <option value="compressor">Compressor</option>
        <option value="motor">Motor</option>
        <option value="hvac">HVAC</option>
        <option value="generator">Generator</option>
        <option value="conveyor">Conveyor</option>
      </select>

      <select id="assets_location_selector">
        <option selected value="">All Locations</option>
        <option value="pump-room">Main Plant - Pump Room</option>
        <option value="compressor-room">Main Plant - Compressor Room</option>
        <option value="motor-bay">Main Plant - Motor Bay</option>
        <option value="roof">Main Plant - Roof</option>
        <option value="utility">Main Plant - Utility Room</option>
        <option value="line-a">Main Plant - Line A</option>
      </select>

      <select id="assets_status_selector">
        <option selected value="">Status: All</option>
        <option value="online">Online</option>
        <option value="warning">Warning</option>
        <option value="offline">Offline</option>
      </select>

      <button class="btn-assets btn-outline" type="button">Filters</button>
      <button class="btn-link-reset" type="button">Reset</button>
    </div>

    <div class="assets-toolbar-right">
    <button class="btn-assets btn-primary" type="button">Add Asset</button>
  </div>
  </section>

  <div class="assets-layout">
    <section class="assets-grid-wrap">
      <div class="assets-card-grid">

        <article class="asset-card">
          <div class="asset-card-top">
            <img class="asset-thumb" src="./assets/images/pump.jpg" alt="Centrifugal Pump #1" />
            <span class="badge-status status-online">Online</span>
          </div>
          <div class="asset-card-content">
            <h3 class="asset-name">Centrifugal Pump #1</h3>
            <p class="asset-id">PMP-001</p>
            <p class="asset-meta"><span class="meta-label">Category</span> Pump</p>
            <p class="asset-meta"><span class="meta-label">Location</span> Main Plant - Pump Room</p>
          </div>
          <div class="asset-health">
            <div class="health-row"><span>Health</span><strong>92%</strong></div>
            <div class="health-bar"><span class="health-fill health-good" style="width: 92%"></span></div>
          </div>
          <div class="asset-card-actions">
             <button type="button" class="card-btn card-btn-see">
              ${readSvgShowIcon('#8D4FFF')}
            </button>
            <button type="button" class="card-btn card-btn-update">
               ${readSvgUpdateIcon('#8D4FFF', "15")}
            </button>
            <button type="button" class="card-btn card-btn-delete">
              ${readSvgDeletIcon('#8D4FFF')}
            </button>
          </div>
        </article>

        <article class="asset-card">
          <div class="asset-card-top">
            <img class="asset-thumb" src="./assets/images/centrifugal-air-compressors.jpg" alt="Air Compressor #2" />
            <span class="badge-status status-online">Online</span>
          </div>
          <div class="asset-card-content">
            <h3 class="asset-name">Air Compressor #2</h3>
            <p class="asset-id">CMP-002</p>
            <p class="asset-meta"><span class="meta-label">Category</span> Compressor</p>
            <p class="asset-meta"><span class="meta-label">Location</span> Main Plant - Compressor Room</p>
          </div>
          <div class="asset-health">
            <div class="health-row"><span>Health</span><strong>88%</strong></div>
            <div class="health-bar"><span class="health-fill health-good" style="width: 88%"></span></div>
          </div>
          <div class="asset-card-actions">
            <button type="button" class="card-btn card-btn-see">
              ${readSvgShowIcon('#8D4FFF')}
            </button>
            <button type="button" class="card-btn card-btn-update">
               ${readSvgUpdateIcon('#8D4FFF', "15")}
            </button>
            <button type="button" class="card-btn card-btn-delete">
              ${readSvgDeletIcon('#8D4FFF')}
            </button>
          </div>
        </article>

        <article class="asset-card">
          <div class="asset-card-top">
            <img class="asset-thumb" src="./assets/images/motor.jpg" alt="Motor #3" />
            <span class="badge-status status-warning">Warning</span>
          </div>
          <div class="asset-card-content">
            <h3 class="asset-name">Motor #3</h3>
            <p class="asset-id">MTR-003</p>
            <p class="asset-meta"><span class="meta-label">Category</span> Motor</p>
            <p class="asset-meta"><span class="meta-label">Location</span> Main Plant - Motor Bay</p>
          </div>
          <div class="asset-health">
            <div class="health-row"><span>Health</span><strong>65%</strong></div>
            <div class="health-bar"><span class="health-fill health-warn" style="width: 65%"></span></div>
          </div>
          <div class="asset-card-actions">
               <button type="button" class="card-btn card-btn-see">
              ${readSvgShowIcon('#8D4FFF')}
            </button>
            <button type="button" class="card-btn card-btn-update">
               ${readSvgUpdateIcon('#8D4FFF', "15")}
            </button>
            <button type="button" class="card-btn card-btn-delete">
              ${readSvgDeletIcon('#8D4FFF')}
            </button>
          </div>
        </article>

        <article class="asset-card">
          <div class="asset-card-top">
            <img class="asset-thumb" src="./assets/images/motor.jpg" alt="HVAC Unit #2" />
            <span class="badge-status status-warning">Warning</span>
          </div>
          <div class="asset-card-content">
            <h3 class="asset-name">HVAC Unit #2</h3>
            <p class="asset-id">HVAC-002</p>
            <p class="asset-meta"><span class="meta-label">Category</span> HVAC</p>
            <p class="asset-meta"><span class="meta-label">Location</span> Main Plant - Roof</p>
          </div>
          <div class="asset-health">
            <div class="health-row"><span>Health</span><strong>58%</strong></div>
            <div class="health-bar"><span class="health-fill health-warn" style="width: 58%"></span></div>
          </div>
          <div class="asset-card-actions">
             <button type="button" class="card-btn card-btn-see">
              ${readSvgShowIcon('#8D4FFF')}
            </button>
            <button type="button" class="card-btn card-btn-update">
               ${readSvgUpdateIcon('#8D4FFF', "15")}
            </button>
            <button type="button" class="card-btn card-btn-delete">
              ${readSvgDeletIcon('#8D4FFF')}
            </button>
          </div>
        </article>

        <article class="asset-card">
          <div class="asset-card-top">
            <img class="asset-thumb" src="./assets/images/centrifugal-air-compressors.jpg" alt="Generator #1" />
            <span class="badge-status status-offline">Offline</span>
          </div>
          <div class="asset-card-content">
            <h3 class="asset-name">Generator #1</h3>
            <p class="asset-id">GEN-001</p>
            <p class="asset-meta"><span class="meta-label">Category</span> Generator</p>
            <p class="asset-meta"><span class="meta-label">Location</span> Main Plant - Utility Room</p>
          </div>
          <div class="asset-health">
            <div class="health-row"><span>Health</span><strong>35%</strong></div>
            <div class="health-bar"><span class="health-fill health-critical" style="width: 35%"></span></div>
          </div>
          <div class="asset-card-actions">
             <button type="button" class="card-btn card-btn-see">
              ${readSvgShowIcon('#8D4FFF')}
            </button>
            <button type="button" class="card-btn card-btn-update">
               ${readSvgUpdateIcon('#8D4FFF', "15")}
            </button>
            <button type="button" class="card-btn card-btn-delete">
              ${readSvgDeletIcon('#8D4FFF')}
            </button>
          </div>
        </article>

        <article class="asset-card">
          <div class="asset-card-top">
            <img class="asset-thumb" src="./assets/images/centrifugal-air-compressors.jpg" alt="Conveyor Belt #1" />
            <span class="badge-status status-online">Online</span>
          </div>
          <div class="asset-card-content">
            <h3 class="asset-name">Conveyor Belt #1</h3>
            <p class="asset-id">CBT-001</p>
            <p class="asset-meta"><span class="meta-label">Category</span> Conveyor</p>
            <p class="asset-meta"><span class="meta-label">Location</span> Main Plant - Line A</p>
          </div>
          <div class="asset-health">
            <div class="health-row"><span>Health</span><strong>81%</strong></div>
            <div class="health-bar"><span class="health-fill health-good" style="width: 81%"></span></div>
          </div>
          <div class="asset-card-actions">
             <button type="button" class="card-btn card-btn-see">
              ${readSvgShowIcon('#8D4FFF')}
            </button>
            <button type="button" class="card-btn card-btn-update">
               ${readSvgUpdateIcon('#8D4FFF', "15")}
            </button>
            <button type="button" class="card-btn card-btn-delete">
              ${readSvgDeletIcon('#8D4FFF')}
            </button>
          </div>
        </article>

      </div>
    </section>

    <aside class="assets-sidebar">
      <div class="sidebar-box dount">
        <h4>Asset Overview</h4>
        <div class="donut-wrap">
          <div class="donut-chart" style="--online: 62.8; --warning: 23.1; --offline: 14.1;">
            <div class="donut-hole">
              <strong>156</strong>
              <span>Total</span>
            </div>
          </div>
        </div>
        <ul class="donut-legend">
          <li><span class="dot dot-online"></span> Online <b>62.8%</b></li>
          <li><span class="dot dot-warning"></span> Warning <b>23.1%</b></li>
          <li><span class="dot dot-offline"></span> Offline <b>14.1%</b></li>
        </ul>
      </div>

      <div class="sidebar-box top-five-Downtime">
        <h4>Top 5 Assets by Downtime</h4>
        <ul class="downtime-list">
          <li>
            <span>Centrifugal Pump #1</span>
            <div class="downtime-bar"><i style="width: 100%"></i></div>
            <strong>12.6 hrs</strong>
          </li>
          <li>
            <span>Air Compressor #2</span>
            <div class="downtime-bar"><i style="width: 72%"></i></div>
            <strong>9.1 hrs</strong>
          </li>
          <li>
            <span>Motor #3</span>
            <div class="downtime-bar"><i style="width: 55%"></i></div>
            <strong>6.9 hrs</strong>
          </li>
          <li>
            <span>HVAC Unit #2</span>
            <div class="downtime-bar"><i style="width: 40%"></i></div>
            <strong>5.0 hrs</strong>
          </li>
          <li>
            <span>Generator #1</span>
            <div class="downtime-bar"><i style="width: 30%"></i></div>
            <strong>3.8 hrs</strong>
          </li>
        </ul>
      </div>
    </aside>
  </div>
                        </main>`;

  mainContiner.innerHTML = renderHtml;


  RenderAssetCard();
  RenderAssetStatusRate();
  TopFiveAssetByDownTime();
}