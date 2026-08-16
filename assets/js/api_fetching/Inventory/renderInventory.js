import { mockLoadEffect } from "../analytic/FetichKPI";
import { HasData } from "../Assets/assetRender";
import { fetchAPI } from "../FetchApi";

const MainURL = 'http://192.168.43.111:5189/api/v1/inventory-items/';

async function RenderInventoryTable() {

  mockLoadEffect('.inv-table tbody tr');

  const succeed = await fetchAPI(MainURL + 'spare-part-list-view');

  if (!HasData(succeed)) return;

  Fill_In_InventoryTable(succeed);
}

function Fill_In_InventoryTable(data) {

  const tBodyInvenoty = document.querySelector('.inv-table tbody');
  tBodyInvenoty.innerHTML = '';

  data.forEach(e => {
    const Status = e.stockStatus == 'Out' ? e.stockStatus + ' Of' : e.stockStatus;

    const tableRowContaint = `
       <tr>
        <td class="inv-code">${e.partNumber}</td>
        <td>${e.itemName}</td>
        <td>${e.category}</td>
        <td>${e.uom}</td>
        <td>${e.location}</td>
        <td>${e.on_Hand}</td>
        <td>${e.reserved}</td>
        <td class="available-good">${e.available}</td>
        <td>$${e.unitOfPrice}</td>
        <td>$${e.totalValue}</td>
        <td><span class="badge-status status-${e.stockStatus.toLowerCase()}">${Status} Stock</span></td>
        <td><button class="table-action-btn" type="button">⋮</button></td>
      </tr>
`;


    tBodyInvenoty.insertAdjacentHTML("beforeend", tableRowContaint);
  });

}


export function renderInventoryDemo() {
  const mainContiner = document.querySelector('.main-container');

  mainContiner.innerHTML = '';

  const assetMainPage = `<main class="inventory-page">
  <!-- heading -->
  <header class="main-head">
    <h1>Inventory</h1>
    <p>Track and manage inventory items, stock levels and locations.</p>
  </header>

  <!-- KPI cards -->
  <section class="kpi-cards inventory-kpis">
    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon">
          <img class="icon" src="./assets/icons/to-do-list.png" alt="Total items" />
        </div>
        <div class="title">
          <p class="title-text">Total Items</p>
          <div class="value">
            <p>1,248</p>
            <div class="sub-details">
              <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
              <span class="green">8%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon green">
          <img class="icon" src="./assets/icons/check.png" alt="In stock" />
        </div>
        <div class="title">
          <p class="title-text">In Stock Items</p>
          <div class="value">
            <p>985</p>
            <div class="sub-details">
              <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
              <span class="green">12%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon red">
          <img class="icon calendar" src="./assets/icons/calendar.svg" alt="Low stock" />
        </div>
        <div class="title">
          <p class="title-text">Low Stock Items</p>
          <div class="value">
            <p>220</p>
            <div class="sub-details">
              <img class="icon arrow-red" src="./assets/icons/arrow-down.svg" alt="down" />
              <span class="red">5%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon orange">
          <img class="icon" src="./assets/icons/clock.png" alt="Out of stock" />
        </div>
        <div class="title">
          <p class="title-text">Out of Stock</p>
          <div class="value">
            <p>7</p>
            <div class="sub-details">
              <img class="icon arrow-red" src="./assets/icons/arrow-down.svg" alt="down" />
              <span class="red">2%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="continer-card">
        <div class="wo-icon orange">
          <img class="icon" src="./assets/icons/clock.png" alt="Reorder items" />
        </div>
        <div class="title">
          <p class="title-text">Reorder Items</p>
          <div class="value">
            <p>36</p>
            <div class="sub-details">
              <img class="icon arrow-green" src="./assets/icons/arrow-up.svg" alt="up" />
              <span class="green">7%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- toolbar -->
  <section class="inv-toolbar">
    <div class="inv-toolbar-left">
      <select name="category" id="inv_category_selector">
        <option selected value="">Category</option>
        <option value="mechanical">Mechanical</option>
        <option value="electrical">Electrical</option>
        <option value="lubricants">Lubricants</option>
      </select>

      <select name="location" id="inv_location_selector">
        <option selected value="">Location</option>
        <option value="main-warehouse">Main Warehouse</option>
        <option value="maintenance-store">Maintenance Store</option>
      </select>

      <select name="status" id="inv_status_selector">
        <option selected value="">Stock Status</option>
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>

      <select name="item-type" id="inv_type_selector">
        <option selected value="">Item Type</option>
        <option value="part">Part</option>
        <option value="consumable">Consumable</option>
        <option value="tool">Tool</option>
      </select>

      <button class="btn-inv btn-outline" type="button">Filters</button>
      <button class="btn-link-reset" type="button">Reset</button>
    </div>

    <div class="inv-toolbar-right">
      <button class="btn-inv btn-primary" type="button">Add Inventory</button>
    </div>
  </section>

  <!-- table -->
 <section class="inv-table-wrap">
  <table class="inv-table">
    <thead>
      <tr>
        <th>Item Code</th>
        <th>Item Name</th>
        <th>Category</th>
        <th>UOM</th>
        <th>Location</th>
        <th>On Hand</th>
        <th>Reserved</th>
        <th>Available</th>
        <th>Unit Cost</th>
        <th>Total Value</th>
        <th>Stock Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="inv-code">ITM-1001</td>
        <td>Bearing 6205</td>
        <td>Mechanical</td>
        <td>PCS</td>
        <td>Main Warehouse</td>
        <td>120</td>
        <td>15</td>
        <td class="available-good">105</td>
        <td>$4.25</td>
        <td>$510.00</td>
        <td><span class="badge-status status-in">In Stock</span></td>
        <td><button class="table-action-btn" type="button">⋮</button></td>
      </tr>
      <tr>
        <td class="inv-code">ITM-1002</td>
        <td>V-Belt A-32</td>
        <td>Mechanical</td>
        <td>PCS</td>
        <td>Main Warehouse</td>
        <td>45</td>
        <td>5</td>
        <td class="available-low">40</td>
        <td>$12.30</td>
        <td>$553.50</td>
        <td><span class="badge-status status-low">Low Stock</span></td>
        <td><button class="table-action-btn" type="button">⋮</button></td>
      </tr>
      <tr>
        <td class="inv-code">ITM-1003</td>
        <td>Motor 5HP</td>
        <td>Electrical</td>
        <td>PCS</td>
        <td>Electrical Store</td>
        <td>7</td>
        <td>2</td>
        <td class="available-low">5</td>
        <td>$285.00</td>
        <td>$1,995.00</td>
        <td><span class="badge-status status-low">Low Stock</span></td>
        <td><button class="table-action-btn" type="button">⋮</button></td>
      </tr>
      <tr>
        <td class="inv-code">ITM-1004</td>
        <td>Oil 5W-30 (1L)</td>
        <td>Lubricants</td>
        <td>LTR</td>
        <td>Maintenance Store</td>
        <td>0</td>
        <td>0</td>
        <td class="available-out">0</td>
        <td>$7.90</td>
        <td>$0.00</td>
        <td><span class="badge-status status-out">Out of Stock</span></td>
        <td><button class="table-action-btn" type="button">⋮</button></td>
      </tr>
      <tr>
        <td class="inv-code">ITM-1005</td>
        <td>Air Filter</td>
        <td>Filters</td>
        <td>PCS</td>
        <td>Maintenance Store</td>
        <td>32</td>
        <td>4</td>
        <td class="available-good">28</td>
        <td>$16.00</td>
        <td>$448.00</td>
        <td><span class="badge-status status-in">In Stock</span></td>
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

  mainContiner.innerHTML = assetMainPage;


  RenderInventoryTable();
}