import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Homepage() {

    const REVIEWS = gql`
        query GetReviews {
            reviews{
            id,
            name,
            content,
            rating,
            categories{
                id, name
            }
            }
        }
    `
    const { error, loading, data } = useQuery(REVIEWS);
    console.log(data)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error !!!</p>
    return (
        <div>
            {
                data.reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="rating">{review.rating}</div>
                        <h2>{review.name}</h2>
                        {review.categories.map(c => (
                            <small key={c.id}> {c.name}</small>
                        ))
                        }
                       <p>{review.content.substring(0, 200)}...</p>
                        <Link to={`/details/${review.id}`}>Read more</Link>
                    </div>
                ))
            }
        </div>

    )
}