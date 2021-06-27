function myf() {
    let tables = document.getElementsByTagName("td");
    var tableLength = tables.length;

    for (var i = 0; i < tableLength ; i++) {
        if (i%2 == 0){
            continue;
        }
        var row = tables[i];
        var rowValue = row.innerText;
        row.innerText="";

        var element = document.createElement("a");
        element.setAttribute("href",rowValue);
        element.setAttribute("style","color: white")

        var textNode = document.createTextNode(rowValue);
        element.appendChild(textNode);
        row.appendChild(element);

        // row.empty();
    }
}

const table = document.getElementById("table");
const fileUploader = document.querySelector("#myfiles");

fileUploader.setAttribute("hidden", true);

const search = () => {
    const filter = myInput.value.toLowerCase();
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
        const nested = row.querySelectorAll("td");
        const [columnA, columnB] = (nested.length === 2) ? [nested[0].textContent, nested[1].textContent] : ["", ""];
								// set search column
        const result = columnA.toLowerCase();
        row.style.display = (result.indexOf(filter) > -1) ? "" : "none";
    });
}

const checkTable = () => {
    const el = document.querySelector("[data-toggle]");
    if (el.hasAttribute("data-active")) {
        el.textContent = "";
        const fragment = document.getElementById("table-reset");
        const instance = document.importNode(fragment.content, true);
        el.appendChild(instance);
    } else el.setAttribute("data-active", true);
}

const pullfiles = function() {
    const fileInput = fileUploader;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(evt) {
        handleJSON(evt.target.result);
    };
    reader.readAsText(file);
}

function handleJSON(objectArray) {
    checkTable();
    const abbr_enabled = false;
    const sections = JSON.parse(objectArray);
    const fragment = document.getElementById("table-row-template");
    sections.forEach(section => {
        section.items.forEach(item => {
            const instance = document.importNode(fragment.content, true);
            if (item === section.items[0])
                instance.querySelector(".name").classList = "name lead";
            // enable html abbreviation tags
            if (abbr_enabled) {
                instance.querySelector(".abbr").textContent = item.name;
                instance.querySelector(".abbr").title = item.desc;
            } else
                instance.querySelector(".name").textContent = item.name;
            instance.querySelector(".desc").textContent = item.desc;
            table.appendChild(instance);
        });
    });
    myf();
}

fileUploader.onchange = pullfiles;



/* JSON TEMPLATE
[{
	"name": "section-name",
	"items": [{
		"name": "item-name",
		"desc": "description"
	}]
}]
*/


<!--此处编写表格索引 name+desc-->
handleJSON(`[{"name":"0–9","items":[
{"name":    "坦克游戏-tank",  
    "desc": "/game/tank/index.html"},
{"name":    "全屏显示时钟-clock",  
    "desc": "/game/clock/hrllo.html"}
    
]}]`);











