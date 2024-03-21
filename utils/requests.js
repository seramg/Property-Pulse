
const fetchProperties = async () => {

    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

    try {
        if (!apiDomain) return []

        const res = await fetch(`${apiDomain}/properties`)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        else {
            return res.json();
        }
    } catch (error) { console.log(error); return [] }

}

const fetchPropertyById = async (id) => {

    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

    try {
        if (!apiDomain) return []

        const res = await fetch(`${apiDomain}/properties/${id}`)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        else {
            return res.json();
        }
    } catch (error) { console.log(error); return null }

}


export { fetchProperties, fetchPropertyById };