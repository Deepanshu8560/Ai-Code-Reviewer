'use client';

import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
    code: string;
    language: string;
    readOnly?: boolean;
    highlightLines?: number[];
    onChange?: (value: string) => void;
    height?: string;
}

export function CodeEditor({
    code,
    language,
    readOnly = true,
    highlightLines = [],
    onChange,
    height = '500px',
}: CodeEditorProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        if (editorRef.current && highlightLines.length > 0) {
            const decorations = highlightLines.map(line => ({
                range: {
                    startLineNumber: line,
                    startColumn: 1,
                    endLineNumber: line,
                    endColumn: 1,
                },
                options: {
                    isWholeLine: true,
                    className: 'highlighted-line',
                    glyphMarginClassName: 'highlighted-glyph',
                },
            }));

            editorRef.current.createDecorationsCollection(decorations);
        }
    }, [highlightLines]);

    const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Editor
                height={height}
                language={language}
                value={code}
                onChange={(value) => onChange?.(value || '')}
                onMount={handleEditorDidMount}
                theme="vs-light"
                options={{
                    readOnly,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                }}
            />
            <style jsx global>{`
        .highlighted-line {
          background-color: rgba(255, 200, 0, 0.15);
        }
        .highlighted-glyph {
          background-color: rgba(255, 200, 0, 0.5);
          width: 5px !important;
          margin-left: 3px;
        }
      `}</style>
        </div>
    );
}
