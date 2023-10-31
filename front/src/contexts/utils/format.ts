export function formatMoney(valor: number) {
    const formatoDinheiro = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return formatoDinheiro.format(valor);
  }