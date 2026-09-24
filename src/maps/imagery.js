import * as Cesium from 'cesium';

// Attribution and service rights are documented in DATA_SOURCES.md.
export const ESRI_ATTRIBUTION_HTML =
  '<a href="https://www.esri.com" target="_blank" rel="noopener">Powered by Esri</a>';

export const BHUVAN_ATTRIBUTION_HTML =
  '<a href="https://bhuvan.nrsc.gov.in" target="_blank" rel="noopener">Imagery © ISRO Bhuvan</a>';

export function createBhuvanImagery() {
  return new Cesium.WebMapServiceImageryProvider({
    url: 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/',
    layers: 'india3',
    parameters: {
      transparent: 'true',
      format: 'image/jpeg'
    },
    credit: 'Imagery © ISRO Bhuvan'
  });
}

export function createOsmImagery() {
  return new Cesium.OpenStreetMapImageryProvider({
    url: 'https://tile.openstreetmap.org/',
    credit: '© OpenStreetMap contributors',
  });
}

export function createEsriImagery() {
  return Cesium.ArcGisMapServerImageryProvider.fromUrl(
    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    {
      credit:
        'Powered by Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
      enablePickFeatures: false,
    },
  );
}

export function createIonImagery(style, accessToken) {
  accessToken = String(accessToken || '').trim();
  if (!accessToken) throw new Error('Ion imagery requires an explicit token');
  return Cesium.IonImageryProvider.fromAssetId(style, { accessToken });
}
