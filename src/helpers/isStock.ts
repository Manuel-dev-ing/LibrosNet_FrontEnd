


export function HasStock(stock:number, stockMinimo: number) {
    
    if (stock > stockMinimo ||  stock === stockMinimo) {
        return 'En stock'
    } else if (stock <= stockMinimo && stock >= 0) {
        return 'Stock bajo'
    } else if(stock === 0) {
        return 'Agotado'
    }

}

export function HasStockBadge(stock:number, stockMinimo: number) {
    
    if (stock > stockMinimo ||  stock === stockMinimo ) {
        return 'badge-section-green'
    } else if (stock < stockMinimo && stock > 0) {
        return 'badge-section-yellow'
    } else if(stock === 0){
        return 'badge-section-red'
    }

}



