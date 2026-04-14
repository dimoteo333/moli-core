# DataCollection

DataCollection is WebSquare's client-side data model system. It provides structured data containers with two-way UI binding, change tracking, and server communication integration.

## Overview

There are three types of DataCollections:

| Type | Purpose | Analogy |
|------|---------|---------|
| **DataMap** | Key-value pairs | Single form/record |
| **DataList** | Tabular rows and columns | Table/array of records |
| **LinkedDataList** | Filtered view of a parent DataList | Database view |

## DataMap

A DataMap holds a single set of key-value pairs. Ideal for form data, search criteria, and single-record detail views.

### Definition

```xml
<w2:dataCollection>
  <w2:dataMap id="dm_employee">
    <w2:keyInfo>
      <w2:key id="empNo" name="Employee No" dataType="text"/>
      <w2:key id="empName" name="Employee Name" dataType="text"/>
      <w2:key id="salary" name="Salary" dataType="number"/>
      <w2:key id="hireDate" name="Hire Date" dataType="text"/>
      <w2:key id="isActive" name="Active" dataType="text" default="Y"/>
    </w2:keyInfo>
  </w2:dataMap>
</w2:dataCollection>
```

### Binding to Components

```xml
<w2:input id="inp_empName" ref="dm_employee.empName"/>
<w2:input id="inp_salary" ref="dm_employee.salary"/>
<w2:checkBox id="chk_active" ref="dm_employee.isActive" trueValue="Y" falseValue="N"/>
```

### JavaScript API

```javascript
// Get/Set values
var name = dm_employee.get("empName");
dm_employee.set("empName", "John Doe");

// Get all data as object
var data = dm_employee.getJSON();
// { empNo: "001", empName: "John Doe", salary: 50000, ... }

// Set multiple values at once
dm_employee.setJSON({
  empNo: "001",
  empName: "John Doe",
  salary: 50000
});

// Reset to defaults
dm_employee.initialize();

// Get modified status
var isModified = dm_employee.isModified();

// Set from XML
dm_employee.setXML(xmlString);

// Get as XML
var xml = dm_employee.getXML();
```

### Events

| Event | Description |
|-------|-------------|
| `onbeforechange` | Before a key value changes. Return false to cancel. |
| `onchange` | After a key value changes. |
| `ondataload` | After data is loaded (from submission response). |

```xml
<w2:dataMap id="dm_employee">
  <w2:keyInfo>
    <w2:key id="empName" name="Name" dataType="text"/>
  </w2:keyInfo>
  <w2:event>
    <w2:handler ev:event="onchange"><![CDATA[
      var info = e.changedInfo;
      console.log("Changed key: " + info.key + ", old: " + info.oldValue + ", new: " + info.newValue);
    ]]></w2:handler>
  </w2:event>
</w2:dataMap>
```

## DataList

A DataList holds tabular data as rows and columns. Used for grids, lists, and multi-record displays.

### Definition

```xml
<w2:dataCollection>
  <w2:dataList id="dl_employees" baseNode="root" repeatNode="row">
    <w2:columnInfo>
      <w2:column id="empNo" name="Employee No" dataType="text" primaryKey="true"/>
      <w2:column id="empName" name="Employee Name" dataType="text"/>
      <w2:column id="dept" name="Department" dataType="text"/>
      <w2:column id="salary" name="Salary" dataType="number"/>
      <w2:column id="hireDate" name="Hire Date" dataType="text"/>
    </w2:columnInfo>
  </w2:dataList>
</w2:dataCollection>
```

### JavaScript API — Row Operations

```javascript
// Get row count
var count = dl_employees.getRowCount();

// Get cell value
var name = dl_employees.getCellData(rowIndex, "empName");

// Set cell value
dl_employees.setCellData(rowIndex, "empName", "Jane Doe");

// Insert a new row
var newIdx = dl_employees.insertRow(rowIndex); // insert at position
dl_employees.addRow();                         // append at end

// Delete a row
dl_employees.deleteRow(rowIndex);
dl_employees.removeRow(rowIndex); // permanent remove, no undo

// Get row as object
var row = dl_employees.getRowJSON(rowIndex);

// Get all data as array
var allData = dl_employees.getJSON();

// Set all data
dl_employees.setJSON([
  { empNo: "001", empName: "John", dept: "Sales", salary: 50000 },
  { empNo: "002", empName: "Jane", dept: "Dev", salary: 60000 }
]);
```

### JavaScript API — Filtering and Sorting

```javascript
// Sort by column
dl_employees.sort("salary", "desc");
dl_employees.sort("empName", "asc");

// Multiple column sort
dl_employees.multiSort("dept:asc,salary:desc");

// Filter rows
dl_employees.setFilter("dept == 'Sales'");
dl_employees.removeFilter();

// Find rows
var idx = dl_employees.findRow("empName", "John");
var indices = dl_employees.findAllRow("dept", "Sales");
```

### JavaScript API — Status Tracking

DataList tracks row status for server sync:

| Status | Code | Meaning |
|--------|------|---------|
| `R` | Read | Original, unmodified row |
| `C` | Created | Newly inserted row |
| `U` | Updated | Modified existing row |
| `D` | Deleted | Marked for deletion |

```javascript
// Get row status
var status = dl_employees.getRowStatus(rowIndex);

// Get all modified rows
var modifiedJSON = dl_employees.getModifiedJSON();
// Returns { insertedRows: [...], updatedRows: [...], deletedRows: [...] }

// Get modified row count
var modCount = dl_employees.getModifiedRowCount();

// Accept changes (reset all statuses to R)
dl_employees.reform();
```

### Events

| Event | Description |
|-------|-------------|
| `oninsertrow` | After a row is inserted |
| `ondeleterow` | After a row is deleted |
| `onbeforechange` | Before a cell value changes. Return false to cancel. |
| `onchange` | After a cell value changes |
| `onsort` | After sorting is applied |
| `ondataload` | After data is loaded from submission |
| `onsetdata` | After data is set via setJSON/setXML |

```xml
<w2:dataList id="dl_employees">
  <w2:columnInfo>...</w2:columnInfo>
  <w2:event>
    <w2:handler ev:event="onchange"><![CDATA[
      var info = e.changedInfo;
      console.log("Row " + info.rowIndex + ", Col " + info.colId +
                  ": " + info.oldValue + " → " + info.newValue);
    ]]></w2:handler>
  </w2:event>
</w2:dataList>
```

## LinkedDataList

A LinkedDataList is a filtered view of a parent DataList. When the parent data changes, the linked list automatically updates.

### Definition

```xml
<w2:dataCollection>
  <w2:dataList id="dl_allEmployees">
    <w2:columnInfo>
      <w2:column id="empNo" dataType="text"/>
      <w2:column id="empName" dataType="text"/>
      <w2:column id="dept" dataType="text"/>
    </w2:columnInfo>
  </w2:dataList>

  <w2:linkedDataList id="dl_salesEmployees" baseDataList="dl_allEmployees">
    <w2:condition><![CDATA[
      dl_allEmployees.dept == "Sales"
    ]]></w2:condition>
  </w2:linkedDataList>
</w2:dataCollection>
```

### Usage

```javascript
// LinkedDataList automatically filters from parent
// When dl_allEmployees changes, dl_salesEmployees updates automatically

var salesCount = dl_salesEmployees.getRowCount();
var salesName = dl_salesEmployees.getCellData(0, "empName");

// Refresh filter manually
dl_salesEmployees.refresh();
```

## Data Formats

DataCollections support both JSON and XML data formats:

```javascript
// JSON format
dl_employees.setJSON([
  { empNo: "001", empName: "John" },
  { empNo: "002", empName: "Jane" }
]);

// XML format (matches baseNode/repeatNode attributes)
dl_employees.setXML(
  '<root>' +
  '  <row><empNo>001</empNo><empName>John</empName></row>' +
  '  <row><empNo>002</empNo><empName>Jane</empName></row>' +
  '</root>'
);
```

## Two-Way Binding

When a component is bound to a DataCollection via `ref`, changes flow both ways:

1. **UI → Data**: User edits an input → DataMap/DataList value updates automatically
2. **Data → UI**: Script sets a value via API → Bound component updates automatically

```xml
<!-- Bound input: editing updates dm_search.keyword automatically -->
<w2:input id="inp_keyword" ref="dm_search.keyword"/>

<!-- Grid bound to DataList: grid reflects DataList content -->
<w2:gridView id="grd_result" dataList="dl_result"/>
```
