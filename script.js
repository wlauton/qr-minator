// Adiciona um evento de envio ao formulário com ID 'qrForm'
document.getElementById('qrForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura os valores dos campos de entrada
    const textoEntrada = document.getElementById('inputText').value;
    const corQR = document.getElementById('qrColor').value;
    const logoUpload = document.getElementById('logoUpload').files[0];
    const tamanhoQR = document.getElementById('qrSize').value;

    // Chama a função para gerar o QR Code com os valores capturados
    gerarQRCode(textoEntrada, corQR, logoUpload, tamanhoQR);
});

/**
 * Gera um QR Code com base nos parâmetros fornecidos.
 * 
 * @param {string} texto - O texto a ser codificado no QR Code.
 * @param {string} cor - A cor do QR Code.
 * @param {File} logo - O arquivo de imagem do logotipo a ser inserido no QR Code.
 * @param {number} tamanhoQR - O tamanho do QR Code.
 */
function gerarQRCode(texto, cor, logo, tamanhoQR) {
    // Obtém o elemento canvas para desenhar o QR Code
    const qrCodeCanvas = document.getElementById('qrCode');
    
    // Cria uma nova instância de QRious para gerar o QR Code
    const qrCode = new QRious({
        element: qrCodeCanvas,
        value: texto,
        size: tamanhoQR,
        background: '#ffffff',
        foreground: cor,
        level: 'H'
    });

    // Se um logotipo foi carregado, desenha-o sobre o QR Code
    if (logo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const ctx = qrCodeCanvas.getContext('2d');
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                // Calcula o tamanho e a posição do logotipo
                const tamanhoLogo = qrCode.size * 0.2;
                const posicaoXLogo = (qrCode.size - tamanhoLogo) / 2;
                const posicaoYLogo = (qrCode.size - tamanhoLogo) / 2;
                ctx.drawImage(img, posicaoXLogo, posicaoYLogo, tamanhoLogo, tamanhoLogo);
            };
        };
        reader.readAsDataURL(logo);
    }
}
