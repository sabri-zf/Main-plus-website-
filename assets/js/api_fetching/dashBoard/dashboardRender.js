import { URI } from '../../Utility/Configuration.js';
import { build_bar_chart, bulid_doughnut_chart, bulid_line_chart } from '../../chart_manipulation/dashboard_render.js';
import { HasData } from '../Assets/assetRender.js';
import { fetchAPI } from '../FetchApi.js';
import { mockLoadEffect, RenderDashbordKpi } from '../analytic/FetichKPI.js';


const mainURL = URI + 'v1/dashboad/';

async function renderBarChart() {

    mockLoadEffect('.box.bar-chart');

    const succeed = await fetchAPI(mainURL + 'analytic/monthly-wo-type-count');

    if (succeed == null || succeed == undefined) {
        console.log("Failed to Fetch data from Server");
        return;
    }

    build_bar_chart("#mychart", succeed);
}

async function renderWorkOrderStatusChart() {

    let config_doughnut1 =
    {
        data: [12, 10, 4, 10],
        bg_colors: ["#8d4fffa4", "#2564eb7b", "#16A34A", "#e9c318", "#c72318", "#268fe4"],
        Lable: ["opened", 'On Hold', 'Completed', 'Cancelled', 'Closed', 'In progress'],
        display: false
    }
    config_doughnut1.data = Array(6).fill(0);


    mockLoadEffect('.box.doughnut-chart');

    const succeed = await fetchAPI(mainURL + 'analytic/work-order-status-count');

    if (succeed == null || succeed == undefined) {
        console.log("Failed to Fetch data from Server");
        return;
    }

    succeed.forEach(e => {
        fill_IN_WorkOrder_Status(e, config_doughnut1.data)
    });

    bulid_doughnut_chart('#doughnut-chart', config_doughnut1);

    adjustTotalState(config_doughnut1.data, '.doughunt-contianer-box>.total-state>p');
}

export function adjustTotalState(data, className) {
    const Total = data.reduce((sum, current) => sum + current, 0);
    const TotalState = document.querySelector(className);

    console.log(TotalState);
    if (Total < 10) {
        TotalState.innerHTML = 'Total ' + Total.toString().padStart(2, '0');
    } else {
        TotalState.innerHTML = 'Total ' + Total;
    }
}

function fill_IN_WorkOrder_Status(Status, data) {

    switch (Status.statusName) {
        case 'Open':
            data[0] = Status.count;
            break;
        case 'On_Hold':
            data[1] = Status.count;
            break;
        case 'Completed':
            data[2] = Status.count;
            break;
        case 'Cancelled':
            data[3] = Status.count;
            break;
        case 'Closed':
            data[4] = Status.count;
            break;
        case 'In_progress':
            data[5] = Status.count;
            break;
    }
}

async function renderMTBF_MTTRLineChart() {

    mockLoadEffect('.box.mtbf-chart');
    const succeed = await fetchAPI('http://192.168.43.111:5189/api/v1/dashboad/mttb-and-mttr-trend');

    if (!HasData(succeed)) return;


    console.log("heelo")

    RenderMttr_MtbfChart(succeed);
}

function RenderMttr_MtbfChart(data) {

    //  "mtbf": 543.3,
    // "mttr": 24.9,
    // "monthNumber": 1


    let Config =
    {
        mtbf: [],
        mttr: [],
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        minValue: 0,
        maxValue: 0
    }
    data.forEach(v => {

        console.log(v);
        Config.mtbf[v.monthNumber - 1] = v.mtbf;
        Config.mttr[v.monthNumber - 1] = v.mttr;
    });

    Config.maxValue = Math.max(Config.mtbf.flat(Config.mttr));

    bulid_line_chart("#line-chart", Config);
}

async function RenderRecentWorkOrder() {

    mockLoadEffect('.box.recent-work-order');

    const succeed = await fetchAPI(mainURL + 'recent-work-order');
    if (succeed == null || succeed == undefined) {
        console.log("Failed to Fetch data from Server");
        return;
    }

    Fill_In_RecentWOrkOrder(succeed);
}
function Fill_In_RecentWOrkOrder(data) {
    const list = document.querySelector('.work-order-recent-list> .wo-list');
    list.innerHTML = '';
    console.log(data);

    for (const obj of data) {

        let ListItem = `   <li class="card-details">
                                    <div class="wo-id-machinename">
                                        <div class="wo-icon">
                                            <img class="icon" src="./assets/icons/to-do-list.png"
                                                alt="opened work order">
                                        </div>
                                        <div class="text-details">
                                            <p>${obj.workorderNumber}</p>
                                            <p class="status-wo">${obj.description}</p>
                                        </div>
                                    </div>
                                    <div class="priority">
                                        <p class="priority-${obj.priority.toLowerCase()}">${obj.priority}</p>
                                    </div>
                                    <div class="time-base-post">
                                        <p>${obj.time}</p>
                                    </div>
                                </li>`;

        list.insertAdjacentHTML('beforeend', ListItem);
    }

}


async function RenderTopFiveAssetsDowntime() {
    mockLoadEffect('.box.top-assets-downtime');

    const succeed = await fetchAPI(mainURL + 'top-five-asset-downtime');

    if (succeed == null || succeed == undefined) {
        console.log("Failed to Fetch data from Server");
        return;
    }

    Fill_In_TopFiveDowntime(succeed);
}
function Fill_In_TopFiveDowntime(data) {
    const tablBady = document.querySelector('.pro-assets-table tbody');

    tablBady.innerHTML = '';

    let index = 1;
    for (const obj of data) {
        console.log(obj);

        const tableRow = `<tr>
                            <td>${obj.assetName}</td>
                            <td>${obj.downtime.toFixed(1)}</td>
                            <td class="total-value">${obj.percentage.toFixed(2)}%
                                <div id="bar-progress-background">
                                    <div class="progress-bar value-${index}"></div>
                                </div>
                            </td>
                        </tr>`;

        tablBady.insertAdjacentHTML('beforeend', tableRow);

        const BarProgress = document.querySelector(`.top-five-assets-table>table>tbody td .progress-bar.value-${index}`);
        BarProgress.style.width = `${obj.percentage}`;

        index++;
    }
}


export async function RenderHealthyAssetIndex() {

    let config_doughnut2 =
    {
        data: [21, 37, 98],
        bg_colors: ["#16A34A", "#D97706", "#DC2626",],
        Lable: ['Healthy', 'Worning', 'Critical'],
        display: false
    }

    mockLoadEffect('.box.assets-health');

    const succeed = await fetchAPI(mainURL + 'healthy-asset-index');

    if (succeed == null || succeed == undefined) {
        console.log("failed fetching data");
        return;
    }

    config_doughnut2.data = CategorizeHealthyAssetsIndex(succeed)

    bulid_doughnut_chart('#doughnut-chart-2', config_doughnut2);

    adjustTotalState(config_doughnut2.data, '.box.assets-health .doughunt-contianer-box> .total-state>p');
}

function CategorizeHealthyAssetsIndex(data) {
    const healthyCategories = [0, 0, 0];

    data.forEach(e => {
        if (e.assetHalthy >= 80) {
            healthyCategories[0] += 1;

        }
        else if (e.assetHalthy >= 50 && e.assetHalthy < 80) {
            healthyCategories[1] += 1;

        }
        else {
            healthyCategories[2] += 1;
        }
    });

    return healthyCategories;
}

export function RenderDashboard() {

    const mainContiner = document.querySelector('.main-container');

    mainContiner.innerHTML = '';

    const staticHtmlDashbord = ` <main class="main-page dashbord-data">
                <header class="main-head">
                    <h1>dashboard</h1>
                    <p>Welecome to back,<span id="username">sabri</span>! here waht occurred in your maintenance
                        operations
                        today</p>
                </header>

                <section class="kpi-cards">
                    <div class="cards">
                        <div class="continer-card">
                            <div class="wo-icon">
                                <img class="icon" src="./assets/icons/to-do-list.png" alt="opened work order">
                            </div>
                            <div class="title">
                                <p class="title-text"> opened work order</p>
                                <div class="value">
                                    <p>24</p>
                                    <div class="sub-details">
                                        <img class="icon" src="./assets/icons/arrow-up.svg" alt="arrow up">
                                        <span>12%</span>
                                        <p>from yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="continer-card">
                            <div class="wo-icon green">
                                <img class="icon" src="./assets/icons/check.png" alt="opened work order">
                            </div>
                            <div class="title">
                                <p class="title-text"> compeleted today</p>
                                <div class="value">
                                    <p>18</p>
                                    <div class="sub-details">
                                        <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="arrow up">
                                        <span class="percentage green">8%</span>
                                        <p>from yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="continer-card">
                            <div class="wo-icon orange">
                                <img class="icon" src="./assets/icons/clock.png" alt="opened work order">
                            </div>
                            <div class="title">
                                <p class="title-text"> overdue work order</p>
                                <div class="value">
                                    <p>07</p>
                                    <div class="sub-details">
                                        <img class="icon arrow-orange" src="./assets/icons/arrow-up.svg" alt="arrow up">
                                        <span class="percentage orange">16%</span>
                                        <p>from yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="continer-card">
                            <div class="wo-icon green">
                                <img class="icon" src="./assets/icons/availability.png" alt="availability icon">
                            </div>
                            <div class="title">
                                <p class="title-text"> assets availability</p>
                                <div class="value">
                                    <p>92.5%</p>
                                    <div class="sub-details">
                                        <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="arrow up">
                                        <span class="percentage green">2.4%</span>
                                        <p>from yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="continer-card">
                            <div class="wo-icon red">
                                <img class="icon" src="./assets/icons/downtime.png" alt="total downtime icon">
                            </div>
                            <div class="title">
                                <p class="title-text">total downtime (hrs)</p>
                                <div class="value">
                                    <p>6.5</p>
                                    <div class="sub-details">
                                        <img class="icon arrow-red" src="./assets/icons/arrow-up.svg" alt="arrow up">
                                        <span class="percentage red">18%</span>
                                        <p>from yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="linechart-img">

                        </div>
                    </div>

                </section>


                <section class="grid-dashbord">
                    <div class="box bar-chart ">
                        <div class="details-of-chart">
                            <div class="title-and-selection">
                                <h4 class="chart-title">work orders overview</h4>
                                <select name="date" id="select-date">
                                    <option value="week"> this week</option>
                                    <option value="monthly">this month</option>
                                    <option value="annually"> this year</option>
                                </select>
                            </div>

                            <div class="legend-data">
                                <ul>
                                    <li><span class="circle primary"></span> reactive maintenace</li>
                                    <li><span class="circle secondary"></span> preventive maintenace</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bar-container">
                            <canvas id="mychart"></canvas>
                        </div>
                    </div>

                    <div class="box doughnut-chart">
                        <div class="details-of-chart">
                            <div class="title-and-selection">
                                <h4 class="chart-title">work orders state</h4>
                            </div>
                        </div>

                       

                        <div class="doughunt-contianer-box">
                        <div class="total-state">
                            <p>total 124</p>
                        </div>
                            <div class="doughnut-container">
                                <canvas id="doughnut-chart"></canvas>
                            </div>

                            <div class="dounghnut-legend">
                                <ul>
                                    <li><span class="circle primary"></span>open</li>
                                    <li><span class="circle secondary"></span>in progress</li>
                                    <li><span class="circle thrid"></span>on hold</li>
                                    <li><span class="circle fourth"></span>completed</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="box mtbf-chart">
                        <div class="details-of-chart">
                            <div class="title-and-selection">
                                <h4 class="chart-title">MTBF vs MTTR</h4>
                            </div>

                             <div class="legend-data mtbf-mttr-chart-legend">
                            <ul>
                                <li><span class="circle primary"></span>MTBF</li>
                                <li><span class="circle secondary"></span> MTTR</li>
                            </ul>
                        </div>
                        </div>
                        <div class="mtbf-chart-contianer">
                            <canvas id="line-chart"></canvas>
                        </div>
                    </div>
                    <div class="box recent-work-order">
                        <div class="details-of-chart">
                            <div class="title-and-selection">
                                <h4 class="chart-title">recent work orders</h4>
                                <button class="btn-view-all-recent-work-order">view all</button>
                            </div>
                        </div>

                        <div class="work-order-recent-list">
                            <ul class="wo-list">
                                <li class="card-details">
                                    <div class="wo-id-machinename">
                                        <div class="wo-icon">
                                            <img class="icon" src="./assets/icons/to-do-list.png"
                                                alt="opened work order">
                                        </div>
                                        <div class="text-details">
                                            <p>WO-1024</p>
                                            <p class="status-wo">Pump not staring</p>
                                        </div>
                                    </div>
                                    <div class="priority">
                                        <p class="priority-high">high</p>
                                    </div>
                                    <div class="time-base-post">
                                        <p>2h ago</p>
                                    </div>
                                </li>

                                <li class="card-details">
                                    <div class="wo-id-machinename">
                                        <div class="wo-icon">
                                            <img class="icon" src="./assets/icons/to-do-list.png"
                                                alt="opened work order">
                                        </div>
                                        <div class="text-details">
                                            <p>WO-1024</p>
                                            <p class="status-wo">Pump not staring</p>
                                        </div>
                                    </div>
                                    <div class="priority">
                                        <p class="priority-high">high</p>
                                    </div>
                                    <div class="time-base-post">
                                        <p>2h ago</p>
                                    </div>
                                </li>

                                <li class="card-details">
                                    <div class="wo-id-machinename">
                                        <div class="wo-icon">
                                            <img class="icon" src="./assets/icons/to-do-list.png"
                                                alt="opened work order">
                                        </div>
                                        <div class="text-details">
                                            <p>WO-1024</p>
                                            <p class="status-wo">Pump not staring</p>
                                        </div>
                                    </div>
                                    <div class="priority">
                                        <p class="priority-medium">medium</p>
                                    </div>
                                    <div class="time-base-post">
                                        <p>2h ago</p>
                                    </div>
                                </li>

                                <li class="card-details">
                                    <div class="wo-id-machinename">
                                        <div class="wo-icon">
                                            <img class="icon" src="./assets/icons/to-do-list.png"
                                                alt="opened work order">
                                        </div>
                                        <div class="text-details">
                                            <p>WO-1024</p>
                                            <p class="status-wo">Pump not staring</p>
                                        </div>
                                    </div>
                                    <div class="priority">
                                        <p class="priority-high">high</p>
                                    </div>
                                    <div class="time-base-post">
                                        <p>2h ago</p>
                                    </div>
                                </li>

                                <li class="card-details">
                                    <div class="wo-id-machinename">
                                        <div class="wo-icon">
                                            <img class="icon" src="./assets/icons/to-do-list.png"
                                                alt="opened work order">
                                        </div>
                                        <div class="text-details">
                                            <p>WO-1024</p>
                                            <p class="status-wo">Pump not staring</p>
                                        </div>
                                    </div>
                                    <div class="priority">
                                        <p class="priority-low">low</p>
                                    </div>
                                    <div class="time-base-post">
                                        <p>2h ago</p>
                                    </div>
                                </li>

                                <li class="card-details">
                                    <div class="wo-id-machinename">
                                        <div class="wo-icon">
                                            <img class="icon" src="./assets/icons/to-do-list.png"
                                                alt="opened work order">
                                        </div>
                                        <div class="text-details">
                                            <p>WO-1024</p>
                                            <p class="status-wo">Pump not staring</p>
                                        </div>
                                    </div>
                                    <div class="priority">
                                        <p class="priority-medium">medium</p>
                                    </div>
                                    <div class="time-base-post">
                                        <p>2h ago</p>
                                    </div>
                                </li>

                            </ul>
                        </div>

                    </div>

                    <div class="box top-assets-downtime">
                        <div class="details-of-chart">
                            <div class="title-and-selection">
                                <h4 class="chart-title">top 5 assets by downtime</h4>
                            </div>
                        </div>

                        <div class="top-five-assets-table">
                            <table class="pro-assets-table">
                                <thead>
                                    <tr>
                                        <th>assets</th>
                                        <th>downtime (hrs)</th>
                                        <th>total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>centrifugal pump #1</td>
                                        <td>1.8</td>
                                        <td class="total-value">19.6% <div class="progress-bar value-1"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>compressor #3</td>
                                        <td>1.2</td>
                                        <td class="total-value">13.0% <div class="progress-bar value-2"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>HVAC unit #2</td>
                                        <td>0.9</td>
                                        <td class="total-value">9.8% <div class="progress-bar value-3"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>generator #1</td>
                                        <td>0.4</td>
                                        <td class="total-value">4.3% <div class="progress-bar value-4"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>centrifugal pump #1</td>
                                        <td>0.3</td>
                                        <td class="total-value">3.3% <div class="progress-bar value-5"></div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class=" box assets-health">
                        <div class="details-of-chart">
                            <div class="title-and-selection">
                                <h4 class="chart-title">assets by healthy</h4>
                            </div>
                        </div>
                        <div class="doughunt-contianer-box">
                         <div class="total-state">
                            <p>total 124</p>
                        </div>
                            <div class="doughnut-container asset-health">
                                <canvas id="doughnut-chart-2"></canvas>
                            </div>

                            <div class="dounghnut-legend asset-health-legend">
                                <ul>
                                    <li><span class="circle healthy"></span>healthy</li>
                                    <li><span class="circle worning"></span>in worning</li>
                                    <li><span class="circle critical"></span>critical</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>
            </main>`;

    mainContiner.innerHTML = staticHtmlDashbord;


    RenderDashbordKpi();
    renderBarChart();
    renderWorkOrderStatusChart();
    renderMTBF_MTTRLineChart();
    RenderRecentWorkOrder();
    RenderTopFiveAssetsDowntime();
    RenderHealthyAssetIndex();

}

