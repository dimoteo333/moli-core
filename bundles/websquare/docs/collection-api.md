# Collection API

WebSquare provides utility collection classes through the `WebSquare.collection` namespace for working with dynamic data structures in JavaScript.

## Vector

An ordered, resizable array-like collection.

### Creating a Vector

```javascript
var vec = new WebSquare.collection.Vector();
```

### Adding Elements

```javascript
vec.add("item1");
vec.add("item2");
vec.add("item3");

// Insert at specific index
vec.addAt(1, "inserted");
```

### Accessing Elements

```javascript
var item = vec.get(0);          // "item1"
var size = vec.size();           // 4
var isEmpty = vec.isEmpty();     // false
```

### Modifying Elements

```javascript
vec.set(0, "updated");           // Replace at index
vec.remove(1);                   // Remove at index
vec.removeElement("item3");      // Remove by value
vec.clear();                     // Remove all
```

### Searching

```javascript
var idx = vec.indexOf("item2");   // Returns index or -1
var exists = vec.contains("item1"); // true/false
```

### Iteration

```javascript
for (var i = 0; i < vec.size(); i++) {
  console.log(vec.get(i));
}
```

### Conversion

```javascript
var arr = vec.toArray();          // Convert to JavaScript array
var str = vec.toString();         // String representation
```

## Hashtable

A key-value map collection.

### Creating a Hashtable

```javascript
var map = new WebSquare.collection.Hashtable();
```

### Adding Entries

```javascript
map.put("name", "John");
map.put("dept", "Sales");
map.put("salary", 50000);
```

### Accessing Values

```javascript
var name = map.get("name");       // "John"
var size = map.size();            // 3
var isEmpty = map.isEmpty();     // false
```

### Checking Keys

```javascript
var hasName = map.containsKey("name");     // true
var hasSales = map.containsValue("Sales"); // true
```

### Removing Entries

```javascript
map.remove("salary");
map.clear();
```

### Getting Keys and Values

```javascript
var keys = map.keys();            // Array of all keys
var values = map.values();        // Array of all values
```

### Iteration

```javascript
var keys = map.keys();
for (var i = 0; i < keys.length; i++) {
  var key = keys[i];
  var value = map.get(key);
  console.log(key + " = " + value);
}
```

## WebSquare.util

Common utility functions available globally.

### String Utilities

```javascript
// Trim whitespace
var trimmed = WebSquare.util.trim("  hello  ");  // "hello"

// Check empty/null
var isEmpty = WebSquare.util.isEmpty(value);      // true if null, undefined, or ""

// String format
var formatted = WebSquare.util.formatString("{0} is {1}", "John", "developer");
```

### Number Utilities

```javascript
// Format number with commas
var formatted = WebSquare.util.formatNumber(1234567);  // "1,234,567"

// Parse formatted number
var num = WebSquare.util.parseNumber("1,234,567");     // 1234567
```

### Date Utilities

```javascript
// Get current date
var today = WebSquare.util.getDate();        // "20240115"
var now = WebSquare.util.getDateTime();      // "20240115143022"

// Format date
var formatted = WebSquare.util.formatDate("20240115", "yyyy-MM-dd"); // "2024-01-15"

// Add days
var nextWeek = WebSquare.util.addDate("20240115", 7);  // "20240122"

// Difference in days
var diff = WebSquare.util.diffDate("20240101", "20240115"); // 14
```

### Array Utilities

```javascript
// Check if value exists in array
var exists = WebSquare.util.inArray("a", ["a", "b", "c"]); // true
```

## Common Usage Patterns

### Building Dynamic Parameters

```javascript
var params = new WebSquare.collection.Hashtable();
params.put("empNo", dm_search.get("empNo"));
params.put("dept", sel_dept.getValue());
params.put("fromDate", ical_fromDate.getValue());
params.put("toDate", ical_toDate.getValue());

// Use for API call or other processing
var queryString = "";
var keys = params.keys();
for (var i = 0; i < keys.length; i++) {
  var value = params.get(keys[i]);
  if (value) {
    queryString += (queryString ? "&" : "?") + keys[i] + "=" + encodeURIComponent(value);
  }
}
```

### Collecting Selected Items

```javascript
var selectedItems = new WebSquare.collection.Vector();
var checkedRows = grd_employees.getCheckedRowIndices();

for (var i = 0; i < checkedRows.length; i++) {
  var empNo = dl_employees.getCellData(checkedRows[i], "empNo");
  selectedItems.add(empNo);
}

if (selectedItems.isEmpty()) {
  WebSquare.util.alert("Please select at least one employee");
  return;
}

dm_action.set("empNos", selectedItems.toArray().join(","));
```
