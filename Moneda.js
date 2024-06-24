
class CryptoBase
{
    constructor(id,nombre,simbolo,fechaCreacion,precioActual)
    {
        this.id=id;
        this.nombre=nombre;
        this.simbolo = simbolo ;
        this.fechaCreacion = fechaCreacion;
        this.precioActual = precioActual;
    }

}
class Crypto extends CryptoBase
{
    constructor(id,nombre,simbolo,fechaCreacion,precioActual,tipoC,algoritmo,SWO,cantidadEnCirculacion) 
    {
        super(id,nombre,simbolo,fechaCreacion,precioActual);
        this.tipoC= tipoC;
        this.algoritmo = algoritmo;
        this.SWO = SWO;
        this.cantidadEnCirculacion = cantidadEnCirculacion;
    }
}

export default Crypto;