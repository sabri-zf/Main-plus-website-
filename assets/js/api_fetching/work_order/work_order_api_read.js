import { fetchAPI } from '../FetchApi.js';
import { RenderCreateWorkOrderModal } from './modals/wo_addNew.js'
import { renderShowDetailsModal } from './modals/wo_showDetails.js'
import { RenderWorkOrderKPI } from '../analytic/FetichKPI.js';
import { URI } from '../../Utility/Configuration.js';
const mainURL = URI + "v1/work-orders";
let Data = [];

export async function renderWorkorderOnDOM(page = 1) {

    mockLoadEffect();
    const succeed = await fetchAPI(`${mainURL}?PageNumber=${page}`);

    if (!succeed) {
        console.error("Loading data has been failed");
        return;
    }

    Data = succeed;
    RenderWorkOrderPage();
}

function mockLoadEffect() {

    const mainContinarClass = document.querySelector('.main-container');
    const waitingEffect = ` <main class="work-order-page">
                <header class="main-head">
                    <h1>worke orders</h1>
                    <p style="text-transform: lowercase;">view and manage and track all maintenance work orders.</p>
                </header>

                <section class="kpi-cards">
                    <div class="cards">
                        <div class="loading shimmer-effect"></div>
                        <div class="continer-card">
                            <div class="wo-icon">
                                <img class="icon" src="./assets/icons/to-do-list.png" alt="opened work order">
                            </div>
                            <div class="title">
                                <p class="title-text"> Total work order</p>
                                <div class="value">
                                    <p>248</p>
                                    <div class="sub-details">
                                        <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="arrow up">
                                        <span class="green">12%</span>
                                        <p>from last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="loading shimmer-effect"></div>
                        <div class="continer-card">
                            <div class="wo-icon orange">
                                <img class="icon" src="./assets/icons/clock.png" alt="opened work order">
                            </div>
                            <div class="title">
                                <p class="title-text"> open</p>
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


                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="loading shimmer-effect"></div>

                        <div class="continer-card">
                            <div class="wo-icon red">
                                <img class="icon calendar" src="./assets/icons/calendar.svg" alt="opened work order">
                            </div>
                            <div class="title">
                                <p class="title-text"> overdue</p>
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


                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="loading shimmer-effect"></div>

                        <div class="continer-card">
                            <div class="wo-icon green">
                                <img class="icon" src="./assets/icons/check.png" alt="availability icon">
                            </div>
                            <div class="title">
                                <p class="title-text"> compeleted</p>
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


                        <div class="linechart-img">

                        </div>
                    </div>

                    <div class="cards">
                        <div class="loading shimmer-effect"></div>

                        <div class="continer-card">
                            <div class="wo-icon blue">
                                <img class="icon blue" src="./assets/icons/pause-circle.svg" alt="total downtime icon">
                            </div>
                            <div class="title">
                                <p class="title-text">total downtime (hrs)</p>
                                <div class="value">
                                    <p>6.5</p>
                                    <div class="sub-details">
                                        <img class="icon arrow-red" src="./assets/icons/arrow-down.svg" alt="arrow up">
                                        <span class="percentage red">3%</span>
                                        <p>from last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="linechart-img">

                        </div>
                    </div>
                </section>


                <section class="wo-toolbar">
                    <div class="wo-toolbar-left">
                        <div class="wo-search">
                            <input id="search-wo" name ="search-filter" type="text" placeholder="Search WO-ID" value="WO-" />
                        </div>

                        <select name="status" id="status_selector">
                            <option selected value="status">Status</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="on-hold">On Hold</option>
                            <option value="completed">Completed</option>
                        </select>

                        <select name="priority" id="priority_selector">
                            <option selected value="">Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <button class="btn-wo btn-outline" type="button">Filters</button>
                        <button class="btn-link-reset" type="button">Reset</button>
                    </div>

                    <div class="wo-toolbar-right">
                        <button id="btn-wo">Create Work Order</button>
                    </div>
                </section>

                <section class="workorder-table-wrap">
                    <table class="workorder-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Due Date</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                        
                            <tr>
                                <td colspan="19">
                                    <div class="loading shimmer-effect"></div>
                                </td>
                            </tr>


                            <tr>
                                <td colspan="19">
                                    <div class="loading shimmer-effect"></div>
                                </td>
                            </tr>


                            <tr>
                                <td colspan="19">
                                    <div class="loading shimmer-effect"></div>
                                </td>
                            </tr>



                            <tr>
                                <td colspan="19">
                                    <div class="loading shimmer-effect"></div>
                                </td>
                            </tr>



                            <tr>
                                <td colspan="19">
                                    <div class="loading shimmer-effect"></div>
                                </td>
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

    mainContinarClass.innerHTML = waitingEffect;
}

function renderHeadingTitle() {

    const header = document.createElement("header");
    header.setAttribute("class", "main-head");

    const headerContant = ` <h1>worke orders</h1>
                    <p style="text-transform: lowercase;">view and manage and track all maintenance work orders.</p>
                    `;

    header.innerHTML = headerContant;
    return header;
}

function renderTablefilterOfTable() {


    const toolBar = document.createElement("section");
    toolBar.setAttribute("class", "wo-toolbar");

    const toolBarContant = `<div class="wo-toolbar-left">
                        <div class="wo-search">
                            <input id="search-wo" type="text" placeholder="Search WO-ID" value="WO-" />
                        </div>

                        <select name="status" id="status_selector">
                            <option selected value="status">Status</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="on-hold">On Hold</option>
                            <option value="completed">Completed</option>
                        </select>

                        <select name="priority" id="priority_selector">
                            <option selected value="">Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <button class="btn-wo btn-outline" type="button">Filters</button>
                        <button class="btn-link-reset" type="button">Reset</button>
                    </div>

                    <div class="wo-toolbar-right">
                        <button class= "btn-create" id="btn-wo">Create Work Order</button>
                    </div>`;

    toolBar.innerHTML = toolBarContant;
    return toolBar;
}

function renderTableWithData() {

    let sectionEle = document.createElement("section");
    sectionEle.setAttribute("class", "workorder-table-wrap");

    let tableEle = document.createElement('table');
    tableEle.setAttribute("class", "workorder-table");
    sectionEle.appendChild(tableEle);

    let tableHeadEle = document.createElement("thead");

    const tableHeader = ` <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Due Date</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>`;

    tableHeadEle.innerHTML = tableHeader;
    tableEle.appendChild(tableHeadEle);

    let tableBody = document.createElement("tbody");
    tableEle.appendChild(tableBody);



    for (let row of Data) {

        const dueDate = new Date(row.dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

        const created = new Date(row.createdDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });


        let createTr = document.createElement('tr');

        const contante = ` <td class="wo-id">${row.workOrderNumber}</td>
                                <td>${row.description}</td>
                                <td>${row.assetName}<span class="asset-code">Unkown</span></td>
                                <td><span class="badge badge-type-${row.type.toLowerCase()}">${row.type}</span></td>
                                <td><span class="badge badge-priority-${row.priority.toLowerCase()}">${row.priority}</span></td>
                                <td><span class="badge badge-status-${row.status.toLowerCase()}">${row.status}</span></td>
                                <td class="assignee-cell">
                                    <span>${row.technicianName}</span>
                                </td>
                                <td>${dueDate}</td>
                                <td>${created}</td>
                                <td><button class="table-action-btn" type="button">⋮</button></td>
                            `;
        createTr.innerHTML = contante;
        console.log(createTr);

        tableBody.appendChild(createTr);
    }



    sectionEle.appendChild(tableEle);

    sectionEle.appendChild(renderTapeOfTotalRows());


    return sectionEle;
}

function renderTapeOfTotalRows() {

    const TotalRows = document.createElement('div');
    TotalRows.setAttribute("class", 'table-footer');

    const extraInfo = ` <p>Showing 1 to 5 of 1,248 results</p>

                        <div class="table-pagination">
                            <button type="button">‹</button>
                            <button type="button" class="is-active">1</button>
                            <button type="button">2</button>
                            <button type="button">3</button>
                            <button type="button">›</button>
                        </div>`;

    TotalRows.innerHTML = extraInfo;
    return TotalRows;
}


function RemoveLoadingShimmerEffect() {

    const LoadingCap = document.querySelectorAll(".loading");
    LoadingCap.forEach(e => {
        e.remove();
    }
    );

    console.log("the process is done");

}

function amendmentStyleOfWorkorderTd() {
    const woIdClasses = document.querySelectorAll(".wo-id");

    woIdClasses.forEach((e) => {
        e.style.padding = 'none';
        e.style.width = '100px';
    });
}

function removeAllMenuBar() {
    const SelectAccessed = document.querySelectorAll(".accessed");
    SelectAccessed.forEach(e => {
        console.log(e.firstChild.hasAttribute("type", "Button"));
        if (!e.firstChild.hasAttribute("type", "Button")) {
            e.firstChild.remove();
            e.removeAttribute("class");
        }
    }
    );
}

function renderMenuBar(createActionBtn) {

    const HtMLText = `<div class ="option-list-continer">
    <ul class ="menu-bar">
    <li class ="option-value show"><span class ="svg-icon">${readSvgShowIcon('#7B3DE6')}</span> <button id class = "wo-btn" ="show-details">Show More</button></li>
    <li class ="option-value update"><span class ="svg-icon">${readSvgUpdateIcon('#7B3DE6')}</span> <button id class = "wo-btn" ="update-wo-btn">Update</button></li>
    <li class ="option-value delete"><span class ="svg-icon">${readSvgDeletIcon('#7B3DE6')}</span> <button id class = "wo-btn"  ="delete-wo-btn">Delete</button></li>
    </ul>
    </div>
    `

    createActionBtn.parentNode.insertAdjacentHTML("afterbegin", HtMLText);
    createActionBtn.parentNode.setAttribute("class", "accessed");

    console.log("it's clicked");
    console.log(createActionBtn);
}

// output function
function RenderWorkOrderPage() {

    const getMainContainerClass = document.querySelector(".main-container");
    getMainContainerClass.innerHTML = '';

    const createMain_workorder = document.createElement('main');
    createMain_workorder.setAttribute("class", "work-order-page");

    // append the contant into the main
    createMain_workorder.append(renderHeadingTitle());
    RenderWorkOrderKPI();
    createMain_workorder.append(renderTablefilterOfTable());
    createMain_workorder.append(renderTableWithData());

    // resize the table data field 
    getMainContainerClass.appendChild(createMain_workorder);
    amendmentStyleOfWorkorderTd();


    const createWoBtn = document.querySelector(".btn-create");
    const ActionBtns = document.querySelectorAll(".table-action-btn");
    const RestFilter = document.querySelector(".btn-link-reset");

    RestFilter.addEventListener('click', restAllThings);
    createWoBtn.addEventListener('click', RenderCreateWorkOrderModal);

    ActionBtns.forEach(e => {

        e.onclick = () => {

            if (e.parentNode.hasAttribute("class")) {
                removeAllMenuBar();
                return;
            }

            removeAllMenuBar();
            renderMenuBar(e);

            const ShowObj = {};
            ShowObj.parentTr = e.parentNode.parentNode;
            ShowObj.ShowClass = document.querySelector('li.show');
            showWorkOrderDetailsAction(ShowObj);
        }
    }
    );


}

function showWorkOrderDetailsAction(ShowObj) {

    // if (ShowObj.ShowClass == null) return;
    ShowObj.ShowClass.addEventListener('click', () => {
        const WoNumber = ShowObj.parentTr.firstChild.nextElementSibling.innerHTML;
        console.log(WoNumber);
        renderShowDetailsModal(WoNumber);
    });
}

function restAllThings() {


    console.log("clicked")
    const searchBar = document.querySelector('#search-wo');
    const statusSelector = document.querySelector('#status_selector');
    const priotitySelector = document.querySelector('#priority_selector');

    searchBar.value = 'WO-';
    statusSelector.selectedIndex = 0;
    priotitySelector.selectedIndex = 0;
}



export function readSvgShowIcon(fill, width = "20") {
    return `<svg width=${width} height="20" fill="${fill}" viewBox="0 -16 544 544" xmlns="http://www.w3.org/2000/svg"><title>show</title><path d="M272 400q-67 0-121-39-55-39-87-105 32-66 87-105 54-39 121-39 64 0 120 41 56 40 88 103-32 63-88 104-56 40-120 40m0-48q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28m0-40q-23 0-39-16-17-17-17-40t17-39q16-17 39-17t40 17q16 16 16 39t-16 40q-17 16-40 16"/></svg>`;
}

export function readSvgUpdateIcon(fill, width) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width=${width} height="20" fill="${fill}" viewBox="0 0 20 20" xml:space="preserve"><path d="M17 20H1c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1h9v2H2v14h14v-8h2v9c0 .6-.4 1-1 1"/><path d="M9.3 10.7c-.4-.4-.4-1 0-1.4l9-9c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-9 9c-.4.4-1 .4-1.4 0"/></svg>`;
}

export function readSvgDeletIcon(fill, width = "20") {
    return `<svg width=${width} height="20" viewBox="0 0 24 24" fill="${fill}" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"/></svg>`;
}