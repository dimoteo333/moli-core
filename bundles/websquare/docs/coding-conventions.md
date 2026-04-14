# Coding Conventions

Best practices and naming conventions for WebSquare development.

## Component ID Naming

Use a consistent prefix system for component IDs:

| Prefix | Component Type | Example |
|--------|---------------|---------|
| `inp_` | Input | `inp_empName` |
| `sel_` | SelectBox | `sel_dept` |
| `chk_` | CheckBox | `chk_active` |
| `rdo_` | Radio | `rdo_gender` |
| `btn_` | Anchor (Button) | `btn_save` |
| `grd_` | GridView | `grd_employees` |
| `grp_` | Group | `grp_search` |
| `tab_` | TabControl | `tab_main` |
| `tv_` | TreeView | `tv_menu` |
| `ical_` | InputCalendar | `ical_startDate` |
| `ta_` | TextArea | `ta_remarks` |
| `img_` | Image | `img_photo` |
| `wfr_` | WFrame | `wfr_content` |
| `wdc_` | WindowContainer | `wdc_main` |
| `sp_` | SplitPanel | `sp_main` |
| `acc_` | Accordion | `acc_settings` |
| `edt_` | Editor | `edt_content` |
| `trg_` | Trigger | `trg_search` |
| `fu_` | FileUpload | `fu_attachment` |
| `pn_` | PageNavigator | `pn_list` |
| `ccb_` | CheckComboBox | `ccb_skills` |
| `ft_` | FlipToggle | `ft_darkMode` |
| `dp_` | DatePicker | `dp_period` |
| `ac_` | AutoComplete | `ac_city` |

## DataCollection Naming

| Prefix | Type | Example |
|--------|------|---------|
| `dm_` | DataMap | `dm_search`, `dm_employee` |
| `dl_` | DataList | `dl_employees`, `dl_result` |
| `ldl_` | LinkedDataList | `ldl_filtered` |

## Submission Naming

| Prefix | Purpose | Example |
|--------|---------|---------|
| `sub_` | All submissions | `sub_search`, `sub_save`, `sub_delete` |

## Function Naming in scwin

```javascript
// Action functions: verb + noun
scwin.doSearch = function() { ... };
scwin.doSave = function() { ... };
scwin.doDelete = function() { ... };
scwin.doExport = function() { ... };

// Validation functions
scwin.validateForm = function() { ... };
scwin.validateGrid = function() { ... };

// Callback functions (suffix with Done/Error)
scwin.searchDone = function(e) { ... };
scwin.saveDone = function(e) { ... };
scwin.saveError = function(e) { ... };

// Event handler functions (on + event)
scwin.onpageload = function() { ... };
scwin.onRowClick = function(rowIdx) { ... };

// Utility/Helper functions
scwin.formatDate = function(dateStr) { ... };
scwin.getSelectedEmpNo = function() { ... };
scwin.loadDetail = function(empNo) { ... };

// Popup callbacks
scwin.popupClosed = function(result) { ... };
scwin.empSearchDone = function(result) { ... };
```

## Page Organization

### Standard Page Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:w2="http://www.inswave.com/websquare">
<head>
  <w2:buildDate/>
</head>
<body>
  <w2:page>
    <!-- 1. Model: Data + Server Communication -->
    <w2:model>
      <w2:dataCollection>
        <!-- DataMaps for search/form data -->
        <!-- DataLists for grid/list data -->
      </w2:dataCollection>

      <!-- Submissions in order of usage -->
    </w2:model>

    <!-- 2. Script: Page Logic -->
    <w2:script>
      <![CDATA[
        // Page lifecycle
        scwin.onpageload = function() { ... };

        // Action functions
        scwin.doSearch = function() { ... };
        scwin.doSave = function() { ... };

        // Validation
        scwin.validateForm = function() { ... };

        // Callbacks
        scwin.searchDone = function(e) { ... };
        scwin.saveDone = function(e) { ... };

        // Utilities
        scwin.formatDate = function(d) { ... };
      ]]>
    </w2:script>

    <!-- 3. Body: UI Components -->
    <w2:body>
      <!-- Search area -->
      <w2:group id="grp_search">...</w2:group>

      <!-- Button area -->
      <w2:group id="grp_buttons">...</w2:group>

      <!-- Data display area -->
      <w2:gridView id="grd_result" dataList="dl_result">...</w2:gridView>
    </w2:body>
  </w2:page>
</body>
</html>
```

## Common Patterns

### Standard CRUD Page

```javascript
scwin.onpageload = function() {
  scwin.doSearch();
};

scwin.doSearch = function() {
  com.executeSubmission("sub_search");
};

scwin.searchDone = function(e) {
  if (e.responseStatusCode === 200) {
    // dl_result is populated automatically
  }
};

scwin.doAdd = function() {
  dl_result.addRow();
  var lastIdx = dl_result.getRowCount() - 1;
  grd_result.focusCell(lastIdx, "empName");
};

scwin.doDelete = function() {
  var idx = grd_result.getSelectedRowIndex();
  if (idx < 0) {
    WebSquare.util.alert("Please select a row");
    return;
  }
  WebSquare.util.confirm("Delete this row?", function(ok) {
    if (ok) dl_result.deleteRow(idx);
  });
};

scwin.doSave = function() {
  if (!scwin.validateGrid()) return;

  var modCount = dl_result.getModifiedRowCount();
  if (modCount === 0) {
    WebSquare.util.alert("No changes to save");
    return;
  }

  com.executeSubmission("sub_save");
};

scwin.saveDone = function(e) {
  if (e.responseStatusCode === 200) {
    WebSquare.util.alert("Saved successfully");
    dl_result.reform();
    scwin.doSearch();
  }
};
```

### Error Handling

```javascript
// Global error handler for submissions
scwin.handleError = function(e) {
  var status = e.responseStatusCode;
  if (status === 401) {
    WebSquare.util.alert("Session expired. Please log in again.");
    location.href = "/login";
  } else if (status === 403) {
    WebSquare.util.alert("You do not have permission for this action.");
  } else if (status >= 500) {
    WebSquare.util.alert("Server error. Please try again later.");
  } else {
    WebSquare.util.alert("Error: " + e.responseBody);
  }
};
```

## File Organization

```
pages/
├── main.xml              # Main layout (menu + windowContainer)
├── dashboard.xml         # Dashboard page
├── employee/
│   ├── emp-list.xml      # Employee list/search
│   ├── emp-detail.xml    # Employee detail/edit
│   └── emp-register.xml  # New employee registration
├── order/
│   ├── order-list.xml
│   └── order-detail.xml
├── popup/
│   ├── emp-search.xml    # Employee search popup
│   ├── dept-search.xml   # Department search popup
│   └── confirm.xml       # Custom confirm popup
└── common/
    ├── header.xml        # Shared header
    └── footer.xml        # Shared footer
```
