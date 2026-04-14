# File Upload and Download

WebSquare provides file upload and download components for handling file operations.

## FileUpload Component

```xml
<w2:fileUpload id="fu_attachment"
  submission="sub_upload"
  maxFileCount="5"
  maxFileSize="10485760"
  allowedExtensions="jpg,png,pdf,xlsx"
  style="width:400px;"/>
```

### Key Properties

| Property | Description |
|----------|-------------|
| `submission` | Submission ID for upload |
| `maxFileCount` | Maximum number of files |
| `maxFileSize` | Maximum file size in bytes |
| `allowedExtensions` | Comma-separated allowed file extensions |
| `multiple` | Allow multiple file selection |

### JavaScript API

```javascript
// Get selected file count
var count = fu_attachment.getFileCount();

// Get file info
var fileInfo = fu_attachment.getFileInfo(0);
// { name: "doc.pdf", size: 1024, type: "application/pdf" }

// Get all file info
var files = fu_attachment.getAllFileInfo();

// Remove a file from selection
fu_attachment.removeFile(0);

// Clear all selected files
fu_attachment.clear();

// Trigger upload
fu_attachment.upload();
```

### Upload Submission

```xml
<w2:submission id="sub_upload"
  action="/api/files/upload"
  method="post"
  encoding="multipart/form-data"
  submitDone="scwin.uploadDone"
  submitError="scwin.uploadError">
</w2:submission>
```

```javascript
scwin.doUpload = function() {
  if (fu_attachment.getFileCount() === 0) {
    WebSquare.util.alert("Please select a file to upload");
    return;
  }
  com.executeSubmission("sub_upload");
};

scwin.uploadDone = function(e) {
  if (e.responseStatusCode === 200) {
    WebSquare.util.alert("Upload completed");
    fu_attachment.clear();
    scwin.loadFileList(); // Refresh file list
  }
};
```

### Events

| Event | Description |
|-------|-------------|
| `onchange` | File selection changed |
| `onbeforeupload` | Before upload starts — return false to cancel |
| `onuploadcomplete` | After upload completes |
| `onerror` | Upload error occurred |

```xml
<w2:fileUpload id="fu_attachment">
  <w2:script ev:event="onchange"><![CDATA[
    var files = fu_attachment.getAllFileInfo();
    for (var i = 0; i < files.length; i++) {
      console.log("Selected: " + files[i].name + " (" + files[i].size + " bytes)");
    }
  ]]></w2:script>
</w2:fileUpload>
```

## File Download

### Using Submission

```xml
<w2:submission id="sub_download"
  action="/api/files/download"
  method="get"
  ref="dm_fileInfo"
  responseType="blob">
</w2:submission>
```

### Using JavaScript

```javascript
scwin.doDownload = function(fileId) {
  // Direct download via URL
  var url = "/api/files/download?fileId=" + fileId;
  window.open(url, "_blank");
};

// Or using a hidden form
scwin.doDownload2 = function(fileId) {
  dm_fileInfo.set("fileId", fileId);
  com.executeSubmission("sub_download");
};
```

## File List Pattern

Common pattern: display uploaded files in a grid with download/delete actions.

```xml
<w2:gridView id="grd_files" dataList="dl_files" style="width:100%; height:200px;">
  <w2:header>
    <w2:row>
      <w2:column id="fileName" label="File Name" width="250"/>
      <w2:column id="fileSize" label="Size" width="100"/>
      <w2:column id="uploadDate" label="Upload Date" width="120"/>
      <w2:column id="action" label="Action" width="150"/>
    </w2:row>
  </w2:header>
  <w2:detail>
    <w2:row>
      <w2:column id="fileName">
        <w2:renderer type="custom"><![CDATA[
          return '<a href="#" onclick="scwin.doDownload(\'' + rowData.fileId + '\')">' + value + '</a>';
        ]]></w2:renderer>
      </w2:column>
      <w2:column id="fileSize">
        <w2:renderer type="custom"><![CDATA[
          return Math.round(value / 1024) + " KB";
        ]]></w2:renderer>
      </w2:column>
      <w2:column id="uploadDate" displayFormat="yyyy-MM-dd"/>
      <w2:column id="action">
        <w2:renderer type="custom"><![CDATA[
          return '<a href="#" onclick="scwin.doDeleteFile(\'' + rowData.fileId + '\')">Delete</a>';
        ]]></w2:renderer>
      </w2:column>
    </w2:row>
  </w2:detail>
</w2:gridView>
```
