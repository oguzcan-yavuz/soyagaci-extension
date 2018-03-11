import '../css/bootstrap.min.css';
import '../css/style.css';
import '../../node_modules/treant-js/Treant.css';

import $ from 'jquery';
import { Treant } from 'treant-js';
import { HTMLParser } from '@soyagaci/parser/format/html';
import { convertRecordArrayToRelations } from '@soyagaci/models';

let relationArray;

chrome.runtime.sendMessage(null, { action: "getHtml" }, null, function(response) {
    let htmlResult = response.result;
    createRelationArray(htmlResult).then(function(relArr) {
        relationArray = relArr;
        createChartConfig(relArr).catch(console.log);
    });
});

function createRelationArray(html) {
    return HTMLParser(html).then(function(parsedResults) {
        return convertRecordArrayToRelations(parsedResults.records);
    });
}

async function createChartConfig(relArr) {
    let chartConfig = {
        chart: {
            container: "#OrganiseChart-big-commpany",
            levelSeperation: 25,
            padding: 10,
            rootOrientation: "WEST",
            nodeAlign: "BOTTOM",
            connectors: {
                type: "step",
                style: {
                    stroke: '#FF0040',
                    "stroke-width": 2
                }
            },
            node: {
                HTMLclass: "big-commpany"
            }
        }
    };
    chartConfig.nodeStructure = await convertRelArrToNodeStructure(relArr, relArr.length - 1);
    new Treant(chartConfig);
}

function convertRelArrToNodeStructure(relArr, personIndex) {
    let personInfo = relArr[personIndex].person;
    let relations = relArr[personIndex].relations;
    let result = {
        text: {
            name: personIndex + ": " + personInfo.name + (personInfo.lastName ? " " + personInfo.lastName : " -")
        },
        children: []
    };
    if(relations.CTM != null)
        result.children.push(convertRelArrToNodeStructure(relArr, relations.CTM[0]));
    if(relations.CTF != null)
        result.children.push(convertRelArrToNodeStructure(relArr, relations.CTF[0]));
    return result;
}

/* Kisi Detay */

function checkUndefined(candidate) {
    return candidate != null ? candidate : "-"
}

$(function () {
    $('p').click(function () {
        let personIndex = $(this).text().split(": ")[0];
        let personDetails = relationArray[personIndex].person;
        let skip = ["lastName", "haneNo", "siraNo"];
        let keyArr = Object.keys(personDetails);
        for(let i = 0; i < keyArr.length; i++) {
            let key = keyArr[i];
            if(skip.indexOf(key) !== -1)
                continue;
            let html = key + ": " + checkUndefined(personDetails[key]);
            if(key === "name")
                html += " " + checkUndefined(personDetails["lastName"]);
            else if(key === "ciltNo")
                html += "-" + checkUndefined(personDetails["haneNo"]) + "-" + checkUndefined(personDetails["siraNo"]);
            document.getElementById(key).innerHTML = html;
        }
    });
});
