# Getting Started with WebSquare

WebSquare 5 is an enterprise web UI framework by Inswave Systems. It uses an XML-based page structure to build rich, interactive web applications with data binding, server communication, and a comprehensive component library.

## Installation

### Engine Setup

WebSquare runs as a Java-based server engine. Deploy the WebSquare WAR file to your Java application server (Tomcat, WebLogic, JBoss, etc.).

1. Deploy `websquare.war` to your application server
2. Configure `websquare.xml` in `WEB-INF/config/`
3. Set up `config.xml` for engine-level settings
4. Restart the application server

### Configuration Files

#### websquare.xml

The main configuration file controlling engine behavior:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<websquare>
  <context>
    <key name="websquare_home">/websquare</key>
    <key name="default_encoding">UTF-8</key>
    <key name="debug_mode">false</key>
  </context>
  <engine>
    <key name="rendering_mode">HTML5</key>
    <key name="compress_response">true</key>
  </engine>
</websquare>
```

#### config.xml

Engine-level configuration for runtime settings:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
  <server>
    <context-path>/websquare</context-path>
    <session-timeout>30</session-timeout>
  </server>
  <logging>
    <level>INFO</level>
    <file-path>/logs/websquare.log</file-path>
  </logging>
</config>
```

## First Page

Create a basic WebSquare XML page:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:w2="http://www.inswave.com/websquare">
<head>
  <w2:buildDate/>
</head>
<body>
  <w2:page>
    <w2:model/>
    <w2:script>
      <![CDATA[
        scwin.onpageload = function() {
          alert("Hello, WebSquare!");
        };
      ]]>
    </w2:script>
    <w2:body>
      <w2:input id="inp_name" placeholder="Enter your name"/>
      <w2:anchor id="btn_greet" label="Greet">
        <w2:script ev:event="onclick">
          <![CDATA[
            var name = inp_name.getValue();
            alert("Hello, " + name + "!");
          ]]>
        </w2:script>
      </w2:anchor>
    </w2:body>
  </w2:page>
</body>
</html>
```

## Page Lifecycle

WebSquare pages execute in this order:

1. **XML Parsing**: Engine parses the XML page definition
2. **Component Initialization**: UI components are created from XML tags
3. **DataCollection Binding**: DataMap/DataList bindings are established
4. **Script Loading**: `<w2:script>` blocks are loaded
5. **onpageload Event**: `scwin.onpageload()` fires when the page is fully ready

## Key Concepts

- **XML-based UI**: Pages are defined in XML with `w2:` namespace components
- **DataCollection**: Client-side data model (DataMap, DataList) with two-way binding
- **Submission**: Declarative server communication with request/response mapping
- **WFrame**: SPA-like page composition for embedding sub-pages
- **Scope**: Each page/WFrame has its own JavaScript scope (`scwin` for window scope)
