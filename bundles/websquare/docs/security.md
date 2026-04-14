# Security

Security considerations and patterns for WebSquare applications.

## Session Management

### Session Timeout Handling

```javascript
// Check session validity before critical operations
scwin.checkSession = function(callback) {
  // Make a lightweight session check call
  com.executeSubmission("sub_sessionCheck",
    function(e) {
      if (e.responseStatusCode === 200) {
        callback();
      }
    },
    function(e) {
      if (e.responseStatusCode === 401) {
        WebSquare.util.alert("Session expired. Please log in again.");
        location.href = "/login";
      }
    }
  );
};
```

### Auto Session Extension

```javascript
// Extend session on user activity
var sessionTimer = null;
var SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

scwin.resetSessionTimer = function() {
  if (sessionTimer) clearTimeout(sessionTimer);
  sessionTimer = setTimeout(function() {
    WebSquare.util.confirm("Session will expire soon. Extend?", function(ok) {
      if (ok) {
        com.executeSubmission("sub_sessionExtend");
        scwin.resetSessionTimer();
      } else {
        location.href = "/logout";
      }
    });
  }, SESSION_TIMEOUT - 60000); // Warn 1 minute before
};
```

## XSS Prevention

### Output Encoding

```javascript
// Encode HTML entities before displaying user input
scwin.escapeHtml = function(text) {
  if (!text) return "";
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
};
```

### GridView Renderer Safety

```xml
<!-- Use encoded output in custom renderers -->
<w2:column id="remarks">
  <w2:renderer type="custom"><![CDATA[
    // Don't render raw HTML from user data
    var escaped = value ? value.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
    return escaped;
  ]]></w2:renderer>
</w2:column>
```

## Input Validation

### Client-Side Validation

```javascript
// Sanitize input
scwin.sanitizeInput = function(value) {
  if (!value) return "";
  // Remove script tags
  return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
};

// Validate file extensions
scwin.validateFileExtension = function(fileName, allowedExts) {
  var ext = fileName.split(".").pop().toLowerCase();
  return allowedExts.indexOf(ext) !== -1;
};
```

## CSRF Protection

```xml
<!-- Include CSRF token in submissions -->
<w2:submission id="sub_save"
  action="/api/save"
  method="post"
  ref="dm_employee"
  mediaType="application/json">
  <w2:header>
    <w2:param name="X-CSRF-Token" value="$r{csrf.token}"/>
  </w2:header>
</w2:submission>
```

## Role-Based UI Control

```javascript
scwin.onpageload = function() {
  // Get user role from session
  var userRole = WebSquare.util.getCookie("userRole");

  // Hide/show components based on role
  if (userRole !== "ADMIN") {
    btn_delete.setVisible(false);
    btn_adminSettings.setVisible(false);
    grd_employees.setColumnVisible("salary", false);
  }

  if (userRole === "VIEWER") {
    btn_save.setVisible(false);
    btn_add.setVisible(false);
    grd_employees.setReadOnly(true);
  }
};
```

## Sensitive Data Handling

```javascript
// Mask sensitive data in display
scwin.maskSSN = function(ssn) {
  if (!ssn || ssn.length < 6) return ssn;
  return ssn.substring(0, 6) + "-*******";
};

scwin.maskPhone = function(phone) {
  if (!phone || phone.length < 8) return phone;
  return phone.substring(0, 3) + "-****-" + phone.substring(phone.length - 4);
};
```

## Logging

```javascript
// Audit logging for critical operations
scwin.logAction = function(action, detail) {
  dm_auditLog.set("action", action);
  dm_auditLog.set("detail", JSON.stringify(detail));
  dm_auditLog.set("timestamp", WebSquare.util.getDateTime());
  com.executeSubmission("sub_auditLog");
};
```
