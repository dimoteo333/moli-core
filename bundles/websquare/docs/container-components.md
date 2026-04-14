# Container Components

Container components organize layout and manage child component grouping in WebSquare pages.

## Group

Basic container for grouping components with layout control.

```xml
<w2:group id="grp_search" style="display:flex; gap:8px; align-items:center;">
  <w2:input id="inp_keyword" placeholder="Search"/>
  <w2:anchor id="btn_search" label="Search"/>
</w2:group>

<!-- Collapsible group -->
<w2:group id="grp_advanced" collapsible="true" collapsed="true" title="Advanced Options">
  <w2:input id="inp_filter1" placeholder="Filter 1"/>
  <w2:input id="inp_filter2" placeholder="Filter 2"/>
</w2:group>
```

```javascript
// Show/Hide
grp_search.setVisible(true);

// Collapse/Expand
grp_advanced.setCollapsed(true);
grp_advanced.setCollapsed(false);
```

## WindowContainer (MDI)

Multi-Document Interface container that manages multiple tabbed windows. Each tab loads a WFrame with its own page.

```xml
<w2:windowContainer id="wdc_main"
  style="width:100%; height:100%;"
  windowTitle="true"
  closeButton="true"
  maxWindowCount="10"
  openAction="select">
</w2:windowContainer>
```

### Key Properties

| Property | Description |
|----------|-------------|
| `windowTitle` | Show tab titles |
| `closeButton` | Show close button on tabs |
| `maxWindowCount` | Maximum number of open tabs |
| `openAction` | Action when opening duplicate: `select` (switch to existing), `new` (always create new) |
| `useContextMenu` | Enable right-click context menu on tabs |

### JavaScript API

```javascript
// Open a new tab window
wdc_main.createWindow({
  id: "win_empList",
  title: "Employee List",
  src: "/pages/employee-list.xml",
  closable: true,
  openAction: "select"
});

// Open with parameters
wdc_main.createWindow({
  id: "win_empDetail_001",
  title: "Employee: John Doe",
  src: "/pages/employee-detail.xml",
  token: { empNo: "001", mode: "edit" },
  closable: true
});

// Close a window
wdc_main.closeWindow("win_empList");

// Close all windows
wdc_main.closeAllWindows();

// Get active window ID
var activeId = wdc_main.getActiveWindowId();

// Select (activate) a window
wdc_main.selectWindow("win_empList");

// Get all open window IDs
var windowIds = wdc_main.getWindowIdList();

// Get window count
var count = wdc_main.getWindowCount();

// Set window title
wdc_main.setWindowTitle("win_empList", "Updated Title");

// Get window's WFrame reference
var wframe = wdc_main.getWindow("win_empList");
var childScope = wframe.getWindow();
```

### Events

| Event | Description |
|-------|-------------|
| `onwindowcreate` | After a window tab is created |
| `onwindowclose` | After a window tab is closed |
| `onbeforewindowclose` | Before closing — return false to cancel |
| `onwindowselect` | When a tab is selected/activated |

```xml
<w2:windowContainer id="wdc_main">
  <w2:script ev:event="onbeforewindowclose"><![CDATA[
    var windowId = e.windowId;
    var wframe = wdc_main.getWindow(windowId);
    var childWin = wframe.getWindow();
    if (childWin && childWin.scwin.hasUnsavedChanges && childWin.scwin.hasUnsavedChanges()) {
      return confirm("Unsaved changes. Close anyway?");
    }
  ]]></w2:script>
</w2:windowContainer>
```

## TabControl

Standard tab panel for organizing content within a single page.

```xml
<w2:tabControl id="tab_main" style="width:100%; height:400px;">
  <w2:tabs>
    <w2:tab id="tab_basic" label="Basic Info"/>
    <w2:tab id="tab_detail" label="Detail"/>
    <w2:tab id="tab_history" label="History"/>
  </w2:tabs>
  <w2:tabContent>
    <w2:content id="tc_basic">
      <w2:input id="inp_name" ref="dm_emp.empName"/>
      <w2:input id="inp_dept" ref="dm_emp.dept"/>
    </w2:content>
    <w2:content id="tc_detail">
      <w2:gridView id="grd_detail" dataList="dl_detail"/>
    </w2:content>
    <w2:content id="tc_history">
      <w2:gridView id="grd_history" dataList="dl_history"/>
    </w2:content>
  </w2:tabContent>
</w2:tabControl>
```

```javascript
// Select tab by index
tab_main.setSelectedTabIndex(1);

// Get selected index
var idx = tab_main.getSelectedTabIndex();

// Set tab label
tab_main.setTabLabel(0, "Basic Info (*)");

// Show/Hide tab
tab_main.setTabVisible(2, false);

// Enable/Disable tab
tab_main.setTabDisabled(1, true);
```

### Tab Events

```xml
<w2:tabControl id="tab_main">
  <w2:script ev:event="onchange"><![CDATA[
    var newIndex = e.selectedIndex;
    if (newIndex === 2) {
      // Lazy load history data when History tab is selected
      com.executeSubmission("sub_loadHistory");
    }
  ]]></w2:script>
</w2:tabControl>
```

## Accordion

Collapsible panel groups where one or more panels can be expanded.

```xml
<w2:accordion id="acc_settings" multiOpen="false">
  <w2:panel id="pnl_general" title="General Settings" expanded="true">
    <w2:input id="inp_appName" ref="dm_settings.appName"/>
    <w2:selectBox id="sel_language" ref="dm_settings.language"/>
  </w2:panel>
  <w2:panel id="pnl_display" title="Display Settings">
    <w2:selectBox id="sel_theme" ref="dm_settings.theme"/>
    <w2:input id="inp_fontSize" ref="dm_settings.fontSize"/>
  </w2:panel>
  <w2:panel id="pnl_security" title="Security Settings">
    <w2:input id="inp_timeout" ref="dm_settings.sessionTimeout"/>
  </w2:panel>
</w2:accordion>
```

```javascript
// Expand/Collapse panels
acc_settings.expand(0);
acc_settings.collapse(0);
acc_settings.expandAll();
acc_settings.collapseAll();
```

## SplitPanel

Resizable split layout with two panes.

```xml
<w2:splitPanel id="sp_main"
  orientation="horizontal"
  splitPosition="300"
  style="width:100%; height:100%;">
  <w2:panel id="sp_left">
    <w2:treeView id="tv_menu" dataList="dl_menu"/>
  </w2:panel>
  <w2:panel id="sp_right">
    <w2:wframe id="wfr_content" src="/pages/dashboard.xml"/>
  </w2:panel>
</w2:splitPanel>
```

| Property | Description |
|----------|-------------|
| `orientation` | `horizontal` (left/right) or `vertical` (top/bottom) |
| `splitPosition` | Initial divider position in pixels |
| `minSize` | Minimum panel size |
| `collapsible` | Allow collapsing a panel |

## Layout

Grid-based layout container.

```xml
<w2:layout id="lay_main" columns="3" gap="8px">
  <w2:cell colSpan="3">
    <w2:group id="grp_header">Header Area</w2:group>
  </w2:cell>
  <w2:cell colSpan="1">
    <w2:group id="grp_sidebar">Sidebar</w2:group>
  </w2:cell>
  <w2:cell colSpan="2">
    <w2:group id="grp_content">Main Content</w2:group>
  </w2:cell>
</w2:layout>
```
