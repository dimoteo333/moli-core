# Submission

Submission is WebSquare's declarative mechanism for server communication. It defines how data is sent to and received from the server, with automatic DataCollection binding.

## Basic Definition

```xml
<w2:model>
  <w2:submission id="sub_search"
    action="/api/employees/search"
    method="post"
    ref="dm_search"
    target="dl_result"
    submitDone="scwin.searchDone">
  </w2:submission>
</w2:model>
```

## Key Attributes

| Attribute | Description |
|-----------|-------------|
| `id` | Unique identifier for the submission |
| `action` | Server URL endpoint |
| `method` | HTTP method: `get`, `post`, `put`, `delete` |
| `ref` | Source DataCollection(s) to send as request data |
| `target` | Target DataCollection(s) to populate with response |
| `submitDone` | Callback function after successful response |
| `submitError` | Callback function on error |
| `encoding` | Request encoding (default: UTF-8) |
| `mediaType` | Content type: `application/json`, `application/xml`, etc. |
| `async` | Asynchronous request (default: true) |
| `responseType` | Expected response format: `json`, `xml` |

## Executing a Submission

```javascript
// Basic execution
com.executeSubmission("sub_search");

// With dynamic parameters
com.executeSubmission("sub_search", function(e) {
  // submitDone callback (overrides XML attribute)
  if (e.responseStatusCode === 200) {
    alert("Found " + dl_result.getRowCount() + " results");
  }
}, function(e) {
  // submitError callback
  alert("Error: " + e.responseStatusCode);
});
```

## Request Data Mapping

### Single DataMap Reference

```xml
<w2:submission id="sub_save"
  action="/api/employee/save"
  method="post"
  ref="dm_employee"
  mediaType="application/json">
</w2:submission>
```

Sends the DataMap as JSON:
```json
{
  "empNo": "001",
  "empName": "John Doe",
  "salary": 50000
}
```

### Multiple References

Send data from multiple DataCollections:

```xml
<w2:submission id="sub_save"
  action="/api/save"
  method="post"
  ref="dm_header:header,dl_detail:detail"
  mediaType="application/json">
</w2:submission>
```

Sends:
```json
{
  "header": { "orderNo": "ORD001", "orderDate": "2024-01-15" },
  "detail": [
    { "itemNo": "ITEM001", "qty": 10 },
    { "itemNo": "ITEM002", "qty": 5 }
  ]
}
```

### Sending Modified Rows Only

For efficient updates, send only changed rows:

```xml
<w2:submission id="sub_saveChanges"
  action="/api/employee/saveChanges"
  method="post"
  ref="dl_employees:modified"
  mediaType="application/json">
</w2:submission>
```

In JavaScript:
```javascript
// Manually get modified data
var modified = dl_employees.getModifiedJSON();
// { insertedRows: [...], updatedRows: [...], deletedRows: [...] }
```

## Response Data Mapping

### Single Target

```xml
<w2:submission id="sub_search"
  action="/api/employees"
  target="dl_result"
  responseType="json">
</w2:submission>
```

Server response automatically populates `dl_result`:
```json
[
  { "empNo": "001", "empName": "John" },
  { "empNo": "002", "empName": "Jane" }
]
```

### Multiple Targets

```xml
<w2:submission id="sub_detail"
  action="/api/order/detail"
  target="dm_orderHeader:header,dl_orderLines:lines"
  responseType="json">
</w2:submission>
```

Expected server response:
```json
{
  "header": { "orderNo": "ORD001", "status": "Confirmed" },
  "lines": [
    { "lineNo": 1, "item": "Widget", "qty": 10 },
    { "lineNo": 2, "item": "Gadget", "qty": 5 }
  ]
}
```

## Callbacks

### submitDone

Called on successful server response:

```javascript
scwin.searchDone = function(e) {
  var status = e.responseStatusCode;  // HTTP status code
  var data = e.responseBody;          // Raw response body

  if (status === 200) {
    // dl_result is already populated by target mapping
    var count = dl_result.getRowCount();
    alert("Found " + count + " records");
  }
};
```

### submitError

Called on communication failure:

```javascript
scwin.searchError = function(e) {
  var status = e.responseStatusCode;
  var msg = e.responseBody;
  alert("Request failed: " + status + " - " + msg);
};
```

## Submission Events

Events can be defined inline in the submission:

```xml
<w2:submission id="sub_search" action="/api/search" ref="dm_search" target="dl_result">
  <w2:event>
    <w2:handler ev:event="onbeforesubmit"><![CDATA[
      // Validate before sending
      if (!dm_search.get("keyword")) {
        alert("Please enter a search keyword");
        return false; // Cancel submission
      }
    ]]></w2:handler>
    <w2:handler ev:event="onsubmitdone"><![CDATA[
      // Process response
      console.log("Search complete");
    ]]></w2:handler>
    <w2:handler ev:event="onsubmiterror"><![CDATA[
      alert("Server error occurred");
    ]]></w2:handler>
  </w2:event>
</w2:submission>
```

## File Upload

Submission supports file uploads with multipart encoding:

```xml
<w2:submission id="sub_upload"
  action="/api/upload"
  method="post"
  encoding="multipart/form-data"
  ref="dm_fileInfo">
</w2:submission>
```

```xml
<w2:fileUpload id="fu_file" submission="sub_upload"/>
```

## Dynamic Action URL

Override the action URL at runtime:

```javascript
// Change URL before execution
$p.getSubmission("sub_search").action = "/api/v2/employees/search";
com.executeSubmission("sub_search");

// Or use parameter substitution
// action="/api/employee/{empNo}"
```

## Best Practices

1. **Use meaningful IDs**: Prefix with `sub_` for clarity (e.g., `sub_search`, `sub_save`)
2. **Validate before submit**: Use `onbeforesubmit` event to validate data
3. **Handle errors**: Always define `submitError` or `onsubmiterror`
4. **Send only changes**: Use `ref="dl_name:modified"` for update operations
5. **Match response format**: Ensure `responseType` matches actual server response
6. **Use JSON mediaType**: Prefer `application/json` over XML for modern APIs
