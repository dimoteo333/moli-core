# Multi-Language (i18n)

WebSquare supports multi-language applications through a built-in internationalization system.

## Configuration

Set up language support in `websquare.xml`:

```xml
<websquare>
  <i18n>
    <key name="default_locale">ko</key>
    <key name="supported_locales">ko,en,ja,zh</key>
    <key name="message_path">/i18n/messages</key>
  </i18n>
</websquare>
```

## Message Files

Create message property files for each locale:

### messages_ko.properties
```properties
label.empNo=사원번호
label.empName=사원명
label.dept=부서
label.save=저장
label.search=조회
label.delete=삭제
msg.saveSuccess=저장되었습니다.
msg.deleteConfirm=삭제하시겠습니까?
msg.required={0}은(는) 필수입니다.
```

### messages_en.properties
```properties
label.empNo=Employee No
label.empName=Employee Name
label.dept=Department
label.save=Save
label.search=Search
label.delete=Delete
msg.saveSuccess=Saved successfully.
msg.deleteConfirm=Are you sure you want to delete?
msg.required={0} is required.
```

## Using in XML

```xml
<!-- Component labels -->
<w2:anchor id="btn_save" label="$r{label.save}"/>
<w2:anchor id="btn_search" label="$r{label.search}"/>

<!-- Grid column headers -->
<w2:gridView id="grd_emp" dataList="dl_emp">
  <w2:header>
    <w2:row>
      <w2:column id="empNo" label="$r{label.empNo}" width="100"/>
      <w2:column id="empName" label="$r{label.empName}" width="150"/>
    </w2:row>
  </w2:header>
</w2:gridView>
```

## Using in JavaScript

```javascript
// Get message
var label = WebSquare.util.getMessage("label.empName");

// Get message with parameters
var msg = WebSquare.util.getMessage("msg.required", "Employee Name");
// → "Employee Name is required."

// Change locale at runtime
WebSquare.util.setLocale("en");
```

## Language Switching

```xml
<w2:selectBox id="sel_language" class="lang-selector">
  <w2:option label="한국어" value="ko"/>
  <w2:option label="English" value="en"/>
  <w2:option label="日本語" value="ja"/>
  <w2:script ev:event="onchange"><![CDATA[
    var locale = this.getValue();
    WebSquare.util.setLocale(locale);
    location.reload(); // Reload page with new locale
  ]]></w2:script>
</w2:selectBox>
```

## Best Practices

1. **Use message keys** for all user-facing text, not hardcoded strings
2. **Parameterize messages** with `{0}`, `{1}` placeholders for dynamic content
3. **Organize keys** by category: `label.`, `msg.`, `btn.`, `err.`
4. **Default locale**: Always define a complete default locale file
5. **Date/Number formatting**: Use locale-aware formatting functions
