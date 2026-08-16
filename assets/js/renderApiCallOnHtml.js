`use strict`
import { renderWorkorderOnDOM } from './api_fetching/work_order/work_order_api_read.js';
import { RenderDashboard } from './api_fetching/dashBoard/dashboardRender.js'
import { RenderAsssetsDemo } from './api_fetching/Assets/assetRender.js';
import { renderPreventiveMainteanceDemo } from './api_fetching/preventiveMaintenance/renderPM.js';
import { renderInventoryDemo } from './api_fetching/Inventory/renderInventory.js';
import { renderAnalyticDemo } from './api_fetching/analytic/rernderAnalytic.js';
import { RenderRealMonitoring } from './api_fetching/monitoring/RenderMonitoring.js';

import { startVibrationStream, updateUI } from './real_time/vibration_real_time.js';

const dashBordBtn = document.querySelector(".dashbord-btn");
const workorderBtn = document.querySelector(".workorder-btn");
const assetsBtn = document.querySelector(".assets-btn");
const pmBtn = document.querySelector(".pm-btn");
const inventoryBtn = document.querySelector(".inventory-btn");
const analyticBtn = document.querySelector(".analytic-btn");
const monitoringBtn = document.querySelector(".real-monitoring-btn");



// RenderCreateWorkOrderModal();

function reset() {
    dashBordBtn.removeAttribute("id");
    workorderBtn.removeAttribute("id");
    assetsBtn.removeAttribute("id");
    pmBtn.removeAttribute("id");
    inventoryBtn.removeAttribute("id");
    analyticBtn.removeAttribute("id");
    monitoringBtn.removeAttribute("id");
}
function addActivePageId(callback, apiRending) {
    reset();
    callback.setAttribute("id", "active-page");
    apiRending();
}

//on clikc add id active-page
dashBordBtn.onclick = () => addActivePageId(dashBordBtn, RenderDashboard);
workorderBtn.onclick = () => addActivePageId(workorderBtn, renderWorkorderOnDOM);
assetsBtn.onclick = () => addActivePageId(assetsBtn, RenderAsssetsDemo);
pmBtn.onclick = () => addActivePageId(pmBtn, renderPreventiveMainteanceDemo);
inventoryBtn.onclick = () => addActivePageId(inventoryBtn, renderInventoryDemo);
analyticBtn.onclick = () => addActivePageId(analyticBtn, renderAnalyticDemo);
monitoringBtn.onclick = () => addActivePageId(monitoringBtn, RenderRealMonitoring)

RenderDashboard();


// FK_DownTimeEvents_WorkOrders_WO_ID
// FK_WorkOrderHisties_WorkOrders_WO_ID
// FK_WorkOrderParts_WorkOrders_WO_ID
// FK_WorkOrders_Assets_AssetID
// FK_WorkOrders_PreventiveMaintenances_PreventiveMaintenanceID
// FK_WorkOrders_Technicians_AssignedToID
// FK_WorkOrders_Users_CreatedByID

// startVibrationStream();

// updateUI();


