import { MakeModalContinaer, MakeblurBackGournd, appendHeroPart, CloseWorkOrderModal, adjustBodySize } from "./wo_addNew.js";

function renderGeneralInfo() {
    const htmlouter = `<section class = "generalInfo" >
                        <h3 class ="heading-h3" >General information</h3>
                        <div class = "general-info-contianer">
                            <div class = "box-left">
                            <ul class = "left-list">

                                <!-- 01-->
                                <li class = "make-sepration">
                                    <h4>Work Order Type</h4>
                                    <span class = "value badge-type-preventive">Preventive.M</span>
                                </li>

                                <!-- 02-->
                                <li class = "make-sepration">
                                    <h4>Priority</h4>
                                    <span class = "value badge-priority-high">High</span>
                                </li>

                                <!-- 03-->
                                <li class = "make-sepration">
                                    <h4>Status</h4>
                                    <span class = "value badge-status-progress">In progress</span>
                                </li>

                                <!-- 04-->
                                <li class = "make-sepration">
                                    <h4>Asset</h4>
                                    <span class = "value">Pump centerfig-033 PUP-23</span>
                                </li>
                            </ul>
                            </div>

                            <div class = "box-right">
                            <ul class = "left-list">

                                <!-- 01-->
                                <li class = "make-sepration">
                                    <h4>Requested By</h4>
                                    <span class = "value">Z.F Sabri</span>
                                </li>

                                <!-- 02-->
                                <li class = "make-sepration">
                                    <h4>Requested Date</h4>
                                    <span class = "value priotiry-high">May 30,2025</span>
                                </li>

                                <!-- 03-->
                                <li class = "make-sepration">
                                    <h4>Due Date</h4>
                                    <span class = "value status-progress">Jue 05,2025</span>
                                </li>

                                <!-- 04-->
                                <li class = "make-sepration">
                                    <h4>Assigned to</h4>
                                    <span class = "value">John smith</span>
                                </li>
                            </div>

                            <div class= "discription">
                            <h4>Description</h4>
                            <p id = "read-Discription">
                            maintain the pump asste under controle all that week,
                                on the other hand, check the frequency of vibration and the heat
                            </p>
                            </div> 
                        </div>
    </section>`

    return htmlouter;
}

function renderAdditionalInfo() {
    const HtmlOuter = `
    <section class = "additional-info-container">
    <h3 class ="heading-h3" >Additional Information</h3>
    <div class = "wrapper-card-data">

        <div class = "left-card">
             <ul class = "left-list">

                                <!-- 01-->
                                <li class = "make-sepration">
                                    <h4>Total MTBF</h4>
                                    <span class = "value">50.9 Hours</span>
                                </li>

                                <!-- 02-->
                                <li class = "make-sepration">
                                    <h4>Total MTTR</h4>
                                    <span class = "value">20.1 Hours</span>
                                </li>
            </ul>
        </div>

        <div class = "right-card">
             <ul class = "right-list">

                                <!-- 01-->
                                <li class = "make-sepration">
                                    <h4>Availability</h4>
                                    <span class = "value">90.3%</span>
                                </li>

                                <!-- 02-->
                                <li class = "make-sepration">
                                    <h4>Total MDT</h4>
                                    <span class = "value">10.0 Hours</span>
                                </li>
            </ul>
        </div>
    </div>
    </section>
    `;


    return HtmlOuter;
}

function renderWorkorderHistory() {
    const HtmalOuter =
        `
        <setection class ="additional-info-container">
                <h3 class ="heading-h3" >Work Order History</h3>

            <div class = "workorder-table-wrap">
                <table class ="workorder-table">
                    <thead>
                        <tr>
                            <th>Wo-ID</th>
                            <th>Action status</th>
                            <th>Action date</th>
                            <th>performed By</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>WO-0156</td>
                            <td class="wo-history"><span class = "badge-status-progress">in progress</span></td>
                            <td>May 25,2026</td>
                            <td>Jame Garden</td>
                        </tr>

                        <tr>
                            <td>WO-0157</td>
                            <td class="wo-history"><span class = "badge-status-completed">Completed</span></td>
                            <td>Mar 15,2026</td>
                            <td>Jame Garden</td>
                        </tr>

                        <tr>
                            <td>WO-0158</td>
                            <td class="wo-history"><span class = "badge-status-onhold">Hold on</span></td>
                            <td>Jun 03,2026</td>
                            <td>Jame Garden</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    `;


    return HtmalOuter;
}

export function renderShowDetailsModal(woNumber) {
    adjustBodySize();
    const blurContiner = MakeblurBackGournd();
    const continer = MakeModalContinaer();
    continer.appendChild(appendHeroPart("Work Order Details", woNumber, "./assets/icons/showdetils.svg", 'UpperCase', '#7B3DE6'))
    continer.insertAdjacentHTML('beforeend', renderGeneralInfo());
    continer.insertAdjacentHTML('beforeend', renderAdditionalInfo());
    continer.insertAdjacentHTML('beforeend', renderWorkorderHistory());

    const CloseWorkOrderBtn = document.querySelector("#close-Wo-page");

    CloseWorkOrderBtn.onclick = () => {

        CloseWorkOrderModal(continer, blurContiner);
    };

    ///close-CreateWo-page
}
