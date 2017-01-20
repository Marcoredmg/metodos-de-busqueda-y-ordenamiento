function GenerarVector(){
	n = parseInt(document.getElementById("tamaño_vector").value);
	vector = []

	for (var i = 0; i < n; i++) {
		vector[i] = parseInt(prompt("Ingrese posicion " + (i+1)));
	}

	vector_original.textContent = "Vector Original = " + vector;
}

function Buscar(){
	num = parseInt(document.getElementById("num_busqueda").value);
	metodo_busqueda = document.getElementById("selector_busqueda").value;

	if(metodo_busqueda == "secuencial"){
		Secuencial(vector, num);
	}else if(metodo_busqueda == "binaria"){
		Binaria(vector, num, mitad = Math.floor(vector.length/2));
	}
}
	
function Ordenar(){
	metodo = document.getElementById("selector").value;
	if(metodo == "burbuja"){
		Burbuja(vector);
	}else if(metodo == "seleccion"){
		Seleccion(vector);
	}else if(metodo == "insercion"){
		Insercion(vector);
	}else if(metodo == "mezcla"){
		resultado.textContent = "Vector Ordenado = " + Mezcla(vector);
		vector = Mezcla(vector);
	}else if(metodo == "quick"){
		resultado.textContent = "Vector Ordenado = " + QuickSort(vector);
		vector = QuickSort(vector);
	}else if(metodo == "radix"){
		RadixSort(vector, 3);
	}

}

function Burbuja(vector){
	for (var i = 1; i < vector.length; i++) {
		for (var j = 0; j < vector.length - i; j++) {
			if(vector[j] > vector[j+1]){
				aux = vector[j];
				vector[j] = vector[j+1];
				vector[j+1] = aux;
			}
		}
	}
	resultado.textContent = "Vector Ordenado = " + vector
}

function Seleccion(vector){
	for (var i = 0; i < vector.length - 1; i++) {
		minimo = i;
		for (var j = i + 1; j < vector.length; j++) {
			if(vector[j] < vector[minimo]){
				minimo = j;
			}
		}
		aux = vector[i];
		vector[i] = vector[minimo];
		vector[minimo] = aux;
	}
	resultado.textContent = "Vector Ordenado = " + vector
}

function Insercion(vector){
	for(var i = 1; i < vector.length; i++) {
	    j = i;
	    while(j > 0 && vector[j] < vector[j-1] ){
	        tmp = vector[j];
	        vector[j] = vector[j-1];
	        vector[j-1] = tmp;
	        j--;
	    }
	}
	resultado.textContent = "Vector Ordenado = " + vector;
}


function Mezcla(vector) { 
    var tam = vector.length;
    if (tam < 2) {
        return vector;
    }
    var mitad = Math.floor(tam / 2),
    	left = vector.slice(0, mitad),
    	right = vector.slice(mitad);
    return Mezclar(Mezcla(left), Mezcla(right));
}

function Mezclar(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());
    return result;
}

function QuickSort(vector) {
    if (vector.length <= 1) {
        return vector;
    }　　
    var pivotIndex = Math.floor(vector.length / 2);　　
    var pivot = vector.splice(pivotIndex, 1)[0];　　
    var left = [];　　
    var right = [];　　
    for (var i = 0; i < vector.length; i++) {　　　　
        if (vector[i] < pivot) {　　　　　　
            left.push(vector[i]);　　　　
        } else {　　　　　　
            right.push(vector[i]);　　　　
        }　　
    }　
    return QuickSort(left).concat([pivot], QuickSort(right));
}

function RadixSort(vector, maxDigit) {
    var mod = 10;
    var dev = 1;
    var a_contador = [];
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < vector.length; j++) {
            var aux = parseInt((vector[j] % mod) / dev);
            if (a_contador[aux] == null) {
                a_contador[aux] = [];
            }
            a_contador[aux].push(vector[j]);
        }
        var pos = 0;
        for (var j = 0; j < a_contador.length; j++) {
            var value = null;
            if (a_contador[j] != null) {
                while ((value = a_contador[j].shift()) != null) {
                    vector[pos++] = value;
                }
            }
        }
    }
    resultado.textContent = "Vector Ordenado = " + vector;
}

function Secuencial(vector, n){
	for(var i = 0; i < vector.length; i++){
		if(vector[i] == n){
			resultado_busqueda.textContent = "Encontrado en la posicion " + (i + 1);
			break;
		}else{
			resultado_busqueda.textContent = "No encontrado";
		}
	}
}

function Binaria(vector, n, mitad){
	if(vector[mitad] == n){
		resultado_busqueda.textContent = "Encontrado en la posicion " + (mitad + 1);
	}
	else if(vector[mitad] >= n){
		while(vector[mitad] != n) {
			mitad = Math.floor(mitad / 2);
			if(mitad == 0){
				resultado_busqueda.textContent = "No encontrado";
				break;
			}
		}
		if(vector[mitad] == n){
			resultado_busqueda.textContent = "Encontrado en la posicion " + (mitad + 1);
		}
	}else if(vector[mitad] <= n){
		while(vector[mitad] != n) {
			mitad = Math.floor((vector.length + mitad + 1) / 2);
			if(mitad < vector.length){
				resultado_busqueda.textContent = "No encontrado";
				break;
			}
		}
		if(vector[mitad] == n){
			resultado_busqueda.textContent = "Encontrado en la posicion " + (mitad + 1);
		}
	}
}



