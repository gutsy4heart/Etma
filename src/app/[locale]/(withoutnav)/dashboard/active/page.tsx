'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActiveCard } from '@/features/pages/active/components/active-card';
import { ActiveForm } from '@/features/pages/active/components/active-form';
import { ActiveFiltersComponent } from '@/features/pages/active/components/active-filters';
import { Active, CreateActiveRequest, ActiveFilters, ActiveStats } from '@/features/interface/active';
import { Plus, Search } from 'lucide-react';

export default function ActivePage() {
    const [activeItems, setActiveItems] = useState<Active[]>([]);
    const [filteredItems, setFilteredItems] = useState<Active[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingActive, setEditingActive] = useState<Active | null>(null);
    const [filters, setFilters] = useState<ActiveFilters>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState<ActiveStats>({
        total: 0,
        active: 0,
        completed: 0,
        pending: 0,
        overdue: 0,
    });

    // Fetch active items
    const fetchActiveItems = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/active');
            if (response.ok) {
                const data = await response.json();
                setActiveItems(data);
                setFilteredItems(data);
                calculateStats(data);
            }
        } catch (error) {
            console.error('Error fetching active items:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate statistics
    const calculateStats = (items: Active[]) => {
        const now = new Date();
        const stats: ActiveStats = {
            total: items.length,
            active: items.filter(item => item.status === 'active').length,
            completed: items.filter(item => item.isCompleted).length,
            pending: items.filter(item => item.status === 'pending').length,
            overdue: items.filter(item => 
                item.dueDate && 
                new Date(item.dueDate) < now && 
                !item.isCompleted
            ).length,
        };
        setStats(stats);
    };

    // Apply filters and search
    const applyFilters = () => {
        let filtered = [...activeItems];

        // Apply search
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.tags && item.tags.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply filters
        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status);
        }
        if (filters.priority) {
            filtered = filtered.filter(item => item.priority === filters.priority);
        }
        if (filters.category) {
            filtered = filtered.filter(item => 
                item.category && item.category.toLowerCase().includes(filters.category!.toLowerCase())
            );
        }
        if (filters.isCompleted !== undefined) {
            filtered = filtered.filter(item => item.isCompleted === filters.isCompleted);
        }

        setFilteredItems(filtered);
    };

    // Create new active item
    const handleCreate = async (data: CreateActiveRequest) => {
        try {
            const response = await fetch('/api/active', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchActiveItems();
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error creating active item:', error);
        }
    };

    // Update active item
    const handleUpdate = async (data: CreateActiveRequest) => {
        if (!editingActive) return;

        try {
            const response = await fetch(`/api/active/${editingActive.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchActiveItems();
                setEditingActive(null);
            }
        } catch (error) {
            console.error('Error updating active item:', error);
        }
    };

    // Delete active item
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/active/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchActiveItems();
            }
        } catch (error) {
            console.error('Error deleting active item:', error);
        }
    };

    // Toggle completion status
    const handleToggleComplete = async (id: number, isCompleted: boolean) => {
        try {
            const activeItem = activeItems.find(item => item.id === id);
            if (!activeItem) return;

            const response = await fetch(`/api/active/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...activeItem,
                    isCompleted,
                }),
            });

            if (response.ok) {
                await fetchActiveItems();
            }
        } catch (error) {
            console.error('Error toggling completion:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (data: CreateActiveRequest) => {
        if (editingActive) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }
    };

    // Clear filters
    const handleClearFilters = () => {
        setFilters({});
        setSearchTerm('');
    };

    useEffect(() => {
        fetchActiveItems();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [activeItems, filters, searchTerm]);

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Active Items</h1>
                <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Item
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search active items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Filters and Stats */}
            <ActiveFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                stats={stats}
                onClearFilters={handleClearFilters}
            />

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <ActiveForm
                            active={editingActive}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingActive(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Active Items Grid */}
            {filteredItems.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-500 text-lg">
                            {activeItems.length === 0 
                                ? "No active items yet. Create your first item!" 
                                : "No items match your current filters."
                            }
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((active) => (
                        <ActiveCard
                            key={active.id}
                            active={active}
                            onEdit={(active) => {
                                setEditingActive(active);
                                setShowForm(true);
                            }}
                            onDelete={handleDelete}
                            onToggleComplete={handleToggleComplete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
