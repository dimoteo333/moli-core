# WFrame

WFrame is WebSquare's mechanism for composing pages from reusable sub-pages, enabling SPA-like (Single Page Application) navigation without full page reloads.

## Basic Usage

```xml
<w2:wframe id="wfr_content" src="/pages/dashboard.xml" style="width:100%; height:100%;"/>
```

## Key Attributes

| Attribute | Description |
|-----------|-------------|
| `id` | Unique identifier |
| `src` | URL of the sub-page to load |
| `style` | CSS styling |
| `scope` | JavaScript scope isolation mode |
| `token` | Pass parameters to sub-page |

## Loading Pages Dynamically

```javascript
// Load a page into WFrame
wfr_content.setSrc("/pages/employee-list.xml");

// Load with parameters
wfr_content.setSrc("/pages/employee-detail.xml?empNo=001");

// Get current source
var currentSrc = wfr_content.getSrc();

// Reload current page
wfr_content.reload();
```

## Scope Isolation

Each WFrame creates its own JavaScript scope. The sub-page has its own `scwin` object, DataCollections, and component IDs that don't conflict with the parent page.

```xml
<!-- Parent page -->
<w2:input id="inp_name" ref="dm_parent.name"/>
<w2:wframe id="wfr_child" src="/pages/child.xml"/>

<!-- child.xml can also have inp_name without conflict -->
```

### Accessing Parent from Child

```javascript
// In child page: access parent scope
var parentValue = $p.parent.scwin.someFunction();
var parentData = $p.parent.dm_search.get("keyword");
```

### Accessing Child from Parent

```javascript
// In parent page: access child scope
var childScope = wfr_content.getWindow();
childScope.scwin.someFunction();

// Access child DataCollection
var childDl = wfr_content.getWindow().dl_result;
var count = childDl.getRowCount();
```

## Communication Between Frames

### Using Token Parameters

```javascript
// Parent: pass data to child via token
wfr_content.setSrc("/pages/detail.xml");
wfr_content.setToken("empNo", "001");
wfr_content.setToken("mode", "edit");

// Child: read token values in onpageload
scwin.onpageload = function() {
  var empNo = $p.getToken("empNo");
  var mode = $p.getToken("mode");
  // Use values to initialize page
};
```

### Direct Function Calls

```javascript
// Parent calling child function
wfr_content.getWindow().scwin.refreshData();

// Child calling parent function
$p.parent.scwin.updateStatus("saved");
```

### Custom Events

```javascript
// Parent: listen for child events
wfr_content.addEventListener("customEvent", function(data) {
  console.log("Received from child:", data);
});

// Child: dispatch event to parent
$p.fireEvent("customEvent", { empNo: "001", action: "saved" });
```

## WFrame with WindowContainer

WFrame is commonly used inside WindowContainer (MDI) for multi-tab interfaces:

```xml
<w2:windowContainer id="wdc_main" style="width:100%; height:100%;">
  <!-- Tabs are added dynamically -->
</w2:windowContainer>
```

```javascript
// Open a new tab with WFrame content
wdc_main.createWindow({
  id: "win_empList",
  title: "Employee List",
  src: "/pages/employee-list.xml",
  closable: true,
  openAction: "select"  // If already open, select existing tab
});

// Close a tab
wdc_main.closeWindow("win_empList");

// Get active window
var activeId = wdc_main.getActiveWindowId();
```

## Lifecycle Events

```xml
<w2:wframe id="wfr_content" src="/pages/content.xml">
  <w2:script ev:event="onload"><![CDATA[
    console.log("WFrame content loaded");
  ]]></w2:script>
  <w2:script ev:event="onbeforeunload"><![CDATA[
    // Return false to prevent navigation
    if (hasUnsavedChanges()) {
      return confirm("Unsaved changes. Leave?");
    }
  ]]></w2:script>
</w2:wframe>
```

## Lazy Loading

Load WFrame content only when needed:

```xml
<!-- Don't set src initially -->
<w2:wframe id="wfr_detail" style="width:100%; height:400px;"/>
```

```javascript
// Load on demand (e.g., when user clicks a row)
scwin.onRowClick = function(rowIndex) {
  var empNo = dl_employees.getCellData(rowIndex, "empNo");
  wfr_detail.setSrc("/pages/employee-detail.xml?empNo=" + empNo);
};
```

## Best Practices

1. **Use scope isolation**: Don't rely on global variables across frames
2. **Use tokens for parameters**: Prefer `setToken` over URL query parameters for complex data
3. **Handle unload events**: Warn users about unsaved changes before navigation
4. **Lazy load when possible**: Don't load all WFrames on page init
5. **Clean up resources**: Release event listeners and timers in unload handlers
