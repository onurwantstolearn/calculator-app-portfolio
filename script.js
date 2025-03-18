let runningTotal = 0; // Toplamı saklayan değişken
let buffer = "0"; // Ekranda gösterilecek mevcut sayı
let previousOperator; // Son kullanılan operatörü saklayan değişken

const screen = document.querySelector('.screen'); // Ekran öğesini seçiyoruz

// Butona tıklanınca çağrılan ana fonksiyon
function buttonClick(value){
    if(isNaN(value)){ // Eğer giriş bir sayı değilse, bir sembol (operatör) olmalı
        handleSymbol(value);
    }else{
        handleNumber(value); // Eğer giriş bir sayıysa, sayıyı işle
    }
    screen.innerText = buffer; // Ekranı güncelle
}

// Sembol (operatör) işlemlerini yöneten fonksiyon
function handleSymbol(symbol){
    switch(symbol){
        case 'C': // Temizleme işlemi
            buffer = '0'; // Ekranı sıfırla
            runningTotal = 0; // Toplamı sıfırla
            break;
        case '=': // Sonucu hesaplama
            if(previousOperator == null){ // Eğer hiç operatör kullanılmamışsa çık
                return;
            }   
            flushOperation(parseInt(buffer)); // İşlemi gerçekleştir
            previousOperator = null;
            buffer = runningTotal; // Sonucu ekranda göster
            runningTotal = 0; // Toplamı sıfırla
            break;
        case '←': // Son karakteri silme işlemi
            if(buffer.length == 1){ // Eğer tek karakter varsa, sıfırla
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1); // Son karakteri sil
            }
            break;
        case '+':
        case '−':
        case 'x':
        case '÷':
            handleMath(symbol); // Matematiksel işlemi gerçekleştir
            break;
    }
}

// Matematik işlemlerini yöneten fonksiyon
function handleMath(symbol){
    if(buffer === '0'){ // Eğer ekrandaki sayı sıfırsa işlem yapma
        return;
    }

    const intBuffer = parseInt(buffer); // Ekrandaki sayıyı tam sayıya çevir

    if(runningTotal === 0){ // Eğer toplam sıfırsa, yeni sayıyı başlangıç olarak al
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer); // Önceki işlemi gerçekleştir
    }
    previousOperator = symbol; // Yeni operatörü kaydet
    buffer = '0'; // Ekranı sıfırla
}

// İşlemleri gerçekleştiren fonksiyon
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === 'x'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

// Sayı girişlerini yöneten fonksiyon
function handleNumber(numberString){
    if(buffer === '0'){ // Eğer ekranda sadece sıfır varsa, yeni rakamla değiştir
        buffer = numberString;
    }else{
        buffer += numberString; // Yeni rakamı mevcut ekrana ekle
    }
}

// Hesap makinesi başlatma fonksiyonu
function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText); // Tıklanan butonun içeriğini al ve işle
    });
}

init(); // Başlatma fonksiyonunu çağır
