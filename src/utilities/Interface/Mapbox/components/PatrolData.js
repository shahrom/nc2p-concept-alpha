export default class PatrolData {

	getMPVData() {


        return [
            {
		        type: 'Feature',
		        properties: {
		            title: 'MPV 1',
		            class: 'mpv',
								status: 'PATROL',
								speed: '65',
								description: 'PATROL, Patterson Ave.',
		        },
		        geometry: {
		            type: 'Point',
					coordinates: [110.34301741944273, 1.558283986553798]

		        }
		    },
            {
		        type: 'Feature',
		        properties: {
		          title: 'MPV 2',
		          class: 'mpv',
							status: 'PATROL',
							speed: '65',
							description: 'PATROL, Queens Rd.',
		        },
		        geometry: {
		          type: 'Point',
				  coordinates: [110.33286094665527, 1.5535167385054869]
		        }
		    },
            {
		        type: 'Feature',
		        properties: {
		          title: 'MPV 3',
		          class: 'mpv',
							status: 'PATROL',
							speed: '65',
							description: 'PATROL, Thomas Ave.',
		        },
		        geometry: {
		          type: 'Point',
				  coordinates: [110.33228858338316, 1.5628313258052362]
		        }
		    },
		    {
		        type: 'Feature',
		        properties: {
		          title: 'URB 4',
		          class: 'urb',
							status: 'PATROL',
							speed: '65',
							description: 'PATROL, Patterson Ave.',
		        },
		        geometry: {
		          type: 'Point',
				  coordinates: [110.3552053772064, 1.5628742251853018]
		        }
		    },
            {
		        type: 'Feature',
		        properties: {
		          title: 'URB 5',
		          class: 'urb',
							status: 'PATROL',
							speed: '65',
							description: 'PATROL, Queens Rd.',
		        },
		        geometry: {
		          type: 'Point',
				  coordinates: [110.36284430848082, 1.5639467094019435]
		        }
		    },
            {
		        type: 'Feature',
		        properties: {
		          title: 'UNIT 6',
		          class: 'mpv',
							status: 'AT INCIDENT LOCATION',
							speed: '0',
							description: 'PATROL, Thomas Ave.',
		        },
		        geometry: {
		          type: 'Point',
				  coordinates: [110.34323199616392, 1.5504333683410045]
		        }
		    },
		    {
		        type: 'Feature',
		        properties: {
		          title: 'MOB 7',
		          class: 'mob',
							status: 'PATROL',
							speed: '0',
							description: 'PATROL, Thomas Ave.',
		        },
		        geometry: {
		          type: 'Point',
				  coordinates: [110.35426123963316, 1.549789873751815]	
		        }
		    },
        ];
    }

}