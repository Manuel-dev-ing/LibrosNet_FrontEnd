

export function CustomDate(fecha:string):string {
    
    const strFecha = new Date(fecha)
    const customFormatDate = strFecha.toLocaleDateString('es-MX', {
        month   : 'short',
        day     : 'numeric',
        year    : 'numeric'
    });

    return customFormatDate

}



