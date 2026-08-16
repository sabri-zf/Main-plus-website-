import { fetchAPI } from "../FetchApi";

let Data = []
const coreURL = "http://192.168.43.111:5189/api/v1/dashboad/Kpi";


export async function RenderDashbordKpi() {

    mockLoadEffect();
    let Succeed = await fetchAPI(coreURL);

    if (Succeed == null || Succeed == undefined) {
        console.log("Bad Request, fetch got fail");
        return;
    }

    setDataInKpiDashboardCards(Succeed);
}

export async function RenderWorkOrderKPI() {
    mockLoadEffect('.cards');

    const succeed = await fetchAPI('http://192.168.43.111:5189/api/v1/Kpi/Work-order-matrices');

    if (succeed == null || succeed == undefined) {
        console.error('Error has been happend {Workorder KPI}');

        return;
    }

    console.log(succeed);
    renderKpiCards(succeed);
}

function renderKpiCards(Data) {

    const WorkoRderPage = document.querySelector("main.work-order-page .main-head");
    const Card_KPI_Section = document.createElement("section");
    Card_KPI_Section.setAttribute("class", "kpi-cards");

    console.log(Data);

    const cards_contant = `<div class="cards">
                        <div class="continer-card">
                            <div class="wo-icon">
                                <img class="icon" src="./assets/icons/to-do-list.png" alt="opened work order">
                            </div>
                            <div class="title">
                                <p class="title-text"> Total work order</p>
                                <div class="value">
                                    <p>${Data.total_workOrder}</p>
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
                                    <p>${Data.wo_opened}</p>
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
                                    <p>${Data.wo_overDue}</p>
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
                                    <p>${Data.wo_completed}</p>
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
                                    <p>${Data.assets_totalDowntime}</p>
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

    Card_KPI_Section.insertAdjacentHTML('beforeend', cards_contant);
    WorkoRderPage.insertAdjacentElement("afterend", Card_KPI_Section);
}


export function mockLoadEffect(ClassName = '.kpi-cards .cards', EffectOff = false) {

    if (EffectOff) {

        setTimeout(() => {
            const omittingEffect = document.querySelectorAll('.loading.shimmer-effect');

            omittingEffect.forEach(e => e.remove());
        }, 1000);


        return;
    }
    const ClassValue = document.querySelectorAll(ClassName);
    const ShimmerLoadEffect = `<div class="loading shimmer-effect"></div>`


    ClassValue.forEach(instance => {
        instance.insertAdjacentHTML("afterbegin", ShimmerLoadEffect);
        console.log(`${ClassName}: ${instance}`);
    });
}

function setDataInKpiDashboardCards(Data) {

    mockLoadEffect('.kpi-cards .cards', true);

    console.log(Data);
    const CardsValue = document.querySelectorAll('.kpi-cards .value>p');

    CardsValue[0].textContent = Data.openedWorkorder;
    CardsValue[1].textContent = Data.complatedWorkoRder;
    CardsValue[2].textContent = Data.overDueWorkorder;
    CardsValue[3].textContent = Data.assetsAvailaiblity + '%';
    CardsValue[4].textContent = Data.totalDownTime;
}