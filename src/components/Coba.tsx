import { For, Show } from "solid-js";
import { days } from "../App";

export function DebugSemuaOutput(props: {
    latlot: () => [number, number] | null,
    setLatLot: (newValue: [number, number] | null) => void,
    data: any
}) {

    const latlot = props.latlot;
    const setLatLot = props.setLatLot;
    const data = props.data;

    return (
        <div>
            Lokasi Now = {latlot()}
            <Show when={!data.loading && !data.error}>
                <For each={data()}>
                    {(item) => (
                        <div>
                            {Object.entries(item).map(([key, value]) => (
                                <div>
                                    <strong>{key}:</strong> {JSON.stringify(value)}
                                </div>
                            ))}
                        </div>
                    )}
                </For>

            </Show>
        </div>
    );
}

export function DebugOutputKasar(props: {
    latlot: () => [number, number] | null,
    setLatLot: (newValue: [number, number] | null) => void,
    data: any
}) {

    const latlot = props.latlot;
    const setLatLot = props.setLatLot;
    const data = props.data;

    return (
        <div>
            Lokasi Now = {latlot()}
            
            <Show when={!data.loading && !data.error}>
                <For each={data()}>
                    {(item) => (
                        <div>
                            <strong> <li> waktu = {item.dt_txt}  </li> </strong>
                            <li> temp = {item.main.temp} </li>
                            <li> weather = {item.weather[0].main} </li>
                            <li> wind = {item.wind.speed} </li>
                            <li> icon = {item.weather[0].icon} </li>
                            <li> pop  = {item.pop} </li>
                            <br />

                            <li> Hari = {days[new Date(item.dt_txt).getDay()]} </li>
                            <li> Tanggal = {new Date(item.dt_txt).getDate()} </li>
                            <li> Bulan   = {new Date(item.dt_txt).getMonth()} </li>
                            <li> Tahun   = {new Date(item.dt_txt).getFullYear()}</li>

                            <br />

                            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                            <hr />
                        </div>
                    )}
                </For>
            </Show>
        </div>
    );
}

