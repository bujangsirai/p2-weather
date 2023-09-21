import { createResource, createSignal, For, Show } from "solid-js";
import { DebugSemuaOutput, DebugOutputKasar } from "./components/Coba";
import { Grafik } from "./components/Grafik";
import { DebugKabKota } from "./interfaces/DebugKabKota";


import { onMount } from "solid-js";
import { Select, initTE } from "tw-elements";
import { APIKEY } from "./interfaces/keys";

// 0th : Interface
export interface WeatherData {
	main: any;
	weather: any;
	wind: any;
	pop: any;
	dt_txt: any;
}

// 0th : Global Const
export const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

// 0th : API Search Function
async function APISearch(latlot: [number, number]) {

	if (!latlot) return []

	const lat = latlot[0];
	const lot = latlot[1];
	const respondes = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lot + "&appid=" + APIKEY + "&units=metric"

	const response = await fetch(
		respondes
	);

	// raw 
	const results = await response.json();
	//filter 1
	const documents = results.list;
	// filter 2
	const mappedData = documents.map((item: WeatherData) => ({
		main: item.main,
		weather: item.weather,
		wind: item.wind,
		pop: item.pop,
		dt_txt: item.dt_txt
	}));

	console.log(mappedData);

	return mappedData;
}

function App() {
	onMount(() => {
		initTE({ Select });
	});

	const [latlot, setLatLot] = createSignal<[number, number] | null>([2.61667 , 96.08333 ]);	// Latitude and Lotitude
	const [data] = createResource(latlot, APISearch);	// Data that can be fetched

	return (
		<div>
			
			<h1 class="mb-10"> WEATHER APP BY UTIH </h1>
			<DebugKabKota setLatLot={setLatLot}  />
			<Grafik latlot={latlot} setLatLot={setLatLot} data={data} />

			{/* <button onClick={() => setLatLot([-2.068454, 101.402583])}> PRESS THIS</button> */}
			{/* <DebugSemuaOutput latlot={latlot} setLatLot={setLatLot} data={data} /> */}
			{/* <DebugOutputKasar latlot={latlot} setLatLot={setLatLot} data={data} /> */}




		</div>
	)
}






export default App;