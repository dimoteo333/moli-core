# Common Utilities

WebSquare provides utility objects and functions for common operations in page development.

## com Object

The `com` object provides common page-level utilities.

### Submission Execution

```javascript
// Execute submission
com.executeSubmission("sub_search");

// Execute with callbacks
com.executeSubmission("sub_save",
  function(e) { /* success */ },
  function(e) { /* error */ }
);
```

### Component Access

```javascript
// Get component by ID
var input = com.getComponent("inp_name");
var value = input.getValue();

// Check if component exists
if (com.getComponent("inp_optional")) {
  // Component exists
}
```

### Validation

```javascript
// Validate all mandatory fields in a group
var result = com.validate("grp_form");
if (!result.isValid) {
  WebSquare.util.alert(result.message);
  result.component.focus();
}
```

## $p Object

The `$p` object provides page-scope utilities.

### Component Access

```javascript
// Get component
var comp = $p.getComponent("inp_name");

// Get submission
var sub = $p.getSubmission("sub_search");
```

### Popup Operations

```javascript
// Open popup
$p.openPopup("/pages/popup/search.xml", {
  id: "pop_search",
  title: "Search",
  width: 500,
  height: 400,
  modal: true,
  closeCallback: "scwin.searchDone"
});

// Close popup (from within popup page)
$p.closePopup(returnValue);

// Get popup parameter (in popup page)
var param = $p.getParameter("empNo");
```

### Token (WFrame Parameters)

```javascript
// Get token value (in WFrame child page)
var empNo = $p.getToken("empNo");
```

### Parent/Child Access

```javascript
// Access parent page scope (from WFrame child)
var parentScope = $p.parent;
parentScope.scwin.refreshList();

// Access parent DataCollection
var keyword = $p.parent.dm_search.get("keyword");
```

### Event Dispatching

```javascript
// Fire custom event
$p.fireEvent("customEvent", { key: "value" });
```

## WebSquare.util

Global utility functions.

### Alerts and Confirms

```javascript
WebSquare.util.alert("Message");
WebSquare.util.confirm("Are you sure?", function(result) {
  if (result) { /* confirmed */ }
});
```

### String Operations

```javascript
WebSquare.util.trim(" hello ");         // "hello"
WebSquare.util.isEmpty(value);           // true if null/undefined/""
WebSquare.util.isNotEmpty(value);        // true if has value
WebSquare.util.lpad("5", 3, "0");       // "005"
WebSquare.util.rpad("5", 3, "0");       // "500"
```

### Date Operations

```javascript
WebSquare.util.getDate();                   // "20240115" (today)
WebSquare.util.getDateTime();               // "20240115143022"
WebSquare.util.formatDate("20240115", "yyyy-MM-dd"); // "2024-01-15"
WebSquare.util.addDate("20240115", 7);      // "20240122"
WebSquare.util.addMonth("20240115", 1);     // "20240215"
WebSquare.util.diffDate("20240101", "20240115"); // 14
WebSquare.util.getDayOfWeek("20240115");    // "Monday"
```

### Number Operations

```javascript
WebSquare.util.formatNumber(1234567);      // "1,234,567"
WebSquare.util.parseNumber("1,234,567");   // 1234567
WebSquare.util.isNumber("123");            // true
WebSquare.util.isNumber("abc");            // false
```

### Type Checking

```javascript
WebSquare.util.isArray(value);
WebSquare.util.isObject(value);
WebSquare.util.isFunction(value);
WebSquare.util.isString(value);
WebSquare.util.isNumber(value);
```

## JSON/XML Conversion

```javascript
// JSON to XML string
var xml = WebSquare.util.jsonToXml(jsonObj);

// XML string to JSON
var json = WebSquare.util.xmlToJson(xmlString);

// Object to query string
var qs = WebSquare.util.objectToQueryString({ name: "John", dept: "Sales" });
// "name=John&dept=Sales"
```

## Cookie Operations

```javascript
// Set cookie
WebSquare.util.setCookie("lastLogin", "20240115", 7); // expires in 7 days

// Get cookie
var lastLogin = WebSquare.util.getCookie("lastLogin");

// Delete cookie
WebSquare.util.deleteCookie("lastLogin");
```

## Local Storage

```javascript
// Save to local storage
WebSquare.util.setLocalStorage("userPrefs", JSON.stringify({ theme: "dark" }));

// Get from local storage
var prefs = JSON.parse(WebSquare.util.getLocalStorage("userPrefs"));

// Remove
WebSquare.util.removeLocalStorage("userPrefs");
```

## Page Navigation

```javascript
// Navigate to URL
WebSquare.util.navigate("/pages/dashboard.xml");

// Navigate with parameters
WebSquare.util.navigate("/pages/detail.xml", { empNo: "001" });

// Go back
WebSquare.util.goBack();
```

## Loading Indicator

```javascript
// Show loading
WebSquare.util.showLoadingIndicator();

// Hide loading
WebSquare.util.hideLoadingIndicator();

// Auto-managed: submissions show/hide loading automatically
```

## Clipboard

```javascript
// Copy text to clipboard
WebSquare.util.copyToClipboard("Text to copy");
```
