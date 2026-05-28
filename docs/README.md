# Terminal Blog - GitHub Pages

Um blog minimalista estilo terminal Unix, otimizado para GitHub Pages.

## 🚀 Características

- ✨ Design terminal Unix preto com texto verde
- 📝 Posts em Markdown puro
- 🎨 Totalmente customizável com CSS
- 🔗 Links para redes sociais (Twitter, TikTok, Instagram, Livepix)
- 🎬 Suporte para embedar vídeos do YouTube
- 🖼️ Suporte para imagens
- ⚡ Otimizado e leve
- 📱 Responsivo (mobile-friendly)

## 📁 Estrutura

```
blog/
├── index.html           # Página principal
├── config.json          # Configurações (links sociais)
├── README.md            # Este arquivo
├── posts/               # Pasta com posts em markdown
│   ├── primeiro-post.md
│   └── segundo-post.md
└── assets/
    ├── css/
    │   └── style.css    # Estilos do blog
    └── js/
        └── app.js       # JavaScript para carregar posts
```

## ⚙️ Setup GitHub Pages

1. Crie um repositório chamado `seu-usuario.github.io`
2. Copie o conteúdo desta pasta para o repositório
3. Faça commit e push
4. Seu blog estará disponível em `https://seu-usuario.github.io`

## ✍️ Como Adicionar Posts

### 1. Criar um novo post

Crie um arquivo markdown em `posts/nome-do-post.md`:

```markdown
---
title: Título do Post
date: Data do Post
---

# Seu conteúdo aqui

Você pode usar **markdown** completo.
```

### 2. Registrar o post

Abra `assets/js/app.js` e adicione o arquivo à lista `postsList`:

```javascript
const postsList = [
    'primeiro-post',
    'segundo-post',
    'seu-novo-post',  // ← Adicione aqui
];
```

## 🎨 Customização

### Cores

Edite as variáveis CSS em `assets/css/style.css`:

```css
:root {
    --bg-color: #000000;      /* Cor de fundo */
    --text-color: #00ff00;    /* Cor do texto */
    --text-dim: #00aa00;      /* Cor secundária */
    --border-color: #003300;  /* Cor das bordas */
}
```

### Links Sociais

Edite `config.json`:

```json
{
    "social": {
        "twitter": "https://twitter.com/seu-usuario",
        "tiktok": "https://tiktok.com/@seu-usuario",
        "instagram": "https://instagram.com/seu-usuario",
        "livepix": "https://livepix.gg/seu-usuario"
    }
}
```

## 🎬 Embedar Vídeos

### YouTube

No seu post markdown, adicione:

```html
<iframe width="100%" height="400" 
        src="https://www.youtube.com/embed/ID_DO_VIDEO" 
        frameborder="0" allowfullscreen></iframe>
```

Troque `ID_DO_VIDEO` pelo ID do vídeo (encontrado na URL do YouTube).

### Imagens

```markdown
![Descrição da imagem](caminho/da/imagem.jpg)
```

## 🔧 Requisitos

- Nenhum! É 100% estático.
- Funciona em qualquer navegador moderno
- GitHub Pages é gratuito

## 📝 Markdown Suportado

- Títulos (h1-h6)
- **Negrito** e *itálico*
- Listas ordenadas e sem ordem
- Links
- Imagens
- Código inline e blocos de código
- Citações
- Tabelas
- Linhas divisórias

## 💡 Dicas

1. Mantenha nomes de arquivos sem espaços (use hífens)
2. Edite `config.json` para alterar links sociais
3. A ordem dos posts é definida em `assets/js/app.js`
4. Customize o CSS conforme quiser

## 📄 Licença

Sinta-se livre para usar e modificar este código!

---

**Divirta-se bloguando!** 🎉
