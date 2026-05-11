`use strict`
import { get_workOrderData, renderWorkorderOnDOM } from './api_fetching/work_order/work_order_api.js';

const createWoBtn = document.querySelector("#btn-wo");
const dashBordBtn = document.querySelector(".dashbord-btn");
const workorderBtn = document.querySelector(".workorder-btn");
const assetsBtn = document.querySelector(".assets-btn");
const pmBtn = document.querySelector(".pm-btn");
const inventoryBtn = document.querySelector(".inventory-btn");
const analyticBtn = document.querySelector(".analytic-btn");


function reset() {
    dashBordBtn.removeAttribute("id");
    workorderBtn.removeAttribute("id");
    assetsBtn.removeAttribute("id");
    pmBtn.removeAttribute("id");
    inventoryBtn.removeAttribute("id");
    analyticBtn.removeAttribute("id");
}
function addActivePageId(callback, apiRending) {
    reset();
    callback.setAttribute("id", "active-page");
    apiRending();
}

//on clikc add id active-page
dashBordBtn.onclick = () => addActivePageId(dashBordBtn);
workorderBtn.onclick = () => addActivePageId(workorderBtn, RenderWo_page);
assetsBtn.onclick = () => addActivePageId(assetsBtn);
pmBtn.onclick = () => addActivePageId(pmBtn);
inventoryBtn.onclick = () => addActivePageId(inventoryBtn);
analyticBtn.onclick = () => addActivePageId(analyticBtn);


function RenderWo_page() {
    get_workOrderData();
    renderWorkorderOnDOM();
}


