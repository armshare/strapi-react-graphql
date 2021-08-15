import React from 'react'
import { useParams } from 'react-router'
import { useQuery, gql } from '@apollo/client';  
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const CATEGORY = gql`
query GetCategory($id: ID!){
    category(id: $id){
    name,
    id,
    reviews{
            name,
            content,
            rating,
            id,
            categories{
                name, id
            }
        }
    }
}
`

const Category = () => {

    const {id} = useParams()
    const {loading,error,data} = useQuery(CATEGORY, {
    variables : { id:id}
    })
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error !!!</p>
    console.log('category ' ,data.category)

    return (
        <div>
         <h2> {data.category.name}</h2>
         {
                data.category.reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="rating">{review.rating}</div>
                        <h2>{review.name}</h2>
                        {review.categories.map(c => (

                            <small key={c.id}> {c.name}</small>
                        ))}
                        <ReactMarkdown>{review.content.substring(0, 200)}...</ReactMarkdown>
                        <Link to={`/details/${review.id}`}>Read more</Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Category
