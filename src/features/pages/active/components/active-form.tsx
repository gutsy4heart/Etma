'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Active, CreateActiveRequest } from '@/features/interface/active';
import { X } from 'lucide-react';

interface ActiveFormProps {
    active?: Active | null;
    onSubmit: (data: CreateActiveRequest) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export function ActiveForm({ active, onSubmit, onCancel, isLoading = false }: ActiveFormProps) {
    const [formData, setFormData] = useState<CreateActiveRequest>({
        title: '',
        description: '',
        status: 'active',
        priority: 'medium',
        category: '',
        tags: '',
        dueDate: '',
        isCompleted: false,
    });

    useEffect(() => {
        if (active) {
            setFormData({
                title: active.title,
                description: active.description,
                status: active.status,
                priority: active.priority,
                category: active.category || '',
                tags: active.tags || '',
                dueDate: active.dueDate ? new Date(active.dueDate).toISOString().split('T')[0] : '',
                isCompleted: active.isCompleted,
            });
        }
    }, [active]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    const handleChange = (field: keyof CreateActiveRequest, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        {active ? 'Edit Active Item' : 'Create New Active Item'}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={onCancel}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Enter title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                placeholder="Enter category"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Enter description"
                            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => handleChange('dueDate', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            value={formData.tags}
                            onChange={(e) => handleChange('tags', e.target.value)}
                            placeholder="Enter tags separated by commas"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isCompleted"
                            checked={formData.isCompleted}
                            onChange={(e) => handleChange('isCompleted', e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <Label htmlFor="isCompleted">Mark as completed</Label>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : (active ? 'Update' : 'Create')}
                        </Button>
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
