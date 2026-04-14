# Page Structure

WebSquare pages are XML documents with three main sections: Model, Script, and Body.

## Page Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:w2="http://www.inswave.com/websquare">
<head>
  <w2:buildDate/>
</head>
<body>
  <w2:page>
    <w2:model>
      <!-- DataCollections and Submissions -->
    </w2:model>
    <w2:script>
      <![CDATA[
        // Page-level JavaScript
      ]]>
    </w2:script>
    <w2:body>
      <!-- UI Components -->
    </w2:body>
  </w2:page>
</body>
</html>
```

## Model Section

The `<w2:model>` section defines data structures and server communication:

```xml
<w2:model>
  <!-- Data structures -->
  <w2:dataCollection>
    <w2:dataMap id="dm_search">
      <w2:keyInfo>
        <w2:key id="name" name="Name" dataType="text"/>
        <w2:key id="status" name="Status" dataType="text"/>
      </w2:keyInfo>
    </w2:dataMap>

    <w2:dataList id="dl_result">
      <w2:columnInfo>
        <w2:column id="empNo" name="Employee No" dataType="text"/>
        <w2:column id="empName" name="Employee Name" dataType="text"/>
        <w2:column id="dept" name="Department" dataType="text"/>
      </w2:columnInfo>
    </w2:dataList>
  </w2:dataCollection>

  <!-- Server communication -->
  <w2:submission id="sub_search"
    action="/api/employees/search"
    method="post"
    ref="dm_search"
    target="dl_result"
    submitDone="scwin.searchDone">
  </w2:submission>
</w2:model>
```

## Script Section

The `<w2:script>` section contains page-level JavaScript:

```xml
<w2:script>
  <![CDATA[
    // Page load handler
    scwin.onpageload = function() {
      // Initialize page
    };

    // Custom functions
    scwin.searchDone = function(e) {
      if (e.responseStatusCode === 200) {
        alert("Search complete: " + dl_result.getRowCount() + " results");
      }
    };

    scwin.doSearch = function() {
      com.executeSubmission("sub_search");
    };
  ]]>
</w2:script>
```

### Scope Objects

- **`scwin`**: Window-level scope for the current page. Functions declared here are accessible by event handlers and other page scripts.
- **`com`**: Common utility object providing methods like `executeSubmission()`, `getComponent()`, etc.
- **`$p`**: Page-level utility for accessing components and data.

## Body Section

The `<w2:body>` section contains the visual UI components:

```xml
<w2:body>
  <w2:group id="grp_search" style="display:flex; gap:8px;">
    <w2:input id="inp_name" ref="dm_search.name" placeholder="Name"/>
    <w2:selectBox id="sel_status" ref="dm_search.status">
      <w2:option label="All" value=""/>
      <w2:option label="Active" value="A"/>
      <w2:option label="Inactive" value="I"/>
    </w2:selectBox>
    <w2:anchor id="btn_search" label="Search">
      <w2:script ev:event="onclick"><![CDATA[
        scwin.doSearch();
      ]]></w2:script>
    </w2:anchor>
  </w2:group>

  <w2:gridView id="grd_result" dataList="dl_result">
    <w2:header>
      <w2:row>
        <w2:column id="empNo" label="Emp No" width="100"/>
        <w2:column id="empName" label="Name" width="150"/>
        <w2:column id="dept" label="Department" width="150"/>
      </w2:row>
    </w2:header>
    <w2:detail>
      <w2:row>
        <w2:column id="empNo"/>
        <w2:column id="empName"/>
        <w2:column id="dept"/>
      </w2:row>
    </w2:detail>
  </w2:gridView>
</w2:body>
```

## Execution Sequence

1. Engine receives page request and parses XML
2. `<w2:model>` → DataCollections and Submissions are initialized
3. `<w2:body>` → Components are rendered and bound to DataCollections
4. `<w2:script>` → JavaScript is loaded and executed
5. `scwin.onpageload()` fires — page is fully ready for interaction

## Inline Event Handling

Components support inline event scripts:

```xml
<w2:anchor id="btn_save" label="Save">
  <w2:script ev:event="onclick"><![CDATA[
    scwin.doSave();
  ]]></w2:script>
</w2:anchor>

<w2:input id="inp_search">
  <w2:script ev:event="onchange"><![CDATA[
    scwin.filterResults(this.getValue());
  ]]></w2:script>
</w2:input>
```

## Namespaces

- `w2:` — WebSquare component namespace
- `ev:` — Event binding namespace
- Standard XHTML namespace for basic HTML elements
