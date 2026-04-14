# Form Components

WebSquare provides a comprehensive set of form components for building data entry interfaces. All form components support DataCollection binding via the `ref` attribute.

## Anchor (Button)

The `w2:anchor` component renders a clickable button.

```xml
<w2:anchor id="btn_save" label="Save">
  <w2:script ev:event="onclick"><![CDATA[
    scwin.doSave();
  ]]></w2:script>
</w2:anchor>

<!-- With icon -->
<w2:anchor id="btn_search" label="Search" class="btn-search"/>

<!-- Disabled state -->
<w2:anchor id="btn_delete" label="Delete" disabled="true"/>
```

```javascript
btn_save.setDisabled(true);
btn_save.setLabel("Saving...");
btn_save.setVisible(false);
```

## Calendar / InputCalendar

Date selection components.

### Calendar (Standalone)

```xml
<w2:calendar id="cal_date" ref="dm_search.startDate" dateFormat="yyyyMMdd"/>
```

### InputCalendar (Input + Popup Calendar)

```xml
<w2:inputCalendar id="ical_startDate"
  ref="dm_search.startDate"
  dateFormat="yyyyMMdd"
  displayFormat="yyyy-MM-dd"
  calendarTitle="Select Start Date"
  readOnly="false"/>
```

```javascript
// Get/Set date
var date = ical_startDate.getValue();      // "20240115"
var display = ical_startDate.getFormattedValue(); // "2024-01-15"
ical_startDate.setValue("20240201");

// Set date range constraints
ical_startDate.setMinDate("20240101");
ical_startDate.setMaxDate("20241231");
```

#### Events

```xml
<w2:inputCalendar id="ical_date">
  <w2:script ev:event="onchange"><![CDATA[
    var newDate = this.getValue();
    console.log("Selected date: " + newDate);
  ]]></w2:script>
</w2:inputCalendar>
```

## SelectBox

Dropdown selection component.

```xml
<w2:selectBox id="sel_dept" ref="dm_search.dept">
  <w2:option label="All" value=""/>
  <w2:option label="Sales" value="SALES"/>
  <w2:option label="Development" value="DEV"/>
  <w2:option label="HR" value="HR"/>
</w2:selectBox>
```

### Dynamic Options from DataList

```xml
<w2:selectBox id="sel_dept"
  ref="dm_search.dept"
  dataList="dl_deptCode"
  labelColumn="deptName"
  valueColumn="deptCode"/>
```

```javascript
// Get/Set value
var value = sel_dept.getValue();
sel_dept.setValue("DEV");

// Get display label
var label = sel_dept.getLabel();

// Get selected index
var idx = sel_dept.getSelectedIndex();
sel_dept.setSelectedIndex(0);

// Add option dynamically
sel_dept.addOption("Marketing", "MKT");

// Remove option
sel_dept.removeOption("MKT");

// Clear all options
sel_dept.removeAllOptions();
```

#### Events

```xml
<w2:selectBox id="sel_dept">
  <w2:script ev:event="onchange"><![CDATA[
    var dept = this.getValue();
    scwin.filterByDept(dept);
  ]]></w2:script>
</w2:selectBox>
```

## CheckBox

```xml
<w2:checkBox id="chk_active"
  ref="dm_employee.isActive"
  trueValue="Y"
  falseValue="N"
  label="Active"/>
```

```javascript
var checked = chk_active.getValue();    // "Y" or "N"
var isChecked = chk_active.getChecked(); // true or false
chk_active.setChecked(true);
chk_active.setValue("Y");
```

## CheckComboBox

A multi-select dropdown with checkboxes.

```xml
<w2:checkComboBox id="ccb_skills"
  ref="dm_employee.skills"
  separator=","
  allOption="true"
  allOptionLabel="All">
  <w2:option label="Java" value="JAVA"/>
  <w2:option label="JavaScript" value="JS"/>
  <w2:option label="Python" value="PY"/>
  <w2:option label="SQL" value="SQL"/>
</w2:checkComboBox>
```

```javascript
// Get selected values (comma-separated)
var skills = ccb_skills.getValue(); // "JAVA,JS"

// Set values
ccb_skills.setValue("JAVA,PY");

// Get selected labels
var labels = ccb_skills.getLabel(); // "Java,Python"
```

## Radio

```xml
<w2:radio id="rdo_gender" ref="dm_employee.gender">
  <w2:option label="Male" value="M"/>
  <w2:option label="Female" value="F"/>
  <w2:option label="Other" value="O"/>
</w2:radio>
```

```javascript
var gender = rdo_gender.getValue();
rdo_gender.setValue("M");
```

## TextArea

Multi-line text input.

```xml
<w2:textArea id="ta_remarks"
  ref="dm_employee.remarks"
  rows="5"
  cols="50"
  maxLength="500"
  placeholder="Enter remarks"/>
```

```javascript
ta_remarks.getValue();
ta_remarks.setValue("Some long text...");
```

## AutoComplete

Input with auto-suggestion based on DataList.

```xml
<w2:autoComplete id="ac_city"
  ref="dm_search.city"
  dataList="dl_cities"
  displayColumn="cityName"
  valueColumn="cityCode"
  minSearchLength="2"
  maxDisplay="10"/>
```

```javascript
// Get value
var cityCode = ac_city.getValue();
var cityName = ac_city.getDisplayValue();
```

## DatePicker

A range date picker for selecting start and end dates.

```xml
<w2:datePicker id="dp_period"
  fromRef="dm_search.fromDate"
  toRef="dm_search.toDate"
  dateFormat="yyyyMMdd"
  displayFormat="yyyy-MM-dd"/>
```

```javascript
var fromDate = dp_period.getFromValue();
var toDate = dp_period.getToValue();
dp_period.setFromValue("20240101");
dp_period.setToValue("20240131");
```

## Editor (Rich Text)

WYSIWYG HTML editor component.

```xml
<w2:editor id="edt_content"
  ref="dm_post.content"
  style="width:100%; height:400px;"
  toolbar="full"/>
```

```javascript
// Get HTML content
var html = edt_content.getValue();

// Set content
edt_content.setValue("<p>Hello <b>World</b></p>");

// Get plain text
var text = edt_content.getPlainText();
```

## FlipToggle

Toggle switch component.

```xml
<w2:flipToggle id="ft_darkMode"
  ref="dm_settings.darkMode"
  onValue="Y"
  offValue="N"
  onLabel="ON"
  offLabel="OFF"/>
```

```javascript
ft_darkMode.getValue();     // "Y" or "N"
ft_darkMode.setValue("Y");
ft_darkMode.toggle();
```

## Image

```xml
<w2:image id="img_photo"
  src="/images/default.png"
  ref="dm_employee.photoUrl"
  style="width:100px; height:100px;"/>
```

```javascript
img_photo.setSrc("/images/employee001.jpg");
var src = img_photo.getSrc();
```

## Common Properties (All Form Components)

| Property | Description |
|----------|-------------|
| `id` | Unique identifier |
| `ref` | DataCollection binding |
| `disabled` | Disabled state |
| `readOnly` | Read-only state |
| `visible` | Visibility |
| `class` | CSS class |
| `style` | Inline CSS style |
| `mandatory` | Required field for validation |
| `mandatoryMessage` | Error message when mandatory validation fails |

## Common Methods (All Form Components)

```javascript
// Value
component.getValue();
component.setValue(value);

// State
component.setDisabled(true/false);
component.setReadOnly(true/false);
component.setVisible(true/false);

// Styling
component.addClass("className");
component.removeClass("className");
component.setStyle("property", "value");

// Focus
component.focus();

// Validation
component.validate();
```
