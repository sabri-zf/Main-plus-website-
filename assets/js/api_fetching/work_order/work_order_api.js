

const mainURL = "http://localhost:5189/api/v1/work-orders";

let Data = [];
export async function get_workOrderData(page = 1) {

    try {

        let response = await fetch(`${mainURL}?PageNumber${page}`);
        if (response.status != 200) {
            console.error(`(Status:${response.status}) - Erro occurred in the operation of fetch data `)
        }


        const reslut = await response.json();

        Resolved_Data(reslut);
    } catch (e) {
        console.error(e);
    }

}

function Resolved_Data(data) {

    Data = data;
}

export function renderWorkorderOnDOM() {

    const timeoutId = setTimeout(RenderWorkOrderPage, 2000);
    // clearTimeout(timeoutId);
}


// function LabelOfMonths(index) {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     return months[index - 1];
// }


function renderHeadingTitle() {

    const header = document.createElement("header");
    header.setAttribute("class", "main-head");

    const headerContant = ` <h1>worke orders</h1>
                    <p style="text-transform: lowercase;">view and manage and track all maintenance work orders.</p>
                    `;

    header.innerHTML = headerContant;
    return header;
}

function renderKpiCards() {
    const Card_KPI_Section = document.createElement("section");
    Card_KPI_Section.setAttribute("class", "kpi-cards");

    const cards_contant = `<div class="cards">
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
`;

    Card_KPI_Section.innerHTML = cards_contant;


    return Card_KPI_Section;

}

function renderTablefilterOfTable() {

    const toolBar = document.createElement("section");
    toolBar.setAttribute("class", "wo-toolbar");

    const toolBarContant = `<div class="wo-toolbar-left">
                        <div class="wo-search">
                            <input type="text" placeholder="Search WO-ID" value="WO-" />
                        </div>

                        <select name="status" id="status_selector">
                            <option selected value="">Status</option>
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
function RenderWorkOrderPage() {
    console.log("it's runing");

    RemoveLoadingShimmerEffect();

    const getMainContainerClass = document.querySelector(".main-container");

    getMainContainerClass.innerHTML = '';

    const createMain_workorder = document.createElement('main');
    createMain_workorder.setAttribute("class", "work-order-page");

    // append the contant into the main
    createMain_workorder.append(renderHeadingTitle());
    createMain_workorder.append(renderKpiCards());
    createMain_workorder.append(renderTablefilterOfTable());
    createMain_workorder.append(renderTableWithData());

    // resize the table data field 
    getMainContainerClass.appendChild(createMain_workorder);

    console.log(getMainContainerClass);
    amendmentStyleOfWorkorderTd();

}

function amendmentStyleOfWorkorderTd() {
    const woIdClasses = document.querySelectorAll(".wo-id");

    console.log(woIdClasses)
    woIdClasses.forEach((e) => {
        e.style.padding = 'none';
        e.style.width = 'inherit';
    });
}


// ActivePage.addEventListener("click", Render_work_order_table);

