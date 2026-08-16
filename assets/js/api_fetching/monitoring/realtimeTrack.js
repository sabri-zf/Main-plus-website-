import { startVibrationStream } from "../../real_time/vibration_real_time";
import { URI } from "../../Utility/Configuration";
import { PostQueryAPI } from "../FetchApi";
import { RenderRealMonitoring } from "./RenderMonitoring";


export function renderRealTimeMonitoring() {

    const btn = '.monitoring-action-btn--monitor';
    const openChartPageBtn = document.querySelectorAll(btn);


    openChartPageBtn.forEach(e => {
        e.addEventListener('click', () => { chartPage(e) });

    });

}

function chartPage(e) {
    localStorage.clear();
    getHeadData(e)
    getBodyData(e);

    RenderMonitoringPage();
    setValuesOnPage();
}

function getHeadData(e) {
    const machineName = e.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.textContent;
    const IsActive = e.parentElement.parentElement.querySelector(".monitoring-machine-badge--active").textContent == 'active' ? true : false;
    const tagNumber = e.parentElement.parentElement.firstElementChild.nextSibling.nextSibling.textContent;

    localStorage.setItem("IsActive", IsActive);
    localStorage.setItem("MachineName", machineName);
    localStorage.setItem("TagNumber", tagNumber);
}

function getBodyData(e) {
    const bodyElement = e.parentElement.parentElement.querySelector(".monitoring-machine-card__body .monitoring-machine-card__meta");
    const Location = bodyElement.firstElementChild.lastElementChild.textContent;
    const InstailltionDate = bodyElement.firstElementChild.nextSibling.nextSibling.lastElementChild.textContent;

    localStorage.setItem("Location", Location);
    localStorage.setItem("Installation", InstailltionDate);

}


function RenderMonitoringPage() {

    const Contaniner = document.querySelector(".main-container");

    Contaniner.innerHTML = "";

    const htmlContant = `  <main class="real-monitoring-vibration">

                <header class="vibration-head">
                    <section class="Vib-title">
                        <h2 id="machine-Name">Machine Name</h2>
                        <span class="machine-status online"><i class="metadata-icon"><img
                                    src="./assets/icons/correctness.svg" alt=""></i> Online</span>
                    </section>
                    <section class="machine-metadata">
                        <ul>
                            <li class="machine-data "><i class="metadata-icon"><img src="./assets/icons/MachineID.svg"
                                        alt="" srcset=""></i>Machine ID: CPM-1002</li>
                            <li class="machine-data "><i class="metadata-icon"><img src="./assets/icons/Location.svg"
                                        alt="" srcset=""></i>Location: bulding B</li>
                            <li class="machine-data "><i class="metadata-icon"><img src="./assets/icons/calender.svg"
                                        alt="" srcset=""></i>Installed: may, 25 2016</li>
                        </ul>
                    </section>
                </header>

                <section class="metadata-vib">
                    <article class="card">
                        <div class="title">
                            <i class="metadata-icon "> <img src="./assets/icons/Rsm_vib.svg" alt=""></i>
                            <h3>Overall Vibration (RMS)</h3>
                        </div>
                        <div class="vib-info">
                            <p class="vib-rms-value">22.3 mm/s</p>
                            <span class="vib-rms status-normal">Normal</span>
                        </div>
                    </article>

                    <article class="card">
                        <div class="title">
                            <i class="metadata-icon "> <img src="./assets/icons/x-horizantal.svg" alt=""></i>
                            <h3 id="Axis">x-axis (RMS)</h3>
                        </div>
                        <div class="vib-info">
                            <p class="vib-rms-value">2.10 mm/s</p>
                            <span class="vib-rms status-normal">Normal</span>
                        </div>
                    </article>


                    <article class="card">
                        <div class="title">
                            <i class="metadata-icon temperature "> <img src="./assets/icons/thermometer.svg" alt=""></i>
                            <h3>Temprature</h3>
                        </div>
                        <div class="vib-info">
                            <p class="vib-rms-value">61.8 C</p>
                            <span class="vib-rms status-normal">Normal</span>
                        </div>
                    </article>

                    <article class="card">
                        <div class="title">
                            <i class="metadata-icon healthy "> <img src="./assets/icons/health.svg" alt=""></i>
                            <h3>Machine health</h3>
                        </div>
                        <div class="vib-info">
                            <p class="vib-rms-value">92%</p>
                            <span class="vib-rms status-excellent">Excellent</span>
                        </div>
                    </article>
                </section>


                <section class="deomin-container">

                    <article class="monitoring-visualization-area">
                        <div class="time-domin">
                            <header class="title">
                                <h3>Time Domian</h3>
                                <div class="tape-bar">
                                    <div class="last-update-data">
                                        <span class="live-dot offline"></span>
                                        <span>Live</span>
                                    </div>

                                    <div class="selection-option">
                                        <select name="axis" id="select-axis">
                                            <option value="X">X-axis</option>
                                            <option value="Y">Y-axis</option>
                                            <option value="Z">Z-axis</option>
                                        </select>
                                    </div>

                                </div>
                            </header>

                            <div class="container_chart">
                                <div id="vibration-chart">
                                </div>
                            </div>

                        </div>

                        <div class="frequency-domain">
                            <header class="title">
                                <h3>frequency Domian</h3>
                                <div class="last-update-data">
                                    <span class="live-dot offline"></span>
                                    <span>Live</span>
                                </div>
                            </header>
                            <div class="container_chart">
                                <div id="frequency-chart">
                                </div>
                            </div>
                        </div>

                    </article>

                    <aside class="general-info">

                        <div class="box">
                            <h3>Overall Daignosis</h3>
                            <div class="status-overview normal">
                                <div class="stauts-info">
                                    <img src="./assets/icons/correctness.svg" alt="">
                                    <p class="normal">Normal Condition</p>
                                </div>
                                <p class="normal">Vibration levels are within acceptable range</p>
                            </div>
                        </div>
                        <div class="box">
                            <h3>Sensor Information</h3>
                            <ul class="info_list">
                                <li>
                                    <div class="left-label">
                                        <p>Sensor Type</p>
                                    </div>
                                    <div class="right-label">
                                        <p>Vibration Sensor</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="left-label">
                                        <p>Serinal Number</p>
                                    </div>
                                    <div class="right-label">
                                        <p>vs-00012</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="left-label">
                                        <p>Sensitivity</p>
                                    </div>
                                    <div class="right-label">
                                        <p>3g</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="box">
                            <h3>Quick info</h3>

                            <ul class="info_list quick-info">
                                <li>
                                    <div class="left-label">
                                        <p>Location</p>
                                    </div>
                                    <div class="right-label">
                                        <p>Building A</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="left-label">
                                        <p>Machine Speed</p>
                                    </div>
                                    <div class="right-label">
                                        <p>1500 RPM</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="left-label">
                                        <p>Runtime</p>
                                    </div>
                                    <div class="right-label">
                                        <p>2468.3 h</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>

                </section>
            </main>`;

    Contaniner.insertAdjacentHTML("beforeend", htmlContant);
    // setValuesOnPage();
    startVibrationStream();

    SelectAxis();
}

function setValuesOnPage() {
    const MacineNameEle = document.querySelector(".Vib-title #machine-Name");
    MacineNameEle.textContent = localStorage.getItem("MachineName");
    // const IsActive = document.querySelector(".Vib-title #machine-Name");
    const meataData = document.querySelectorAll(".machine-metadata ul li");

    meataData[0].innerHTML = `<li class="machine-data "><i class="metadata-icon"><img src="./assets/icons/MachineID.svg" alt="" srcset=""></i> Machine ID: ${localStorage.getItem("TagNumber")}</li>`;
    meataData[1].innerHTML = `<li class="machine-data "><i class="metadata-icon"><img src="./assets/icons/Location.svg" alt="" srcset=""></i> ${localStorage.getItem("Location")}</li>`;
    meataData[2].innerHTML = `<li class="machine-data "><i class="metadata-icon"><img src="./assets/icons/calender.svg" alt="" srcset=""></i> ${localStorage.getItem("Installation")}</li>`;
}

function SelectAxis() {

    const Source = URI + 'V1/vibration/axis';
    const axisSelect = document.querySelector("#select-axis");

    axisSelect.addEventListener("change", e => {
        const axis = e.target.value;
        SendTheAxis(Source, axis);
    });
}


async function SendTheAxis(URI, data) {
    const result = await PostQueryAPI(URI, data);

    console.log(result);
}