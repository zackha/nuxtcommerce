<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const props = defineProps({
  stores: {
    type: Array,
    required: true
  },
  selectedStoreId: {
    type: Number,
    default: null
  }
});

const map = ref(null);
const markers = ref({});

onMounted(() => {
  map.value = L.map('mapContainer', {
    minZoom: 7,
    maxZoom: 18,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const bounds = L.latLngBounds();

  props.stores.forEach(store => {
    const latLng = [store.lat, store.lng];

    const marker = L.marker(latLng)
        .addTo(map.value)
        .bindPopup(`<b>${store.name}</b><br>${store.address}`);

    markers.value[store.id] = marker;

    bounds.extend(latLng);
  });

  if (props.stores.length > 0) {
    map.value.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 14
    });
  }
});

watch(() => props.selectedStoreId, (newId) => {
  if (newId && markers.value[newId] && map.value) {
    const store = props.stores.find(s => s.id === newId);
    if (store) {
      map.value.flyTo([store.lat, store.lng], 16, { duration: 1.5 });
      markers.value[newId].openPopup();
    }
  }
});
</script>

<template>
  <div id="mapContainer" class="h-full w-full z-0"></div>
</template>

<style>
.leaflet-container {
  background: #f8f9fa;
  font-family: inherit;
}
</style>