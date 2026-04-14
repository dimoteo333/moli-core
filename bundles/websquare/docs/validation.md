# Validation

WebSquare provides built-in validation for form components and DataCollections, with both declarative and programmatic approaches.

## Component-Level Validation

### Mandatory Fields

```xml
<w2:input id="inp_name"
  mandatory="true"
  mandatoryMessage="Name is required"/>

<w2:selectBox id="sel_dept"
  mandatory="true"
  mandatoryMessage="Please select a department"/>
```

### Length Validation

```xml
<w2:input id="inp_code"
  minLength="3"
  maxLength="10"
  minLengthMessage="Code must be at least 3 characters"
  maxLengthMessage="Code cannot exceed 10 characters"/>
```

### Data Type Validation

```xml
<w2:input id="inp_email" dataType="email"/>
<w2:input id="inp_phone" dataType="tel"/>
<w2:input id="inp_amount" dataType="number"/>
```

## Programmatic Validation

### Single Component

```javascript
var isValid = inp_name.validate();
if (!isValid) {
  inp_name.focus();
}
```

### Group Validation

Validate all mandatory components in a group:

```javascript
scwin.validateForm = function() {
  // Validate individual fields
  if (!inp_name.getValue()) {
    WebSquare.util.alert("Name is required");
    inp_name.focus();
    return false;
  }

  if (!sel_dept.getValue()) {
    WebSquare.util.alert("Department is required");
    sel_dept.focus();
    return false;
  }

  var email = inp_email.getValue();
  if (email && !scwin.isValidEmail(email)) {
    WebSquare.util.alert("Invalid email format");
    inp_email.focus();
    return false;
  }

  return true;
};

scwin.isValidEmail = function(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

### Using com.validate

WebSquare's `com` object provides bulk validation:

```javascript
// Validate all mandatory fields in a group
var result = com.validate("grp_form");
if (!result.isValid) {
  WebSquare.util.alert(result.message);
  result.component.focus();
  return;
}
```

## DataCollection Validation

### DataMap Validation

```javascript
scwin.validateEmployee = function() {
  var empName = dm_employee.get("empName");
  var dept = dm_employee.get("dept");
  var salary = dm_employee.get("salary");

  if (!empName) {
    WebSquare.util.alert("Employee name is required");
    return false;
  }

  if (!dept) {
    WebSquare.util.alert("Department is required");
    return false;
  }

  if (salary && isNaN(Number(salary))) {
    WebSquare.util.alert("Salary must be a number");
    return false;
  }

  if (Number(salary) < 0) {
    WebSquare.util.alert("Salary cannot be negative");
    return false;
  }

  return true;
};
```

### DataList Row Validation

```javascript
scwin.validateGrid = function() {
  var rowCount = dl_employees.getRowCount();

  for (var i = 0; i < rowCount; i++) {
    var status = dl_employees.getRowStatus(i);
    if (status === "C" || status === "U") {
      var empName = dl_employees.getCellData(i, "empName");
      if (!empName) {
        WebSquare.util.alert("Row " + (i + 1) + ": Employee name is required");
        grd_employees.focusCell(i, "empName");
        return false;
      }

      var salary = dl_employees.getCellData(i, "salary");
      if (salary && Number(salary) < 0) {
        WebSquare.util.alert("Row " + (i + 1) + ": Salary cannot be negative");
        grd_employees.focusCell(i, "salary");
        return false;
      }
    }
  }

  return true;
};
```

## Validation Before Submission

Use `onbeforesubmit` to validate before server communication:

```xml
<w2:submission id="sub_save" action="/api/save" ref="dm_employee">
  <w2:event>
    <w2:handler ev:event="onbeforesubmit"><![CDATA[
      if (!scwin.validateEmployee()) {
        return false; // Cancel submission
      }
    ]]></w2:handler>
  </w2:event>
</w2:submission>
```

## Custom Validation Patterns

### Cross-Field Validation

```javascript
scwin.validateDateRange = function() {
  var fromDate = dm_search.get("fromDate");
  var toDate = dm_search.get("toDate");

  if (fromDate && toDate && fromDate > toDate) {
    WebSquare.util.alert("Start date must be before end date");
    ical_fromDate.focus();
    return false;
  }
  return true;
};
```

### Duplicate Check

```javascript
scwin.checkDuplicate = function() {
  var empNo = dm_employee.get("empNo");
  var rowIdx = dl_employees.findRow("empNo", empNo);

  if (rowIdx >= 0) {
    WebSquare.util.alert("Employee No already exists");
    inp_empNo.focus();
    return false;
  }
  return true;
};
```

### Grid Validation with Highlight

```javascript
scwin.validateAndHighlight = function() {
  var errors = [];
  var rowCount = dl_employees.getRowCount();

  for (var i = 0; i < rowCount; i++) {
    if (!dl_employees.getCellData(i, "empName")) {
      errors.push({ row: i, col: "empName", msg: "Name required" });
    }
    if (!dl_employees.getCellData(i, "dept")) {
      errors.push({ row: i, col: "dept", msg: "Department required" });
    }
  }

  if (errors.length > 0) {
    // Focus first error
    grd_employees.focusCell(errors[0].row, errors[0].col);
    WebSquare.util.alert(errors[0].msg);
    return false;
  }

  return true;
};
```

## Validation Flow Best Practice

```javascript
scwin.doSave = function() {
  // 1. Form validation
  if (!scwin.validateForm()) return;

  // 2. Cross-field validation
  if (!scwin.validateDateRange()) return;

  // 3. Grid validation
  if (!scwin.validateGrid()) return;

  // 4. Business rule validation
  if (!scwin.validateBusinessRules()) return;

  // 5. Submit
  com.executeSubmission("sub_save");
};
```
