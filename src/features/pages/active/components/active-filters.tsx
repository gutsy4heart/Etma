'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { ActiveFilters, ActiveStats } from '@/features/interface/active';
import { Filter, X, BarChart3 } from 'lucide-react';

interface ActiveFiltersProps {
    filters: ActiveFilters;
    onFiltersChange: (filters: ActiveFilters) => void;
    stats: ActiveStats;
    onClearFilters: () => void;
}

export function ActiveFiltersComponent({ 
    filters, 
    onFiltersChange, 
    stats, 
    onClearFilters 
}: ActiveFiltersProps) {
    const [showFilters, setShowFilters] = useState(false);

    const handleFilterChange = (key: keyof ActiveFilters, value: string | boolean | undefined) => {
        onFiltersChange({
            ...filters,
            [key]: value,
        });
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

    return (
        <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="text-sm text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div>
                                <p className="text-sm text-gray-600">Overdue</p>
                                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2">
                            {Object.values(filters).filter(v => v !== undefined && v !== '').length}
                        </Badge>
                    )}
                </Button>
                
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={onClearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        Clear Filters
                    </Button>
                )}
            </div>

            {/* Filter Form */}
            {showFilters && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filter Active Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status-filter">Status</Label>
                                <Select 
                                    value={filters.status || 'all'} 
                                    onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All statuses</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority-filter">Priority</Label>
                                <Select 
                                    value={filters.priority || 'all'} 
                                    onValueChange={(value) => handleFilterChange('priority', value === 'all' ? undefined : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All priorities" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All priorities</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category-filter">Category</Label>
                                <Input
                                    id="category-filter"
                                    value={filters.category || ''}
                                    onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                                    placeholder="Filter by category"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="completed-filter">Completion</Label>
                                <Select 
                                    value={filters.isCompleted === undefined ? 'all' : filters.isCompleted.toString()} 
                                    onValueChange={(value) => {
                                        if (value === 'all') {
                                            handleFilterChange('isCompleted', undefined);
                                        } else {
                                            handleFilterChange('isCompleted', value === 'true');
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All items" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All items</SelectItem>
                                        <SelectItem value="false">Incomplete</SelectItem>
                                        <SelectItem value="true">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
