(function(doc, win) {
    var html = doc.getElementsByTagName("html")[0],
        reEvt = "orientationchange" in win ? "orientationchange" : "resize",
            reFontSize = function() {
                var clientW = window.innerWidth;
                    if(!clientW) {
                        return;
                    }else{
                        html.style.fontSize =(clientW / 13.5) + "px";
                    }
                    
                }
            win.addEventListener(reEvt, reFontSize);
            doc.addEventListener("DOMContentLoaded", reFontSize);
            })(document, window);