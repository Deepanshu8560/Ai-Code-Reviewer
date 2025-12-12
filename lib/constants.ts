export const SUPPORTED_LANGUAGES = [
    { value: 'javascript', label: 'JavaScript', extensions: ['.js', '.jsx'] },
    { value: 'typescript', label: 'TypeScript', extensions: ['.ts', '.tsx'] },
    { value: 'css', label: 'CSS', extensions: ['.css'] },
    { value: 'scss', label: 'SCSS', extensions: ['.scss'] },
    { value: 'html', label: 'HTML', extensions: ['.html'] },
] as const;

export const ISSUE_CATEGORIES = [
    { value: 'performance', label: 'Performance', icon: 'Zap' },
    { value: 'accessibility', label: 'Accessibility', icon: 'Eye' },
    { value: 'security', label: 'Security', icon: 'Shield' },
    { value: 'code-quality', label: 'Code Quality', icon: 'Code' },
    { value: 'best-practices', label: 'Best Practices', icon: 'CheckCircle' },
    { value: 'design-system', label: 'Design System', icon: 'Palette' },
] as const;

export const SEVERITY_LEVELS = [
    { value: 'critical', label: 'Critical', color: 'red' },
    { value: 'warning', label: 'Warning', color: 'amber' },
    { value: 'suggestion', label: 'Suggestion', color: 'blue' },
] as const;

export const DOCUMENTATION_LINKS = {
    react: 'https://react.dev/reference/react',
    hooks: 'https://react.dev/reference/react/hooks',
    accessibility: 'https://www.w3.org/WAI/WCAG21/quickref/',
    mdn: 'https://developer.mozilla.org/en-US/',
    owasp: 'https://owasp.org/www-project-top-ten/',
    performance: 'https://web.dev/performance/',
    tailwind: 'https://tailwindcss.com/docs',
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [
    'text/javascript',
    'text/typescript',
    'text/css',
    'text/html',
    'application/javascript',
    'application/typescript',
];
