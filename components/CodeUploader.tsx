'use client';

import { useCallback } from 'react';
import { Upload, X, FileCode } from 'lucide-react';
import { useReviewStore } from '@/store/review-store';
import { detectLanguage } from '@/lib/utils';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { CodeFile } from '@/types';

export function CodeUploader() {
    const { files, addFile, removeFile } = useReviewStore();

    const handleFileUpload = useCallback(async (uploadedFiles: FileList | null) => {
        if (!uploadedFiles) return;

        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            const content = await file.text();
            const language = detectLanguage(file.name);

            const codeFile: CodeFile = {
                id: `${file.name}-${Date.now()}-${i}`,
                name: file.name,
                content,
                language,
                size: file.size,
            };

            addFile(codeFile);
        }
    }, [addFile]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        handleFileUpload(e.dataTransfer.files);
    }, [handleFileUpload]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    return (
        <div className="space-y-4">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors bg-gradient-to-br from-gray-50 to-white"
            >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop your code files here
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    or click to browse
                </p>
                <input
                    type="file"
                    multiple
                    accept=".js,.jsx,.ts,.tsx,.css,.scss,.html"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-10 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
                >
                    Select Files
                </label>
                <p className="text-xs text-gray-500 mt-4">
                    Supports: JavaScript, TypeScript, React, CSS, HTML
                </p>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Uploaded Files</h4>
                    {files.map((file) => (
                        <Card key={file.id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileCode className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-sm">{file.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {file.language} • {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFile(file.id)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
