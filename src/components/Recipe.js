import React, {Component} from 'react'
import style from './Recipes.module.css'

class Recipe extends Component{
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }
    state = {
        activeRecipe: [{recipe: {ingredients: []}}],
        Application_ID: '3294b6c1',
        Application_Keys: '8d0474f1da774c34ea0fc46577052250',
        HTTPRequestValue: '',
        HTTP_RequestUrl: '',
    }

    componentDidMount = async () =>{
        const recipeName = this.props.location.state.recipe;

        console.log(this.props.location.state.recipe);

        const HTTP_RequestUrl = 
         `https://api.edamam.com/search?q=${recipeName}&app_id=${this.state.Application_ID}&app_key=${this.state.Application_Keys}`;
        this.setState({HTTP_RequestUrl: HTTP_RequestUrl});
        
        const req = await fetch(HTTP_RequestUrl);
        const res = await req.json();
        this.setState({activeRecipe: res.hits});
        console.log(this.state.activeRecipe)
    }

    goBack(){ this.props.history.push('/'+this.props.location.state.search) }

    render() {
        console.log(this.state.activeRecipe[0].recipe.ingredients)
        return ( 
            <div className={style.recipe}>
            <div className='container'>
                {this.state.activeRecipe.length !== 0 &&
                <div className='active-recipe'>
                    <img className='image'
                        src={this.state.activeRecipe[0].recipe.image} alt={this.state.activeRecipe[0].recipe.label}/>
                    <h3 className='active-recipe__title'>
                        {this.state.activeRecipe[0].recipe.label}</h3>
                    <p className='active-recipe__calories'>Calories: {this.state.activeRecipe[0].recipe.calories}</p>
                    <p className='active-recipe__source'>
                        Source: <span>{this.state.activeRecipe[0].recipe.source}</span></p>
                    <p className='active-recipe__website'>
                        <span><a href={this.state.activeRecipe[0].recipe.url}>Website</a></span></p>
                        <ul>
                            {this.state.activeRecipe[0].recipe.ingredients.map((ingredient, index) =>(
                                <li key={ingredient.text+index}>{ingredient.text}</li>
                            ))}
                        </ul>
                    <button className='active-recipe__button' onClick={()=>this.goBack()}>
                        Back</button>
                </div>
                }
            </div>  
            </div> 
        );
    }
}
export default Recipe;