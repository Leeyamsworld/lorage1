function renderCommentShortcodes() {
    const registry = {
        '1-lw:link':   `<a href="`,
        '2-lw:link':     `">`,
         '3-lw:link':   `</a>`,
      '1-lw:audio': `<audio controls><source src="`,
      '2-lw:audio': `"></audio>`,
      '1-lw:video': `<video controls><source src="`,
      '2-lw:video': `"></video>`,
      '1-lw:image': `<img src="`,
      '2-lw:image': `">`
    };

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT, null, false);
    const targets = [];
    let node = walker.nextNode();
    
    while (node) {
        const tag = node.nodeValue.trim();
        if (registry[tag]) {
            targets.push({ commentNode: node, htmlContent: registry[tag] });
        }
        node = walker.nextNode();
    }

    targets.forEach(({ commentNode, htmlContent }) => {
        const fragment = document.createRange().createContextualFragment(htmlContent);
        commentNode.replaceWith(fragment);
    });
}

document.readyState === 'loading' 
    ? document.addEventListener('DOMContentLoaded', renderCommentShortcodes) 
    : renderCommentShortcodes();
