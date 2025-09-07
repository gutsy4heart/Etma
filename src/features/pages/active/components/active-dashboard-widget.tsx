'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Active, ActiveStats } from '@/features/interface/active';
import { Plus, CheckCircle, Clock, AlertTriangle, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export function ActiveDashboardWidget() {
    const [recentActive, setRecentActive] = useState<Active[]>([]);
    const [stats, setStats] = useState<ActiveStats>({
        total: 0,
        active: 0,
        completed: 0,
        pending: 0,
        overdue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveData();
    }, []);

    const fetchActiveData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/active');
            if (response.ok) {
                const data = await response.json();
                
                // Get recent 5 items
                const recent = data.slice(0, 5);
                setRecentActive(recent);
                
                // Calculate stats
                const now = new Date();
                const stats: ActiveStats = {
                    total: data.length,
                    active: data.filter((item: Active) => item.status === 'active').length,
                    completed: data.filter((item: Active) => item.isCompleted).length,
                    pending: data.filter((item: Active) => item.status === 'pending').length,
                    overdue: data.filter((item: Active) => 
                        item.dueDate && 
                        new Date(item.dueDate) < now && 
                        !item.isCompleted
                    ).length,
                };
                setStats(stats);
            }
        } catch (error) {
            console.error('Error fetching active data:', error);
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

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Active Items
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-4">Loading...</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Active Items
                    </CardTitle>
                    <Link href="/dashboard/active">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                        <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                        <div className="text-sm text-gray-600">Overdue</div>
                    </div>
                </div>

                {/* Recent Items */}
                {recentActive.length > 0 ? (
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">Recent Items</h4>
                        {recentActive.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        {item.isCompleted ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Clock className="h-4 w-4 text-gray-400" />
                                        )}
                                        <span className={`text-sm font-medium ${item.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={getPriorityColor(item.priority)} className="text-xs">
                                            {item.priority}
                                        </Badge>
                                        {item.dueDate && isOverdue(item.dueDate) && !item.isCompleted && (
                                            <Badge variant="destructive" className="text-xs flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                Overdue
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        <p className="text-sm">No active items yet</p>
                        <Link href="/dashboard/active">
                            <Button variant="outline" size="sm" className="mt-2">
                                Create your first item
                            </Button>
                        </Link>
                    </div>
                )}

                {/* View All Link */}
                {recentActive.length > 0 && (
                    <div className="pt-2 border-t">
                        <Link href="/dashboard/active">
                            <Button variant="ghost" size="sm" className="w-full">
                                View All Active Items
                            </Button>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
