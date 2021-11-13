import { useParams, useHistory } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
//styles
import { useEffect } from 'react';

import './Recipe.css';

const Recipe = () => {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;
  const { data: recipe, isPending, error } = useFetch(url);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      // redirect
      //history.goBack()
      setTimeout(() => {
        history.push('/');
      }, 2000);
    }
  }, [error, history]);

  return (
    <div className="recipe">
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
