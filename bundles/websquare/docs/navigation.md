# Navigation Components

WebSquare provides several components for building navigation structures: TreeView, Menu, and linked tree-detail patterns.

## TreeView

Hierarchical tree component for displaying parent-child structured data.

```xml
<w2:treeView id="tv_menu"
  dataList="dl_menu"
  labelColumn="menuName"
  valueColumn="menuId"
  parentColumn="parentId"
  rootValue=""
  style="width:250px; height:100%;"
  useCheckbox="false"
  expandLevel="1"/>
```

### DataList Structure for Tree

```xml
<w2:dataList id="dl_menu">
  <w2:columnInfo>
    <w2:column id="menuId" dataType="text"/>
    <w2:column id="menuName" dataType="text"/>
    <w2:column id="parentId" dataType="text"/>
    <w2:column id="menuUrl" dataType="text"/>
    <w2:column id="sortOrder" dataType="number"/>
    <w2:column id="iconClass" dataType="text"/>
  </w2:columnInfo>
</w2:dataList>
```

Sample data:
```javascript
dl_menu.setJSON([
  { menuId: "M01", menuName: "Dashboard", parentId: "", menuUrl: "/pages/dashboard.xml" },
  { menuId: "M02", menuName: "Employee", parentId: "", menuUrl: "" },
  { menuId: "M0201", menuName: "Employee List", parentId: "M02", menuUrl: "/pages/emp-list.xml" },
  { menuId: "M0202", menuName: "Employee Register", parentId: "M02", menuUrl: "/pages/emp-reg.xml" },
  { menuId: "M03", menuName: "Settings", parentId: "", menuUrl: "/pages/settings.xml" }
]);
```

### JavaScript API

```javascript
// Get selected node value
var menuId = tv_menu.getSelectedValue();

// Get selected node label
var menuName = tv_menu.getSelectedLabel();

// Select a node programmatically
tv_menu.setSelectedValue("M0201");

// Expand/Collapse
tv_menu.expandAll();
tv_menu.collapseAll();
tv_menu.expand("M02");   // Expand specific node
tv_menu.collapse("M02");

// Get parent value
var parentId = tv_menu.getParentValue("M0201"); // "M02"

// Get child values
var children = tv_menu.getChildValues("M02"); // ["M0201", "M0202"]

// Add node
tv_menu.addNode({ menuId: "M0203", menuName: "Org Chart", parentId: "M02" });

// Remove node
tv_menu.removeNode("M0203");

// Refresh tree
tv_menu.refresh();
```

### Events

```xml
<w2:treeView id="tv_menu" dataList="dl_menu">
  <w2:script ev:event="onselect"><![CDATA[
    var menuId = tv_menu.getSelectedValue();
    var rowIdx = dl_menu.findRow("menuId", menuId);
    var menuUrl = dl_menu.getCellData(rowIdx, "menuUrl");

    if (menuUrl) {
      wdc_main.createWindow({
        id: "win_" + menuId,
        title: tv_menu.getSelectedLabel(),
        src: menuUrl,
        closable: true,
        openAction: "select"
      });
    }
  ]]></w2:script>

  <w2:script ev:event="onexpand"><![CDATA[
    console.log("Expanded: " + e.value);
  ]]></w2:script>
</w2:treeView>
```

### Checkbox Tree

```xml
<w2:treeView id="tv_permissions"
  dataList="dl_permissions"
  useCheckbox="true"
  cascadeCheck="true"/>
```

```javascript
// Get checked values
var checkedIds = tv_permissions.getCheckedValues();

// Set checked values
tv_permissions.setCheckedValues(["P01", "P02", "P03"]);

// Check/Uncheck specific node
tv_permissions.setChecked("P01", true);
```

## Menu

Horizontal or vertical navigation menu component.

```xml
<w2:menu id="mnu_main"
  dataList="dl_menuData"
  labelColumn="menuName"
  valueColumn="menuId"
  parentColumn="parentId"
  orientation="horizontal"
  style="width:100%;">
</w2:menu>
```

### Events

```xml
<w2:menu id="mnu_main">
  <w2:script ev:event="onmenuclick"><![CDATA[
    var menuId = e.value;
    var menuName = e.label;
    scwin.openMenu(menuId, menuName);
  ]]></w2:script>
</w2:menu>
```

## Breadcrumb Pattern

Build breadcrumb navigation using data from the tree hierarchy:

```javascript
scwin.updateBreadcrumb = function(menuId) {
  var path = [];
  var currentId = menuId;

  while (currentId) {
    var rowIdx = dl_menu.findRow("menuId", currentId);
    if (rowIdx >= 0) {
      path.unshift(dl_menu.getCellData(rowIdx, "menuName"));
      currentId = dl_menu.getCellData(rowIdx, "parentId");
    } else {
      break;
    }
  }

  grp_breadcrumb.setInnerHTML(path.join(" > "));
};
```

## Tree-Detail Pattern

Common pattern: tree navigation on the left, detail content on the right.

```xml
<w2:splitPanel id="sp_main" orientation="horizontal" splitPosition="250">
  <w2:panel id="sp_left">
    <w2:treeView id="tv_nav" dataList="dl_nav"
      labelColumn="name" valueColumn="id" parentColumn="parentId">
      <w2:script ev:event="onselect"><![CDATA[
        scwin.loadDetail(tv_nav.getSelectedValue());
      ]]></w2:script>
    </w2:treeView>
  </w2:panel>
  <w2:panel id="sp_right">
    <w2:wframe id="wfr_detail"/>
  </w2:panel>
</w2:splitPanel>
```

```javascript
scwin.loadDetail = function(nodeId) {
  var rowIdx = dl_nav.findRow("id", nodeId);
  var url = dl_nav.getCellData(rowIdx, "pageUrl");
  if (url) {
    wfr_detail.setSrc(url);
  }
};
```
