declare module L {
    export interface TileLayerStatic extends ClassStatic {
        betterWms(url: string, options?: any): L.TileLayer.WMS;
    }
    export var TileLayer: TileLayerStatic;
    export interface TileLayer extends ILayer, IEventPowered<TileLayer> {
        betterWms(url: string, options?: any): L.TileLayer.WMS;
    }
    module TileLayer {
        export interface WMS extends TileLayer {

            setParams(params: WMS, noRedraw?: boolean): WMS;
        }
    }

    export interface TileLayerFactory {

        betterWms(url: string, options?: any): L.TileLayer.WMS;
    }
    export var tileLayer: TileLayerFactory;
}
declare module L {

    export interface ILayer {
        userAdded: boolean;
        _container: any;
    }
}



