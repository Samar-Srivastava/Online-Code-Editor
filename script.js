 // Initialize Ace Editors
 var editorHtml = ace.edit("editor-html");
 var editorCss = ace.edit("editor-css");
 var editorJs = ace.edit("editor-js");

 // Set initial theme
 var currentTheme = 'dark';
 setTheme(currentTheme);

 editorHtml.session.setMode("ace/mode/html");
 editorHtml.session.on('change', updateOutput);

 editorCss.session.setMode("ace/mode/css");
 editorCss.session.on('change', updateOutput);

 editorJs.session.setMode("ace/mode/javascript");
 editorJs.session.on('change', updateOutput);

 // Function to update output based on editor content
 function updateOutput() {
     var htmlCode = editorHtml.getValue();
     var cssCode = editorCss.getValue();
     var jsCode = editorJs.getValue();
     var outputFrame = document.getElementById("output");

     // Clear previous content
     outputFrame.innerHTML = "";

     // Create an iframe for isolated output rendering
     var iframe = document.createElement("iframe");
     iframe.style.width = "100%";
     iframe.style.height = "100%";
     outputFrame.appendChild(iframe);

     var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
     iframeDoc.open();
     iframeDoc.write(htmlCode + "<style>" + cssCode + "</style>" + "<script>" + jsCode + "<\/script>");
     iframeDoc.close();
 }

 // Function to set theme
 function setTheme(theme) {
     var themeMap = {
         'dark': 'dark-theme',
         'light': 'light-theme'
     };

     document.body.className = themeMap[theme];

     if (theme === 'dark') {
         editorHtml.setTheme("ace/theme/monokai");
         editorCss.setTheme("ace/theme/monokai");
         editorJs.setTheme("ace/theme/monokai");
         document.getElementById('theme-toggle-button').innerHTML = '<i class="fa-sharp fa-regular fa-moon"></i>';
     } else {
         editorHtml.setTheme("ace/theme/dawn");
         editorCss.setTheme("ace/theme/dawn");
         editorJs.setTheme("ace/theme/dawn");
         document.getElementById('theme-toggle-button').innerHTML = '<i class="fa-sharp fa-solid fa-moon"></i>';
     }
 }

 // Function to toggle theme
 function toggleTheme() {
     currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
     setTheme(currentTheme);
 }

 // Function to copy text
 function copyText(type) {
     var editor;
     if (type === 'html') {
         editor = editorHtml;
     } else if (type === 'css') {
         editor = editorCss;
     } else if (type === 'js') {
         editor = editorJs;
     }

     var text = editor.getValue();
     navigator.clipboard.writeText(text).then(function() {
         showPopup();
     }).catch(function(err) {
         console.error('Failed to copy text: ', err);
     });
 }

 // Function to show popup message
 function showPopup() {
     var popup = document.getElementById('popup');
     popup.classList.add('show');
     setTimeout(function() {
         popup.classList.remove('show');
     }, 3000);
 }

 // Function to clear all text from editors
 function clearAllText() {
     editorHtml.setValue("");
     editorCss.setValue("");
     editorJs.setValue("");
     updateOutput();
 }

 // Initial update on page load
 updateOutput();


 function showpopmess() {
    var popup = document.getElementById('popupmess');
    popup.classList.add('show');
}

function hidepopmess() {
    var popup = document.getElementById('popupmess');
    popup.classList.remove('show');
}