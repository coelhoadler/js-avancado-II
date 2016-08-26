class ListaNegociacoes {
    
    constructor(armadilha) {
        
        this._negociacoes = [];
        this._armadilha = armadilha;
        // this._contexto = contexto; // Contexto de execução
    }
    
    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);
        this._armadilha(this);	
        //Reflect.apply(this._armadilha, this._contexto, [this]); // Como se ele trocasse o .this atual pelo this._contexto passado
    }
    
    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }

    esvazia() {
    	this._negociacoes = [];
        this._armadilha(this);
        //Reflect.apply(this._armadilha, this._contexto, [this]); 	
    }

}