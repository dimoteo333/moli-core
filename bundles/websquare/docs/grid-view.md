# GridView

GridView is WebSquare's powerful data grid component. It supports sorting, filtering, editing, row selection, cell merging, Excel import/export, and advanced rendering.

## Basic Definition

```xml
<w2:gridView id="grd_employees" dataList="dl_employees"
  style="width:100%; height:400px;">
  <w2:header>
    <w2:row>
      <w2:column id="empNo" label="Emp No" width="100"/>
      <w2:column id="empName" label="Name" width="150"/>
      <w2:column id="dept" label="Department" width="150"/>
      <w2:column id="salary" label="Salary" width="120" dataType="number" displayFormat="#,###"/>
    </w2:row>
  </w2:header>
  <w2:detail>
    <w2:row>
      <w2:column id="empNo" readOnly="true"/>
      <w2:column id="empName" inputType="text"/>
      <w2:column id="dept" inputType="selectbox"/>
      <w2:column id="salary" inputType="text" dataType="number" displayFormat="#,###"/>
    </w2:row>
  </w2:detail>
</w2:gridView>
```

## Structure

A GridView has three sections:

- **`<w2:header>`**: Column headers with labels and sizing
- **`<w2:detail>`**: Data row template defining how cells render and edit
- **`<w2:footer>`** (optional): Summary row with aggregations

```xml
<w2:gridView id="grd_orders" dataList="dl_orders">
  <w2:header>
    <w2:row>
      <w2:column id="orderNo" label="Order No" width="120"/>
      <w2:column id="item" label="Item" width="200"/>
      <w2:column id="qty" label="Quantity" width="80"/>
      <w2:column id="price" label="Price" width="100"/>
    </w2:row>
  </w2:header>
  <w2:detail>
    <w2:row>
      <w2:column id="orderNo"/>
      <w2:column id="item"/>
      <w2:column id="qty" inputType="text" dataType="number"/>
      <w2:column id="price" inputType="text" dataType="number" displayFormat="#,###"/>
    </w2:row>
  </w2:detail>
  <w2:footer>
    <w2:row>
      <w2:column id="orderNo" label="Total" colSpan="2"/>
      <w2:column id="qty" expression="sum" displayFormat="#,###"/>
      <w2:column id="price" expression="sum" displayFormat="#,###"/>
    </w2:row>
  </w2:footer>
</w2:gridView>
```

## Column Input Types

| inputType | Description |
|-----------|-------------|
| `text` | Text input field |
| `select` / `selectbox` | Dropdown selection |
| `checkbox` | Checkbox |
| `calendar` | Date picker |
| `textarea` | Multi-line text |
| `autoComplete` | Auto-complete input |
| (none) | Display-only (no editing) |

### SelectBox Column

```xml
<w2:column id="dept" inputType="selectbox">
  <w2:option label="Sales" value="SALES"/>
  <w2:option label="Development" value="DEV"/>
  <w2:option label="HR" value="HR"/>
</w2:column>
```

### Checkbox Column

```xml
<w2:column id="isActive" inputType="checkbox" trueValue="Y" falseValue="N"/>
```

### Calendar Column

```xml
<w2:column id="hireDate" inputType="calendar" displayFormat="yyyy-MM-dd"/>
```

## Row Selection

```xml
<!-- Single selection (default) -->
<w2:gridView id="grd_emp" dataList="dl_emp" selectionMode="single"/>

<!-- Multiple selection -->
<w2:gridView id="grd_emp" dataList="dl_emp" selectionMode="multi"/>

<!-- Row checkbox selection -->
<w2:gridView id="grd_emp" dataList="dl_emp" useCheckbox="true"/>
```

## JavaScript API — Data Operations

```javascript
// Get selected row index
var idx = grd_employees.getSelectedRowIndex();

// Get cell value
var name = grd_employees.getCellData(rowIndex, "empName");

// Set cell value
grd_employees.setCellData(rowIndex, "empName", "New Name");

// Get selected rows (multi-select)
var indices = grd_employees.getCheckedRowIndices();

// Get row count
var count = grd_employees.getRowCount();

// Insert/Add rows (operates on bound DataList)
dl_employees.insertRow(0);
dl_employees.addRow();

// Delete selected row
var idx = grd_employees.getSelectedRowIndex();
dl_employees.deleteRow(idx);
```

## JavaScript API — Grid Control

```javascript
// Refresh grid display
grd_employees.refresh();

// Set column visibility
grd_employees.setColumnVisible("salary", false);

// Set column width
grd_employees.setColumnWidth("empName", 200);

// Get column width
var width = grd_employees.getColumnWidth("empName");

// Set read-only for specific column
grd_employees.setColumnReadOnly("empNo", true);

// Set entire grid read-only
grd_employees.setReadOnly(true);

// Scroll to row
grd_employees.scrollToRow(rowIndex);

// Focus on cell
grd_employees.focusCell(rowIndex, "empName");
```

## Sorting

```xml
<!-- Enable sorting on header click -->
<w2:gridView id="grd_emp" dataList="dl_emp" sortable="true"/>
```

```javascript
// Programmatic sort
grd_employees.sort("empName", "asc");
grd_employees.sort("salary", "desc");

// Multi-column sort
dl_employees.multiSort("dept:asc,salary:desc");
```

## Filtering

```javascript
// Apply filter
dl_employees.setFilter("dept == 'Sales' && salary > 40000");

// Remove filter
dl_employees.removeFilter();
```

## Header Grouping

```xml
<w2:header>
  <w2:row>
    <w2:column id="empNo" label="Emp No" width="100" rowSpan="2"/>
    <w2:column id="empName" label="Name" width="150" rowSpan="2"/>
    <w2:column label="Contact Info" colSpan="2"/>
  </w2:row>
  <w2:row>
    <w2:column id="phone" label="Phone" width="130"/>
    <w2:column id="email" label="Email" width="200"/>
  </w2:row>
</w2:header>
```

## Cell Merging

```xml
<w2:gridView id="grd_data" dataList="dl_data" mergeColumn="dept,team">
  <!-- Cells in dept and team columns with same values will be merged vertically -->
</w2:gridView>
```

## Cell Rendering (Custom Display)

```xml
<w2:column id="status" label="Status">
  <w2:renderer type="custom"><![CDATA[
    if (value === "A") return '<span style="color:green;">Active</span>';
    if (value === "I") return '<span style="color:red;">Inactive</span>';
    return value;
  ]]></w2:renderer>
</w2:column>
```

## Excel Import/Export

```javascript
// Export to Excel
grd_employees.saveAsExcel({
  fileName: "employees.xlsx",
  sheetName: "Employees",
  includeHeader: true
});

// Import from Excel
grd_employees.loadFromExcel({
  headerRowIndex: 0,  // Which row contains headers
  dataStartRowIndex: 1
});
```

## Events

| Event | Description |
|-------|-------------|
| `oncellclick` | Cell clicked |
| `oncelldblclick` | Cell double-clicked |
| `onrowclick` | Row clicked |
| `onrowdblclick` | Row double-clicked |
| `onheaderclick` | Header column clicked |
| `oncellchange` | Cell value changed |
| `onbeforecellchange` | Before cell value changes (return false to cancel) |
| `onsort` | After sorting |
| `onscroll` | Grid scrolled |
| `oncheckboxchange` | Row checkbox toggled |
| `onselectionchange` | Selection changed |

### Event Examples

```xml
<w2:gridView id="grd_employees" dataList="dl_employees">
  <w2:script ev:event="oncellclick"><![CDATA[
    var rowIdx = e.rowIndex;
    var colId = e.columnId;
    var value = grd_employees.getCellData(rowIdx, colId);
    console.log("Clicked: row=" + rowIdx + ", col=" + colId + ", val=" + value);
  ]]></w2:script>

  <w2:script ev:event="onrowdblclick"><![CDATA[
    var empNo = dl_employees.getCellData(e.rowIndex, "empNo");
    wfr_detail.setSrc("/pages/employee-detail.xml?empNo=" + empNo);
  ]]></w2:script>
</w2:gridView>
```

## Pagination

For large datasets, use server-side pagination:

```xml
<w2:gridView id="grd_data" dataList="dl_data"/>

<w2:pageNavigator id="pn_data"
  totalCount="dl_data"
  pageSize="20"
  pageNavigation="10"
  submission="sub_search"/>
```

```javascript
// Handle page change
scwin.onPageChange = function(pageNo) {
  dm_search.set("pageNo", pageNo);
  dm_search.set("pageSize", 20);
  com.executeSubmission("sub_search");
};
```

## Common Patterns

### Master-Detail Grid

```xml
<!-- Master grid -->
<w2:gridView id="grd_orders" dataList="dl_orders">
  <w2:script ev:event="onrowclick"><![CDATA[
    var orderNo = dl_orders.getCellData(e.rowIndex, "orderNo");
    dm_search.set("orderNo", orderNo);
    com.executeSubmission("sub_orderDetail");
  ]]></w2:script>
</w2:gridView>

<!-- Detail grid -->
<w2:gridView id="grd_orderLines" dataList="dl_orderLines"/>
```

### Editable Grid with Save

```javascript
scwin.doSave = function() {
  var modCount = dl_employees.getModifiedRowCount();
  if (modCount === 0) {
    alert("No changes to save");
    return;
  }
  com.executeSubmission("sub_saveEmployees");
};

scwin.saveDone = function(e) {
  if (e.responseStatusCode === 200) {
    dl_employees.reform(); // Reset all row statuses to 'R'
    alert("Saved successfully");
  }
};
```
