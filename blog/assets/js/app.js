// Carregamento dinâmico de configuração
let config = {};

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        setupSocialLinks();
        setupDescription();
    } catch (error) {
        console.error('Erro ao carregar config:', error);
    }
}

// Setup de links sociais
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const social = link.getAttribute('data-link');
        const url = config.social[social];
        if (url) {
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
}

// Setup de descrição
function setupDescription() {
    const descElement = document.getElementById('blog-description');
    if (descElement && config.description) {
        descElement.textContent = config.description;
    }
}

// Lista de posts - adicione manualmente aqui na ordem que deseja
const postsList = [
    'primeiro-post',
    'segundo-post',
    // Adicione mais posts aqui
];

// Carrega um arquivo markdown
async function loadPost(filename) {
    try {
        const response = await fetch(`posts/${filename}.md`);
        if (!response.ok) throw new Error(`Erro ao carregar: ${filename}`);
        
        const markdown = await response.text();
        return markdown;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

// Extrai metadados do markdown (formato YAML front matter)
function extractMetadata(markdown) {
    const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (match) {
        const metaStr = match[1];
        const content = match[2];
        
        const metadata = {};
        metaStr.split('\n').forEach(line => {
            const [key, ...value] = line.split(':');
            if (key && value.length) {
                metadata[key.trim()] = value.join(':').trim();
            }
        });
        
        return { metadata, content };
    }
    
    return { metadata: {}, content: markdown };
}

// Renderiza um post
function renderPost(filename, markdown) {
    const { metadata, content } = extractMetadata(markdown);
    
    const title = metadata.title || filename;
    const date = metadata.date || 'Data não especificada';
    const html = marked.parse(content);
    
    const postElement = document.createElement('article');
    postElement.className = 'post';
    postElement.innerHTML = `
        <div class="post-header">
            <h2 class="post-title">${escapeHtml(title)}</h2>
            <span class="post-date">${escapeHtml(date)}</span>
        </div>
        <div class="post-content">
            ${html}
        </div>
    `;
    
    return postElement;
}

// Escapa HTML para segurança
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Carrega todos os posts
async function loadAllPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';
    
    for (const filename of postsList) {
        const markdown = await loadPost(filename);
        if (markdown) {
            const postElement = renderPost(filename, markdown);
            container.appendChild(postElement);
        }
    }
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    loadAllPosts();
});
