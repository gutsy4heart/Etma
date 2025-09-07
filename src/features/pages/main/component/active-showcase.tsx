'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Active } from '@/features/interface/active';
import { CheckCircle, Clock, AlertTriangle, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ActiveShowcase() {
    const [activeItems, setActiveItems] = useState<Active[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveItems();
    }, []);

    const fetchActiveItems = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/active');
            if (response.ok) {
                const data = await response.json();
                // Get only active (not completed) items, limit to 6
                const active = data
                    .filter((item: Active) => !item.isCompleted && item.status === 'active')
                    .slice(0, 6);
                setActiveItems(active);
            }
        } catch (error) {
            console.error('Error fetching active items:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'destructive';
            case 'high': return 'destructive';
            case 'medium': return 'default';
            case 'low': return 'secondary';
            default: return 'default';
        }
    };

    const isOverdue = (dateString?: string) => {
        if (!dateString) return false;
        return new Date(dateString) < new Date();
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="text-lg">Loading active items...</div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Active Projects & Tasks
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay organized and track your progress with our active task management system.
                    </p>
                </div>

                {activeItems.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg border p-8 max-w-md mx-auto">
                            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No Active Items
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start creating your first active item to get organized.
                            </p>
                            <Link href="/dashboard/active">
                                <Button className="flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Create First Item
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {activeItems.map((item) => (
                                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg line-clamp-2">
                                                {item.title}
                                            </CardTitle>
                                            <Badge variant={getPriorityColor(item.priority)}>
                                                {item.priority}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {item.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.category && (
                                                <Badge variant="outline" className="text-xs">
                                                    {item.category}
                                                </Badge>
                                            )}
                                            {item.dueDate && (
                                                <div className={`text-xs px-2 py-1 rounded ${
                                                    isOverdue(item.dueDate) 
                                                        ? 'bg-red-100 text-red-700' 
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    Due: {formatDate(item.dueDate)}
                                                    {isOverdue(item.dueDate) && ' (Overdue)'}
                                                </div>
                                            )}
                                        </div>

                                        {item.tags && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {item.tags.split(',').slice(0, 3).map((tag, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {tag.trim()}
                                                    </Badge>
                                                ))}
                                                {item.tags.split(',').length > 3 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{item.tags.split(',').length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link href="/dashboard/active">
                                <Button variant="outline" size="lg" className="flex items-center gap-2">
                                    View All Active Items
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
