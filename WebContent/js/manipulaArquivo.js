class Conta {
	constructor(id, data, saldo, nome) {
		this.id = id;
		this.data = data;
		this.saldo = Number(saldo);
		this.nome = nome;
	}
}

var leitorDeCSV = new FileReader();
var leitorDeCSV2 = new FileReader();

var totalArquivoTipo1 = 0;
var totalArquivoTipo2 = 0;

window.onload = function init() {
	leitorDeCSV.onload = leCSV;
	leitorDeCSV2.onload = leCSV2;
}

function pegaCSV(inputFile) {
	var file = inputFile.files[0];
	leitorDeCSV.readAsText(file);
}

function pegaCSV2(inputFile) {
	var file = inputFile.files[0];
	leitorDeCSV2.readAsText(file);
}

function converterCsvContasParaObjeto(csv) {
	var linhas = csv.split('\n');
	var contas = [];

	for (var i = 1; i < linhas.length; i++) {
		var campos = linhas[i].split(';');
		if (campos.length < 3) continue;

		if (campos.length == 3)
			contas.push(new Conta(campos[0], null, campos[1], campos[2]));
		if (campos.length == 4)
			contas.push(new Conta(campos[0], campos[1], campos[2], campos[3]));
	}

	return contas;
}

function leCSV(evt) {
	var contas = converterCsvContasParaObjeto(evt.target.result);

	totalArquivoTipo1 = 0;
	for (var i in contas) {
		totalArquivoTipo1 += contas[i].saldo;
	}

	var fileArr = evt.target.result.split('\n');
	var strDiv = '<table>';

	for ( var i = 0; i < fileArr.length; i++) {
		strDiv += '<tr>';
		var fileLine = fileArr[i].split(';');
		for ( var j = 0; j < fileLine.length; j++) {
			strDiv += '<td>' + fileLine[j].trim() + '</td>';
		}
		strDiv += '</tr>';
	}
	// Imprime total 2
	strDiv += '<tr>';
	strDiv += '<td>Total</td>';
	strDiv += '<td>' + totalArquivoTipo1 + '</td>';
	strDiv += '</tr>';

	strDiv += '</table>';

	var CSVsaida = document.getElementById('CSVsaida');
	CSVsaida.innerHTML = strDiv;
}

function leCSV2(evt) {
	var contas = converterCsvContasParaObjeto(evt.target.result);

	totalArquivoTipo2 = 0;
	for (var i in contas) {
		totalArquivoTipo2 += contas[i].saldo;
	}

	var fileArr = evt.target.result.split('\n');
	var strDiv = '<table>';

	for ( var i = 0; i < fileArr.length; i++) {
		strDiv += '<tr>';
		var fileLine = fileArr[i].split(';');
		for ( var j = 0; j < fileLine.length; j++) {
			strDiv += '<td>' + fileLine[j].trim() + '</td>';
		}
		strDiv += '</tr>';
	}

	// Imprime total 2
	strDiv += '<tr>';
	strDiv += '<td>Total</td>';
	strDiv += '<td>' + totalArquivoTipo2 + '</td>';
	strDiv += '</tr>';
	strDiv += '</table>';

	var CSVsaida = document.getElementById('CSVsaida2');
	CSVsaida.innerHTML = strDiv;
}
