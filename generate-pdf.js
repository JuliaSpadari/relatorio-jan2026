const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const htmlPath = path.resolve(__dirname, 'index.html');
  const outputDir = path.resolve(__dirname, 'output');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().slice(0, 10);
  const outputPath = path.resolve(outputDir, `Relatorio_MetaAds_Jan2026_${timestamp}.pdf`);

  console.log('Iniciando geração do PDF...');
  console.log(`HTML: ${htmlPath}`);
  console.log(`Output: ${outputPath}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Viewport largo para capturar layout desktop
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // Carregar o HTML
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Esperar Chart.js renderizar completamente
  await new Promise(r => setTimeout(r, 2000));

  // Injetar CSS para PDF — forçar fundo escuro em toda a página
  await page.addStyleTag({
    content: `
      html, body {
        background: #111111 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      @page {
        size: A4 landscape;
        margin: 0;
        background: #111111;
      }
      .nav, .btn-export, .nav-toggle { display: none !important; }
      .fade-in { opacity: 1 !important; transform: none !important; }
      .hero { min-height: auto; padding: 60px 40px; }
      .section { padding: 50px 40px; max-width: 100%; }
      .hero::after { display: none; }
      .footer { margin-top: 40px; }
    `
  });

  // Forçar todos os elementos animados a ficarem visíveis
  await page.evaluate(() => {
    // Mostrar todos os fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Forçar valores finais dos contadores
    document.querySelectorAll('.count-up').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals) || 0;
      const format = el.dataset.format || 'number';
      let formatted;
      if (format === 'compact') {
        if (target >= 1000000) formatted = (target / 1000000).toFixed(1) + 'MI';
        else if (target >= 1000) formatted = (target / 1000).toFixed(0) + 'K';
        else formatted = Math.round(target).toString();
      } else if (decimals > 0) {
        formatted = target.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      } else {
        formatted = Math.round(target).toLocaleString('pt-BR');
      }
      el.textContent = prefix + formatted + suffix;
    });

    // Remover padding-top que a nav fixa causava
    document.body.style.paddingTop = '0';
  });

  // Aguardar um pouco após as mudanças
  await new Promise(r => setTimeout(r, 500));

  // Gerar PDF — sem headers/footers, sem margens brancas
  await page.pdf({
    path: outputPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
  });

  await browser.close();

  console.log(`\nPDF gerado com sucesso!`);
  console.log(`Arquivo: ${outputPath}`);

  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`Tamanho: ${sizeMB} MB`);
}

generatePDF().catch(err => {
  console.error('Erro ao gerar PDF:', err);
  process.exit(1);
});
