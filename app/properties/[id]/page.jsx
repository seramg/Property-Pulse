"use client";
import React, { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { fetchPropertyById } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const property = await fetchPropertyById(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };
    if (!property) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl mt-5 font-bold">
        Property not found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButton property  = {property} />

                  {/* <!-- Contact Form --> */}
                <PropertyContactForm property={property}/>
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
