# 📁 assets — Imagens do Site Studio FK

Esta pasta contém todas as imagens fixas do site (não as fotos dos ensaios).
Aqui você troca logos, foto do hero e foto da seção "Sobre".

---

## 📂 Estrutura

```
assets/
├── logos/
│   ├── logo-escuro.png     ← logo preto (usado na nav ao rolar a página)
│   └── logo-branco.png     ← logo branco/invertido (usado no topo da página)
│
├── hero/
│   └── hero-bg.jpg         ← imagem de fundo da tela inicial (coloque aqui)
│
└── sobre/
    └── foto-fotografo.jpg  ← sua foto na seção "Quem somos" (coloque aqui)
```

---

## ✏️ Como trocar cada imagem

### Trocar o logo
1. Substitua o arquivo em `assets/logos/logo-escuro.jpg` pelo novo logo (fundo claro/branco)
2. Substitua `assets/logos/logo-branco.png` pelo novo logo (fundo escuro ou versão clara)
3. **Mantenha o mesmo nome de arquivo** — o site já aponta para esses nomes

### Colocar foto de fundo no hero (tela inicial)
1. Coloque sua foto em `assets/hero/hero-bg.jpg`
2. No `style.css`, encontre `.hero-bg` e adicione:
   ```css
   background-image: url('assets/hero/hero-bg.jpg');
   background-size: cover;
   background-position: center;
   ```

### Colocar sua foto na seção "Sobre"
1. Coloque sua foto em `assets/sobre/foto-fotografo.jpg`
2. No `index.html`, encontre o bloco `.sobre-img-placeholder` e substitua por:
   ```html
   <img src="assets/sobre/foto-fotografo.jpg" alt="Fotógrafo"
        style="width:100%;height:100%;object-fit:cover;border-radius:2px;" />
   ```

---

## 📐 Tamanhos recomendados

| Imagem           | Tamanho ideal     | Formato |
|------------------|-------------------|---------|
| Logo escuro      | 400 × 120 px      | JPG/PNG |
| Logo branco      | 400 × 120 px      | PNG     |
| Hero background  | 1920 × 1080 px    | JPG     |
| Foto fotógrafo   | 800 × 1000 px     | JPG     |
