export interface Active {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'inactive' | 'pending' | 'completed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    tags?: string;
    dueDate?: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateActiveRequest {
    title: string;
    description: string;
    status?: 'active' | 'inactive' | 'pending' | 'completed';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    tags?: string;
    dueDate?: string;
    isCompleted?: boolean;
}

export interface UpdateActiveRequest extends CreateActiveRequest {
    id: number;
}

export interface ActiveFilters {
    status?: string;
    priority?: string;
    category?: string;
    isCompleted?: boolean;
}

export interface ActiveStats {
    total: number;
    active: number;
    completed: number;
    pending: number;
    overdue: number;
}
