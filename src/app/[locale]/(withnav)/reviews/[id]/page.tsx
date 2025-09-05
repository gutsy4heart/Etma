"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ReviewApiResponse } from "../../../(withoutnav)/dashboard/reviews/schema";



export default function ReviewDetail() {
  const params = useParams();
  const router = useRouter();
  const [review, setReview] = useState<ReviewApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reviews/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError("Review not found");
          } else {
            setError("Failed to load review");
          }
          return;
        }
        
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error("Error fetching review:", error);
        setError("Failed to load review");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReview();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => router.push("/reviews")} variant="outline">
                Back to Reviews
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Review Not Found</h2>
              <p className="text-gray-600 mb-4">The review you're looking for doesn't exist.</p>
              <Button onClick={() => router.push("/reviews")} variant="outline">
                Back to Reviews
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button 
            onClick={() => router.push("/reviews")} 
            variant="outline"
            className="mb-4"
          >
            ← Back to Reviews
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl flex items-center gap-3">
              <span className="text-yellow-500 text-3xl">★</span>
              <span className="text-lg font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Rating: {review.rating}
              </span>
            </CardTitle>
            <div className="text-sm text-gray-500">
              Review ID: {review.id}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {review.content}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Created: {new Date(review.createdAt).toLocaleDateString()}</span>
                <span>Updated: {new Date(review.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
