/* Created in autumn 2015
   by
   Roman Rubanenko    (@Rubanenko at codeforces.com),
   Maxim Molchanov    (@MaximM at codeforces.com),
   Aleksey Kholovchuk (@meh at pornhub.com)

   This extension comes with absolutely NO WARRANTY,
   use it on your own risk.

   No rights reserved.
*/

var partyNum = 0;
var deltas = [];

function modifyPartyHtml(index, elem)
{
    var delta = "?";
    if (partyNum > 0)
    {
        var handle = $(elem).find("td:eq(1)").find("a").first().html();
        if (typeof handle != 'undefined')
        {
            handle = handle.replace(/<\/?[^>]+>/gi, '');
            if (handle in deltas)
                delta = deltas[handle];
        }
    }
    var text;
    if (partyNum == 0)
    {
        text = "<th class='top right' style='width: 4em;'><span title='Rating change''>&Delta;</span></th>";
    }
    else
    {
        var darkClassText = partyNum % 2 == 1 ? "dark " : "";
        var colorText = delta > 0 ? "green" : "gray";
        var deltaSignText = delta > 0 ? "+" : "";
        text = "<td class='" + darkClassText + "right'><span style='color:" + colorText + ";font-weight:bold;'>" + deltaSignText + delta + "</span></td>";
    }
    ++partyNum;
    $(elem).append(text);
}

function showDeltas()
{
    var count = $(".standings").find("tr").length;
    if (count > 2)
    {
        var contestId = document.location.href.replace(/\D+/ig, ',').substr(1).split(',')[0];
        var showUnofficial = document.getElementById("showUnofficial").checked;
        var workOnContest = false;
        chrome.storage.sync.get(
        {
            workOnContest: false
        }, function(data)
        {
            workOnContest = data.workOnContest;
            $.getJSON("http://nbhext.com/api/standings?contestId=" + contestId + "&showUnofficial=" + showUnofficial + "&workOnContest=" + workOnContest,
                function(data)
                {
                    if (data.result == "OK")
                    {
                        deltas = data.deltas;
                        $(".standings").find("tr").first().find("th").last().removeClass("right");
                        $(".standings").find("tr").find("td").removeClass("right");
                        $(".standings").find("tr").each(modifyPartyHtml);
                        if (count % 2 == 0)
                            $(".standings").find("tr").last().find("td").last().replaceWith("<td class='smaller bottom dark right'> </td>");
                        else
                            $(".standings").find("tr").last().find("td").last().replaceWith("<td class='smaller bottom right'> </td>");
                    }
                }
            );
        });
    }
}

showDeltas();
