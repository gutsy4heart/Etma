"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCounter } from "@/features/store/use-counter";
import { useEffect, useState } from "react";
import { ReviewWithId } from "../../(withoutnav)/dashboard/reviews/schema";
import Link from "next/link";

// Type for API response that includes date fields
type ReviewApiResponse = ReviewWithId & {
  createdAt: string;
  updatedAt: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewApiResponse[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Link key={review.id} href={`/reviews/${review.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {review.rating}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed line-clamp-3">
                  {review.content}
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  Click to read full review
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {reviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No reviews yet</p>
        </div>
      )}
    </>
  );
}

