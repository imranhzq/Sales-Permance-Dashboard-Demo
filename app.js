/**
 * ApexSales Performance Dashboard - Main JavaScript Application Logic
 */

// Global Application State
const STORAGE_KEYS = {
  INVENTORY: 'apex_sales_inventory_v1',
  TRANSACTIONS: 'apex_sales_transactions_v1'
};

// Initial Realistic Dummy Inventory Data
const INITIAL_INVENTORY = [
  {
    id: 'prod-1',
    sku: 'ELE-101',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    unitCost: 65.00,
    unitPrice: 149.00,
    stockQty: 45,
    lowStockThreshold: 10
  },
  {
    id: 'prod-2',
    sku: 'ELE-102',
    name: 'Mechanical RGB Gaming Keyboard',
    category: 'Electronics',
    unitCost: 42.00,
    unitPrice: 99.00,
    stockQty: 18,
    lowStockThreshold: 15
  },
  {
    id: 'prod-3',
    sku: 'ELE-103',
    name: 'Smart Fitness Watch Series 5',
    category: 'Electronics',
    unitCost: 35.00,
    unitPrice: 89.00,
    stockQty: 8, // Low Stock Alert
    lowStockThreshold: 10
  },
  {
    id: 'prod-4',
    sku: 'HOM-201',
    name: 'Ergonomic Executive Mesh Chair',
    category: 'Home & Living',
    unitCost: 110.00,
    unitPrice: 249.00,
    stockQty: 12,
    lowStockThreshold: 5
  },
  {
    id: 'prod-5',
    sku: 'FAS-301',
    name: 'Minimalist Leather Laptop Backpack',
    category: 'Fashion & Apparel',
    unitCost: 28.00,
    unitPrice: 75.00,
    stockQty: 25,
    lowStockThreshold: 8
  },
  {
    id: 'prod-6',
    sku: 'ELE-104',
    name: '4K Ultra-Wide Curved Monitor 34"',
    category: 'Electronics',
    unitCost: 240.00,
    unitPrice: 429.00,
    stockQty: 4, // Low Stock Alert
    lowStockThreshold: 5
  },
  {
    id: 'prod-7',
    sku: 'FAS-302',
    name: 'Organic Cotton Crewneck T-Shirt 3-Pack',
    category: 'Fashion & Apparel',
    unitCost: 12.00,
    unitPrice: 34.00,
    stockQty: 65,
    lowStockThreshold: 15
  },
  {
    id: 'prod-8',
    sku: 'HOM-202',
    name: 'Stainless Steel Insulated Water Bottle',
    category: 'Home & Living',
    unitCost: 6.50,
    unitPrice: 24.00,
    stockQty: 0, // Out of Stock
    lowStockThreshold: 10
  },
  {
    id: 'prod-9',
    sku: 'OFF-401',
    name: 'Aluminum USB-C 8-in-1 Docking Hub',
    category: 'Office & Gadgets',
    unitCost: 14.50,
    unitPrice: 39.90,
    stockQty: 32,
    lowStockThreshold: 10
  },
  {
    id: 'prod-10',
    sku: 'PER-501',
    name: 'Ultrasonic Essential Oil Aromatherapy Diffuser',
    category: 'Personal Care',
    unitCost: 9.80,
    unitPrice: 29.50,
    stockQty: 22,
    lowStockThreshold: 8
  }
];

// Helper to generate past dates for transaction dummy history
function getPastDate(daysAgo, hoursAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(d.getHours() - hoursAgo);
  return d.toISOString();
}

// Initial Dummy Sales Transactions
const INITIAL_TRANSACTIONS = [
  { id: 'TX-1001', productId: 'prod-1', qty: 2, unitPrice: 149.00, unitCost: 65.00, payment: 'Credit Card', date: getPastDate(0, 2) },
  { id: 'TX-1002', productId: 'prod-3', qty: 1, unitPrice: 89.00, unitCost: 35.00, payment: 'E-Wallet', date: getPastDate(0, 5) },
  { id: 'TX-1003', productId: 'prod-7', qty: 3, unitPrice: 34.00, unitCost: 12.00, payment: 'Cash', date: getPastDate(1, 1) },
  { id: 'TX-1004', productId: 'prod-2', qty: 1, unitPrice: 99.00, unitCost: 42.00, payment: 'Credit Card', date: getPastDate(1, 4) },
  { id: 'TX-1005', productId: 'prod-4', qty: 1, unitPrice: 249.00, unitCost: 110.00, payment: 'Online Banking', date: getPastDate(2, 3) },
  { id: 'TX-1006', productId: 'prod-6', qty: 1, unitPrice: 429.00, unitCost: 240.00, payment: 'Credit Card', date: getPastDate(3, 2) },
  { id: 'TX-1007', productId: 'prod-5', qty: 2, unitPrice: 75.00, unitCost: 28.00, payment: 'Online Banking', date: getPastDate(4, 6) },
  { id: 'TX-1008', productId: 'prod-8', qty: 5, unitPrice: 24.00, unitCost: 6.50, payment: 'Cash', date: getPastDate(5, 1) },
  { id: 'TX-1009', productId: 'prod-9', qty: 4, unitPrice: 39.90, unitCost: 14.50, payment: 'Credit Card', date: getPastDate(6, 4) },
  { id: 'TX-1010', productId: 'prod-10', qty: 3, unitPrice: 29.50, unitCost: 9.80, payment: 'E-Wallet', date: getPastDate(7, 2) },
  { id: 'TX-1011', productId: 'prod-1', qty: 1, unitPrice: 149.00, unitCost: 65.00, payment: 'Credit Card', date: getPastDate(9, 3) },
  { id: 'TX-1012', productId: 'prod-3', qty: 2, unitPrice: 89.00, unitCost: 35.00, payment: 'Online Banking', date: getPastDate(12, 5) },
  { id: 'TX-1013', productId: 'prod-2', qty: 2, unitPrice: 99.00, unitCost: 42.00, payment: 'Credit Card', date: getPastDate(15, 2) },
  { id: 'TX-1014', productId: 'prod-7', qty: 4, unitPrice: 34.00, unitCost: 12.00, payment: 'Cash', date: getPastDate(18, 4) },
  { id: 'TX-1015', productId: 'prod-5', qty: 3, unitPrice: 75.00, unitCost: 28.00, payment: 'E-Wallet', date: getPastDate(22, 1) },
  { id: 'TX-1016', productId: 'prod-6', qty: 2, unitPrice: 429.00, unitCost: 240.00, payment: 'Credit Card', date: getPastDate(25, 6) }
];

let state = {
  inventory: [],
  transactions: [],
  charts: {}
};

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  setupTabNavigation();
  refreshUI();
  lucide.createIcons();
});

// Load state from LocalStorage or initialize with defaults
function loadData() {
  const savedInventory = localStorage.getItem(STORAGE_KEYS.INVENTORY);
  const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);

  state.inventory = savedInventory ? JSON.parse(savedInventory) : [...INITIAL_INVENTORY];
  state.transactions = savedTransactions ? JSON.parse(savedTransactions) : [...INITIAL_TRANSACTIONS];

  saveState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(state.inventory));
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(state.transactions));
}

function resetToDefaultData() {
  if (confirm('Are you sure you want to reset all data back to the original demo dataset?')) {
    state.inventory = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
    state.transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
    saveState();
    refreshUI();
    alert('Dashboard dataset successfully reset to default!');
  }
}

// Calculate All Metrics & Item-level Performance Breakdown
function calculateItemizedMetrics(timeRange = 'all', selectedProductId = 'all') {
  const now = new Date();
  
  // Filter transactions by time range & selected product
  const filteredTransactions = state.transactions.filter(tx => {
    const txDate = new Date(tx.date);
    let matchTime = true;
    if (timeRange === 'today') {
      matchTime = txDate.toDateString() === now.toDateString();
    } else if (timeRange === '7days') {
      const diffDays = (now - txDate) / (1000 * 3600 * 24);
      matchTime = diffDays <= 7;
    } else if (timeRange === '30days') {
      const diffDays = (now - txDate) / (1000 * 3600 * 24);
      matchTime = diffDays <= 30;
    } else if (timeRange === 'year') {
      matchTime = txDate.getFullYear() === now.getFullYear();
    }

    let matchProduct = true;
    if (selectedProductId !== 'all') {
      matchProduct = tx.productId === selectedProductId;
    }

    return matchTime && matchProduct;
  });

  // Calculate Global KPI Totals
  let totalRevenue = 0;
  let totalCOGS = 0;
  let totalUnitsSold = 0;

  // Map to store per-item sales metrics
  const itemSalesMap = {};
  state.inventory.forEach(item => {
    itemSalesMap[item.id] = {
      unitsSold: 0,
      revenue: 0,
      cogs: 0,
      profit: 0
    };
  });

  // All time transactions for overall inventory calculation
  state.transactions.forEach(tx => {
    const rev = tx.qty * tx.unitPrice;
    const cost = tx.qty * tx.unitCost;
    if (itemSalesMap[tx.productId]) {
      itemSalesMap[tx.productId].unitsSold += tx.qty;
      itemSalesMap[tx.productId].revenue += rev;
      itemSalesMap[tx.productId].cogs += cost;
      itemSalesMap[tx.productId].profit += (rev - cost);
    }
  });

  filteredTransactions.forEach(tx => {
    const rev = tx.qty * tx.unitPrice;
    const cost = tx.qty * tx.unitCost;
    
    totalRevenue += rev;
    totalCOGS += cost;
    totalUnitsSold += tx.qty;
  });

  const netProfit = totalRevenue - totalCOGS;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100) : 0;

  // Inventory Valuation (Cost & Retail Potential)
  let totalInventoryCostValuation = 0;
  let totalInventoryRetailValuation = 0;
  let totalStockQtyHand = 0;

  // Build Itemized Performance Array for Stock Items
  const itemizedInventory = state.inventory.map(item => {
    const salesStats = itemSalesMap[item.id] || { unitsSold: 0, revenue: 0, cogs: 0, profit: 0 };
    const itemRevenue = salesStats.revenue;
    const itemCOGS = salesStats.cogs;
    const itemProfit = itemRevenue - itemCOGS;
    const itemMargin = itemRevenue > 0 ? ((itemProfit / itemRevenue) * 100) : 0;

    totalInventoryCostValuation += (item.stockQty * item.unitCost);
    totalInventoryRetailValuation += (item.stockQty * item.unitPrice);
    totalStockQtyHand += item.stockQty;

    // Stock Status
    let status = 'in_stock';
    if (item.stockQty === 0) {
      status = 'out_of_stock';
    } else if (item.stockQty <= item.lowStockThreshold) {
      status = 'low_stock';
    }

    return {
      ...item,
      unitsSold: salesStats.unitsSold,
      revenue: itemRevenue,
      cogs: itemCOGS,
      netProfit: itemProfit,
      profitMargin: itemMargin,
      status: status
    };
  });

  return {
    timeRange,
    selectedProductId,
    filteredTransactions,
    totalRevenue,
    totalCOGS,
    netProfit,
    profitMargin,
    totalUnitsSold,
    totalInventoryCostValuation,
    totalInventoryRetailValuation,
    totalStockQtyHand,
    itemizedInventory
  };
}

// Refresh Entire UI
function refreshUI() {
  const timeRange = document.getElementById('timeRangeFilter').value;
  const selectedProduct = document.getElementById('productFilterSelect').value;
  const metrics = calculateItemizedMetrics(timeRange, selectedProduct);

  renderProductFilterDropdown();
  renderKPICards(metrics);
  renderTopProducts(metrics);
  renderLowStockAlerts(metrics);
  renderCategoryDropdown(metrics);
  renderInventoryTable(metrics);
  renderTransactionsTable(metrics);
  populateSaleProductSelect();
  renderCharts(metrics);

  lucide.createIcons();
}

// Populate Product Filter Dropdown in Header
function renderProductFilterDropdown() {
  const select = document.getElementById('productFilterSelect');
  const current = select.value;

  select.innerHTML = '<option value="all">📊 All Products View</option>';
  state.inventory.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = `📦 ${item.name} (${item.sku})`;
    if (item.id === current) opt.selected = true;
    select.appendChild(opt);
  });
}

// Render Top KPI Cards
function renderKPICards(metrics) {
  document.getElementById('kpiRevenue').textContent = formatCurrency(metrics.totalRevenue);
  document.getElementById('kpiCOGS').textContent = formatCurrency(metrics.totalCOGS);
  
  const profitEl = document.getElementById('kpiProfit');
  profitEl.textContent = formatCurrency(metrics.netProfit);
  if (metrics.netProfit < 0) {
    profitEl.style.color = 'var(--danger)';
  } else {
    profitEl.style.color = 'var(--text-main)';
  }

  document.getElementById('kpiProfitMargin').textContent = `Margin: ${metrics.profitMargin.toFixed(1)}%`;
  document.getElementById('kpiStockValuation').textContent = formatCurrency(metrics.totalInventoryCostValuation);
  document.getElementById('kpiRetailValuation').textContent = `Retail Value: ${formatCurrency(metrics.totalInventoryRetailValuation)}`;
  
  document.getElementById('kpiUnitsSold').textContent = metrics.totalUnitsSold.toLocaleString();
  document.getElementById('kpiUnitsRemaining').textContent = `In Stock: ${metrics.totalStockQtyHand.toLocaleString()} units`;

  // Low stock badge widget count
  const lowStockItems = metrics.itemizedInventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock');
  document.getElementById('lowStockCountText').textContent = `${lowStockItems.length} product(s) require reordering!`;
}

// Render Top Profit Generator Table (Overview Tab)
function renderTopProducts(metrics) {
  const tbody = document.getElementById('topProductsTableBody');
  tbody.innerHTML = '';

  const sortedByProfit = [...metrics.itemizedInventory].sort((a, b) => b.netProfit - a.netProfit).slice(0, 5);

  sortedByProfit.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(item.name)}</strong> <br><span class="badge">${item.sku}</span></td>
      <td><span class="badge">${escapeHtml(item.category)}</span></td>
      <td><strong>${item.unitsSold}</strong></td>
      <td>${formatCurrency(item.unitPrice)}</td>
      <td>${formatCurrency(item.revenue)}</td>
      <td>${formatCurrency(item.cogs)}</td>
      <td style="color: ${item.netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:700;">
        ${formatCurrency(item.netProfit)}
      </td>
      <td><span class="badge-accent">${item.profitMargin.toFixed(1)}%</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Low Stock Widget List
function renderLowStockAlerts(metrics) {
  const listContainer = document.getElementById('lowStockList');
  listContainer.innerHTML = '';

  const alertItems = metrics.itemizedInventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock');

  if (alertItems.length === 0) {
    listContainer.innerHTML = '<p class="text-muted" style="font-size:0.85rem;">All stock levels are optimal!</p>';
    return;
  }

  alertItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'warning-item-card';
    card.innerHTML = `
      <div class="warning-item-info">
        <h4>${escapeHtml(item.name)}</h4>
        <span>SKU: ${item.sku} | Threshold: ${item.lowStockThreshold} units</span>
      </div>
      <div>
        <span class="status-badge ${item.status === 'out_of_stock' ? 'out-of-stock' : 'low-stock'}">
          ${item.status === 'out_of_stock' ? 'Out of Stock' : `${item.stockQty} left`}
        </span>
      </div>
    `;
    listContainer.appendChild(card);
  });
}

// Populate Category Filter Dropdown
function renderCategoryDropdown(metrics) {
  const categoryFilter = document.getElementById('categoryFilter');
  const selected = categoryFilter.value;

  const categories = [...new Set(state.inventory.map(i => i.category))];
  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    if (cat === selected) opt.selected = true;
    categoryFilter.appendChild(opt);
  });
}

// Render Per-Item Master Inventory Table (Tab 2)
function renderInventoryTable(metrics) {
  const tbody = document.getElementById('inventoryTableBody');
  tbody.innerHTML = '';

  const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
  const selectedCat = document.getElementById('categoryFilter').value;
  const selectedStatus = document.getElementById('stockStatusFilter').value;

  const filteredItems = metrics.itemizedInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.sku.toLowerCase().includes(searchTerm);
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  if (filteredItems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="12" class="text-center text-muted" style="padding:2rem;">No matching stock items found.</td></tr>';
    return;
  }

  filteredItems.forEach(item => {
    const tr = document.createElement('tr');
    
    let statusBadge = '';
    if (item.status === 'in_stock') {
      statusBadge = `<span class="status-badge in-stock"><i data-lucide="check-circle-2"></i> ${item.stockQty} in stock</span>`;
    } else if (item.status === 'low_stock') {
      statusBadge = `<span class="status-badge low-stock"><i data-lucide="alert-triangle"></i> ${item.stockQty} Low Stock</span>`;
    } else {
      statusBadge = `<span class="status-badge out-of-stock"><i data-lucide="x-circle"></i> Out of Stock</span>`;
    }

    tr.innerHTML = `
      <td>
        <strong style="cursor:pointer; color:var(--primary);" title="Click to filter dashboard charts by this product" onclick="filterChartByProduct('${item.id}')">${escapeHtml(item.name)}</strong>
        <br><span class="badge">${item.sku}</span>
      </td>
      <td><span class="badge">${escapeHtml(item.category)}</span></td>
      <td>${formatCurrency(item.unitCost)}</td>
      <td>${formatCurrency(item.unitPrice)}</td>
      <td><strong>${item.stockQty}</strong> units</td>
      <td><strong>${item.unitsSold}</strong> sold</td>
      <td>${formatCurrency(item.revenue)}</td>
      <td>${formatCurrency(item.cogs)}</td>
      <td style="color: ${item.netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:700;">
        ${formatCurrency(item.netProfit)}
      </td>
      <td><span class="badge-accent">${item.profitMargin.toFixed(1)}%</span></td>
      <td>${statusBadge}</td>
      <td>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn-icon" title="Filter Charts for this Product" onclick="filterChartByProduct('${item.id}')">
            <i data-lucide="line-chart"></i>
          </button>
          <button class="btn-icon" title="Record Sale" onclick="openRecordSaleForProduct('${item.id}')">
            <i data-lucide="shopping-cart"></i>
          </button>
          <button class="btn-icon" title="View Item Details" onclick="viewItemDetail('${item.id}')">
            <i data-lucide="eye"></i>
          </button>
          <button class="btn-icon" title="Edit Item" onclick="editStockItem('${item.id}')">
            <i data-lucide="edit-3"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Sales Ledger Table (Tab 3)
function renderTransactionsTable(metrics) {
  const tbody = document.getElementById('transactionsTableBody');
  tbody.innerHTML = '';

  const searchTerm = document.getElementById('transactionSearch').value.toLowerCase();
  const selectedPayment = document.getElementById('paymentFilter').value;

  const productMap = {};
  state.inventory.forEach(i => productMap[i.id] = i);

  const filteredTx = metrics.filteredTransactions.filter(tx => {
    const prod = productMap[tx.productId];
    const prodName = prod ? prod.name.toLowerCase() : '';
    const matchesSearch = tx.id.toLowerCase().includes(searchTerm) || prodName.includes(searchTerm);
    const matchesPayment = selectedPayment === 'all' || tx.payment === selectedPayment;
    return matchesSearch && matchesPayment;
  });

  if (filteredTx.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" class="text-center text-muted" style="padding:2rem;">No sales transactions logged.</td></tr>';
    return;
  }

  // Sort by date descending
  filteredTx.sort((a, b) => new Date(b.date) - new Date(a.date));

  filteredTx.forEach(tx => {
    const prod = productMap[tx.productId] || { name: 'Unknown Product', sku: '-' };
    const rev = tx.qty * tx.unitPrice;
    const cogs = tx.qty * tx.unitCost;
    const profit = rev - cogs;
    const dateStr = new Date(tx.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="badge">${tx.id}</span></td>
      <td><small class="text-muted">${dateStr}</small></td>
      <td><strong>${escapeHtml(prod.name)}</strong></td>
      <td><strong>${tx.qty}</strong></td>
      <td>${formatCurrency(tx.unitCost)}</td>
      <td>${formatCurrency(tx.unitPrice)}</td>
      <td>${formatCurrency(rev)}</td>
      <td>${formatCurrency(cogs)}</td>
      <td style="color: ${profit >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:700;">
        ${formatCurrency(profit)}
      </td>
      <td><span class="badge">${escapeHtml(tx.payment)}</span></td>
      <td>
        <button class="btn-icon" title="Delete Sale" onclick="deleteTransaction('${tx.id}')">
          <i data-lucide="trash-2"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Chart.js Visualizations Manager
function renderCharts(metrics) {
  // 1. Overview Timeline Chart (Revenue, COGS, Profit)
  const ctxTimeline = document.getElementById('overviewFinancialChart').getContext('2d');
  
  // Group transactions by date
  const dateMap = {};
  metrics.filteredTransactions.forEach(tx => {
    const dateKey = new Date(tx.date).toLocaleDateString([], { month: 'short', day: 'numeric' });
    if (!dateMap[dateKey]) dateMap[dateKey] = { rev: 0, cogs: 0, profit: 0 };
    const rev = tx.qty * tx.unitPrice;
    const cogs = tx.qty * tx.unitCost;
    dateMap[dateKey].rev += rev;
    dateMap[dateKey].cogs += cogs;
    dateMap[dateKey].profit += (rev - cogs);
  });

  const labels = Object.keys(dateMap);
  const revenueData = labels.map(l => dateMap[l].rev);
  const cogsData = labels.map(l => dateMap[l].cogs);
  const profitData = labels.map(l => dateMap[l].profit);

  if (state.charts.overview) state.charts.overview.destroy();
  
  state.charts.overview = new Chart(ctxTimeline, {
    type: 'line',
    data: {
      labels: labels.length ? labels : ['No Data'],
      datasets: [
        {
          label: 'Revenue ($)',
          data: revenueData.length ? revenueData : [0],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          fill: true,
          tension: 0.35
        },
        {
          label: 'COGS Cost ($)',
          data: cogsData.length ? cogsData : [0],
          borderColor: '#f59e0b',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.35
        },
        {
          label: 'Net Profit ($)',
          data: profitData.length ? profitData : [0],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          fill: true,
          tension: 0.35
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94a3b8' } }
      },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });

  // 2. Category Pie Chart
  const ctxCategory = document.getElementById('categoryPieChart').getContext('2d');
  const categoryRevMap = {};
  metrics.itemizedInventory.forEach(item => {
    if (!categoryRevMap[item.category]) categoryRevMap[item.category] = 0;
    categoryRevMap[item.category] += item.revenue;
  });

  const catLabels = Object.keys(categoryRevMap);
  const catData = Object.values(categoryRevMap);

  if (state.charts.category) state.charts.category.destroy();

  state.charts.category = new Chart(ctxCategory, {
    type: 'doughnut',
    data: {
      labels: catLabels,
      datasets: [{
        data: catData,
        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#a855f7', '#ec4899']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } }
      }
    }
  });

  // 3. Top Profit Bar Chart (Analytics Tab)
  const ctxTopProfit = document.getElementById('topProfitBarChart').getContext('2d');
  const sortedByProfit = [...metrics.itemizedInventory].sort((a, b) => b.netProfit - a.netProfit).slice(0, 5);

  if (state.charts.topProfit) state.charts.topProfit.destroy();

  state.charts.topProfit = new Chart(ctxTopProfit, {
    type: 'bar',
    data: {
      labels: sortedByProfit.map(i => i.name.length > 18 ? i.name.substr(0, 18) + '...' : i.name),
      datasets: [{
        label: 'Net Profit ($)',
        data: sortedByProfit.map(i => i.netProfit),
        backgroundColor: '#10b981',
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { display: false } }
      }
    }
  });

  // 4. Payment Method Chart
  const ctxPayment = document.getElementById('paymentChart').getContext('2d');
  const payMap = {};
  metrics.filteredTransactions.forEach(tx => {
    if (!payMap[tx.payment]) payMap[tx.payment] = 0;
    payMap[tx.payment] += (tx.qty * tx.unitPrice);
  });

  if (state.charts.payment) state.charts.payment.destroy();

  state.charts.payment = new Chart(ctxPayment, {
    type: 'pie',
    data: {
      labels: Object.keys(payMap),
      datasets: [{
        data: Object.values(payMap),
        backgroundColor: ['#06b6d4', '#6366f1', '#10b981', '#f59e0b']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
    }
  });

  // 5. Stock vs Sales Comparison Chart
  const ctxStockSales = document.getElementById('stockVsSalesChart').getContext('2d');
  if (state.charts.stockSales) state.charts.stockSales.destroy();

  state.charts.stockSales = new Chart(ctxStockSales, {
    type: 'bar',
    data: {
      labels: metrics.itemizedInventory.map(i => i.sku),
      datasets: [
        {
          label: 'Units Remaining In Hand',
          data: metrics.itemizedInventory.map(i => i.stockQty),
          backgroundColor: '#6366f1',
          borderRadius: 4
        },
        {
          label: 'Units Sold',
          data: metrics.itemizedInventory.map(i => i.unitsSold),
          backgroundColor: '#10b981',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { display: false } },
        y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

// Populate Product Selection inside Record Sale Modal
function populateSaleProductSelect() {
  const select = document.getElementById('saleProductSelect');
  const currentVal = select.value;
  select.innerHTML = '<option value="">-- Select Product --</option>';

  state.inventory.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = `${item.name} (${item.sku}) - Stock: ${item.stockQty} | Price: $${item.unitPrice.toFixed(2)}`;
    if (item.id === currentVal) opt.selected = true;
    select.appendChild(opt);
  });
}

// Record Sale Form Calculation Updates
function updateSalePreview() {
  const productId = document.getElementById('saleProductSelect').value;
  const qty = parseInt(document.getElementById('saleQuantity').value) || 0;
  const unitPrice = parseFloat(document.getElementById('saleUnitPrice').value) || 0;

  const product = state.inventory.find(i => i.id === productId);

  if (product) {
    document.getElementById('availableStockHint').textContent = `Available: ${product.stockQty} units`;
    document.getElementById('itemCostHint').textContent = `Unit Cost: ${formatCurrency(product.unitCost)}`;
    
    if (!document.getElementById('saleUnitPrice').value) {
      document.getElementById('saleUnitPrice').value = product.unitPrice;
    }

    const rev = qty * unitPrice;
    const cost = qty * product.unitCost;
    const profit = rev - cost;
    const margin = rev > 0 ? ((profit / rev) * 100) : 0;

    document.getElementById('previewRevenue').textContent = formatCurrency(rev);
    document.getElementById('previewCost').textContent = formatCurrency(cost);
    document.getElementById('previewProfit').textContent = `${formatCurrency(profit)} (${margin.toFixed(1)}%)`;
  } else {
    document.getElementById('availableStockHint').textContent = 'Available: 0 units';
    document.getElementById('itemCostHint').textContent = 'Unit Cost: $0.00';
    document.getElementById('previewRevenue').textContent = '$0.00';
    document.getElementById('previewCost').textContent = '$0.00';
    document.getElementById('previewProfit').textContent = '$0.00 (0%)';
  }
}

// Open Record Sale Modal targeting specific product
function openRecordSaleForProduct(productId) {
  document.getElementById('saleProductSelect').value = productId;
  updateSalePreview();
  openModal('recordSaleModal');
}

// View Detailed Drilldown Modal for individual product
function viewItemDetail(productId) {
  const metrics = calculateItemizedMetrics('all');
  const item = metrics.itemizedInventory.find(i => i.id === productId);
  if (!item) return;

  document.getElementById('detailItemName').textContent = item.name;
  document.getElementById('detailItemSku').textContent = item.sku;
  document.getElementById('detailItemCategory').textContent = item.category;
  document.getElementById('detailItemStock').textContent = `${item.stockQty} units`;
  document.getElementById('detailItemSold').textContent = `${item.unitsSold} units`;
  document.getElementById('detailItemPrices').textContent = `Cost: ${formatCurrency(item.unitCost)} | Price: ${formatCurrency(item.unitPrice)}`;
  document.getElementById('detailItemProfit').textContent = `${formatCurrency(item.netProfit)} (${item.profitMargin.toFixed(1)}%)`;

  // Itemized history ledger
  const tbody = document.getElementById('itemSalesHistoryBody');
  tbody.innerHTML = '';

  const itemTx = state.transactions.filter(t => t.productId === productId);
  itemTx.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (itemTx.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted" style="padding:1.5rem;">No sales logged for this product yet.</td></tr>';
  } else {
    itemTx.forEach(tx => {
      const rev = tx.qty * tx.unitPrice;
      const cost = tx.qty * tx.unitCost;
      const profit = rev - cost;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><small>${new Date(tx.date).toLocaleDateString()}</small></td>
        <td>${tx.qty}</td>
        <td>${formatCurrency(tx.unitPrice)}</td>
        <td>${formatCurrency(rev)}</td>
        <td>${formatCurrency(cost)}</td>
        <td style="color: ${profit >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:600;">
          ${formatCurrency(profit)}
        </td>
        <td><span class="badge">${tx.payment}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  openModal('itemDetailModal');
}

// Edit Stock Item Modal
function editStockItem(productId) {
  const item = state.inventory.find(i => i.id === productId);
  if (!item) return;

  document.getElementById('stockModalTitle').textContent = 'Edit Inventory Item';
  document.getElementById('stockItemId').value = item.id;
  document.getElementById('stockName').value = item.name;
  document.getElementById('stockSku').value = item.sku;
  document.getElementById('stockCategory').value = item.category;
  document.getElementById('stockQty').value = item.stockQty;
  document.getElementById('stockUnitCost').value = item.unitCost;
  document.getElementById('stockUnitPrice').value = item.unitPrice;
  document.getElementById('stockLowThreshold').value = item.lowStockThreshold || 10;

  openModal('stockItemModal');
}

// Delete Transaction Entry
function deleteTransaction(txId) {
  if (confirm(`Are you sure you want to delete sale record #${txId}?`)) {
    const tx = state.transactions.find(t => t.id === txId);
    if (tx) {
      // Revert stock quantity
      const prod = state.inventory.find(p => p.id === tx.productId);
      if (prod) {
        prod.stockQty += tx.qty;
      }
    }

    state.transactions = state.transactions.filter(t => t.id !== txId);
    saveState();
    refreshUI();
  }
}

// Modal Handlers
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Export CSV Utilities
function exportToCSV(filename, rows) {
  const processRow = function (row) {
    let finalVal = '';
    for (let j = 0; j < row.length; j++) {
      let innerValue = row[j] === null || row[j] === undefined ? '' : row[j].toString();
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ',';
      finalVal += result;
    }
    return finalVal + '\n';
  };

  let csvFile = '';
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Filter Charts & Dashboard by a Specific Product
function filterChartByProduct(productId) {
  document.getElementById('productFilterSelect').value = productId;
  refreshUI();
  switchTab('overview');
}

// Event Listeners Setup
function setupEventListeners() {
  // Reset Data Button
  document.getElementById('resetDataBtn').addEventListener('click', resetToDefaultData);

  // Time Range & Product Filters
  document.getElementById('timeRangeFilter').addEventListener('change', refreshUI);
  document.getElementById('productFilterSelect').addEventListener('change', refreshUI);

  // Modals open/close trigger setup
  document.getElementById('openRecordSaleBtn').addEventListener('click', () => {
    document.getElementById('recordSaleForm').reset();
    document.getElementById('saleDate').value = new Date().toISOString().slice(0, 16);
    updateSalePreview();
    openModal('recordSaleModal');
  });

  document.getElementById('openAddStockBtn').addEventListener('click', () => {
    document.getElementById('stockModalTitle').textContent = 'Add New Inventory Stock';
    document.getElementById('stockItemForm').reset();
    document.getElementById('stockItemId').value = '';
    openModal('stockItemModal');
  });

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      closeModal(e.target.getAttribute('data-close'));
    });
  });

  // Dynamic preview updates on sale form
  document.getElementById('saleProductSelect').addEventListener('change', updateSalePreview);
  document.getElementById('saleQuantity').addEventListener('input', updateSalePreview);
  document.getElementById('saleUnitPrice').addEventListener('input', updateSalePreview);

  // Handle Record Sale Form Submission
  document.getElementById('recordSaleForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const productId = document.getElementById('saleProductSelect').value;
    const qty = parseInt(document.getElementById('saleQuantity').value);
    const unitPrice = parseFloat(document.getElementById('saleUnitPrice').value);
    const payment = document.getElementById('salePaymentMethod').value;
    const dateInput = document.getElementById('saleDate').value;

    const product = state.inventory.find(i => i.id === productId);
    if (!product) return alert('Invalid product selection');

    if (qty > product.stockQty) {
      if (!confirm(`Warning: Selling ${qty} units exceeds stock on hand (${product.stockQty}). Continue anyway?`)) {
        return;
      }
    }

    // Deduct stock
    product.stockQty = Math.max(0, product.stockQty - qty);

    // Add transaction log
    const newTx = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      productId,
      qty,
      unitPrice,
      unitCost: product.unitCost,
      payment,
      date: dateInput ? new Date(dateInput).toISOString() : new Date().toISOString()
    };

    state.transactions.unshift(newTx);
    saveState();
    closeModal('recordSaleModal');
    refreshUI();
  });

  // Handle Add/Edit Stock Form Submission
  document.getElementById('stockItemForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const itemId = document.getElementById('stockItemId').value;
    const name = document.getElementById('stockName').value.trim();
    const sku = document.getElementById('stockSku').value.trim();
    const category = document.getElementById('stockCategory').value.trim();
    const stockQty = parseInt(document.getElementById('stockQty').value) || 0;
    const unitCost = parseFloat(document.getElementById('stockUnitCost').value) || 0;
    const unitPrice = parseFloat(document.getElementById('stockUnitPrice').value) || 0;
    const lowStockThreshold = parseInt(document.getElementById('stockLowThreshold').value) || 10;

    if (itemId) {
      // Edit existing product
      const item = state.inventory.find(i => i.id === itemId);
      if (item) {
        item.name = name;
        item.sku = sku;
        item.category = category;
        item.stockQty = stockQty;
        item.unitCost = unitCost;
        item.unitPrice = unitPrice;
        item.lowStockThreshold = lowStockThreshold;
      }
    } else {
      // Create new product
      const newItem = {
        id: `prod-${Date.now()}`,
        sku,
        name,
        category,
        unitCost,
        unitPrice,
        stockQty,
        lowStockThreshold
      };
      state.inventory.push(newItem);
    }

    saveState();
    closeModal('stockItemModal');
    refreshUI();
  });

  // Search & Filters inputs
  document.getElementById('inventorySearch').addEventListener('input', () => {
    const metrics = calculateItemizedMetrics(document.getElementById('timeRangeFilter').value);
    renderInventoryTable(metrics);
  });
  document.getElementById('categoryFilter').addEventListener('change', () => {
    const metrics = calculateItemizedMetrics(document.getElementById('timeRangeFilter').value);
    renderInventoryTable(metrics);
  });
  document.getElementById('stockStatusFilter').addEventListener('change', () => {
    const metrics = calculateItemizedMetrics(document.getElementById('timeRangeFilter').value);
    renderInventoryTable(metrics);
  });

  document.getElementById('transactionSearch').addEventListener('input', () => {
    const metrics = calculateItemizedMetrics(document.getElementById('timeRangeFilter').value);
    renderTransactionsTable(metrics);
  });
  document.getElementById('paymentFilter').addEventListener('change', () => {
    const metrics = calculateItemizedMetrics(document.getElementById('timeRangeFilter').value);
    renderTransactionsTable(metrics);
  });

  // Export CSV Buttons
  document.getElementById('exportInventoryCsvBtn').addEventListener('click', () => {
    const metrics = calculateItemizedMetrics(document.getElementById('timeRangeFilter').value);
    const rows = [
      ['SKU', 'Product Name', 'Category', 'Unit Cost', 'Selling Price', 'In Hand Stock', 'Units Sold', 'Total Revenue', 'Total COGS', 'Net Profit', 'Profit Margin (%)', 'Stock Status']
    ];
    metrics.itemizedInventory.forEach(i => {
      rows.push([i.sku, i.name, i.category, i.unitCost, i.unitPrice, i.stockQty, i.unitsSold, i.revenue, i.cogs, i.netProfit, i.profitMargin.toFixed(2), i.status]);
    });
    exportToCSV(`inventory_performance_${new Date().toISOString().slice(0,10)}.csv`, rows);
  });

  document.getElementById('exportSalesCsvBtn').addEventListener('click', () => {
    const metrics = calculateItemizedMetrics(document.getElementById('timeRangeFilter').value);
    const productMap = {};
    state.inventory.forEach(i => productMap[i.id] = i);

    const rows = [
      ['Transaction ID', 'Date & Time', 'SKU', 'Product Name', 'Quantity', 'Unit Cost', 'Selling Price', 'Total Revenue', 'Total COGS', 'Net Profit', 'Payment Method']
    ];

    metrics.filteredTransactions.forEach(t => {
      const prod = productMap[t.productId] || { name: 'Unknown', sku: '-' };
      const rev = t.qty * t.unitPrice;
      const cogs = t.qty * t.unitCost;
      rows.push([t.id, t.date, prod.sku, prod.name, t.qty, t.unitCost, t.unitPrice, rev, cogs, (rev - cogs), t.payment]);
    });

    exportToCSV(`sales_ledger_${new Date().toISOString().slice(0,10)}.csv`, rows);
  });
}

// Navigation Tabs Switcher
function setupTabNavigation() {
  const tabs = document.querySelectorAll('.nav-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabTarget = tab.getAttribute('data-tab');
      switchTab(tabTarget);
    });
  });
}

function switchTab(tabName) {
  document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  const navBtn = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
  const content = document.getElementById(`tab-${tabName}`);

  if (navBtn) navBtn.classList.add('active');
  if (content) content.classList.add('active');

  const titleMap = {
    overview: 'Sales Performance Dashboard',
    inventory: 'Inventory & Per-Item Profitability Matrix',
    transactions: 'Sales Transactions History Ledger',
    analytics: 'Financial Analytics & Profit Reports'
  };

  document.getElementById('pageTitle').textContent = titleMap[tabName] || 'Sales Performance Dashboard';
}

// Helper Utilities
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
