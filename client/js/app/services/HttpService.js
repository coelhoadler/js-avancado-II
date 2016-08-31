class HttpService {

	get(url) {

		return new Promise((resolve, reject) => {
		    let xhr = new XMLHttpRequest();
		    xhr.open('GET', url);

		    /* Estados possíveis
		    ----------------------------
		    0 = req. não iniciada
		    1 = o servidor conectou
		    2 = req. recebida
		    3 = processando
		    4 = req. concluída e resposta pronta */

		    xhr.onreadystatechange = () => {
		        if (xhr.readyState == 4) {
		            if (xhr.status == 200) {
		                resolve(JSON.parse(xhr.responseText));
		            } else {
		                reject(xhr.responseText);
		            }
		        }
		    };

		    xhr.send();
		});
	}

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });
    }	
}