import { create } from 'zustand';
import type { CodeFile, AnalysisResult, FilterOptions, SortOption, ReviewState } from '@/types';

interface ReviewStore extends ReviewState {
    // File actions
    addFile: (file: CodeFile) => void;
    removeFile: (fileId: string) => void;
    setCurrentFile: (fileId: string | null) => void;
    clearFiles: () => void;

    // Analysis actions
    setAnalysisResult: (fileId: string, result: AnalysisResult) => void;
    setIsAnalyzing: (isAnalyzing: boolean) => void;
    setError: (error: string | null) => void;

    // UI actions
    setSelectedIssue: (issueId: string | null) => void;
    setFilters: (filters: FilterOptions) => void;
    setSortBy: (sortBy: SortOption) => void;

    // Utility actions
    reset: () => void;
}

const initialState: ReviewState = {
    files: [],
    currentFileId: null,
    analysisResults: {},
    selectedIssueId: null,
    filters: {},
    sortBy: { field: 'severity', direction: 'desc' },
    isAnalyzing: false,
    error: null,
};

export const useReviewStore = create<ReviewStore>((set) => ({
    ...initialState,

    addFile: (file) => set((state) => ({
        files: [...state.files, file],
        currentFileId: file.id,
    })),

    removeFile: (fileId) => set((state) => {
        const newFiles = state.files.filter(f => f.id !== fileId);
        const newResults = { ...state.analysisResults };
        delete newResults[fileId];

        return {
            files: newFiles,
            analysisResults: newResults,
            currentFileId: state.currentFileId === fileId
                ? (newFiles[0]?.id || null)
                : state.currentFileId,
        };
    }),

    setCurrentFile: (fileId) => set({ currentFileId: fileId }),

    clearFiles: () => set({
        files: [],
        currentFileId: null,
        analysisResults: {},
        selectedIssueId: null,
    }),

    setAnalysisResult: (fileId, result) => set((state) => ({
        analysisResults: {
            ...state.analysisResults,
            [fileId]: result,
        },
    })),

    setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),

    setError: (error) => set({ error }),

    setSelectedIssue: (issueId) => set({ selectedIssueId: issueId }),

    setFilters: (filters) => set({ filters }),

    setSortBy: (sortBy) => set({ sortBy }),

    reset: () => set(initialState),
}));
