import type { Issue } from '@/types';

interface Rule {
    id: string;
    name: string;
    category: Issue['category'];
    severity: Issue['severity'];
    pattern: RegExp | ((code: string) => boolean);
    message: string;
    explanation: string;
    documentationLinks?: string[];
}

export const REACT_RULES: Rule[] = [
    {
        id: 'missing-key-prop',
        name: 'Missing key prop in list',
        category: 'best-practices',
        severity: 'warning',
        pattern: /\.map\([^)]*=>\s*<[^>]*(?!key=)/,
        message: 'Missing key prop in mapped elements',
        explanation: 'When rendering lists in React, each element should have a unique key prop to help React identify which items have changed, been added, or removed.',
        documentationLinks: ['https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key'],
    },
    {
        id: 'inline-function-prop',
        name: 'Inline function in JSX',
        category: 'performance',
        severity: 'suggestion',
        pattern: /\s(onClick|onChange|onSubmit|onFocus|onBlur)=\{(\([^)]*\)|[^}]*)\s*=>/,
        message: 'Inline arrow function in JSX prop',
        explanation: 'Inline functions in JSX props create a new function on every render, which can cause unnecessary re-renders of child components. Consider using useCallback or defining the function outside the component.',
        documentationLinks: ['https://react.dev/reference/react/useCallback'],
    },
    {
        id: 'missing-dependency',
        name: 'Missing useEffect dependency',
        category: 'best-practices',
        severity: 'warning',
        pattern: /useEffect\(/,
        message: 'Potential missing dependency in useEffect',
        explanation: 'All values referenced inside useEffect should be included in the dependency array to avoid stale closures and bugs.',
        documentationLinks: ['https://react.dev/reference/react/useEffect#specifying-reactive-dependencies'],
    },
    {
        id: 'useState-object',
        name: 'Complex state object',
        category: 'best-practices',
        severity: 'suggestion',
        pattern: /useState\(\s*\{[^}]+\}\s*\)/,
        message: 'Consider splitting complex state objects',
        explanation: 'Using multiple useState calls for independent state values is often clearer than a single complex object. It also prevents unnecessary re-renders.',
        documentationLinks: ['https://react.dev/learn/choosing-the-state-structure'],
    },
];

export const SECURITY_RULES: Rule[] = [
    {
        id: 'dangerous-html',
        name: 'Dangerous HTML injection',
        category: 'security',
        severity: 'critical',
        pattern: /dangerouslySetInnerHTML/,
        message: 'Using dangerouslySetInnerHTML can expose your app to XSS attacks',
        explanation: 'This prop bypasses React\'s built-in XSS protection. Only use it with sanitized content from trusted sources.',
        documentationLinks: ['https://owasp.org/www-community/attacks/xss/', 'https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html'],
    },
    {
        id: 'exposed-api-key',
        name: 'Potential exposed API key',
        category: 'security',
        severity: 'critical',
        pattern: /(api[_-]?key|apikey|secret|token|password)\s*[:=]\s*['"][a-zA-Z0-9_-]{20,}['"]/i,
        message: 'Potential API key or secret exposed in code',
        explanation: 'Never hardcode API keys, secrets, or passwords in your code. Use environment variables instead.',
        documentationLinks: ['https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure'],
    },
    {
        id: 'eval-usage',
        name: 'Use of eval()',
        category: 'security',
        severity: 'critical',
        pattern: /\beval\s*\(/,
        message: 'Using eval() is dangerous and can lead to code injection',
        explanation: 'The eval() function executes arbitrary code and should be avoided. It can introduce security vulnerabilities and performance issues.',
        documentationLinks: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!'],
    },
];

export const ACCESSIBILITY_RULES: Rule[] = [
    {
        id: 'missing-alt-text',
        name: 'Missing alt text on image',
        category: 'accessibility',
        severity: 'warning',
        pattern: /<img(?![^>]*alt=)/,
        message: 'Image missing alt attribute',
        explanation: 'All images should have an alt attribute for screen readers. Use empty alt="" for decorative images.',
        documentationLinks: ['https://www.w3.org/WAI/tutorials/images/'],
    },
    {
        id: 'button-without-text',
        name: 'Button without accessible text',
        category: 'accessibility',
        severity: 'warning',
        pattern: /<button[^>]*>[\s]*<(?:svg|i|span class=["']icon)/,
        message: 'Button with icon but no accessible text',
        explanation: 'Buttons with only icons should include aria-label or visually hidden text for screen readers.',
        documentationLinks: ['https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'],
    },
    {
        id: 'missing-label',
        name: 'Form input without label',
        category: 'accessibility',
        severity: 'warning',
        pattern: /<input(?![^>]*aria-label)(?![^>]*id=["'][^"']*["'][^>]*)/,
        message: 'Form input should have an associated label',
        explanation: 'Every form input should have a label element or aria-label for accessibility.',
        documentationLinks: ['https://www.w3.org/WAI/tutorials/forms/labels/'],
    },
];

export const PERFORMANCE_RULES: Rule[] = [
    {
        id: 'large-bundle-import',
        name: 'Importing entire library',
        category: 'performance',
        severity: 'suggestion',
        pattern: /import\s+\*\s+as\s+\w+\s+from\s+['"](?:lodash|moment|date-fns)['"]/,
        message: 'Importing entire library increases bundle size',
        explanation: 'Import only the specific functions you need to reduce bundle size. For example, use "import debounce from \'lodash/debounce\'" instead of importing all of lodash.',
        documentationLinks: ['https://web.dev/reduce-javascript-payloads-with-tree-shaking/'],
    },
    {
        id: 'console-log',
        name: 'Console.log in production code',
        category: 'code-quality',
        severity: 'suggestion',
        pattern: /console\.(log|debug|info)/,
        message: 'Remove console statements before production',
        explanation: 'Console statements should be removed from production code as they can impact performance and expose sensitive information.',
    },
];

export const CSS_RULES: Rule[] = [
    {
        id: 'important-usage',
        name: 'Excessive use of !important',
        category: 'design-system',
        severity: 'suggestion',
        pattern: /!important/g,
        message: 'Avoid using !important',
        explanation: '!important makes CSS harder to maintain and override. Consider restructuring your CSS specificity instead.',
        documentationLinks: ['https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity'],
    },
    {
        id: 'inline-styles',
        name: 'Inline styles',
        category: 'design-system',
        severity: 'suggestion',
        pattern: /style=\{\{/,
        message: 'Consider using CSS classes instead of inline styles',
        explanation: 'Inline styles are harder to maintain and override. Use CSS classes or CSS-in-JS solutions for better maintainability.',
    },
];

export const ALL_RULES = [
    ...REACT_RULES,
    ...SECURITY_RULES,
    ...ACCESSIBILITY_RULES,
    ...PERFORMANCE_RULES,
    ...CSS_RULES,
];
