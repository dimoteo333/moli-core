# Input

The `w2:input` component is a versatile text input field with data binding, formatting, validation, and masking support.

## Basic Usage

```xml
<w2:input id="inp_name" placeholder="Enter name"/>
```

## Data Binding

```xml
<!-- Bind to DataMap key -->
<w2:input id="inp_name" ref="dm_employee.empName"/>

<!-- Bind to DataList column (with row context in grid) -->
<w2:input id="inp_salary" ref="dl_employees.salary"/>
```

## Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | String | Unique component identifier |
| `ref` | String | DataCollection binding reference |
| `value` | String | Initial value |
| `placeholder` | String | Placeholder text |
| `readOnly` | Boolean | Read-only mode |
| `disabled` | Boolean | Disabled state |
| `maxLength` | Number | Maximum character length |
| `minLength` | Number | Minimum character length |
| `mandatory` | Boolean | Required field |
| `displayFormat` | String | Display format pattern |
| `dataType` | String | Data type: `text`, `number`, `float`, `date` |
| `imeMode` | String | IME mode: `active`, `inactive`, `disabled` |
| `calendarRef` | String | Link to Calendar component |
| `mask` | String | Input mask pattern |
| `textAlign` | String | Text alignment: `left`, `center`, `right` |

## Formatting

### Number Format

```xml
<!-- Display as formatted number -->
<w2:input id="inp_salary" dataType="number" displayFormat="#,###"/>

<!-- Float with decimal places -->
<w2:input id="inp_rate" dataType="float" displayFormat="#,##0.00"/>
```

### Date Format

```xml
<w2:input id="inp_date" dataType="date" displayFormat="yyyy-MM-dd"/>
```

### Input Mask

```xml
<!-- Phone number mask -->
<w2:input id="inp_phone" mask="###-####-####"/>

<!-- Business registration number -->
<w2:input id="inp_bizNo" mask="###-##-#####"/>
```

## JavaScript API

```javascript
// Get/Set value
var value = inp_name.getValue();
inp_name.setValue("John Doe");

// Get display value (formatted)
var display = inp_salary.getDisplayValue(); // "50,000"

// Enable/Disable
inp_name.setDisabled(true);
inp_name.setDisabled(false);

// Read-only
inp_name.setReadOnly(true);

// Visibility
inp_name.setVisible(false);
inp_name.setVisible(true);

// Focus
inp_name.focus();

// Clear value
inp_name.setValue("");

// Get/Set placeholder
inp_name.setPlaceholder("Enter name here");

// Set CSS class
inp_name.addClass("highlight");
inp_name.removeClass("highlight");

// Set style
inp_name.setStyle("background-color", "#ffffcc");

// Validate
var isValid = inp_name.validate(); // checks mandatory, minLength, etc.
```

## Events

| Event | Description |
|-------|-------------|
| `onchange` | Value has changed (after blur) |
| `oninput` | Value is changing (on each keystroke) |
| `onfocus` | Component received focus |
| `onblur` | Component lost focus |
| `onkeydown` | Key pressed down |
| `onkeyup` | Key released |
| `onkeypress` | Key pressed (character input) |
| `onclick` | Component clicked |
| `ondblclick` | Component double-clicked |
| `onmouseenter` | Mouse entered component area |
| `onmouseleave` | Mouse left component area |

### Event Examples

```xml
<w2:input id="inp_empNo">
  <w2:script ev:event="onchange"><![CDATA[
    var empNo = this.getValue();
    if (empNo.length < 3) {
      alert("Employee No must be at least 3 characters");
      this.focus();
    }
  ]]></w2:script>

  <w2:script ev:event="onkeydown"><![CDATA[
    if (e.keyCode === 13) { // Enter key
      scwin.doSearch();
    }
  ]]></w2:script>
</w2:input>
```

## Validation

```xml
<!-- Required field -->
<w2:input id="inp_name" mandatory="true" mandatoryMessage="Name is required"/>

<!-- Length constraints -->
<w2:input id="inp_code" minLength="3" maxLength="10"/>

<!-- Custom validation in script -->
<w2:input id="inp_email">
  <w2:script ev:event="onblur"><![CDATA[
    var value = this.getValue();
    if (value && value.indexOf("@") === -1) {
      alert("Invalid email format");
      this.focus();
    }
  ]]></w2:script>
</w2:input>
```

## Common Patterns

### Search Input with Enter Key

```xml
<w2:input id="inp_search" placeholder="Search...">
  <w2:script ev:event="onkeydown"><![CDATA[
    if (e.keyCode === 13) {
      dm_search.set("keyword", this.getValue());
      com.executeSubmission("sub_search");
    }
  ]]></w2:script>
</w2:input>
```

### Numeric Input with Formatting

```xml
<w2:input id="inp_amount"
  dataType="number"
  displayFormat="#,###"
  textAlign="right"
  ref="dm_order.amount"/>
```

### Password Input

```xml
<w2:input id="inp_password" type="password" maxLength="20"/>
```
