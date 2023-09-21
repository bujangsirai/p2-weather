import { SolidApexCharts } from 'solid-apexcharts';
import { Show, createEffect, createSignal } from 'solid-js';
import { days } from '../App';
import { anno } from './graph/GraphOption';

export function Grafik(props: {
    latlot: () => [number, number] | null,
    setLatLot: (newValue: [number, number] | null) => void,
    data: any
}) {

    // Properly Call Suhu : Logikanya Optionnya pasti ngga berubah sih (?). Asal Proper Manggilnnya di awal
    const [optionsSuhu, setOptionSuhu] = createSignal({});

    const [seriesSuhu, setSeriesSuhu] = createSignal({
        list: [
            {
                name: 'seriesSuhu-1',
                data: [1, 2]
            },
        ]
    });

    const ubahSeris = () => {

        const dataArr = Object.values(props.data());
        const S1 = dataArr.map((item: any) => item.main.temp);
        const O1 = dataArr.map((item: any) => item.dt_txt);
        const Icon1 = dataArr.map((item: any) => item.weather[0].icon);
        const Cuaca = dataArr.map((item: any) => item.weather[0].description); // Ini buat


        const Jam: Array<string> = [];
        const Hari: Array<string> = [];
        const Tanggal: Array<number> = [];
        const Bulan: Array<number> = [];
        const Tahun: Array<number> = [];
        const TanggalDanJam: Array<string> = [];

        const Tanggal1 = new Date('2023-09-19');
        Tanggal1.setHours(0);
        Tanggal1.setMinutes(0);
        Tanggal1.setSeconds(0);
        const Tanggal2 = new Date('2023-09-20');
        Tanggal2.setHours(0);
        Tanggal2.setMinutes(0);
        Tanggal2.setSeconds(0);

        for (let i = 0; i < O1.length; i++) {
            Jam.push((new Date(O1[i]).getHours()).toString() + ":00");
            Hari.push(days[new Date(O1[i]).getDay()]);
            Tanggal.push(new Date(O1[i]).getDate());
            Bulan.push(new Date(O1[i]).getMonth());
            Tahun.push(new Date(O1[i]).getFullYear());

            TanggalDanJam.push(Hari[i] + ', ' + Tanggal[i] + '-' + Bulan[i] + '-' + Tahun[i] + ' ' + Jam[i]);
        }

        setSeriesSuhu({
            list: [
                {
                    name: 'Suhu',
                    data: S1
                },
            ]
        });

        setOptionSuhu({
            title: {
                text: 'Suhu dan Cuaca',
                align: 'left'
            },


            chart: {
                id: 'Suhu1',
            },

            xaxis: {


                categories: TanggalDanJam,
                labels: {
                    show: false,
                }
            },


            tooltip: {

                // <li> icon = {item.weather[0].icon} </li>
                // <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                theme: 'dark',
                custom: function ({ dataPointIndex }: any) {
                    return '<div class="text-white">' +
                        '<div>' + 'Suhu = ' + S1[dataPointIndex] + '° C' + '</div>' +
                        '<div>' + 'Cuaca = ' + Cuaca[dataPointIndex] + '</div>' +

                        '<img src="https://openweathermap.org/img/wn/' + Icon1[dataPointIndex] + '@2x.png" alt="" />' +
                        '</div>'
                }
            }
        })

    };

    // Ini yang kita gunai buat ngupdate Isi Series nya
    createEffect(
        () => {
            // Playing with props data
            if (!(props.data() == undefined)) {
                ubahSeris();
                // <li> Hari = {days[new Date(item.dt_txt).getDay()]} </li>
                // <li> Tanggal = {new Date(item.dt_txt).getDate()} </li>
                // <li> Bulan   = {new Date(item.dt_txt).getMonth()} </li>
                // <li> Tahun   = {new Date(item.dt_txt).getFullYear()}</li>
            }
        }
    );

    return <div>

        {/* <button onclick={() => ubahSeris([111, 222, 44])}> Pencet Disini Untuk Mengubah Nilai nya </button> */}

        {/* <button onclick={() => setBol(!bol())}> Pencet Disini Untuk Mengubah Nilai nya </button> */}



        <Show when={!(props.data() == undefined)} fallback={<></>}>
            <SolidApexCharts width="500" type="line" options={optionsSuhu()} series={seriesSuhu().list} />;
        </Show>


    </div>
}