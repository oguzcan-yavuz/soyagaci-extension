import '../css/bootstrap.min.css';
import '../css/style.css';

import $ from 'jquery';
// import { go } from 'gojs';
const go = require('gojs');

/* Kisi Detay */

$(function () {
    $('p').click(function () {
        let kisi = $(this).text();
        let yakinlik = kisi.split(":")[1];
        let adiSoyadi = gelen["details"][yakinlik][1] + " " + gelen["details"][yakinlik][2];
        let yakinlikDerece = gelen["details"][yakinlik][0];
        let babaAdi = gelen["details"][yakinlik][3];
        let anneAdi = gelen["details"][yakinlik][4];
        let dogumYeri = gelen["details"][yakinlik][5];
        let nereli = gelen["details"][yakinlik][6];
        let cilt = gelen["details"][yakinlik][7];
        let medeniHali = gelen["details"][yakinlik][8];
        let durumu = gelen["details"][yakinlik][9];
        let cinsiyet = gelen["details"][yakinlik][10];

        document.getElementById("yakinlik").innerHTML = "Yakınlık : " + yakinlikDerece;
        document.getElementById("isim").innerHTML = adiSoyadi;
        document.getElementById("babaAdi").innerHTML = "Baba Adı : " + babaAdi;
        document.getElementById("anneAdi").innerHTML = "Anne Adı : " + anneAdi;
        document.getElementById("dogumYeri").innerHTML = "Doğum Yeri / Tarihi: " + dogumYeri;
        document.getElementById("nereli").innerHTML = "İl / İlçe / Mahalle : " + nereli;
        document.getElementById("cilt").innerHTML = "Cilt - Hane - Birey No: " + cilt;
        document.getElementById("mHal").innerHTML = "Medeni Hali: " + medeniHali;
        document.getElementById("durum").innerHTML = "Durumu: " + durumu;
        document.getElementById("cinsiyet").innerHTML = "Cinsiyet: " + cinsiyet;

    });
});

let $$ = go.GraphObject.make;

let myDiagram =
    $$(go.Diagram, "myDiagramDiv",
        {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $$(go.TreeLayout, // specify a Diagram.layout that arranges trees
                {angle: 90, layerSpacing: 35})
        });

// the template we defined earlier
myDiagram.nodeTemplate =
    $$(go.Node, "Horizontal",
        {background: "#44CCFF"},
        $$(go.Picture,
            {margin: 10, width: 50, height: 50, background: "red"},
            new go.Binding("source")),
        $$(go.TextBlock, "Default Text",
            {margin: 12, stroke: "white", font: "bold 16px sans-serif"},
            new go.Binding("text", "name"))
    );

// define a Link template that routes orthogonally, with no arrowhead
myDiagram.linkTemplate =
    $$(go.Link,
        {routing: go.Link.Orthogonal, corner: 5},
        $$(go.Shape, {strokeWidth: 3, stroke: "#555"})); // the link shape

let model = $$(go.TreeModel);
model.nodeDataArray =
    [
        {key: "1", name: "Don Meow"},
        {key: "2", parent: "1", name: "Demeter"},
        {key: "3", parent: "1", name: "Copricat"},
        {key: "4", parent: "3", name: "Jellylorum"},
        {key: "5", parent: "3", name: "Alonzo"},
        {key: "6", parent: "2", name: "Munkustrap"}
    ];
myDiagram.model = model;
