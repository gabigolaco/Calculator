let resultbox = document.getElementById('result-box')
const CONTA = []

let botaoLigareDesligar = document.getElementById('botaoligaredesligar')

botaoLigareDesligar.addEventListener('click', ligarEDesligar)

let tadesligado = false

function ligarEDesligar(event) {
    if (event.target.classList.contains('desligar') && tadesligado === false) {
        botaoLigareDesligar.disabled = true
        setTimeout(function() {
            tadesligado = true
            CONTA.length = 0
            resultbox.textContent = ''
            console.log('Desligou')
            botaoLigareDesligar.classList.add('ligar');
            botaoLigareDesligar.classList.remove('desligar');
            botaoLigareDesligar.disabled = false
        }, 900)
    }

    if (event.target.classList.contains('ligar') && tadesligado === true) {        
        botaoLigareDesligar.disabled = true
        setTimeout(function() {
            console.log('Ligou')
            botaoLigareDesligar.classList.add('desligar');
            botaoLigareDesligar.classList.remove('ligar');
            tadesligado = false
            botaoLigareDesligar.disabled = false
        }, 2000)
    }


}

let numeros = {
    zero: document.getElementById('botaozero'),
    um: document.getElementById('botaoum'),
    dois: document.getElementById('botaodois'),
    tres: document.getElementById('botaotres'),
    quatro: document.getElementById('botaoquatro'),
    cinco: document.getElementById('botaocinco'),
    seis: document.getElementById('botaoseis'),
    sete: document.getElementById('botaosete'),
    oito: document.getElementById('botaooito'),
    nove: document.getElementById('botaonove'),
    dez: document.getElementById('botaodez'),
}



function adicionarnumeros (callback) { // ESSA FUNÇÃO VAI ITERAR SOBRE OS NUMEROS E ADICIONAR UM LISTENER QUANDO A PESSOA CLICAR NELE

    for (let i in numeros) {
        if(numeros[i]) {
            numeros[i].addEventListener('click', callback)
        }
    }
}

let sinais = {
    soma: document.getElementById('botaosoma'),
    subtracao: document.getElementById('botaosubtracao'),
    multiplicacao: document.getElementById('botaomultiplicacao'),
    divisao: document.getElementById('botaodivisao'),
    igual: document.getElementById('botaoigual'),
    porcentagem: document.getElementById('botaoporcentagem'),
    raiz: document.getElementById('botaoraiz')
}

function adicionarsinais(callback) { // ESSA FUNÇÃO VAI ITERAR SOBRE OS SINAIS E ADICIONAR UM LISTENER QUANDO A PESSOA CLICAR NELE

    for (let i in sinais) {
        if(sinais[i]){
            sinais[i].addEventListener('click', callback)
        }
    }
}

function colocarNumeros(numeros) { // QUANDO VOCÊ APERTAR NOS NUMEROS ELE VAI BOTAR NA ARRAY CONTA E VAI ESCREVER LA NO RESULTBOX
    if (resultbox.textContent.length > 10 || tadesligado === true) {
        return
    }
    
    const ultElePorcentagem = CONTA[CONTA.length - 1]
    if (ultElePorcentagem === '%') {
        CONTA.push('/100')
        resultbox.textContent += '*'
    }

    if (ultElePorcentagem === '**0.5') {
        CONTA.pop()
        setTimeout(function() {
            CONTA.push('**0.5')
        }, 200)
    }

    switch (numeros.target.id) {

        case 'botaozero':

        resultbox.textContent += '0'
            CONTA.push('0')
        break

        case 'botaoum':
          resultbox.textContent += '1'
            CONTA.push('1')

        break

        case 'botaodois':
            resultbox.textContent += '2'
                CONTA.push('2')

        break

        case 'botaotres':
            resultbox.textContent += '3'
                CONTA.push('3')

        break

        case 'botaoquatro':
            resultbox.textContent += '4'
                CONTA.push('4')

        break

        case 'botaocinco':
            resultbox.textContent += '5'
                CONTA.push('5')

        break

        case 'botaoseis':
            resultbox.textContent += '6'
                CONTA.push('6')

        break

        case 'botaosete':
            resultbox.textContent += '7'
              CONTA.push('7')

        break
        
        case 'botaooito':
            resultbox.textContent += '8'
                CONTA.push('8')

        break

        case 'botaonove':
            resultbox.textContent += '9'
                CONTA.push('9')

        break

        case 'botaodez':
            resultbox.textContent += '10'
                CONTA.push('10')

        break
    }

}

function colocarSinais(sinais) { // QUANDO VOCÊ APERTAR NOS SINAIS ELE VAI BOTAR NA ARRAY CONTA E VAI ESCREVER LA NO RESULTBOX

    if (resultbox.textContent.length > 10 || tadesligado === true) {
        return
    }

    switch (sinais.target.id) {
        case 'botaoigual':
        resultado()
        break
    }

    const ultimoElemento = CONTA[CONTA.length - 1];
    if (['+', '-', '*', '/', '**0.5'].includes(ultimoElemento)) {
        return; // Ele basicamente vai pegar o ultimo elemento digitado, e ve se é +, -, *, / na variável "UltimoElemento"  
    }

    switch (sinais.target.id) {

        case 'botaosoma':
            resultbox.textContent += '+'
            CONTA.push('+')
        break
        
        case 'botaosubtracao':
            resultbox.textContent += '-'
            CONTA.push('-')
        break

        case 'botaomultiplicacao':
            resultbox.textContent += '*'
            CONTA.push('*')
        break

        case 'botaodivisao':
            resultbox.textContent += '/'
            CONTA.push('/')
        break
        case 'botaoporcentagem':
        if (CONTA.length === 0) {
            CONTA.push('0/100*')
            resultbox.textContent += '0%'
            console.log('sss')
        } else {
            CONTA.push('/100*')
            resultbox.textContent += '%'
            resultbox.textContent += '*'
        }
        break
        case 'botaoraiz':
        resultbox.textContent += '√'
        CONTA.push('**0.5')
        break
    }
}    

function resultado() {

    const expressao = CONTA.join('')
    const res = eval(expressao)
    if (res.length > 10) {
        resultbox.textContent = res.toString().substring(0, 8);
    } else {
        resultbox.textContent = res
    }


    CONTA.length = 0;
    CONTA.push(res.toString());
}

function apagar() {
    CONTA.length = 0
    resultbox.textContent = ''
}

document.addEventListener('keydown', apertarColocarNumeros)

function apertarColocarNumeros(event) {
    switch (event.key) {
         case 'Backspace':
                if(resultbox.textContent.length > 0) {
                    event.preventDefault()
                    CONTA.pop()
                    resultbox.textContent = resultbox.textContent.slice(0, -1)
                }
    }


    if (CONTA.length > 8 || tadesligado === true) {
        return
    } else {

            const ultimoElemento = CONTA[CONTA.length - 1];
            if (['+', '-', '*', '/'].includes(ultimoElemento) && ['+', '-', '*', '/'].includes(event.key)) {
                return
            }

            const ultElePorcentagem = CONTA[CONTA.length - 1]
            if (ultElePorcentagem === '%') {
                CONTA.push('/100*')
                resultbox.textContent += '*'
            }

        switch (event.key) {
            case '1': 
            resultbox.textContent += '1'
            CONTA.push('1')
            break;
            case '2':
                resultbox.textContent += '2' 
            CONTA.push('2')
            break
            case '3':
            resultbox.textContent += '3' 
            CONTA.push('3')
            break
            case '4':
            resultbox.textContent += '4'
            CONTA.push('4') 
            break
            case '5':
            resultbox.textContent += '5' 
            CONTA.push('5')
            break
            case '6': 
            resultbox.textContent += '6'
            CONTA.push('6')
            break
            case '7':
            resultbox.textContent += '7' 
            CONTA.push('7')
            break
            case '8': 
            resultbox.textContent += '8'
            CONTA.push('8')
            break
            case '9':
            resultbox.textContent += '9'
            CONTA.push('9')
            break
            case '0':
            resultbox.textContent += '0' 
            CONTA.push('0')
            break
            case 'Enter':
            resultado()
            break
            case '+':
            event.preventDefault();
            resultbox.textContent += '+'
            CONTA.push('+')
            break
            case '-':
            event.preventDefault();
            resultbox.textContent += '-'
            CONTA.push('-')
            break
            case '*':
            event.preventDefault();
            resultbox.textContent += '*'
            CONTA.push('*')
            break
            case '%':
                if (CONTA.length === 0) {
                    CONTA.push('0/100*')
                    resultbox.textContent += '0%'
                } else {
                    CONTA.push('/100*')
                    resultbox.textContent += '%'
                    resultbox.textContent += '*'
                }
            break
        }
    }
}

adicionarnumeros(colocarNumeros)
adicionarsinais(colocarSinais)