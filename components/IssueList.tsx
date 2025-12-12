'use client';

import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { IssueCard } from './IssueCard';
import { Badge } from './ui/badge';
import type { Issue, FilterOptions } from '@/types';
import { ISSUE_CATEGORIES, SEVERITY_LEVELS } from '@/lib/constants';

interface IssueListProps {
    issues: Issue[];
    onApplyFix?: (issueId: string, suggestion: string) => void;
}

export function IssueList({ issues, onApplyFix }: IssueListProps) {
    const [filters, setFilters] = useState<FilterOptions>({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredIssues = issues.filter(issue => {
        // Filter by severity
        if (filters.severity && filters.severity.length > 0) {
            if (!filters.severity.includes(issue.severity)) return false;
        }

        // Filter by category
        if (filters.category && filters.category.length > 0) {
            if (!filters.category.includes(issue.category)) return false;
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                issue.title.toLowerCase().includes(query) ||
                issue.description.toLowerCase().includes(query)
            );
        }

        return true;
    });

    const toggleSeverityFilter = (severity: Issue['severity']) => {
        setFilters(prev => {
            const current = prev.severity || [];
            const updated = current.includes(severity)
                ? current.filter(s => s !== severity)
                : [...current, severity];
            return { ...prev, severity: updated };
        });
    };

    const toggleCategoryFilter = (category: string) => {
        setFilters(prev => {
            const current = prev.category || [];
            const updated = current.includes(category)
                ? current.filter(c => c !== category)
                : [...current, category];
            return { ...prev, category: updated };
        });
    };

    const groupedIssues = {
        critical: filteredIssues.filter(i => i.severity === 'critical'),
        warning: filteredIssues.filter(i => i.severity === 'warning'),
        suggestion: filteredIssues.filter(i => i.severity === 'suggestion'),
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search issues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Filter badges */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Severity:</span>
                    {SEVERITY_LEVELS.map(level => (
                        <Badge
                            key={level.value}
                            variant={filters.severity?.includes(level.value) ? level.value as any : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleSeverityFilter(level.value)}
                        >
                            {level.label}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">Category:</span>
                    {ISSUE_CATEGORIES.map(cat => (
                        <Badge
                            key={cat.value}
                            variant={filters.category?.includes(cat.value) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleCategoryFilter(cat.value)}
                        >
                            {cat.label}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Issue count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing {filteredIssues.length} of {issues.length} issues
                </p>
            </div>

            {/* Grouped issues */}
            <div className="space-y-6">
                {groupedIssues.critical.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                            Critical Issues
                            <Badge variant="critical">{groupedIssues.critical.length}</Badge>
                        </h3>
                        <div className="space-y-3">
                            {groupedIssues.critical.map(issue => (
                                <IssueCard key={issue.id} issue={issue} onApplyFix={onApplyFix} />
                            ))}
                        </div>
                    </div>
                )}

                {groupedIssues.warning.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-amber-700 mb-3 flex items-center gap-2">
                            Warnings
                            <Badge variant="warning">{groupedIssues.warning.length}</Badge>
                        </h3>
                        <div className="space-y-3">
                            {groupedIssues.warning.map(issue => (
                                <IssueCard key={issue.id} issue={issue} onApplyFix={onApplyFix} />
                            ))}
                        </div>
                    </div>
                )}

                {groupedIssues.suggestion.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                            Suggestions
                            <Badge variant="suggestion">{groupedIssues.suggestion.length}</Badge>
                        </h3>
                        <div className="space-y-3">
                            {groupedIssues.suggestion.map(issue => (
                                <IssueCard key={issue.id} issue={issue} onApplyFix={onApplyFix} />
                            ))}
                        </div>
                    </div>
                )}

                {filteredIssues.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No issues found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
