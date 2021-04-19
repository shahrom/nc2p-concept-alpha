export default class FireScenarioData {

    getPoints() {
        return [
            {
                type: 'Feature',
                properties: {
                    title: 'BALAI BOMBA KUCHING',
                    class: 'bbp',
                },
                geometry: {
                    type: 'Point',
                    coordinates: [101.673680, 2.932568]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'F003',
                    class: 'fire_truck',
                },
                geometry: {
                    type: 'Point',
                    coordinates: [101.676155,2.942768]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: '',
                    class: 'fire',
                },
                geometry: {
                    type: 'Point',
                    coordinates: [101.676155,2.942968]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'FIRE',
                    class: 'fire_pulse',
                },
                geometry: {
                    type: 'Point',
                    coordinates: [101.676155,2.942968]
                }
            },
            
        ];
    }

}