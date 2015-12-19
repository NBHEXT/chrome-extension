function saveOptions(isSwapped) {
    var workOnContestValue = document.getElementById('workOnContest').checked;
    chrome.storage.sync.set({
        workOnContest: workOnContestValue
    },
    function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

function saveOptionsSwapped() {
    var workOnContest = document.getElementById('workOnContest');
    workOnContest.checked = !workOnContest.checked;
    saveOptions();
}

function restoreOptions() {
    chrome.storage.sync.get({
        workOnContest: false
    }, function(items) {
        document.getElementById('workOnContest').checked = items.workOnContest;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('workOnContest').addEventListener('click', saveOptions);
document.getElementById('workOnContestText').addEventListener('click', saveOptionsSwapped);