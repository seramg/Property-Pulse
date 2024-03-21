'use client';
import React from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

const PropertyPage = () => {

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get('name')
  const pathname = usePathname();

  console.log('hello')
  return (
    <div>
      <button onClick={() => router.push('/')} className="bg-blue-500 p-2">go home{ params.id}</button>
      {name}, you are at {pathname}
    </div>
  )
}

export default PropertyPage
