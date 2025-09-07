'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Active } from '@/features/interface/active';
import { CheckCircle, Clock, AlertTriangle, Plus, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

export default function ActivePage() {
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
                setActiveItems(data);
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'default';
            case 'completed': return 'secondary';
            case 'pending': return 'outline';
            case 'inactive': return 'destructive';
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
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading active items...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Active Items
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Track and manage your active projects, tasks, and goals in one place.
                </p>
                <Link href="/dashboard/active">
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Manage Active Items
                    </Button>
                </Link>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeItems.map((item) => (
                        <Card key={item.id} className={`hover:shadow-lg transition-shadow ${item.isCompleted ? 'opacity-75' : ''}`}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        {item.isCompleted ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <Clock className="h-5 w-5 text-gray-400" />
                                        )}
                                        <CardTitle className={`text-lg ${item.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                            {item.title}
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className={`text-sm text-gray-600 mb-4 ${item.isCompleted ? 'line-through' : ''}`}>
                                    {item.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant={getPriorityColor(item.priority)}>
                                        {item.priority}
                                    </Badge>
                                    <Badge variant={getStatusColor(item.status)}>
                                        {item.status}
                                    </Badge>
                                    {item.category && (
                                        <Badge variant="outline">
                                            <Tag className="h-3 w-3 mr-1" />
                                            {item.category}
                                        </Badge>
                                    )}
                                </div>

                                {item.dueDate && (
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                        <Calendar className="h-4 w-4" />
                                        <span className={isOverdue(item.dueDate) && !item.isCompleted ? 'text-red-500 font-medium' : ''}>
                                            Due: {formatDate(item.dueDate)}
                                            {isOverdue(item.dueDate) && !item.isCompleted && ' (Overdue)'}
                                        </span>
                                    </div>
                                )}

                                {item.tags && (
                                    <div className="flex flex-wrap gap-1">
                                        {item.tags.split(',').map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {tag.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
