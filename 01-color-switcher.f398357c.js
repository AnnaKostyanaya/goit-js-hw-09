const t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")};let e=0;t.stop.disabled=!0,t.start.addEventListener("click",(()=>{e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.start.disabled=!0,t.stop.disabled=!1}),1e3)})),t.stop.addEventListener("click",(()=>{clearInterval(e),t.start.disabled=!1,t.stop.disabled=!0}));
//# sourceMappingURL=01-color-switcher.f398357c.js.map
