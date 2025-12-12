export interface CodeFile {
    id: string;
    name: string;
    content: string;
    language: string;
    size: number;
}

export interface Issue {
    id: string;
    title: string;
    description: string;
    severity: 'critical' | 'warning' | 'suggestion';
    category: 'performance' | 'accessibility' | 'security' | 'code-quality' | 'best-practices' | 'design-system';
    line: number;
    column?: number;
    endLine?: number;
    code: string;
    suggestion?: string;
    explanation?: string;
    documentationLinks?: string[];
    language: string;
}

export interface AnalysisResult {
    fileId: string;
    fileName: string;
    issues: Issue[];
    metrics: {
        totalIssues: number;
        criticalCount: number;
        warningCount: number;
        suggestionCount: number;
        qualityScore: number;
    };
    analyzedAt: Date;
}

export interface FilterOptions {
    severity?: ('critical' | 'warning' | 'suggestion')[];
    category?: string[];
    searchQuery?: string;
}

export interface SortOption {
    field: 'severity' | 'line' | 'category';
    direction: 'asc' | 'desc';
}

export interface ReviewState {
    files: CodeFile[];
    currentFileId: string | null;
    analysisResults: Record<string, AnalysisResult>;
    selectedIssueId: string | null;
    filters: FilterOptions;
    sortBy: SortOption;
    isAnalyzing: boolean;
    error: string | null;
}
