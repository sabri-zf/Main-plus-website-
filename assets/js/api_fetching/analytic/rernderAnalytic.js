
import { bulidHalfDount, bulidTrendChart, bulid_doughnut_chart } from "../../chart_manipulation/dashboard_render";

import { URI } from "../../Utility/Configuration";
import { HasData } from "../Assets/assetRender";
import { fetchAPI } from "../FetchApi";

let MonthDefinition = 3;
let AssetDefinition = 1;


async function RenderCategoryOfAssets() {

  const succeed = await fetchAPI(URI + `v1/categories/assets-category`);

  if (!HasData(succeed)) return;


  SetCategoryOfAssets(succeed);
}

function SetCategoryOfAssets(data) {

  const categorySelector = document.querySelector('#analytic-asset-category');

  categorySelector.innerHTML = '';

  categorySelector.insertAdjacentHTML("beforeend", `<option value = "none">Select category</option>`);
  data.forEach(v => {
    const option = `<option value = ${v}>${v}</option>`;

    categorySelector.insertAdjacentHTML("beforeend", option);
  })
}

async function ReliablilityTrend() {

  const succeed = await fetchAPI(URI + `v1/analytic/reliability?assetID=${AssetDefinition}&months=${MonthDefinition}`);

  if (!HasData(succeed)) return;

  renderRelaiblityChart(succeed)
}

function renderRelaiblityChart(data) {
  const relaiblilityID = "#relaiblity-function";

  const Config =
  {
    mainColor: '#2564eb68',
    secondColor: '#ffffff26'
  }

  const reliabilityHours = [];

  const reliabilityPercent = [];

  // rate: 91.39198, interval: 24
  data.forEach(v => {
    reliabilityHours.push(v.interval);
    reliabilityPercent.push(v.rate);
  });

  bulidTrendChart(relaiblilityID, 'Relaiblility', 'percenatge', reliabilityPercent, Config, reliabilityHours);
}

async function MaintanbilityTrend() {

  const succeed = await fetchAPI(URI + `v1/analytic/maintainability?assetID=${AssetDefinition}&months=${MonthDefinition}`);

  if (!HasData(succeed)) return;

  renderMaintaniblityChart(succeed);
}

function renderMaintaniblityChart(data) {
  const maintainblilityID = '#Maintainability-function';

  const Config =
  {
    mainColor: '#16a34a6f',
    secondColor: '#f5f7f61d'
  }

  const repairTimeHours = [];

  const maintainabilityPercent = [];

  data.forEach(v => {
    repairTimeHours.push(v.interval);
    maintainabilityPercent.push(v.rate.toFixed(1));
  });

  bulidTrendChart(maintainblilityID, 'Maintaniblity', 'percenatge', maintainabilityPercent, Config, repairTimeHours);
}


async function RenderMtbfTrend() {

  const succeed = await fetchAPI(URI + `v1/analytic/mtbf-trend?assetID=${AssetDefinition}&months=${MonthDefinition}`);

  if (!HasData(succeed)) return;

  renderMtbfChart(succeed);
  renderDowntimeTrend(succeed);
  renderFailureTrend(succeed);
}

function renderMtbfChart(data) {

  const mtbfID = '#MTBF-trend';

  const Config =
  {
    mainColor: '#8d4fff7c',
    secondColor: '#d6c2fb16'
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const mtbfHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // mtbf: 1078, monthNumber: 1, numberOfFailuer: 2,

  let mttbCount = 0;
  data.forEach(v => {
    mtbfHours[v.monthNumber - 1] = v.mtbf;
    mttbCount += v.mtbf;
  });

  bulidTrendChart(mtbfID, 'MTBF', 'monthly', mtbfHours, Config, months);

  const mtbfValue = document.querySelector('.continer-card .value.mtbf> p');

  mtbfValue.innerHTML = mttbCount.toFixed(1) + 'hrs';
}


async function RenderMttrTrend() {

  const succeed = await fetchAPI(URI + `v1/analytic/mttr-trend?assetID=${AssetDefinition}&months=${MonthDefinition}`);

  if (!HasData(succeed)) return;

  console.log(succeed);

  renderMTTRChart(succeed)
}
function renderMTTRChart(data) {

  const mttrID = '#MTTR-trend';

  const Config =
  {
    mainColor: '#2564eb68',
    secondColor: '#1953d026'
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  const mttrHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let mttrCount = 0;
  data.forEach(v => {
    mttrHours[v.monthNumber - 1] = v.mttr;
    mttrCount += v.mttr;
  });

  bulidTrendChart(mttrID, 'MTTR', 'monthly', mttrHours, Config, months);

  const mttrValue = document.querySelector('.continer-card .value.mttr> p');

  mttrValue.innerHTML = mttrCount.toFixed(1) + 'hrs';
}


async function RenderAvailabilityTrend() {

  const succeed = await fetchAPI(URI + `v1/analytic/availability-trend?assetID=${AssetDefinition}&months=${MonthDefinition}`);

  if (!HasData(succeed)) return;

  renderAvailabilityChart(succeed)
}

function renderAvailabilityChart(data) {
  const availabilityID = "#Availability-trend";

  const Config =
  {
    mainColor: '#16a34a6f',
    secondColor: '#415b4a1d'
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const availabilityPercent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let avilablityCounter = 0;
  let countForAvailablity = 0;
  data.forEach(v => {
    availabilityPercent[v.monthNumber - 1] = v.availability;
    avilablityCounter += v.availability;

    if (v.availability != 0) {
      countForAvailablity++;
    }


  });

  console.log(avilablityCounter);

  bulidTrendChart(availabilityID, 'Availability', 'monthly', availabilityPercent, Config, months);

  const valueOfAvailability = document.querySelector('.continer-card .value.availability> p');

  valueOfAvailability.innerHTML = (avilablityCounter / countForAvailablity).toFixed(2) + "%";

}

function renderDowntimeTrend(data) {
  const downtimeID = '#downtime-function';

  const Config =
  {
    mainColor: '#d97706a1',
    secondColor: '#d0bfaa00'
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const downtimeHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let totalDownTime = 0;
  data.forEach(v => {
    downtimeHours[v.monthNumber - 1] = v.totalDownTime;
    totalDownTime += v.totalDownTime;
  });

  bulidTrendChart(downtimeID, 'Downtime', 'monthly', downtimeHours, Config, months);

  const downTimeValue = document.querySelector('.continer-card .value.downtime > p');


  downTimeValue.innerHTML = totalDownTime.toFixed(1) + "hrs";
}


async function PmComplianceTrend() {

  const succeed = await fetchAPI(URI + `v1/analytic/pmComplaince-trend?assetID=${AssetDefinition}&months=${MonthDefinition}`);

  if (!HasData(succeed)) return;

  renderPMCompliance(succeed);
}

function renderPMCompliance(data) {

  const complianceID = '#pm-compliance-trend';

  const Config =
  {
    mainColor: '#06d9c0a1',
    secondColor: '#ffffff00'
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const pmCompliancePercent = new Array(12).fill(0);

  // "pmCompliance": 0,
  //   "monthNumber": 1


  let complianceTasks = 0;
  data.forEach(v => {
    pmCompliancePercent[v.monthNumber - 1] = v.pmCompliance;
    complianceTasks += v.pmCompliance;
  })

  bulidTrendChart(complianceID, 'PM compliance', 'monthly', pmCompliancePercent, Config, months);

  const complianceValue = document.querySelector('.continer-card .value.compliance> p');

  complianceValue.innerHTML = (complianceTasks / MonthDefinition).toFixed(2) + '%';
}

async function RenderWorkOrderDistribution() {
  const succeed = await fetchAPI(URI + `v1/analytic/workorder-distribution?assetID=${AssetDefinition}`);

  if (!HasData(succeed)) return;


  renderWO_distribution(succeed);

}
function renderWO_distribution(data) {

  const WoDistributionID = '#wo-distribution';
  const Total_distribution = document.querySelector('.count-distribition> .value')

  let total = 0;

  const Config = {
    Lable: [],
    data: [],
    bg_colors: ['#8d4fff93', '#2564eb96', '#d97706aa', '#dc26269a'],
    enable: true
  }


  data.forEach(v => {
    Config.Lable.push(v.statusName);
    Config.data.push(v.count);
    total += v.count;
  });

  Total_distribution.innerHTML = total;

  bulid_doughnut_chart(WoDistributionID, Config);
}

function renderFailureTrend(data) {
  const failureID = '#Failure-trend';

  const Config =
  {
    mainColor: '#bb0505d3',
    secondColor: '#ffffff00'
  }
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const failureFrequency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  let FailureCounter = 0;
  data.forEach(v => {
    failureFrequency[v.monthNumber - 1] = v.numberOfFailuer;
    FailureCounter += v.numberOfFailuer;
  });

  bulidTrendChart(failureID, 'Failure', 'monthly', failureFrequency, Config, months);

  const failureValue = document.querySelector('.continer-card .value.failure> p');

  failureValue.innerHTML = FailureCounter < 10 ? '0' + FailureCounter + 'times' : FailureCounter + 'times';
}

async function RenderAssetHealthy() {
  const succeed = await fetchAPI(URI + `v1/analytic/asset-healthy?AssetID=${AssetDefinition}`);

  if (!HasData(succeed)) return;

  renderHealthy(succeed);
}

function renderHealthy(data) {
  const HealthyID = '#Healthy-function';

  const Score = document.querySelector(".trend-container.healthy-score .Score> .value");

  const realvalue = data.assetHealthy;
  const remainValue = 100 - realvalue;
  const config = {
    Label: ['Healthy'],
    data: [10, 90],
    datesetName: 'Asset Healthy',
    bgColor: ['#1f8c47c4', '#eee']
  }

  config.data[0] = realvalue;
  config.data[1] = remainValue;

  Score.innerHTML = realvalue;

  AssetHealthyLable(realvalue, config.bgColor);


  bulidHalfDount(HealthyID, config);
}

function AssetHealthyLable(result, bgColor) {

  const dotStatus = document.querySelector(".trend-container.healthy-score .status .dot-status");
  const labelStatus = document.querySelector(".trend-container.healthy-score .status p");

  if (result >= 80) {
    labelStatus.innerHTML = 'Healthy';
    dotStatus.style.backgroundColor = "#1f8c47c4";
    dotStatus.style.boxShadow = "0px 0px 8px 3px rgb(195 234 191 / 85%)";
    return;
  }

  if (result < 80 && result >= 50) {
    bgColor[0] = '#D97706';
    labelStatus.innerHTML = 'Warning';
    labelStatus.style.color = "#D97706";
    dotStatus.style.backgroundColor = "#D97706";
    dotStatus.style.boxShadow = " 0px 0px 8px 3px var(--bg-color-orange)";
    return;
  }


  if (result < 50) {
    bgColor[0] = '#DC2626';
    labelStatus.innerHTML = 'Critical';
    labelStatus.style.color = "#DC2626";
    dotStatus.style.backgroundColor = "#DC2626";
    dotStatus.style.boxShadow = "0px 0px 8px 3px var(--bg-color-danger)";
    return;
  }
}

async function RenderRecentWorkOrder() {

  const succeed = await fetchAPI(URI + `v1/analytic/top-recent-workorder?AssetID=${AssetDefinition}`);

  if (!HasData(succeed)) return;

  RecentWorkOrder(succeed);
}

function RecentWorkOrder(data) {
  const tableBody = document.querySelector('.trend-container .wo-recent-table tbody');
  tableBody.innerHTML = '';

  data.forEach(v => {

    const date = new Date(v.date).toLocaleString('en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    const tableRow = `<tr>
                <td>${v.wo_Number}</td>
                <td>${v.type}</td>
                <td>${v.title}</td>
                <td>${date}</td>
                <td class="status ${v.status.toLowerCase()}"><span>${v.status}</span></td>
                </tr>
                `;

    tableBody.insertAdjacentHTML('beforeend', tableRow);
  })
}

async function RenderAssetDataCard() {
  const succeed = await fetchAPI(URI + `v1/analytic/asset-analytic-card?assetID=${AssetDefinition}`);

  if (!HasData(succeed)) return;

  console.log(succeed);

  FillInAssetData(succeed);
}

function FillInAssetData(data) {

  const container = document.querySelector('.asset-meatdata');
  container.innerHTML = '';

  const MachineImage = document.querySelector(".image-continer img");

  let Status;
  if (data.stauts == "Active")
    Status = 'Online';
  else
    Status = 'Offline';

  const installted = new Date(data.installtedAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  MachineImage.src = `./assets/images/${data.tag}.jpg`;
  const mainContent = `  <div class="hero">
                                <h3>${data.tag}</h3>
                                <span class="status ${Status.toLowerCase()}">${Status}</span>
                                <p class="Asset-Name">${data.name}</p>
                                <p class="Asset-location"><b>Location:</b> ${data.location}</p>
                            </div>

                            <ul class="details">
                                <li><b>Installed: </b> <span>${installted}</span></li>
                                <li><b>Purchase: </b> <span>$${data.purchase}</span></li>
                            </ul>`;

  container.insertAdjacentHTML('beforeend', mainContent);
}

export function renderAnalyticDemo() {

  const mainContiner = document.querySelector('.main-container');

  mainContiner.innerHTML = '';

  const Htmltext = `
            <main class="analytic-page">
                <header class="main-head">
                    <h1>Machine Analytic</h1>
                    <p>Welecome to back,<span id="username">sabri</span>! here waht occurred in your maintenance
                        operations
                        today</p>
                </header>

                <!-- toolbar analytics -->
                <section class="toolbar-analytic">

                    <label for="analytic-asset-category">
                        <p>Category</p>
                        <select name="categoryName" id="analytic-asset-category">
                            <option value="pump">pump</option>
                            <option value="pump">electric</option>
                            <option value="pump">mechanic</option>
                        </select>
                    </label>


                    <label for="analytic-asset-name">
                        <p>Asset</p>
                        <select name="assetName" id="analytic-asset-name">
                            <option value="asset1">asset</option>
                            <option value="pump">electric</option>
                            <option value="pump">mechanic</option>
                        </select>
                    </label>


                    <label for="analytic-date-range">
                        <p>Date Range</p>
                        <select name="dateRange" id="analytic-date-range">
                            <option value="3m">last 3 months</option>
                            <option value="6m">last 6 months</option>
                            <option value="12m">last 12 months</option>
                        </select>
                    </label>
                </section>
                <!-- toolbar analytics  -->

                <section class="overview-kpi">
                    <article class="machine-info">
                        <div class="image-continer">
                            <img src="./assets/images/pump.jpg" alt="pump asset">
                        </div>
                        <div class="asset-meatdata">
                            <div class="hero">
                                <h3>Machine Tag Number</h3>
                                <span class="status">Online</span>
                                <p class="Asset-Name">Asset Name</p>
                                <p class="Asset-location"> Asset location</p>
                            </div>

                            <ul class="details">
                                <li>Installed: <span>may, 20 2025</span></li>
                                <li>AssetID : <span>A-2001</span></li>
                            </ul>

                        </div>
                    </article>

                    <section class="kpi-cards analytics-kpis">
                        <div class="cards">
                            <div class="continer-card">
                                <div class="wo-icon">
                                    <img class="icon" src="./assets/icons/check.png" alt="Work orders completed" />
                                </div>
                                <div class="title">
                                    <p class="title-text">availability</p>
                                    <div class="value availability">
                                        <p>142</p>
                                        <div class="sub-details">
                                            <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
                                            <span class="green">18%</span>
                                            <p>last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cards">
                            <div class="continer-card">
                                <div class="wo-icon blue">
                                    <img class="icon blue" src="./assets/icons/clock.png" alt="MTTR" />
                                </div>
                                <div class="title">
                                    <p class="title-text">MTBF</p>
                                    <div class="value mtbf">
                                        <p>4.2</p>
                                        <div class="sub-details">
                                            <img class="icon arrow-green" src="./assets/icons/arrow-down.svg"
                                                alt="down" />
                                            <span class="green">12%</span>
                                            <p>last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cards">
                            <div class="continer-card">
                                <div class="wo-icon green">
                                    <img class="icon" src="./assets/icons/preventive.png" alt="PM compliance" />
                                </div>
                                <div class="title">
                                    <p class="title-text">MTTR</p>
                                    <div class="value mttr">
                                        <p>94%</p>
                                        <div class="sub-details">
                                            <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
                                            <span class="green">6%</span>
                                            <p>last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cards">
                            <div class="continer-card">
                                <div class="wo-icon orange">
                                    <img class="icon" src="./assets/icons/downtime.png" alt="Downtime hours" />
                                </div>
                                <div class="title">
                                    <p class="title-text">failure</p>
                                    <div class="value failure">
                                        <p>23.6</p>
                                        <div class="sub-details">
                                            <img class="icon arrow-red" src="./assets/icons/arrow-down.svg"
                                                alt="down" />
                                            <span class="red">8%</span>
                                            <p>last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cards">
                            <div class="continer-card">
                                <div class="wo-icon">
                                    <img class="icon" src="./assets/icons/analysis.png" alt="Maintenance cost" />
                                </div>
                                <div class="title">
                                    <p class="title-text">Downtime</p>
                                    <div class="value downtime">
                                        <p>$45,230</p>
                                        <div class="sub-details">
                                            <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
                                            <span class="percentage green">9%</span>
                                            <p>last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="cards">
                            <div class="continer-card">
                                <div class="wo-icon">
                                    <img class="icon" src="./assets/icons/analysis.png" alt="Maintenance cost" />
                                </div>
                                <div class="title">
                                    <p class="title-text">PM compliance</p>
                                    <div class="value compliance">
                                        <p>$45,230</p>
                                        <div class="sub-details">
                                            <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
                                            <span class="percentage green">9%</span>
                                            <p>last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>

                <section class="analytic-trends">
                    <!-- Start Relaibility -->
                    <article class="reliability">
                        <h3> Reliability Engineering</h3>
                        <div class="relaiblility-trends">
                            <!-- first container -->
                            <div class="trend-container">
                                <h4>Relaibility Function</h4>
                                <div class="chart-container">
                                    <canvas id="relaiblity-function"></canvas>
                                </div>
                            </div>
                            <!-- second container -->
                            <div class="trend-container">
                                <h4>Maintainability Function</h4>
                                <div class="chart-container">
                                    <canvas id="Maintainability-function"></canvas>
                                </div>
                            </div>

                            <!-- thrid container -->
                            <div class="trend-container">
                                <h4>MTBF Trend</h4>
                                <div class="chart-container">
                                    <canvas id="MTBF-trend"></canvas>
                                </div>
                            </div>

                            <!-- fourth container -->
                            <div class="trend-container">
                                <h4>MTTR Trend</h4>
                                <div class="chart-container">
                                    <canvas id="MTTR-trend"></canvas>
                                </div>
                            </div>
                        </div>

                    </article>
                    <!-- End Relaibility -->

                    <!-- Start preformance and maintenance -->
                    <article class="performance">
                        <h3> Performance & maintenance</h3>
                        <div class="performance-trends">
                            <!-- first container -->
                            <div class="trend-container">
                                <h4>Availability trend</h4>
                                <div class="chart-container">
                                    <canvas id="Availability-trend"></canvas>
                                </div>
                            </div>
                            <!-- second container -->
                            <div class="trend-container">
                                <h4>Downtime trend </h4>
                                <div class="chart-container">
                                    <canvas id="downtime-function"></canvas>
                                </div>
                            </div>

                            <!-- thrid container -->
                            <div class="trend-container">
                                <h4>PM compliance trend </h4>
                                <div class="chart-container">
                                    <canvas id="pm-compliance-trend"></canvas>
                                </div>
                            </div>

                            <!-- fourth container -->
                            <div class="trend-container">
                                <h4>Work order distribution</h4>
                                <div class="count-distribition"><p class = "value">79</p> <p>Total Wo</p> </div>
                                <div class="chart-container">
                                    <canvas id="wo-distribution"></canvas>
                                </div>
                            </div>
                        </div>

                    </article>
                    <!-- End preformance and maintenance -->



                      <!-- Start Failure analysis -->
                    <article class="Failure-analysis">
                        <h3> Failure analysis</h3>

                        <div class="Failure-analysis-trends">
                            <!-- first container -->
                            <div class="trend-container">
                                <h4>Failure Frequency Trend</h4>
                                <div class="chart-container">
                                    <canvas id="Failure-trend"></canvas>
                                </div>
                                
                            </div>

                            <!-- second container -->
                            <div class="trend-container healthy-score">
                                <h4>Healthy score</h4>
                                <div class="status">
                                <span class= "dot-status"></span>
                                <p>Healthy</p>
                                </div>
                                <div class = "Score">
                                  <p class ="value">80</p>
                                  <p class ="sub-value" >/100</p>
                                </div>
                                <div class="chart-container">
                                    <canvas id="Healthy-function"></canvas>
                                </div>
                            </div>

                             <!-- third container -->
                            <div class="trend-container recent">
                                <h4>Recent Work orders</h4>
                               
                                <table class= "wo-recent-table">
                                <thead>
                                <th>Wo #</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Status</th>
                                </thead>

                                <tbody>
                                <tr>
                                <td>wo-1056</td>
                                <td>Preventive</td>
                                <td>PM - bearing inspaction</td>
                                <td>24, May 2024</td>
                                <td class="status completed"><span>Compeleted</span></td>
                                </tr>

                                <tr>
                                <td>wo-1056</td>
                                <td>Preventive</td>
                                <td>PM - bearing inspaction</td>
                                <td>24, May 2024</td>
                                <td class="status completed"> <span>Compeleted</span></td>
                                </tr>
                                </tbody>
                                </table>
                            </div>

                    </article>
                    <!-- End Failure analysis -->

                </section>

            </main>
`;

  mainContiner.innerHTML = Htmltext;



  // call your functions
  localStorage.clear();

  RenderCategoryOfAssets();
  trackSelectChange();
  RenderAnalyzier();

  changeTheTimeInterval();
}


function RenderActions() {
  RenderAssetDataCard();
  ReliablilityTrend();
  MaintanbilityTrend();
  RenderMtbfTrend();
  RenderMttrTrend()
  RenderAvailabilityTrend();
  PmComplianceTrend();
  RenderWorkOrderDistribution();
  RenderAssetHealthy();
  RenderRecentWorkOrder();
}

function RenderAnalyzier() {
  const assetSelect = document.querySelector('.toolbar-analytic #analytic-asset-name');


  assetSelect.addEventListener('change', (e) => {

    if (e.target.value == 'none') return;
    AssetDefinition = localStorage.getItem(e.target.value);
    RenderActions();
  });

}

function changeTheTimeInterval() {
  const rangeSelect = document.querySelector('.toolbar-analytic #analytic-date-range');

  rangeSelect.addEventListener('change', e => {

    console.log(e.target.value);
    switch (e.target.value) {
      case '3m':
        MonthDefinition = 3;
        break;

      case '6m':
        MonthDefinition = 6;
        break;

      case '12m':
        MonthDefinition = 12;
        break;
    }

    RenderActions();
  });


}


function trackSelectChange() {
  const categorySelector = document.querySelector('#analytic-asset-category');

  categorySelector.addEventListener('change', checkState)
}

function checkState(e) {
  console.log(e.target.value)

  const assetSelect = document.querySelector('.toolbar-analytic #analytic-asset-name');
  const rangeSelect = document.querySelector('.toolbar-analytic #analytic-date-range');

  const assetLabel = document.querySelector('.toolbar-analytic label[for="analytic-asset-name"]>p');
  const rangeLabel = document.querySelector('.toolbar-analytic label[for="analytic-date-range"]>p');

  if (e.target.value == 'none') {
    assetSelect.style.display = 'none';
    assetLabel.style.display = 'none';

    rangeSelect.style.display = 'none';
    rangeLabel.style.display = 'none';
    return
  }

  fetchDesiredAsset(e.target.value);

  assetSelect.style.display = 'block';
  assetLabel.style.display = 'block';

  rangeSelect.style.display = 'block';
  rangeLabel.style.display = 'block';
}

async function fetchDesiredAsset(categoryName) {

  const succeed = await fetchAPI(URI + `v1/assets/assets-for-category?category=${categoryName}`);

  if (!HasData(succeed)) return;

  console.log(succeed);

  fillInSelectAsset(succeed);
}

function fillInSelectAsset(data) {
  // call localStorage

  const assetSelect = document.querySelector('.toolbar-analytic #analytic-asset-name');
  assetSelect.innerHTML = '';

  // analytic-asset-name
  const option = `<option value = "none">Select asset</option>`;
  assetSelect.insertAdjacentHTML("beforeend", option);

  data.forEach(v => {
    localStorage.setItem(v.name, `${v.id}`);

    const option = `<option value = "${v.name}">${v.name}</option>`;

    assetSelect.insertAdjacentHTML("beforeend", option);


  })
}


