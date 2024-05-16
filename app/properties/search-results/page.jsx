'use client'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import Link from 'next/link'


const SearchResults = () => {

    const searchParams = useSearchParams()
    const location = searchParams.get('location')
    const propertyType = searchParams.get('propertyType')

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`)

                if (res.status === 200) {
                    const data = await res.json()
                    setProperties(data)
                }
                else {
                    setProperties([])
                }


            } catch (error) {
                console.log(error);

            } finally { setLoading(false) }
        }
        fetchSearchResults()
    }, [location, propertyType])


    return loading ? (
        <Spinner loading={loading} />
    ) : (<section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
                <Link href='/properties' className='flex items text-blue-500 hover:underline mb-3'>
                    <FaArrowCircleLeft className='mr-2 mb-1'></FaArrowCircleLeft>
            </Link>
            <h1 className="text-2xl mb-4">Searched Properties</h1>
            {properties.length === 0 ? <p>No search results found</p> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property, index) =>
                    <PropertyCard key={index} property={property} />
                )}
            </div>}
        </div></section>)
}

export default SearchResults;
