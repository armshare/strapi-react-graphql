import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'


const CATEGORIES = gql`
query GetCategories {
    categories{ 
        name,
        id
    }
}
`
const SiteHeader = () => {
    const { loading, error, data } = useQuery(CATEGORIES);

    if (loading) return <p>Loading category...</p>
    if (error) return <p>Error category!!!</p>
    console.log(data)

    return (
        <div className="site-header">
           
            <Link to="/">
                <h1>Strapi-Reviews</h1>
            </Link>
            <nav className="categories">
                <span>Filter review by category:</span>
                {data.categories.map(category => (
                    <Link key={category.id} to={`/category/${category.id}`}>{category.name}</Link>
                ))}
            </nav>
        </div>
    )
}

export default SiteHeader
