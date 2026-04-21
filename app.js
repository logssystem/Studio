/* ====================================================
   Studio FK — app.js
   ====================================================
   CONFIGURAÇÃO DO CLIENTE:
   Para atualizar as fotos, o cliente acessa a planilha Google Sheets
   indicada em CONFIG.SHEET_CSV_URL e adiciona/remove linhas.
   Colunas: categoria | url | titulo | descricao
   ==================================================== */

const CONFIG = {
  /*
    ── PLANILHA DE FOTOS ──
    1. Acesse: https://docs.google.com/spreadsheets/
    2. Crie uma planilha com colunas: categoria | url | titulo | descricao
    3. Vá em Arquivo → Compartilhar → Publicar na web → CSV
    4. Cole a URL gerada abaixo
  */
  SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfPLJw2FqpfsuMfTTGQpinVwcbCZ_1jx9Ju7_1CflC0_JkWW2ASWeGms0i3vCDch2NtvsJX5RrrOlF/pub?gid=3067502&single=true&output=csv',

  /* ── Instagram: cole seu token de acesso aqui ──
     Se deixar vazio, a seção Instagram não aparece.
  */
  INSTAGRAM_TOKEN: '',
  INSTAGRAM_USER_ID: '',

  DEMO_PHOTOS: [
    // ── CASAMENTO ──
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczOMfUBZ6U3BmZ4etuc7I_KIKhnoupZhifsB04fLANzUcrbCGZmET3ZfzJgc8EBevDBgvV2l4nolfdye87lYWtonqdVTM29yNs-GWgX69g0LYSNjG6Q=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczO8ogYIwLzI2a_yAQbQN24qx79-nogB8OfRTbjEhxCkO5hP-FHYb-eHE-4oPafIDl-1nws8-ej6p370mNJVWPpzREI-woUEP5OzWaz7tojrfbYOXYg=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczPfcs2xhniCuQ9uioQCEL9AvXXepwJOQvPM2VVHNvM-6VQQSzUIF1k5z3vRmBxqozmQdGEQS_5Km6SLqZjvAuccYf_onxw-dusyzuoO4bfOBYjSndg=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczOvftJYhDAIlrex2bvWvol_9vmdvRPJXNamSlI5YMIsgYMidDnmmovaps4GeysYBzqn-nSOP_ji4EyIaLpETtvHpuLnO0-pvIfHsK2PZzmzQlVyvJ8=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczMklAdxfB9K0mAAGJvuPKbPm7qMXk5SvQw6LyjAHeTCfAG5vO4HW8rePpzbK_IEwRgVlbHlbLvYDv3o9whKHcXHeCSQZuXdgaDTvGTaOx_Q7MWK9Tg=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczMxl3ymbUO9sQsp7P2FdDzsiOCW0XA60vs3NSUqi7TFGvWpBGLKGozBuvaqTjA8GqJS6apRz-TapaXbHXttPEtZNSbUDgOjEO8XJS7mmBXUXE02WUA=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczM8lIPar3-KwP7LRrzRF_5tSTd8SZq5O8Yv-4YGdYvqUQcfMka3o3_P3pO9Ay7xR2oq22ODr6kSA8JoqTgaJ6b9SXw21TSfk4d1hay5J8u_lK0gcAM=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczOc3obQO91lFiNMfxmjci3GPZ87F006H7f7GSLmoBl3aztQonD-6JgV_pyNwpuZ0vL_4scBlIzp5UprZAuR9TAssYDPHxlIYZ83yzML3B_4QtJszo0=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczNkL3T3m5ZcgqV0FQXalLtnM8P9uO4p6zOmgC6u6_ukXHMqny2JuBKk8Tm7Ol0HJF_H2dSzY8Zv7UGcxDxsoQcFYjTmtCxXffrrt-Zxf9oClS9htd0=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczPiU55jqYdLHuRdre-7UUd7PDUPwCsHtspgP-Kn1jNQJO5D6s0KqsABeSqweeAzpF0MzwbM6LIOpOfNNlrgvJrYOzYFZe27imKofQCBRfL16rUr6pE=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczPmTGTOs9757miz6OrcdeODeB0n5X97h7b8B6moj1nytF4K_iRkwys-RM121QOWusNiHgK8Lkw2jxl8eHSvkNKTnUPyftTAKngF5y1Jik4fQ3_gPyE=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczPajryjz141MB11_SWlHhRPj91rCVYpAVN6y4IU__6d8kVzoo_LTGoC7jQA2TdoWxNHWtrasCYqGeX119diITD10Zd8T9NNgmNZLb6uEEFU-v3H2Fg=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczOWUYUz_v6KeJ6KNzXQRi2cNLLXd3xSzSxl3IgoYxZMQGtJX_FybUtUnZAT-Fvua3iOjiW6PDy2l0cOujLrsYtEdyssfay2YVY04szJvP7tAwNrGFI=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczOzZUeP6FbRjdPIst-llpaHmn5bnzFH-0Kbm4eTgPGVmQdAFOSJO9vrMYPdV0PEWUCiQP3FmvFAy85Ml64LXbstlLVS_AVJrZiQ3SKxX151dRYQKys=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczM3jv4YI4agZcPRMVCNs_y1C_qEirziinMVtNpB6EfFwbbJoD4f1xx_ODuUH7VAyDhVnGZAZxfgr_1KHPEGO3zViJ-h0E0chajj2YrBtfyqkk4KN2A=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczMsWpikVB_PHJwtoBCn15gDsXmhsbwI-TIQwxs8h22WtA7rpp1Cr979kehzyug0lKXe4R5kg_Oa46f2_P042WC_XnUic3o7tvyIb4XL-fY9Irdwo54=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczMWDB49J9rexercPiZ33GR-rtezCYpGwzaKfE8D0r7qBWTaO1T6AN4Y6d0ZI_H1oMdaSPCGZCAK3ct_tKdV5h7500v6P1Fe3d2fP94BGYhrpLWdhE0=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczPQJw1x91TFZhOl0oGvi-eiOhjSmwgs5G3VH4knZRKZYoQiu43dwKv4KADjQZY734C8oyLOFrHCfDx9GpJdoJbB-oI71WpKEzLnVrCMKAm5s3WaLkc=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczNfSASlyH72dxN_ZkhX4t5Usdh6DHOrBLA4pebUJYoxR1kWqSCZXACsvsg2flb4-v9Ki0s5Mv4_bTqUHNS8VW58kyEpc_o5HUwfaBAflfQDudkD5N8=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczNPC4A-p4CEKSuNKjYyRiu587oVVwmhpo9Q1XSgGxaUsTcc6vZaaXZ0M_vwVwtBCawa4ue27tE2qPrbOHoFN0vbJG78crCJDGbiYnARujUzq2_F-c=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczOfsAVmIJ45i7D3V6bVz3_rSGgxIHdeBd4mAMuHyfcMEj6Kq0K8qLtZ__cWLSU4iFVokhiVFldhuAsGzVa88yhOEUK72hjWQv5x0K5O-b1uDJNcPFc=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczMPmTaiWtbGiTFDWMUbWTvZdn7WAyMZSBIsVaNhGQgV2x-7J7Ny68xow7rkljuVJmN_fGNutb0t_LXhGYhPVljvoNXT_6lqaFycqML1Y2AfzqU96nE=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczPxkYqIjUQ_SMX5O5j9EJ_0SlOB1ObSPDVfyO8JerPK4PhXQxPdKVp1892xB-ruqmsL80xTV4VmWY0g6JpJVdaFuD7LmH7LhjLPJZgpurHAnj100W4=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczPwYw7y3oML-dNbQlviPBWqTSU3ktrlQE253JQ2nWo8yVBXELloE7ignr-gsB0-B1bm6pKaS6KsONs8SsDHaXQ72okWZGDzbTO1Wlm4e8UQEKSEVCg=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczMRaQn86eTSmbBNY1vpVI75bZmu97H58WdLHrp62ISUDquw_4h-pOZxQfbWQZO7eBOj67X_gOdOKRlxY7B0rwwr-legNMUFkbazMBzYoHQOodq9x2k=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczP2IP9s3Exc4rmcLPKLl7xfvoZUku_l_iiL1LJpteOXRXpyIL6Du9c4Lfh2tybkyb7BE8ZJZkNXzlCYD8Xiru4sm5VHPNXLUdCwQkWi9Rn-sxSdems=w1200', titulo: 'Casamento A&J', descricao: '' },
    { categoria: 'casamento', url: 'https://lh3.googleusercontent.com/pw/AP1GczMZ3wv72gjSj5ovlC7c-mQXEt-jsZKCj9OHreEt69GMgTGXuvAiVnqg-Yab_ZbGhZqqBRyYkuUyrFLwxV8h3WMOKdgBLDhUNrPHKS9BapD-IgtLPv0=w1200', titulo: 'Casamento A&J', descricao: '' },

    // ── PRÉ-WEDD ──
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1ZGD3HbbyBWT0XaWOz3eGfhTKsvEI3xWa', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1GBkQYlARUz9XWLd6dIlhVH3-wkEwC4Sr', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1m0rjBRJToPyFS_ubHwwZ5-YLy78LweIq', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1cB1k4QgtedFjq5UEr-4hdHeNk65JUoXm', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1oZQ0gPgesgyZsYpjiLkX9ztgXxnDYHAY', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1HG_DZDlCFCnGRdOC-VXSei89gUANdaNY', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1zBCJ4HwJsxvOI7j5ZY9HZEf-AciQ6HV1', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1zZ6_xSRS78t-F0-Zk-miVPuQbunavEa2', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1VA9LtgaAmn2ewqvarPIqUlLa-lKFXSgV', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=12FJYamsqShY2CQ1IWld2ZWy0SR-8w0d5', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=17flIMOX1-7r4RtScuwYvEhLtclIgvIT3', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1NV_yuyGeHZpr_sLn6BC1n1c3w8jFfq7r', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1qnGuEWdcohGyZoxi_ewE4m9PDDklmnxi', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1uJpWoo46u0QgnorqQvt4KteUHWeLDB25', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1Hz2xB3SP_wve89wYMno1b4IJqHlOi88m', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1P5c8Dn2CaoiYDxIbpfxvX3Z1DUSNNjon', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1ieXoZX9sE5_iq9-vbK2oE0uQZS4AEw1X', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=14JJkPdZKOBLVYqHTcGjQy-fXsP8KGeiy', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1FtlT6SxfbrZsbTJelzfu7zbVa6eC5uJl', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1_SYB_A8rTVCpnYo0ss8O2Fiv_GVdlp33', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1ZARhy9DvRmT3Qm-bmDtgmVaIWXv2UXN0', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1AApEnZIkqqkMm3zTCm3b1lrnc8Ok0z56', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1KI8pDqC90IK0W4mrNhBDkw-IsumBtmQK', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1SzR13t2suBSukF6wEGw5UtRH54W0P4xF', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1bUJkSK5-j4cwWZ8P1XXXgh97njJgcxWU', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1YFK_GP1qoqR9akS6FueQmzJwLLgEJqoz', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1Rxokg8n4E4fu0ZBcLuekbOPxvfb8LO_9', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1RkZYY4RpgjVf2K9g4TMSn5Wlfs02eRwS', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1zZxfKhz5gMivM017uxKnxAAYkfXJAG16', titulo: 'Pré-Wedd A&J', descricao: '' },
    { categoria: 'prewedd', url: 'https://drive.google.com/uc?export=view&id=1dpLjEVEIXcOn4959ii-4b7SdOUe6cQq4', titulo: 'Pré-Wedd A&J', descricao: '' },

    // ── OUTROS (placeholder — cliente substitui via Sheets) ──
    { categoria: 'infantil',    url: 'https://picsum.photos/seed/kid1/600/600',  titulo: 'Festa Infantil', descricao: '' },
    { categoria: 'infantil',    url: 'https://picsum.photos/seed/kid2/600/600',  titulo: 'Festa Infantil', descricao: '' },
    { categoria: 'infantil',    url: 'https://picsum.photos/seed/kid3/600/600',  titulo: 'Festa Infantil', descricao: '' },
    { categoria: 'debutante',   url: 'https://picsum.photos/seed/deb1/600/600',  titulo: '15 Anos',        descricao: '' },
    { categoria: 'debutante',   url: 'https://picsum.photos/seed/deb2/600/600',  titulo: '15 Anos',        descricao: '' },
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani1/600/600',  titulo: 'Aniversário',    descricao: '' },
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani2/600/600',  titulo: 'Aniversário',    descricao: '' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp1/600/600', titulo: 'Corporativo',    descricao: '' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp2/600/600', titulo: 'Corporativo',    descricao: '' },
    { categoria: 'batizado',    url: 'https://picsum.photos/seed/bat1/600/600',  titulo: 'Batizado',       descricao: '' },
    { categoria: 'batizado',    url: 'https://picsum.photos/seed/bat2/600/600',  titulo: 'Batizado',       descricao: '' },
    { categoria: 'batizado',    url: 'https://picsum.photos/seed/bat3/600/600',  titulo: 'Batizado',       descricao: '' },
    { categoria: 'ensaio',      url: 'https://picsum.photos/seed/ens1/600/600',  titulo: 'Ensaio de Casal', descricao: '' },
    { categoria: 'ensaio',      url: 'https://picsum.photos/seed/ens2/600/600',  titulo: 'Ensaio de Casal', descricao: '' },
    { categoria: 'ensaio',      url: 'https://picsum.photos/seed/ens3/600/600',  titulo: 'Ensaio de Casal', descricao: '' },
    { categoria: 'banda',       url: 'https://picsum.photos/seed/ban1/600/600',  titulo: 'Show & Banda',    descricao: '' },
    { categoria: 'banda',       url: 'https://picsum.photos/seed/ban2/600/600',  titulo: 'Show & Banda',    descricao: '' },
    { categoria: 'banda',       url: 'https://picsum.photos/seed/ban3/600/600',  titulo: 'Show & Banda',    descricao: '' },
  ],
};

const CATALOG_META = {
  casamento:   { label: 'Casamentos',      desc: 'Histórias de amor eternizadas' },
  infantil:    { label: 'Festa Infantil',  desc: 'A magia da infância em cada clique' },
  debutante:   { label: '15 Anos',         desc: 'Um sonho que merece ser registrado' },
  aniversario: { label: 'Aniversários',    desc: 'Celebrações inesquecíveis' },
  prewedd:     { label: 'Pré-Wedd',        desc: 'O romance antes do grande dia' },
  corporativo: { label: 'Corporativo',     desc: 'Eventos, headshots e produtos profissionais' },
  batizado:    { label: 'Batizados',        desc: 'Momentos sagrados para guardar para sempre' },
  ensaio:      { label: 'Ensaio de Casal', desc: 'Cumplicidade e amor em cada quadro' },
  banda:       { label: 'Shows & Bandas',  desc: 'A energia do palco eternizada' },
};

let allPhotos      = [];
let lightboxPhotos = [];
let lbIndex        = 0;

/* ══════════════════════════════════════
   LOADER
══════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
        initHeroReveal();
      }, 400);
    }
    fill.style.width = progress + '%';
  }, 80);
}

/* ══════════════════════════════════════
   HERO — WORD REVEAL
══════════════════════════════════════ */
function initHeroReveal() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  const wrapWords = (el) => {
    el.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        const words = node.textContent.split(/(\s+)/);
        const frag  = document.createDocumentFragment();
        words.forEach(w => {
          if (w.trim()) {
            const span = document.createElement('span');
            span.className = 'word-reveal';
            span.textContent = w;
            frag.appendChild(span);
          } else if (w) {
            frag.appendChild(document.createTextNode(w));
          }
        });
        node.replaceWith(frag);
      } else if (node.nodeName === 'EM') {
        wrapWords(node);
      }
    });
  };
  wrapWords(title);
  const words = title.querySelectorAll('.word-reveal');
  words.forEach((w, i) => { w.style.transitionDelay = (i * 0.08) + 's'; });
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub     = document.querySelector('.hero-sub');
  const btn     = document.querySelector('.btn-hero');
  setTimeout(() => title.classList.add('revealed'), 50);
  if (eyebrow) { eyebrow.style.animationDelay = '0s'; eyebrow.classList.add('hero-anim'); }
  if (sub)     setTimeout(() => sub.classList.add('hero-anim'), words.length * 80 + 200);
  if (btn)     setTimeout(() => btn.classList.add('hero-anim'), words.length * 80 + 400);
}

/* ══════════════════════════════════════
   PARALLAX
══════════════════════════════════════ */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg || window.matchMedia('(hover: none)').matches) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════
   BARRA DE PROGRESSO
══════════════════════════════════════ */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
}

/* ══════════════════════════════════════
   WHATSAPP FLUTUANTE
══════════════════════════════════════ */
function initWaFloat() {
  const btn = document.getElementById('waFloat');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-section').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════
   CONTADORES ANIMADOS
══════════════════════════════════════ */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '+';
      let current  = 0;
      const timer  = setInterval(() => {
        current += Math.ceil(target / (1400 / 16));
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count-num[data-target]').forEach(c => obs.observe(c));
}

/* ══════════════════════════════════════
   NAV FIXO + HAMBURGER
══════════════════════════════════════ */
function initNav() {
  const nav        = document.getElementById('nav');
  const hero       = document.getElementById('home');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function updateNav() {
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
    nav.classList.toggle('scrolled', window.scrollY > heroBottom - 80);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  const sections = ['home','catalogos','como','faq','sobre','instagram','contato'];
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }, { passive: true });
}

/* ══════════════════════════════════════
   CARREGAR FOTOS
   Prioridade: Google Sheets CSV → DEMO_PHOTOS
══════════════════════════════════════ */
async function loadPhotos() {
  if (CONFIG.SHEET_CSV_URL === 'SUA_PLANILHA_CSV_URL_AQUI') {
    allPhotos = CONFIG.DEMO_PHOTOS;
    return;
  }
  try {
    const res  = await fetch(CONFIG.SHEET_CSV_URL);
    const text = await res.text();
    const rows = text.trim().split('\n').slice(1);
    const parsed = rows.map(row => {
      const cols = row.split(',');
      return {
        categoria: (cols[0] || '').trim().toLowerCase(),
        url:       (cols[1] || '').trim(),
        titulo:    (cols[2] || '').trim(),
        descricao: (cols[3] || '').trim(),
      };
    }).filter(p => p.url);
    allPhotos = parsed.length ? parsed : CONFIG.DEMO_PHOTOS;
  } catch(e) {
    console.warn('Planilha indisponível, usando demo.', e);
    allPhotos = CONFIG.DEMO_PHOTOS;
  }
}

/* ══════════════════════════════════════
   FAIXA DE FOTOS
══════════════════════════════════════ */
function buildPhotoStrip() {
  const track = document.getElementById('stripTrack');
  if (!track || !allPhotos.length) return;
  const shuffled = [...allPhotos].sort(() => Math.random() - 0.5).slice(0, 16);
  const photos   = [...shuffled, ...shuffled];
  track.innerHTML = '';
  photos.forEach(photo => {
    const div = document.createElement('div');
    div.className = 'strip-photo';
    const meta = CATALOG_META[photo.categoria] || { label: photo.categoria };
    div.innerHTML = `<img src="${photo.url}" alt="${photo.titulo || ''}" loading="lazy"/><span class="strip-photo-label">${meta.label}</span>`;
    div.addEventListener('click', () => openCatalog(photo.categoria));
    track.appendChild(div);
  });
}

/* ══════════════════════════════════════
   INSTAGRAM
══════════════════════════════════════ */
async function loadInstagram() {
  const section = document.getElementById('instagram');
  if (!section) return;
  if (!CONFIG.INSTAGRAM_TOKEN) { section.style.display = 'none'; return; }
  const grid = document.getElementById('igGrid');
  try {
    const url  = `https://graph.instagram.com/me/media?fields=id,media_type,thumbnail_url,media_url,permalink,caption&limit=12&access_token=${CONFIG.INSTAGRAM_TOKEN}`;
    const res  = await fetch(url);
    const data = await res.json();
    if (!data.data || data.error) throw new Error('Token inválido ou expirado');
    grid.innerHTML = '';
    data.data
      .filter(p => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 9)
      .forEach(post => {
        const a = document.createElement('a');
        a.href = post.permalink; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = 'ig-item';
        a.innerHTML = `<img src="${post.media_url || post.thumbnail_url}" alt="${(post.caption || '').slice(0, 60)}" loading="lazy"/><div class="ig-overlay"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></div>`;
        grid.appendChild(a);
      });
  } catch(e) {
    console.warn('Instagram não carregou:', e);
    section.style.display = 'none';
  }
}

/* ══════════════════════════════════════
   CATÁLOGO / MODAL
══════════════════════════════════════ */
async function openCatalog(category) {
  const meta = CATALOG_META[category] || { label: category, desc: '' };
  document.getElementById('modalTitle').textContent     = meta.label;
  document.getElementById('modalDesc').textContent      = meta.desc;
  document.getElementById('modalLoading').style.display = 'flex';
  document.getElementById('modalGrid').innerHTML        = '';
  document.getElementById('modalEmpty').style.display   = 'none';
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!allPhotos.length) await loadPhotos();
  const photos = allPhotos.filter(p => p.categoria === category);
  document.getElementById('modalLoading').style.display = 'none';
  if (!photos.length) { document.getElementById('modalEmpty').style.display = 'block'; return; }
  lightboxPhotos = photos;
  const grid = document.getElementById('modalGrid');
  photos.forEach((photo, idx) => {
    const div = document.createElement('div');
    div.className = 'modal-photo';
    div.innerHTML = `<img src="${photo.url}" alt="${photo.titulo || ''}" loading="lazy"/>`;
    div.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(div);
  });
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  closeLightbox();
}

/* ══════════════════════════════════════
   LIGHTBOX + SWIPE
══════════════════════════════════════ */
function openLightbox(idx) {
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
function updateLightbox() {
  const p   = lightboxPhotos[lbIndex];
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  setTimeout(() => { img.src = p.url; img.alt = p.titulo || ''; img.style.opacity = '1'; }, 150);
  document.getElementById('lbCaption').textContent = [p.titulo, p.descricao].filter(Boolean).join(' — ');
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${lightboxPhotos.length}`;
}
function lbMove(dir) {
  lbIndex = (lbIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
  updateLightbox();
}
function initSwipe() {
  const lb = document.getElementById('lightbox');
  let startX = 0, startY = 0;
  lb.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) lbMove(dx < 0 ? 1 : -1);
  }, { passive: true });
}

/* ══════════════════════════════════════
   FAQ
══════════════════════════════════════ */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });
}

/* ══════════════════════════════════════
   FORMULÁRIO
══════════════════════════════════════ */
function initForm() {
  emailjs.init('DpAdYBewfTgjb9ASI');
  const form = document.getElementById('contactForm');
  const btn  = form.querySelector('.btn-submit');
  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    emailjs.send('service_9abzeza', 'template_06lnpra', {
      nome:     document.getElementById('nome').value.trim(),
      telefone: document.getElementById('tel').value.trim(),
      evento:   document.getElementById('evento').value,
      mensagem: document.getElementById('mensagem').value.trim(),
    }).then(() => {
      document.getElementById('formSuccess').classList.add('show');
      setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
      form.reset();
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
    }).catch(err => {
      console.error(err);
      alert('Erro ao enviar. Tente pelo WhatsApp!');
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
    });
  });
}

/* ══════════════════════════════════════
   EVENTOS MODAL / LIGHTBOX
══════════════════════════════════════ */
function initModalEvents() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target === document.getElementById('modalBackdrop')) closeModal();
  });
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => lbMove(-1));
  document.getElementById('lbNext').addEventListener('click', () => lbMove(1));
  document.addEventListener('keydown', e => {
    if (document.getElementById('lightbox').classList.contains('open')) {
      if (e.key === 'ArrowLeft')  lbMove(-1);
      if (e.key === 'ArrowRight') lbMove(1);
      if (e.key === 'Escape')     closeLightbox();
    } else if (document.getElementById('modalBackdrop').classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
    }
  });
  initSwipe();
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  initLoader();
  initParallax();
  initProgressBar();
  initWaFloat();
  initNav();
  initScrollReveal();
  initCounters();
  initFaq();
  initForm();
  initModalEvents();
  await loadPhotos();
  buildPhotoStrip();
  loadInstagram();
});

window.openCatalog = openCatalog;
