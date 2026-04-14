# Common Patterns

Frequently used WebSquare development patterns and recipes.

## Master-Detail Pattern

A list view where selecting a row shows detail information.

```xml
<!-- Search area -->
<w2:group id="grp_search" class="search-area">
  <w2:input id="inp_keyword" ref="dm_search.keyword" placeholder="Search...">
    <w2:script ev:event="onkeydown"><![CDATA[
      if (e.keyCode === 13) scwin.doSearch();
    ]]></w2:script>
  </w2:input>
  <w2:anchor id="btn_search" label="Search">
    <w2:script ev:event="onclick"><![CDATA[scwin.doSearch();]]></w2:script>
  </w2:anchor>
</w2:group>

<!-- Master grid -->
<w2:gridView id="grd_master" dataList="dl_master" style="height:300px;">
  <w2:script ev:event="onrowclick"><![CDATA[
    scwin.loadDetail(e.rowIndex);
  ]]></w2:script>
  <!-- columns... -->
</w2:gridView>

<!-- Detail form -->
<w2:group id="grp_detail">
  <w2:input id="inp_empName" ref="dm_detail.empName" readOnly="true"/>
  <w2:input id="inp_dept" ref="dm_detail.dept" readOnly="true"/>
  <w2:gridView id="grd_history" dataList="dl_history"/>
</w2:group>
```

```javascript
scwin.doSearch = function() {
  com.executeSubmission("sub_search");
};

scwin.loadDetail = function(rowIndex) {
  var empNo = dl_master.getCellData(rowIndex, "empNo");
  dm_detailSearch.set("empNo", empNo);
  com.executeSubmission("sub_loadDetail");
};
```

## CRUD Grid Pattern

Editable grid with add/delete/save operations.

```xml
<w2:group id="grp_buttons" class="button-area">
  <w2:anchor id="btn_add" label="Add Row">
    <w2:script ev:event="onclick"><![CDATA[scwin.doAdd();]]></w2:script>
  </w2:anchor>
  <w2:anchor id="btn_deleteRow" label="Delete Row">
    <w2:script ev:event="onclick"><![CDATA[scwin.doDeleteRow();]]></w2:script>
  </w2:anchor>
  <w2:anchor id="btn_save" label="Save">
    <w2:script ev:event="onclick"><![CDATA[scwin.doSave();]]></w2:script>
  </w2:anchor>
</w2:group>

<w2:gridView id="grd_data" dataList="dl_data" useCheckbox="true">
  <!-- editable columns... -->
</w2:gridView>
```

```javascript
scwin.doAdd = function() {
  dl_data.addRow();
  var lastIdx = dl_data.getRowCount() - 1;
  grd_data.focusCell(lastIdx, "firstEditableColumn");
};

scwin.doDeleteRow = function() {
  var checked = grd_data.getCheckedRowIndices();
  if (checked.length === 0) {
    WebSquare.util.alert("Please select rows to delete");
    return;
  }
  WebSquare.util.confirm("Delete " + checked.length + " row(s)?", function(ok) {
    if (ok) {
      // Delete in reverse order to preserve indices
      for (var i = checked.length - 1; i >= 0; i--) {
        dl_data.deleteRow(checked[i]);
      }
    }
  });
};

scwin.doSave = function() {
  if (!scwin.validateGrid()) return;

  var modCount = dl_data.getModifiedRowCount();
  if (modCount === 0) {
    WebSquare.util.alert("No changes to save");
    return;
  }
  com.executeSubmission("sub_save");
};

scwin.saveDone = function(e) {
  if (e.responseStatusCode === 200) {
    WebSquare.util.alert("Saved successfully");
    dl_data.reform();
  }
};
```

## MDI (Multi-Document Interface) Pattern

Main application with tree menu and tabbed content area.

```xml
<!-- Main layout -->
<w2:splitPanel id="sp_main" orientation="horizontal" splitPosition="250">
  <w2:panel id="sp_menu">
    <w2:treeView id="tv_menu" dataList="dl_menu"
      labelColumn="menuName" valueColumn="menuId" parentColumn="parentId">
      <w2:script ev:event="onselect"><![CDATA[
        scwin.openMenu(tv_menu.getSelectedValue());
      ]]></w2:script>
    </w2:treeView>
  </w2:panel>
  <w2:panel id="sp_content">
    <w2:windowContainer id="wdc_main"
      windowTitle="true"
      closeButton="true"
      maxWindowCount="15"
      openAction="select">
    </w2:windowContainer>
  </w2:panel>
</w2:splitPanel>
```

```javascript
scwin.onpageload = function() {
  com.executeSubmission("sub_loadMenu");
};

scwin.openMenu = function(menuId) {
  var rowIdx = dl_menu.findRow("menuId", menuId);
  var menuUrl = dl_menu.getCellData(rowIdx, "menuUrl");
  var menuName = dl_menu.getCellData(rowIdx, "menuName");

  if (!menuUrl) return; // Folder node, no page

  wdc_main.createWindow({
    id: "win_" + menuId,
    title: menuName,
    src: menuUrl,
    closable: true,
    openAction: "select"
  });
};
```

## Search Popup Pattern

Reusable search popup returning selected data to the caller.

### Parent Page

```javascript
scwin.openEmpSearch = function() {
  $p.openPopup("/pages/popup/emp-search.xml", {
    id: "pop_empSearch",
    title: "Employee Search",
    width: 600,
    height: 450,
    modal: true,
    params: { dept: sel_dept.getValue() },
    closeCallback: "scwin.empSelected"
  });
};

scwin.empSelected = function(result) {
  if (result) {
    inp_empNo.setValue(result.empNo);
    inp_empName.setValue(result.empName);
  }
};
```

### Popup Page (emp-search.xml)

```javascript
scwin.onpageload = function() {
  var dept = $p.getParameter("dept");
  if (dept) {
    dm_search.set("dept", dept);
  }
  scwin.doSearch();
};

scwin.doSearch = function() {
  com.executeSubmission("sub_search");
};

scwin.doSelect = function() {
  var idx = grd_result.getSelectedRowIndex();
  if (idx < 0) {
    WebSquare.util.alert("Please select an employee");
    return;
  }
  $p.closePopup({
    empNo: dl_result.getCellData(idx, "empNo"),
    empName: dl_result.getCellData(idx, "empName"),
    dept: dl_result.getCellData(idx, "dept")
  });
};

scwin.doCancel = function() {
  $p.closePopup();
};
```

## Batch Processing Pattern

Process multiple selected rows with progress feedback.

```javascript
scwin.doBatchProcess = function() {
  var checked = grd_data.getCheckedRowIndices();
  if (checked.length === 0) {
    WebSquare.util.alert("Please select items to process");
    return;
  }

  WebSquare.util.confirm("Process " + checked.length + " items?", function(ok) {
    if (!ok) return;

    WebSquare.util.showLoadingIndicator();

    var processedIds = [];
    for (var i = 0; i < checked.length; i++) {
      processedIds.push(dl_data.getCellData(checked[i], "itemId"));
    }

    dm_batch.set("itemIds", processedIds.join(","));
    dm_batch.set("action", "approve");
    com.executeSubmission("sub_batchProcess");
  });
};

scwin.batchDone = function(e) {
  WebSquare.util.hideLoadingIndicator();
  if (e.responseStatusCode === 200) {
    WebSquare.util.alert("Processed successfully");
    scwin.doSearch(); // Refresh list
  }
};
```

## Conditional Form Display

Show/hide form sections based on data values.

```javascript
scwin.onTypeChange = function() {
  var type = sel_type.getValue();

  // Show/hide sections based on type
  grp_personalInfo.setVisible(type === "INDIVIDUAL");
  grp_companyInfo.setVisible(type === "COMPANY");

  // Enable/disable fields
  inp_bizNo.setDisabled(type !== "COMPANY");
  inp_ssn.setDisabled(type !== "INDIVIDUAL");

  // Set mandatory based on type
  if (type === "COMPANY") {
    inp_companyName.mandatory = true;
    inp_bizNo.mandatory = true;
  } else {
    inp_companyName.mandatory = false;
    inp_bizNo.mandatory = false;
  }
};
```

## Auto-Save Draft Pattern

```javascript
var autoSaveTimer = null;
var AUTO_SAVE_INTERVAL = 60000; // 1 minute

scwin.onpageload = function() {
  scwin.startAutoSave();
};

scwin.startAutoSave = function() {
  autoSaveTimer = setInterval(function() {
    if (dm_form.isModified()) {
      dm_form.set("isDraft", "Y");
      com.executeSubmission("sub_saveDraft");
    }
  }, AUTO_SAVE_INTERVAL);
};

scwin.onpageunload = function() {
  if (autoSaveTimer) clearInterval(autoSaveTimer);
};
```
