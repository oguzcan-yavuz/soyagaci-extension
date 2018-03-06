import '../css/bootstrap.min.css';
import '../css/style.css';

import $ from 'jquery';

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
