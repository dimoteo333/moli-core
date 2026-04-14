# Styling

WebSquare components support CSS styling through inline styles, CSS classes, and theme customization.

## Inline Styles

```xml
<w2:input id="inp_name" style="width:200px; height:30px;"/>
<w2:group id="grp_search" style="display:flex; gap:8px; padding:10px;"/>
<w2:anchor id="btn_save" label="Save" style="background-color:#4CAF50; color:white;"/>
```

## CSS Classes

```xml
<w2:input id="inp_name" class="form-input required"/>
<w2:anchor id="btn_save" label="Save" class="btn btn-primary"/>
<w2:group id="grp_search" class="search-area"/>
```

### Dynamic Class Management

```javascript
// Add/Remove classes
btn_save.addClass("loading");
btn_save.removeClass("loading");

// Set style property
inp_name.setStyle("background-color", "#ffffcc");
inp_name.setStyle("border-color", "red");

// Set CSS class
grp_error.addClass("error-highlight");
```

## Component-Specific Styling

### GridView Styling

```xml
<w2:gridView id="grd_data" dataList="dl_data"
  class="custom-grid"
  headerClass="grid-header"
  detailClass="grid-detail"
  oddRowClass="odd-row"
  evenRowClass="even-row"
  selectedRowClass="selected-row"/>
```

```css
.custom-grid {
  border: 1px solid #ddd;
}
.grid-header {
  background-color: #f5f5f5;
  font-weight: bold;
}
.odd-row {
  background-color: #fafafa;
}
.even-row {
  background-color: #ffffff;
}
.selected-row {
  background-color: #e3f2fd;
}
```

### Conditional Cell Styling

```xml
<w2:column id="status">
  <w2:renderer type="custom"><![CDATA[
    if (value === "Active") {
      return '<span class="status-active">' + value + '</span>';
    } else {
      return '<span class="status-inactive">' + value + '</span>';
    }
  ]]></w2:renderer>
</w2:column>
```

### Row-Level Styling

```javascript
// Apply class to specific row
scwin.highlightRow = function(rowIndex) {
  grd_data.setRowClass(rowIndex, "warning-row");
};

// Apply class to specific cell
grd_data.setCellClass(rowIndex, "salary", "high-salary");
```

## CSS for Common Layouts

### Search Form Layout

```css
.search-area {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 12px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 8px;
}

.search-area label {
  min-width: 80px;
  font-weight: 500;
}
```

### Button Area

```css
.button-area {
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  padding: 8px 0;
}

.btn {
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.btn-danger {
  background-color: #d32f2f;
  color: white;
  border-color: #d32f2f;
}
```

### Full Page Layout

```css
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
}

.page-header {
  flex: 0 0 auto;
}

.page-content {
  flex: 1 1 auto;
  overflow: auto;
}

.page-footer {
  flex: 0 0 auto;
  padding-top: 8px;
}
```

## Responsive Design

```xml
<w2:group id="grp_form" class="responsive-form">
  <w2:group class="form-row">
    <label>Name</label>
    <w2:input id="inp_name" ref="dm_emp.empName"/>
  </w2:group>
  <w2:group class="form-row">
    <label>Department</label>
    <w2:selectBox id="sel_dept" ref="dm_emp.dept"/>
  </w2:group>
</w2:group>
```

```css
.responsive-form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-row label {
  min-width: 100px;
  flex-shrink: 0;
}
```

## Theme Variables

WebSquare themes typically define CSS variables:

```css
:root {
  --ws-primary-color: #1976d2;
  --ws-secondary-color: #424242;
  --ws-success-color: #2e7d32;
  --ws-danger-color: #d32f2f;
  --ws-warning-color: #ed6c02;
  --ws-border-color: #dee2e6;
  --ws-bg-color: #ffffff;
  --ws-header-bg: #f5f5f5;
  --ws-font-family: 'Malgun Gothic', sans-serif;
  --ws-font-size: 13px;
}
```
