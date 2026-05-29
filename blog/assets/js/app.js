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

// Lista de posts - adicione manualmente aqui.
// A exibição automaticamente mostra os posts mais recentes primeiro quando há metadata de data.
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

// Converte a data do metadata em objeto Date para ordenação
function parseDate(dateString) {
    if (!dateString) return null;

    const parsed = new Date(dateString);
    if (!isNaN(parsed)) return parsed;

    const regex = /(\d{1,2})\s*de\s*([A-Za-zçÇ]+),?\s*(\d{4})/i;
    const match = dateString.trim().match(regex);
    if (match) {
        const day = Number(match[1]);
        const monthName = match[2].toLowerCase();
        const year = Number(match[3]);
        const months = {
            janeiro: 0,
            fevereiro: 1,
            março: 2,
            abril: 3,
            maio: 4,
            junho: 5,
            julho: 6,
            agosto: 7,
            setembro: 8,
            outubro: 9,
            novembro: 10,
            dezembro: 11,
        };
        const month = months[monthName];
        if (month !== undefined) {
            return new Date(year, month, day);
        }
    }

    return null;
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

    const posts = [];
    for (const filename of postsList) {
        const markdown = await loadPost(filename);
        if (markdown) {
            const { metadata } = extractMetadata(markdown);
            posts.push({
                filename,
                markdown,
                date: parseDate(metadata.date),
            });
        }
    }

    posts.sort((a, b) => {
        if (a.date && b.date) return b.date - a.date;
        if (a.date) return -1;
        if (b.date) return 1;
        return 0;
    });

    for (const post of posts) {
        const postElement = renderPost(post.filename, post.markdown);
        container.appendChild(postElement);
    }
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    loadAllPosts();
});
