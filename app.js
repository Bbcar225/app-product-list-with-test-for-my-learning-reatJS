const PRODUCTS = [
	{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football", id:"0"},
	{category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball", id:"1"},
	{category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball", id:"2"},
	{category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch", id:"3"},
	{category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5", id:"4"},
	{category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7", id:"5"}
];

function ProductRow ({product})
{
    return <tr>
        <td className={product.stocked ? '' : 'text text-danger'}>{product.name}</td>
        <td>{product.price}</td>
    </tr>;
}

function ProductCategoryRow ({category})
{
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>;
}

function ProductsTable ({products, filterText, inStockOnly})
{
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if (inStockOnly && !product.stocked){ return }

        if (product.name.indexOf(filterText) === -1) { return}

        if (product.category !== lastCategory)
        {
            lastCategory = product.category;
            rows.push(<ProductCategoryRow key={lastCategory} category={product.category} />);
        }
        rows.push(<ProductRow key={product.id} product={product} />);
    });

    return <div className="table-responsive-sm">
        <table className="table table-bordered table-hover table-striped table-sm">
            <thead className="bg-secondary">
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prix</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    </div>;
}

class SearchBar extends React.Component
{
    constructor (props)
    {
        super(props);
        this.handlerFilterTextChange = this.handlerFilterTextChange.bind(this);
        this.handlerInStockChange = this.handlerInStockChange.bind(this);
    }

    handlerFilterTextChange (e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handlerInStockChange (e)
    {
        this.props.onStocktChange(e.target.checked);
    }

    render ()
    {
        const {filterText, inStockOnly} = this.props;

        return <div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Recherche..." value={filterText} onChange={this.handlerFilterTextChange} />
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="stock" checked={inStockOnly} onChange={this.handlerInStockChange} />
                    <label htmlFor="stock" className="form-check-label">Produit en stock seulement</label>
                </div>
            </div>
        </div>;
    }
}

class FilterableProductTable extends React.Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        this.handlerFilterTextChange = this.handlerFilterTextChange.bind(this);
        this.handlerInStockChange = this.handlerInStockChange.bind(this);
    }

    handlerFilterTextChange (filterText)
    {
        this.setState({filterText});
    }

    handlerInStockChange (inStockOnly)
    {
        this.setState({inStockOnly});
    }

	render ()
	{
        const {products} = this.props;
        
		return <React.Fragment>
            <SearchBar 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handlerFilterTextChange}
                onStocktChange={this.handlerInStockChange}
            />
            <ProductsTable products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>;
	}
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('app'));