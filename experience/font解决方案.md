font browser handle fallback
chinese words
english words/numbers
Rendered Fonts: show the actual used font
 - network resources, style显示注明
 - local resources
 format: woff woff2 eot ttf
 TrueType fonts(ttf): should be comporessed
 OpenType fonts(otf): should be comporessed
 Web Open Font Format (woff): should not be comporessed(already compressed)
 Embedded OpenType (eot): requires a special tool and an extra step

方案1： font: 14px/1.6
/*西文*/-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,Helvetica Neue,Helvetica,Arial,
/*中文*/PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,sans-serif;
天猫：font-family: "PingFang SC",miui,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;
Github：font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
CSS-Tricks：font-family: system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;



 font-variant

