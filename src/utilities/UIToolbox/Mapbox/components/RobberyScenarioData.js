export default class RobberyScenarioData {

    getPoints() {
        return [
            {
                type: 'Feature',
                properties: {
                    title: 'ENFORCEMENT',
                    class: 'robbery',
                    location: 'JALAN ANG CHENG HO',
                    photoURL: 'img/reports/idecs/enforcement.jpg',
                },
                geometry: {
                    type: 'Point',
                    coordinates: [110.36008442555351,1.55548005312097]
                }
            },
            // {
            //     type: 'Feature',
            //     properties: {
            //         title: 'MPV 07',
            //         class: 'mpv',
            //     },
            //     geometry: {
            //         type: 'Point',
            //         coordinates: [101.6951889000411,3.1576917188913945]
            //     }
            // },
            
        ];
    }

}