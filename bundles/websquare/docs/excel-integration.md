# Excel Integration

WebSquare provides built-in Excel import/export functionality for GridView components.

## Excel Export

### Basic Export

```javascript
grd_employees.saveAsExcel({
  fileName: "employees.xlsx"
});
```

### Export Options

```javascript
grd_employees.saveAsExcel({
  fileName: "employee_report.xlsx",
  sheetName: "Employees",
  includeHeader: true,
  includeFooter: true,
  headerTitle: "Employee Report",
  headerSubTitle: "Generated: " + WebSquare.util.formatDate(WebSquare.util.getDate(), "yyyy-MM-dd"),
  useFormat: true,          // Apply display formats
  useStyle: true,           // Apply cell styles
  startRowIndex: 0,         // Start row for export
  endRowIndex: -1,          // -1 means all rows
  excludeColumns: ["action"] // Columns to exclude
});
```

### Export Specific Columns

```javascript
grd_employees.saveAsExcel({
  fileName: "employees.xlsx",
  columns: ["empNo", "empName", "dept", "salary"],
  columnLabels: ["Employee No", "Name", "Department", "Salary"]
});
```

### Export Multiple Grids to One File

```javascript
WebSquare.util.exportMultiGridToExcel({
  fileName: "full_report.xlsx",
  grids: [
    { gridId: "grd_summary", sheetName: "Summary" },
    { gridId: "grd_detail", sheetName: "Detail" },
    { gridId: "grd_statistics", sheetName: "Statistics" }
  ]
});
```

## Excel Import

### Basic Import

```javascript
grd_employees.loadFromExcel({
  headerRowIndex: 0,       // Row containing headers (0-based)
  dataStartRowIndex: 1     // Row where data starts
});
```

### Import Options

```javascript
grd_employees.loadFromExcel({
  headerRowIndex: 0,
  dataStartRowIndex: 1,
  sheetIndex: 0,           // Which sheet to import (0-based)
  append: false,            // false = replace, true = append to existing data
  columnMapping: {          // Map Excel columns to DataList columns
    "Employee No": "empNo",
    "Name": "empName",
    "Department": "dept",
    "Salary": "salary"
  }
});
```

### Import with Validation

```javascript
scwin.doImport = function() {
  grd_employees.loadFromExcel({
    headerRowIndex: 0,
    dataStartRowIndex: 1,
    onComplete: function(importedCount) {
      // Validate imported data
      var errors = [];
      for (var i = 0; i < dl_employees.getRowCount(); i++) {
        if (!dl_employees.getCellData(i, "empName")) {
          errors.push("Row " + (i + 1) + ": Name is required");
        }
      }

      if (errors.length > 0) {
        WebSquare.util.alert("Import errors:\n" + errors.join("\n"));
      } else {
        WebSquare.util.alert(importedCount + " rows imported successfully");
      }
    }
  });
};
```

## CSV Export

```javascript
grd_employees.saveAsCSV({
  fileName: "employees.csv",
  separator: ",",
  includeHeader: true,
  encoding: "UTF-8"
});
```

## Print

```javascript
// Print grid
grd_employees.print({
  title: "Employee List",
  orientation: "landscape",  // "portrait" or "landscape"
  includeHeader: true,
  includeFooter: true
});
```

## Best Practices

1. **File naming**: Include date in filename for reports: `"report_" + WebSquare.util.getDate() + ".xlsx"`
2. **Large datasets**: For very large exports, consider server-side Excel generation
3. **Format preservation**: Use `useFormat: true` to match display formatting in the grid
4. **Column exclusion**: Exclude action/button columns from exports
5. **Import validation**: Always validate data after Excel import before saving to server
