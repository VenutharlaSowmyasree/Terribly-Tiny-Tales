document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', fetchData);
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
  });
  
  function fetchData() {
    fetch('https://www.terriblytinytales.com/test.txt')
      .then(response => response.text())
      .then(data => processTextData(data))
      .catch(error => console.error(error));
  }
  
  function processTextData(data) {
    const wordCounts = {};
    const words = data.split(/\s+/);
    words.forEach(word => {
      if (wordCounts[word]) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    });
    const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
    const top20Words = sortedWords.slice(0, 20);
    generateChart(top20Words);
  }
  
  function generateChart(top20Words) {
    const labels = top20Words.map(([word]) => word);
    const ctx = document.getElementById('chartContainer').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Word Frequency',
          data: data,
          backgroundColor: 'rgba(75.134,72)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  }
  
  function exportToCSV() {
    fetch('https://www.terriblytinytales.com/test.txt')
      .then(response => response.text())
      .then(data => {
        const wordCounts = {};
        const words = data.split(/\s+/);
        words.forEach(word => {
          if (wordCounts[word]) {
            wordCounts[word]++;
          } else {
            wordCounts[word] = 1;
          }
        });
        const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
        const top20Words = sortedWords.slice(0, 20);
  
        const csvContent = 'data:text/csv;charset=utf-8,' + top20Words.map(([word, count]) => `${word},${count}`).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'word_frequency.csv');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => console.error(error));
  }
  
  