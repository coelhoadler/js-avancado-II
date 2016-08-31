class NegociacaoService {

	constructor() {
		this._http = new HttpService();
	}

	obterNegociacoesDaSemana() {
		return new Promise((resolve, reject) => {
		    let xhr = new XMLHttpRequest();

		    this._http
		    .get('negociacoes/semana')
		    .then(negociacoes => {
		    	console.log(negociacoes)
		    	resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
		    })
		    .catch(err => {
				console.log(err);
		    	reject("Deu merda para pegar as negociações da semana")
		    });
		});
	}

	// Não retornando uma Promise, fazendo de um modo diferente das demais funções
	obterNegociacoesDaSemanaAnterior() {
	    return this._http
	    .get('negociacoes/anterior')
	    .then(negociacoes => {
	    	console.log(negociacoes)
	    	return negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor))
	    })
	    .catch(err => {
			console.log(err);
	    	throw new Error("Deu merda para pegar as negociações da semana anterior")
	    });		
	}

	obterNegociacoesDaSemanaRetrasada() {
		return new Promise((resolve, reject) => {
		    this._http
		    .get('negociacoes/retrasada')
		    .then(negociacoes => {
		    	console.log(negociacoes)
		    	resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
		    })
		    .catch(err => {
				console.log(err);
		    	reject("Deu merda para pegar as negociações da semana retrasada")
		    });		
		});
	}

	obterNegociacoes() {
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada()
		])
		.then(negociacoes => {
			console.log(negociacoes);
			return negociacoes
			.reduce((flatenArray, array) => flatenArray.concat(array), [])
			.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor))
		})
		.catch(err => {
			throw new Error(err)
		})
	}	

}