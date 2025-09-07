'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Active } from '@/features/interface/active';
import { Edit, Trash2, CheckCircle, Circle, Calendar, Tag } from 'lucide-react';

interface ActiveCardProps {
    active: Active;
    onEdit: (active: Active) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number, isCompleted: boolean) => void;
}

export function ActiveCard({ active, onEdit, onDelete, onToggleComplete }: ActiveCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

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

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString();
    };

    const isOverdue = (dateString?: string) => {
        if (!dateString) return false;
        return new Date(dateString) < new Date() && !active.isCompleted;
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(active.id);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card className={`transition-all duration-200 hover:shadow-md ${active.isCompleted ? 'opacity-75' : ''}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleComplete(active.id, !active.isCompleted)}
                            className="p-0 h-auto"
                        >
                            {active.isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                                <Circle className="h-5 w-5 text-gray-400" />
                            )}
                        </Button>
                        <CardTitle className={`text-lg ${active.isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {active.title}
                        </CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(active)}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <p className={`text-sm text-gray-600 mb-3 ${active.isCompleted ? 'line-through' : ''}`}>
                    {active.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={getPriorityColor(active.priority)}>
                        {active.priority}
                    </Badge>
                    <Badge variant={getStatusColor(active.status)}>
                        {active.status}
                    </Badge>
                    {active.category && (
                        <Badge variant="outline">
                            <Tag className="h-3 w-3 mr-1" />
                            {active.category}
                        </Badge>
                    )}
                </div>

                {active.dueDate && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className={isOverdue(active.dueDate) ? 'text-red-500 font-medium' : ''}>
                            Due: {formatDate(active.dueDate)}
                            {isOverdue(active.dueDate) && ' (Overdue)'}
                        </span>
                    </div>
                )}

                {active.tags && (
                    <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                            {active.tags.split(',').map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {tag.trim()}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
