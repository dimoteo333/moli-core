# Events

WebSquare components communicate through an event system. Events can be defined inline in XML or bound programmatically.

## Event Binding in XML

### Inline Script Events

```xml
<w2:anchor id="btn_save" label="Save">
  <w2:script ev:event="onclick"><![CDATA[
    scwin.doSave();
  ]]></w2:script>
</w2:anchor>

<w2:input id="inp_search">
  <w2:script ev:event="onkeydown"><![CDATA[
    if (e.keyCode === 13) scwin.doSearch();
  ]]></w2:script>
  <w2:script ev:event="onchange"><![CDATA[
    console.log("New value: " + this.getValue());
  ]]></w2:script>
</w2:input>
```

### DataCollection Events

```xml
<w2:dataMap id="dm_search">
  <w2:keyInfo>
    <w2:key id="keyword" dataType="text"/>
  </w2:keyInfo>
  <w2:event>
    <w2:handler ev:event="onchange"><![CDATA[
      console.log("Changed: " + e.changedInfo.key);
    ]]></w2:handler>
  </w2:event>
</w2:dataMap>
```

## Programmatic Event Binding

```javascript
// Add event listener
inp_name.addEventListener("onchange", function(e) {
  console.log("Name changed to: " + inp_name.getValue());
});

// Remove event listener
inp_name.removeEventListener("onchange", handlerFunction);
```

## Page Lifecycle Events

```javascript
// Page fully loaded and ready
scwin.onpageload = function() {
  scwin.initPage();
};

// Before page unloads (e.g., navigating away)
scwin.onpageunload = function() {
  // Cleanup resources
};

// Window resize
scwin.onresize = function() {
  grd_data.refresh();
};
```

## Common Component Events

### Form Components

| Event | Components | Description |
|-------|-----------|-------------|
| `onclick` | All | Component clicked |
| `ondblclick` | All | Double-clicked |
| `onchange` | Input, SelectBox, CheckBox, Radio, Calendar | Value changed |
| `onfocus` | Input, TextArea | Received focus |
| `onblur` | Input, TextArea | Lost focus |
| `onkeydown` | Input, TextArea | Key pressed |
| `onkeyup` | Input, TextArea | Key released |
| `oninput` | Input | Value changing (each keystroke) |

### GridView Events

| Event | Description |
|-------|-------------|
| `oncellclick` | Cell clicked — `e.rowIndex`, `e.columnId` |
| `oncelldblclick` | Cell double-clicked |
| `onrowclick` | Row clicked — `e.rowIndex` |
| `onrowdblclick` | Row double-clicked |
| `onheaderclick` | Header clicked — `e.columnId` |
| `oncellchange` | Cell value changed — `e.rowIndex`, `e.columnId`, `e.oldValue`, `e.newValue` |
| `onbeforecellchange` | Before cell change — return false to cancel |
| `oncheckboxchange` | Row checkbox toggled |
| `onselectionchange` | Selection changed |
| `onsort` | After sorting |

### DataList Events

| Event | Description |
|-------|-------------|
| `oninsertrow` | Row inserted — `e.rowIndex` |
| `ondeleterow` | Row deleted — `e.rowIndex` |
| `onchange` | Cell value changed — `e.changedInfo` |
| `onbeforechange` | Before change — return false to cancel |
| `ondataload` | Data loaded from submission |
| `onsort` | After sort |

### Container Events

| Event | Component | Description |
|-------|-----------|-------------|
| `onchange` | TabControl | Tab selection changed |
| `onwindowcreate` | WindowContainer | New tab created |
| `onwindowclose` | WindowContainer | Tab closed |
| `onbeforewindowclose` | WindowContainer | Before tab close — return false to cancel |
| `onselect` | TreeView | Node selected |
| `onexpand` | TreeView | Node expanded |
| `oncollapse` | TreeView | Node collapsed |

## Event Object Properties

The event object `e` contains context-specific properties:

```javascript
// GridView cell click
scwin.onCellClick = function(e) {
  var rowIndex = e.rowIndex;
  var columnId = e.columnId;
  var value = e.value;
};

// DataList change
scwin.onDataChange = function(e) {
  var info = e.changedInfo;
  var rowIndex = info.rowIndex;
  var colId = info.colId;
  var oldValue = info.oldValue;
  var newValue = info.newValue;
};

// Submission done
scwin.onSubmitDone = function(e) {
  var statusCode = e.responseStatusCode;
  var body = e.responseBody;
};

// Keyboard events
scwin.onKeyDown = function(e) {
  var keyCode = e.keyCode;
  var ctrlKey = e.ctrlKey;
  var shiftKey = e.shiftKey;
  var altKey = e.altKey;
};
```

## Custom Events

### Dispatching Custom Events

```javascript
// Fire custom event on a component
$p.fireEvent("customSave", { empNo: "001", status: "saved" });
```

### Cross-Frame Events

```javascript
// Parent listening for child WFrame events
wfr_content.addEventListener("customEvent", function(data) {
  console.log("Child says:", data);
});

// Child dispatching to parent
$p.fireEvent("customEvent", { message: "Hello from child" });
```

## Event Patterns

### Debounced Search

```javascript
var searchTimer = null;

// In input oninput event:
scwin.onSearchInput = function() {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(function() {
    scwin.doSearch();
  }, 300);
};
```

### Keyboard Shortcuts

```javascript
scwin.onpageload = function() {
  document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.keyCode === 83) {  // Ctrl+S
      e.preventDefault();
      scwin.doSave();
    }
    if (e.keyCode === 113) {  // F2
      scwin.doSearch();
    }
  });
};
```
