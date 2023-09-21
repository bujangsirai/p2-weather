
// index.ts
import prov from "./provinces.json"
import kabkota from "./regencies.json"



export function DebugKabKota(props: {
	setLatLot: (newValue: [number, number] | null) => void,
}) {



	// console.log(prov);
	// console.log(kabkota);
	// const nama: string[] = kabkota.map(item => item.name);
	// console.log(nama);

	function setto(id: string) {
		const itemo: any = kabkota.find(item => item.id == id);
		props.setLatLot([itemo.latitude, itemo.longitude])


		// props.setLatLot
	}


	return (
		<div class="text-white">
			<select data-te-select-init data-te-select-filter="true" value={"1101"} onchange={(e) => setto(e.currentTarget.value)} >
				{kabkota.map((kabkota) => (
					<option value={kabkota.id}>
						{kabkota.name}
					</option>
				))}
			</select>
			<label data-te-select-label-ref>Kabupaten/Kota</label>
		</div>
	)
}