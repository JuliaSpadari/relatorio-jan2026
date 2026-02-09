// ===== ALGORITMICA - CHART CONFIGURATIONS - JANEIRO 2026 =====

// Global Chart.js defaults — light theme
Chart.defaults.color = '#6b6b6b';
Chart.defaults.borderColor = 'rgba(0,0,0,0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.legend.labels.padding = 20;
Chart.defaults.animation.duration = 1500;
Chart.defaults.animation.easing = 'easeOutQuart';

const COLORS = {
  blue: '#0693e3',
  purple: '#9b51e0',
  orange: '#ff931e',
  green: '#00d084',
  red: '#cf2e2e',
  blueAlpha: 'rgba(6,147,227,0.15)',
  purpleAlpha: 'rgba(155,81,224,0.15)',
  orangeAlpha: 'rgba(255,147,30,0.15)',
  greenAlpha: 'rgba(0,208,132,0.15)',
};

// Tooltip style — light theme
const tooltipStyle = {
  backgroundColor: '#ffffff',
  titleColor: '#1a1a1a',
  bodyColor: '#4a4a4a',
  borderColor: 'rgba(0,0,0,0.1)',
  borderWidth: 1,
  cornerRadius: 8,
};

// ===== 1. KPIs COMPARATIVOS (Bar Chart) =====
const ctxKpis = document.getElementById('chartKpis');
if (ctxKpis) {
  new Chart(ctxKpis, {
    type: 'bar',
    data: {
      labels: ['Investimento', 'Alcance', 'Impressões', 'CPM', 'Frequência'],
      datasets: [
        {
          label: 'Dezembro',
          data: [3638.09, 711329, 1682280, 2.16, 2.36],
          backgroundColor: COLORS.purpleAlpha,
          borderColor: COLORS.purple,
          borderWidth: 2,
          borderRadius: 6,
        },
        {
          label: 'Janeiro',
          data: [1415.82, 406799, 1345232, 1.05, 3.31],
          backgroundColor: COLORS.blueAlpha,
          borderColor: COLORS.blue,
          borderWidth: 2,
          borderRadius: 6,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          ...tooltipStyle,
          padding: 12,
          callbacks: {
            label: function(context) {
              let val = context.parsed.y;
              const label = context.dataset.label;
              const idx = context.dataIndex;
              if (idx === 0) return `${label}: R$${val.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
              if (idx === 3) return `${label}: R$${val.toFixed(2)}`;
              if (idx === 4) return `${label}: ${val.toFixed(2)}`;
              return `${label}: ${val.toLocaleString('pt-BR')}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11, weight: 500 } }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: {
            callback: function(val) {
              if (val >= 1000000) return (val / 1000000).toFixed(1) + 'MI';
              if (val >= 1000) return (val / 1000).toFixed(0) + 'K';
              return val;
            }
          }
        }
      }
    }
  });
}

// ===== 2. CAMPANHAS (Doughnut Chart) =====
const ctxCamp = document.getElementById('chartCampanhas');
if (ctxCamp) {
  new Chart(ctxCamp, {
    type: 'doughnut',
    data: {
      labels: ['Reconhecimento de Marca', 'Engajamento (Vídeo)'],
      datasets: [{
        data: [1415.82, 93.49],
        backgroundColor: [COLORS.blue, COLORS.purple],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 10,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 24, font: { size: 12 } }
        },
        tooltip: {
          ...tooltipStyle,
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((context.parsed / total) * 100).toFixed(1);
              return `R$${context.parsed.toLocaleString('pt-BR', {minimumFractionDigits: 2})} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

// ===== 3. CONJUNTOS DE ANÚNCIOS (Horizontal Bar) =====
const ctxConj = document.getElementById('chartConjuntos');
if (ctxConj) {
  new Chart(ctxConj, {
    type: 'bar',
    data: {
      labels: ['Nova Iguaçu e Baixada', 'Caxias', 'Estado RJ (Recon)', 'Estado RJ (Vídeo)'],
      datasets: [
        {
          label: 'Alcance',
          data: [196661, 169577, 115339, 10010],
          backgroundColor: [COLORS.blue, COLORS.blue, COLORS.purple, COLORS.orangeAlpha],
          borderColor: [COLORS.blue, COLORS.blue, COLORS.purple, COLORS.orange],
          borderWidth: 2,
          borderRadius: 6,
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipStyle,
          callbacks: {
            label: function(context) {
              return `Alcance: ${context.parsed.x.toLocaleString('pt-BR')} pessoas`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: {
            callback: function(val) {
              return (val / 1000).toFixed(0) + 'K';
            }
          }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 12, weight: 600 } }
        }
      }
    }
  });
}

// ===== 4. POSICIONAMENTOS - Alcance (Doughnut) =====
const ctxPos = document.getElementById('chartPosicionamentos');
if (ctxPos) {
  new Chart(ctxPos, {
    type: 'doughnut',
    data: {
      labels: ['Stories', 'Reels', 'Feed', 'Explorar'],
      datasets: [{
        data: [287890, 96922, 48389, 1869],
        backgroundColor: [COLORS.purple, COLORS.orange, COLORS.blue, COLORS.green],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 16, font: { size: 11 } }
        },
        tooltip: {
          ...tooltipStyle,
          callbacks: {
            label: function(context) {
              return `${context.parsed.toLocaleString('pt-BR')} pessoas`;
            }
          }
        }
      }
    }
  });
}

// ===== 5. CPM POR POSICIONAMENTO (Bar) =====
const ctxCpmPos = document.getElementById('chartCpmPos');
if (ctxCpmPos) {
  new Chart(ctxCpmPos, {
    type: 'bar',
    data: {
      labels: ['Stories', 'Reels', 'Feed', 'Explorar'],
      datasets: [{
        label: 'CPM (R$)',
        data: [1.03, 1.05, 1.09, 1.08],
        backgroundColor: [COLORS.purpleAlpha, COLORS.orangeAlpha, COLORS.blueAlpha, COLORS.greenAlpha],
        borderColor: [COLORS.purple, COLORS.orange, COLORS.blue, COLORS.green],
        borderWidth: 2,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipStyle,
          callbacks: {
            label: function(context) {
              return `CPM: R$${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 12, weight: 500 } }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: {
            callback: function(val) {
              return 'R$' + val.toFixed(2);
            }
          }
        }
      }
    }
  });
}

// ===== 6. SÉRIE TEMPORAL (Line + Bar) =====
const ctxTemp = document.getElementById('chartTemporal');
if (ctxTemp) {
  new Chart(ctxTemp, {
    type: 'bar',
    data: {
      labels: ['Sem 1\n(01-07)', 'Sem 2\n(08-14)', 'Sem 3\n(15-21)', 'Sem 4\n(22-28)', 'Sem 5\n(29-31)'],
      datasets: [
        {
          label: 'Alcance',
          data: [95000, 105000, 98000, 82000, 26799],
          backgroundColor: COLORS.blueAlpha,
          borderColor: COLORS.blue,
          borderWidth: 2,
          borderRadius: 6,
          yAxisID: 'y',
          order: 2,
        },
        {
          label: 'Impressões',
          data: [310000, 345000, 320000, 275000, 95232],
          type: 'line',
          borderColor: COLORS.purple,
          backgroundColor: COLORS.purpleAlpha,
          borderWidth: 3,
          pointBackgroundColor: COLORS.purple,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4,
          yAxisID: 'y',
          order: 1,
        },
        {
          label: 'Investimento (R$)',
          data: [330, 360, 340, 280, 105.82],
          type: 'line',
          borderColor: COLORS.orange,
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: COLORS.orange,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1',
          order: 0,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: { padding: 20, font: { size: 11 } }
        },
        tooltip: {
          ...tooltipStyle,
          padding: 14,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label;
              const val = context.parsed.y;
              if (label.includes('Investimento')) return `${label}: R$${val.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
              return `${label}: ${val.toLocaleString('pt-BR')}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, maxRotation: 0 }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.04)' },
          position: 'left',
          ticks: {
            callback: function(val) {
              if (val >= 1000000) return (val / 1000000).toFixed(1) + 'MI';
              if (val >= 1000) return (val / 1000).toFixed(0) + 'K';
              return val;
            }
          }
        },
        y1: {
          grid: { display: false },
          position: 'right',
          ticks: {
            callback: function(val) {
              return 'R$' + val;
            },
            color: COLORS.orange,
          }
        }
      }
    }
  });
}
