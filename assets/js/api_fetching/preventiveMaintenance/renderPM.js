import { mockLoadEffect } from "../analytic/FetichKPI";
import { HasData } from "../Assets/assetRender";
import { fetchAPI } from "../FetchApi";



const MainURL = 'http://192.168.43.111:5189/api/v1/pm/';


async function RenderPmTable() {

    mockLoadEffect(".pm-table tbody>tr");

    const succeed = await fetchAPI(MainURL + "view-list");

    if (!HasData(succeed)) return;

    console.log(succeed);

    Fill_IN_PmTable(succeed);
}

function Fill_IN_PmTable(data) {

    const tBodyPm = document.querySelector('.pm-table tbody');
    tBodyPm.innerHTML = '';

    data.forEach(e => {

        const NextDue = new Date(e.nexDue).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

        let LastCompete;
        if (e.lastCompleted == null) {
            LastCompete = "NO yet";
        } else {
            LastCompete = new Date(e.lastCompleted).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        }
        console.log(e);
        const tableRow = `
                            <tr>
                                <td>
                                    ${e.title}
                                    <span class="sub-code">${e.pM_Number}</span>
                                </td>
                                <td>
                                    ${e.assetName}
                                    <span class="sub-code">${e.assetTag}</span>
                                </td>
                                <td>${e.frequency}</td>
                                <td class="due-soon-date">${NextDue}</td>
                                <td><span class="badge badge-priority-${e.priority.toLowerCase()}">${e.priority}</span></td>
                                <td><span class="badge badge-status-due">Due soon</span></td>
                                <td>${LastCompete}</td>
                                <td><button class="table-action-btn" type="button">⋮</button></td>
                            </tr>`;

        tBodyPm.insertAdjacentHTML("beforeend", tableRow);
    });

}


export function renderPreventiveMainteanceDemo() {

    const mainContiner = document.querySelector('.main-container');

    mainContiner.innerHTML = '';

    const renderPmPage = `
        <main class="pm-page">
                <header class="main-head">
                    <h1>Preventive maintenance</h1>
                    <p style="text-transform: lowercase;">view and manage and track all maintenance work orders.</p>
                </header>

               <section class="kpi-cards">

    <div class="cards">
        <div class="continer-card">
            <div class="wo-icon">
                <img class="icon" src="./assets/icons/to-do-list.png" alt="opened work order">
            </div>
            <div class="title">
                <p class="title-text">PM Compliance (%)</p>
                <div class="value">
                    <p>92</p>
                    <div class="sub-details">
                        <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="arrow up">
                        <span class="green">12%</span>
                        <p>from last month</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="linechart-img"></div>
    </div>

    <div class="cards">
        <div class="continer-card">
            <div class="wo-icon orange">
                <img class="icon" src="./assets/icons/clock.png" alt="opened work order">
            </div>
            <div class="title">
                <p class="title-text">Scheduled PM Tasks</p>
                <div class="value">
                    <p>18</p>
                    <div class="sub-details">
                        <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="arrow up">
                        <span class="green">12%</span>
                        <p>from last month</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="linechart-img"></div>
    </div>

    <div class="cards">
        <div class="continer-card">
            <div class="wo-icon red">
                <img class="icon calendar" src="./assets/icons/calendar.svg" alt="opened work order">
            </div>
            <div class="title">
                <p class="title-text">Overdue PM Tasks</p>
                <div class="value">
                    <p>23</p>
                    <div class="sub-details">
                        <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="arrow up">
                        <span class="percentage green">15%</span>
                        <p>from last month</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="linechart-img"></div>
    </div>

    <div class="cards">
        <div class="continer-card">
            <div class="wo-icon green">
                <img class="icon" src="./assets/icons/check.png" alt="availability icon">
            </div>
            <div class="title">
                <p class="title-text">Upcoming PM Tasks</p>
                <div class="value">
                    <p>101</p>
                    <div class="sub-details">
                        <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="arrow up">
                        <span class="percentage green">10%</span>
                        <p>from last month</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="linechart-img"></div>
    </div>

    <div class="cards">
        <div class="continer-card">
            <div class="wo-icon blue">
                <img class="icon blue" src="./assets/icons/pause-circle.svg" alt="total downtime icon">
            </div>
            <div class="title">
                <p class="title-text">Asset Availability (%)</p>
                <div class="value">
                    <p>96.5</p>
                    <div class="sub-details">
                        <img class="icon arrow-red" src="./assets/icons/arrow-down.svg" alt="arrow up">
                        <span class="percentage red">3%</span>
                        <p>from last month</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="linechart-img"></div>
    </div>

</section>

                <section class="pm-toolbar">
                    <div class="pm-toolbar-left">
                        <select name="status" id="pm_status_selector">
                            <option selected value="">Status</option>
                            <option value="due-soon">Due Soon</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="overdue">Overdue</option>
                            <option value="completed">Completed</option>
                        </select>

                        <select name="priority" id="pm_priority_selector">
                            <option selected value="">Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <select name="asset" id="pm_asset_selector">
                            <option selected value="">Asset</option>
                            <option value="pump">Centrifugal Pump #1</option>
                            <option value="motor">Motor #3</option>
                            <option value="sensor">Temperature Sensor #2</option>
                        </select>

                        <select name="location" id="pm_location_selector">
                            <option selected value="">Location</option>
                            <option value="zone-a">Zone A</option>
                            <option value="zone-b">Zone B</option>
                            <option value="zone-c">Zone C</option>
                        </select>

                        <button class="btn-pm btn-outline" type="button">Filters</button>
                        <button class="btn-link-reset" type="button">Reset</button>
                        <button class="btn-pm btn-outline  btn-create-pm" type="button">Create Preventive Maintenance</button>
                    </div>
                </section>

                <section class="pm-table-wrap">
                    <table class="pm-table">
                        <thead>
                            <tr>
                                <th>PM Task / Title</th>
                                <th>Asset</th>
                                <th>Frequency</th>
                                <th>Next Due</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Last Completed</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    Lubricate Bearings
                                    <span class="sub-code">PMT-0012</span>
                                </td>
                                <td>
                                    Centrifugal Pump #1
                                    <span class="sub-code">PMP-001</span>
                                </td>
                                <td>Monthly</td>
                                <td class="due-soon-date">May 26, 2025 <span class="sub-code">4 days</span></td>
                                <td><span class="badge badge-priority-high">High</span></td>
                                <td><span class="badge badge-status-due">Due Soon</span></td>
                                <td>Apr 26, 2025</td>
                                <td><button class="table-action-btn" type="button">⋮</button></td>
                            </tr>

                            <tr>
                                <td>
                                    Inspect Motor
                                    <span class="sub-code">PMT-0013</span>
                                </td>
                                <td>
                                    Motor #3
                                    <span class="sub-code">MTR-003</span>
                                </td>
                                <td>Monthly</td>
                                <td class="due-soon-date">May 27, 2025 <span class="sub-code">3 days</span></td>
                                <td><span class="badge badge-priority-medium">Medium</span></td>
                                <td><span class="badge badge-status-due">Due Soon</span></td>
                                <td>Apr 27, 2025</td>
                                <td><button class="table-action-btn" type="button">⋮</button></td>
                            </tr>

                            <tr>
                                <td>
                                    Clean Air Filter
                                    <span class="sub-code">PMT-0017</span>
                                </td>
                                <td>
                                    Air Compressor #2
                                    <span class="sub-code">CMP-002</span>
                                </td>
                                <td>Monthly</td>
                                <td>Jun 07, 2025 <span class="sub-code">14 days</span></td>
                                <td><span class="badge badge-priority-low">Low</span></td>
                                <td><span class="badge badge-status-scheduled">Scheduled</span></td>
                                <td>May 07, 2025</td>
                                <td><button class="table-action-btn" type="button">⋮</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="table-footer">
                        <p>Showing 1 to 5 of 1,248 results</p>

                        <div class="table-pagination">
                            <button type="button">‹</button>
                            <button type="button" class="is-active">1</button>
                            <button type="button">2</button>
                            <button type="button">3</button>
                            <button type="button">›</button>
                        </div>
                    </div>
                </section>
            </main>`;

    mainContiner.innerHTML = renderPmPage;

    RenderPmTable();
}