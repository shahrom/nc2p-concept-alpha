export default class CommunityScenarioData {

    getPoints() {
        return [
            {
                type: 'Feature',
                properties: {
                    title: 'PUBLIC REPORT',
                    class: 'report',
                    location: 'JALAN BAN HOCK',
                    type: 'VENDALISM',
                    photoURL: 'img/reports/idecs/vendalism.jpg',
                },
                geometry: {
                    type: 'Point',
                    coordinates: [110.34905383241414, 1.5539814848752393]
                }
            },
           
            
        ];
    }

}