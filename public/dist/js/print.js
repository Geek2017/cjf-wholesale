/*
kinziPrint v1.1.1
@author Mousa Alsheikh

Licensed under the MIT licence:
http://www.opensource.org/licenses/mit-license.php

(c) Mousa Alsheikh 2019 - 2022   
*/
! function(t) {
    t.fn.kinziPrint = function(e) {
        var i = t.extend({ importCSS: !0, importStyles: !1, loadCSS: "", printContainer: !0, header: null, footer: null, printDelay: 500, debug: !1 }, e);
        let n = "",
            r = "";
        if (i.importCSS && t('link[rel="stylesheet"]').each(function() { n += '<link href="' + t(this).attr("href") + '" rel="stylesheet" />' }), i.importStyles && t('style[type="text/css"]').each(function() { n += '<style type="text/css">', n += t(this).text(), n += "</style>" }), i.loadCSS)
            if (t.isArray(i.loadCSS))
                for (var a = 0; a < i.loadCSS.length; a++) n += '<link href="' + i.loadCSS[a] + '" rel="stylesheet" />';
            else n += '<link href="' + i.loadCSS + '" rel="stylesheet" />';
        r += '<table class="kinzi-print-table" style="width:100%;" cellpadding="0" cellspacing="0">', r += '<thead class="kinzi-print-header" style="display: table-header-group !important;">', r += "<tr>", r += "<td>", i.header && (r += i.header), r += '<span style=" font-size: 0 !important; line-height: 0 !important;">&nbsp;</span>', r += "</td>", r += "</tr>", r += "</thead>", r += '<tfoot class="kinzi-print-footer" style="display: table-footer-group !important;">', r += "<tr>", r += "<td>", i.footer && (r += i.footer), r += '<span style=" font-size: 0 !important; line-height: 0 !important;">&nbsp;</span>', r += "</td>", r += "</tr>", r += "</tfoot>", r += '<tbody class="kinzi-print-body" style="display: table-row-group !important;">', r += "<tr>", r += "<td>", r += '<div class="kinzi-print-wrapper">', i.printContainer ? r += t(this)[0].outerHTML : r += t(this).html(), r += "</div>", r += '<div class="page-break" style="font-size: 0 !important; line-height: 0 !important; page-break-before: always !important;">&nbsp;</div>', r += "</td>", r += "</tr>", r += "</tbody>", r += "</table>";
        var s = "";
        return i.debug || (s = "display:none !important;"), t('iframe[name="kinziprint"]').remove(), t("<iframe>", { name: "kinziprint", class: "kinzi-print", style: s }).appendTo("body").contents().find("body").append(n + r).css({ margin: "0" }), setTimeout(function() { window.frames.kinziprint.focus(), window.frames.kinziprint.print() }, i.printDelay), !1
    }
}(jQuery);