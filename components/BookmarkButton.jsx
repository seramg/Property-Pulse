'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { toast } from 'react-toastify';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!userId) {
      toast.error(' You need to sign in to bookmark to the property')
      return
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          propertyId: property._id
        })
      })

      if (res.status == 200) {
        const data = await res.json();
        toast.success(data.message);
        console.log(data)
        setIsBookmarked(data.isBookmarked)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    if (!userId) { setLoading(false); return }

    const checkBookmarkStatus = async () => {

      try {
        setLoading(true)
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify({
            propertyId: property._id
          })
        })

        if (res.status == 200) {
          const data = await res.json();
          console.log(data)
          setIsBookmarked(data.isBookmarked)
        }
      }
      catch (error) {
        console.log(error)

      } finally {
        setLoading(false)
      }
    }

    checkBookmarkStatus()
  }, [property._id, userId])


  if (loading) return <p>Loading.. </p>

  return isBookmarked ? (<button className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}>
    <FaBookmark className="mr-2" /> Remove Bookmark
  </button>) : (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}>
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  )
}

export default BookmarkButton
