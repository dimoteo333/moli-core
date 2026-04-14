# Troubleshooting

Common issues and solutions in WebSquare development.

## Page Loading Issues

### Page Not Rendering

**Symptom**: Blank page or XML source displayed.

**Solutions**:
1. Check XML syntax — WebSquare pages must be valid XML
2. Verify namespace declaration: `xmlns:w2="http://www.inswave.com/websquare"`
3. Check that the page URL is mapped in the WebSquare engine
4. Verify `<w2:page>` wraps model, script, and body sections

```xml
<!-- Correct structure -->
<w2:page>
  <w2:model>...</w2:model>
  <w2:script>...</w2:script>
  <w2:body>...</w2:body>
</w2:page>
```

### onpageload Not Firing

**Solutions**:
1. Ensure function is defined on `scwin` scope:
```javascript
// Correct
scwin.onpageload = function() { ... };

// Wrong - won't fire
function onpageload() { ... }
```
2. Check for JavaScript errors in the console that prevent script execution
3. Verify the `<w2:script>` block has proper CDATA wrapping

## DataCollection Issues

### Data Not Binding to Components

**Solutions**:
1. Check `ref` attribute matches DataCollection ID and key:
```xml
<!-- Correct -->
<w2:input id="inp_name" ref="dm_employee.empName"/>

<!-- Wrong: DataMap ID or key mismatch -->
<w2:input id="inp_name" ref="dm_emp.name"/>
```
2. Verify DataCollection is defined in `<w2:model>` before the component
3. For GridView, check `dataList` attribute matches DataList ID

### DataList Not Loading from Submission

**Solutions**:
1. Check `target` attribute matches DataList ID:
```xml
<w2:submission id="sub_search" target="dl_result"/>
```
2. Verify `responseType` matches server response format
3. Check `baseNode` and `repeatNode` attributes for XML responses:
```xml
<w2:dataList id="dl_result" baseNode="root" repeatNode="row">
```
4. Check server response structure matches column definitions

### Row Status Not Tracking

**Solutions**:
- `reform()` resets all statuses to 'R' — call it only after save confirms success
- `removeRow()` permanently removes (no status tracking); use `deleteRow()` to mark as 'D'
- Newly added rows have status 'C'; modified existing rows have 'U'

## Submission Issues

### Submission Not Executing

**Solutions**:
1. Check submission ID in `com.executeSubmission()` matches the XML definition
2. Verify `action` URL is correct and accessible
3. Check `onbeforesubmit` event — returning false cancels the submission
4. Look for JavaScript errors before the submission call

### Response Data Not Mapping

**Solutions**:
1. Verify `target` attribute references correct DataCollection(s)
2. For multiple targets, use format: `target="dm_header:headerKey,dl_detail:detailKey"`
3. Check response JSON structure matches target mapping
4. Verify `responseType` is set correctly (`json` or `xml`)

### CORS Errors

If calling external APIs:
```javascript
// Server-side proxy is recommended instead of direct cross-origin calls
// Configure proxy in websquare.xml or application server
```

## GridView Issues

### Grid Not Displaying Data

**Solutions**:
1. Verify `dataList` attribute matches DataList ID
2. Check column `id` values match DataList column IDs
3. Ensure grid has explicit height (height:0 or height:auto may hide content):
```xml
<w2:gridView id="grd_data" dataList="dl_data" style="width:100%; height:400px;">
```

### Cell Editing Not Working

**Solutions**:
1. Set `inputType` on detail columns:
```xml
<w2:detail>
  <w2:row>
    <w2:column id="empName" inputType="text"/>
  </w2:row>
</w2:detail>
```
2. Check `readOnly` is not set to true on grid or column
3. Verify the grid is not in read-only mode: `grd_data.setReadOnly(false)`

### Excel Export Empty

**Solutions**:
1. Ensure DataList has data before export
2. Check column IDs in export configuration match actual columns
3. Verify the grid is rendered (not hidden) when exporting

## WFrame Issues

### Child Page Not Loading

**Solutions**:
1. Check `src` attribute URL is correct
2. Verify the child page is valid WebSquare XML
3. Check browser console for load errors

### Cross-Frame Communication Failing

**Solutions**:
1. Use correct access pattern:
```javascript
// Parent → Child
wfr_content.getWindow().scwin.childFunction();

// Child → Parent
$p.parent.scwin.parentFunction();
```
2. Ensure the target page is fully loaded before accessing its scope
3. Check that function names are defined on `scwin` in the target page

## Performance

### Slow Page Load

**Solutions**:
1. Reduce initial data loading — use lazy loading for tabs and detail views
2. Limit initial grid data — use server-side pagination
3. Minimize WFrame nesting depth
4. Defer non-critical submission calls

### Large DataList Performance

**Solutions**:
1. Use server-side pagination instead of loading all rows
2. Use `dl.setJSON()` instead of individual `addRow()` calls for bulk data
3. Avoid frequent `getModifiedJSON()` calls on large DataLists
4. Use `beginUpdate()` / `endUpdate()` for batch modifications:
```javascript
dl_data.beginUpdate();
for (var i = 0; i < 1000; i++) {
  dl_data.addRow();
  dl_data.setCellData(i, "col1", "value" + i);
}
dl_data.endUpdate(); // Triggers single UI refresh
```

## Debugging Tips

### Console Logging

```javascript
// Log DataCollection contents
console.log("DataMap:", JSON.stringify(dm_search.getJSON()));
console.log("DataList:", JSON.stringify(dl_result.getJSON()));
console.log("Row count:", dl_result.getRowCount());
console.log("Modified count:", dl_result.getModifiedRowCount());
```

### Component Inspection

```javascript
// Check component state
console.log("Value:", inp_name.getValue());
console.log("Visible:", inp_name.getVisible());
console.log("Disabled:", inp_name.getDisabled());
console.log("ReadOnly:", inp_name.getReadOnly());
```

### Submission Debugging

```javascript
// Log submission request/response
scwin.debugSubmission = function(e) {
  console.log("Status:", e.responseStatusCode);
  console.log("Response:", e.responseBody);
};
```
