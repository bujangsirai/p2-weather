export function anno() {


    const HariKerja = {
        x: 1,
        x2: 12,
        fillColor: '#bbfcd5',
        opacity: 0.4,
        label: {
            borderColor: '#bbfcd5',
            style: {
                fontSize: '12px',
                color: 'black',
                background: '#bbfcd5',
                opacity: 0.4
            },
            offsetY: -10,
            text: "hari",
        }
    }

    const HariLibur = {
        x: 4,
        x2: 5,
        fillColor: '#fcbbc5',
        opacity: 0.4,
        label: {
            borderColor: '#fcbbc5',
            style: {
                fontSize: '12px',
                color: 'black',
                background: '#fcbbc5',
                opacity: 0.4
            },
            offsetY: -10,
            text: "hari",
        }
    }

    // if (hari == "Sabtu" || hari == "Minggu") {
    //     return HariLibur;
    // }

    return HariKerja;

}

