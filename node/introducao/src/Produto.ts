class Produto{
    private _codigo : number;
    private _descricao : string;
    private _valor : number;

    constructor(codigo : number, descricao : string, valor : number)
    {
        this._codigo = codigo;
        this._descricao = descricao;
        this._valor = valor;
    }

    /**
     * Getter codigo
     * @return {number}
     */
	public get codigo(): number {
		return this._codigo;
	}

    /**
     * Getter descricao
     * @return {string}
     */
	public get descricao(): string {
		return this._descricao;
	}

    /**
     * Getter valor
     * @return {number}
     */
	public get valor(): number {
		return this._valor;
	}

    /**
     * Setter codigo
     * @param {number} value
     */
	public set codigo(value: number) {
		this._codigo = value;
	}

    /**
     * Setter descricao
     * @param {string} value
     */
	public set descricao(value: string) {
		this._descricao = value;
	}

    /**
     * Setter valor
     * @param {number} value
     */
	public set valor(value: number) {
		this._valor = value;
	}

}

export = Produto;