// Configure marked.js for better rendering
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
    });
}

// Document titles mapping
const documentTitles = {
    'fault-tolert.md': 'Multi-Region AWS Infrastructure',
    'Velocity.md': 'Project Velocity: Application and Infrastructure Modernization on EKS',
    'DMS.md': 'DMS Platform Infrastructure Automation',
    'CaptionCraft.md': 'CaptionCraft - AI Caption Generator'
};

// Load and display a markdown document
async function loadDocument(filename) {
    try {
        // Show loading state
        const viewer = document.getElementById('document-viewer');
        const content = document.getElementById('document-content');
        const title = document.getElementById('document-title');
        
        viewer.classList.remove('hidden');
        content.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading...</div>';
        title.textContent = documentTitles[filename] || filename;
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Fetch the markdown file
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}: ${response.statusText}`);
        }
        
        const markdown = await response.text();
        
        // Convert markdown to HTML
        if (typeof marked !== 'undefined') {
            const html = marked.parse(markdown);
            content.innerHTML = html;
        } else {
            // Fallback if marked.js didn't load
            content.innerHTML = `<pre>${escapeHtml(markdown)}</pre>`;
        }
        
    } catch (error) {
        console.error('Error loading document:', error);
        const content = document.getElementById('document-content');
        content.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #dc2626;">
                <h3>Error loading document</h3>
                <p>${error.message}</p>
                <button onclick="closeDocument()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Go Back
                </button>
            </div>
        `;
    }
}

// Close the document viewer
function closeDocument() {
    const viewer = document.getElementById('document-viewer');
    viewer.classList.add('hidden');
    document.getElementById('document-content').innerHTML = '';
    // Update history
    history.pushState({ view: 'home' }, '', window.location.pathname);
}

// Make functions available globally
window.loadDocument = loadDocument;
window.closeDocument = closeDocument;

// Escape HTML to prevent XSS (fallback)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle browser back button
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.view === 'home') {
        closeDocument();
    }
});

// Update URL when viewing document (optional, for better UX)
function loadDocumentWithHistory(filename) {
    history.pushState({ view: 'document', file: filename }, '', `#${filename}`);
    loadDocument(filename);
}

// Make loadDocumentWithHistory available globally
window.loadDocumentWithHistory = loadDocumentWithHistory;

// Handle hash changes
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1);
    if (hash && documentTitles[hash]) {
        loadDocument(hash);
    }
});

// Check for hash on page load
window.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.slice(1);
    if (hash && documentTitles[hash]) {
        loadDocument(hash);
    }
});

