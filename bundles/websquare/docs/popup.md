# Popup and Dialog

WebSquare provides several popup mechanisms for modal dialogs, alerts, confirmations, and embedded page popups.

## Alert and Confirm

Built-in utility functions for simple dialogs:

```javascript
// Simple alert
WebSquare.util.alert("Operation completed successfully.");

// Confirm dialog
WebSquare.util.confirm("Are you sure you want to delete?", function(result) {
  if (result) {
    scwin.doDelete();
  }
});
```

## Popup Window

Open a WebSquare page as a popup window (browser popup or layer popup).

### Layer Popup (Recommended)

```javascript
// Open as modal layer popup
$p.openPopup("/pages/employee-detail.xml", {
  id: "pop_empDetail",
  title: "Employee Detail",
  width: 600,
  height: 400,
  modal: true,
  params: {
    empNo: "001",
    mode: "edit"
  },
  closeCallback: "scwin.popupClosed"
});
```

### Reading Parameters in Popup Page

```javascript
// In the popup page's onpageload
scwin.onpageload = function() {
  var empNo = $p.getParameter("empNo");
  var mode = $p.getParameter("mode");

  dm_employee.set("empNo", empNo);
  if (mode === "edit") {
    com.executeSubmission("sub_loadEmployee");
  }
};
```

### Closing Popup with Return Value

```javascript
// In the popup page: close and return data
scwin.doConfirm = function() {
  var result = {
    empNo: dm_employee.get("empNo"),
    empName: dm_employee.get("empName"),
    action: "saved"
  };
  $p.closePopup(result);
};

// Cancel without returning data
scwin.doCancel = function() {
  $p.closePopup();
};
```

### Close Callback in Parent

```javascript
// In the parent page: handle popup close
scwin.popupClosed = function(result) {
  if (result && result.action === "saved") {
    alert(result.empName + " was saved successfully");
    com.executeSubmission("sub_search"); // Refresh list
  }
};
```

## Popup Options

| Option | Description |
|--------|-------------|
| `id` | Unique popup identifier |
| `title` | Popup title bar text |
| `width` | Width in pixels |
| `height` | Height in pixels |
| `modal` | Modal mode (blocks background interaction) |
| `resizable` | Allow resizing |
| `draggable` | Allow dragging |
| `closeButton` | Show close button |
| `params` | Parameters to pass to popup page |
| `closeCallback` | Function called when popup closes |
| `left` | Left position in pixels |
| `top` | Top position in pixels |
| `center` | Center on screen (default: true) |

## Browser Window Popup

Open as a separate browser window:

```javascript
$p.openWindow("/pages/report.xml", {
  id: "win_report",
  title: "Report",
  width: 800,
  height: 600,
  params: { reportId: "RPT001" }
});
```

## Trigger Component (Popup Trigger)

A specialized component that shows a popup panel on click:

```xml
<w2:trigger id="trg_empSearch" label="Employee Search">
  <w2:script ev:event="onsearch"><![CDATA[
    $p.openPopup("/pages/popup/emp-search.xml", {
      id: "pop_empSearch",
      title: "Search Employee",
      width: 500,
      height: 400,
      modal: true,
      closeCallback: "scwin.empSearchDone"
    });
  ]]></w2:script>
</w2:trigger>
```

```javascript
scwin.empSearchDone = function(result) {
  if (result) {
    dm_employee.set("empNo", result.empNo);
    dm_employee.set("empName", result.empName);
  }
};
```

## Common Popup Patterns

### Search Popup

```javascript
// Parent: Open search popup
scwin.openDeptSearch = function() {
  $p.openPopup("/pages/popup/dept-search.xml", {
    id: "pop_deptSearch",
    title: "Department Search",
    width: 500,
    height: 400,
    modal: true,
    closeCallback: "scwin.deptSelected"
  });
};

scwin.deptSelected = function(result) {
  if (result) {
    dm_search.set("deptCode", result.deptCode);
    dm_search.set("deptName", result.deptName);
  }
};
```

### Confirmation Before Action

```javascript
scwin.doDelete = function() {
  var idx = grd_employees.getSelectedRowIndex();
  if (idx < 0) {
    WebSquare.util.alert("Please select an employee to delete.");
    return;
  }

  var empName = dl_employees.getCellData(idx, "empName");
  WebSquare.util.confirm("Delete " + empName + "?", function(confirmed) {
    if (confirmed) {
      dl_employees.deleteRow(idx);
      com.executeSubmission("sub_deleteEmployee");
    }
  });
};
```

### Multi-Step Wizard Popup

```javascript
scwin.openWizard = function() {
  $p.openPopup("/pages/popup/wizard.xml", {
    id: "pop_wizard",
    title: "Setup Wizard",
    width: 700,
    height: 500,
    modal: true,
    resizable: false,
    closeCallback: "scwin.wizardDone"
  });
};
```
