import * as signalR from "@microsoft/signalr";
import { color } from "chart.js/helpers";
import * as echarts from "echarts";
import { HasData } from "../api_fetching/Assets/assetRender";
import { Legend } from "chart.js";

let connection;
let DataSample_Z = [];
// let DataSample_Y = [];
// let DataSample_X = [];
let DataTime = [];
let vibChart = null;
let f_chart = null;
// const step = 0.00390625;


let ViewTime = [];
let ViewData_Z = [];
let ViewData_Y = [];
let ViewData_X = [];

let colors;


const frequencies = [
    0, 2, 4, 6, 8, 10, 12, 14,
    16, 18, 20, 22, 24, 26, 28
];

const amplitudes = [
    0.01, 0.03, 0.05, 0.02, 0.01,
    0.08, 0.25, 0.92, 0.34, 0.12, 0.04, 0.02, 0.01, 0.01, 0.00
];


export async function startVibrationStream() {

    connection = new signalR.HubConnectionBuilder()
        .withUrl("http://192.168.43.111:5189/hubs/vibration")
        .withAutomaticReconnect()
        .build();

    // Receive data from backend
    connection.on("ReceiveVibrationData", (data) => {

        if (!HasData(data)) return;

        WaveFormeHandle(data);
        FrequencyHandle(data);
        updateUI();
    });

    try {
        await connection.start();
        console.log("SignalR Connected");
    }
    catch (err) {
        console.error("SignalR Connection Failed:", err);
    }
}

function VibrationChart() {


    const vibrationChart = document.querySelector('#vibration-chart');

    if (vibChart == undefined || vibChart == null) {
        vibChart = echarts.init(vibrationChart, null, { renderer: 'canvas', useDirtyRect: true });
    }

    const option = {
        animation: false,
        progressive: 3000,
        progressiveThreshold: 3500,
        // dataZoom: [
        //     {
        //         type: 'slider',
        //         realtime: false,
        //         filterMode: 'empty'
        //     }
        // ],
        grid:
        {
            show: false,
            left: 2,
            right: 2,
            top: 5,
            bottom: 5,
            borderWidth: 1
        },
        tooltip: {
            trigger: "axis",
            showContent: false,
            axisPointer: { type: 'line', animation: false }
        },
        // legend: { data: ["Z-axis", "Y-axis", "X-axis"] },

        xAxis: {
            // type: ",
            name: 'time(s)',
            splitLine: { show: true },
            data: [0.0, 0.1, 0.2, 0.3, 0.4, 0.51, 0.61, 0.71, 0.81, 0.91, 1.01, 1.11, 1.21, 1.31, 1.41, 1.52, 1.62, 1.72, 1.82, 1.92, 2.02, 2.12, 2.22, 2.32, 2.42, 2.53, 2.63, 2.73, 2.83, 2.93, 3.03, 3.13, 3.23, 3.33, 3.43, 3.54, 3.64, 3.74, 3.84, 3.94, 4.04, 4.14, 4.24, 4.34, 4.44, 4.55, 4.65, 4.75, 4.85, 4.95, 5.05, 5.15, 5.25, 5.35, 5.45, 5.56, 5.66, 5.76, 5.86, 5.96, 6.06, 6.16, 6.26, 6.36, 6.46, 6.57, 6.67, 6.77, 6.87, 6.97, 7.07, 7.17, 7.27, 7.37, 7.47, 7.58, 7.68, 7.78, 7.88, 7.98, 8.08, 8.18, 8.28, 8.38, 8.48, 8.59, 8.69, 8.79, 8.89, 8.99, 9.09, 9.19, 9.29, 9.39, 9.49, 9.6, 9.7, 9.8, 9.9, 10.0],
            // axisLabel: {
            //     interval: 10
            // }
        },
        // toolBox:
        // {
        //     SaveAsImage: {}
        // },
        yAxis: {
            type: "value",
            name: 'Amplitued (g)',
            // min: -3,
            // max: 3,
            // scale: true,
            // axisLine: { onZero: true }
        },
        series: [
            {
                name: "Z-aix",
                type: "line",
                data: [2.107, 4.261, 3.618, 1.023, -0.506, 1.994, 4.316, 3.214, 0.649, 1.165, 2.447, 4.502, 3.346, 0.689, -0.085, 2.775, 3.964, 2.739, 0.159, 0.167, 3.242, 3.635, 3.016, -0.179, 0.001, 3.137, 4.215, 2.224, -0.072, 0.509, 2.591, 4.261, 2.561, -0.053, 0.948, 3.25, 3.553, 2.332, -0.189, 0.75, 2.822, 4.127, 2.427, 0.269, 0.134, 3.193, 3.95, 1.804, 0.437, 0.828, 2.915, 4.368, 2.637, 0.217, 0.251, 3.361, 4.371, 1.512, -0.028, 1.173, 3.228, 3.973, 0.752, -0.468, 0.864, 3.321, 4.347, 1.024, -0.328, 1.229, 4.128, 3.427, 1.802, -0.193, 0.896, 3.996, 3.755, 1.01, -0.175, 1.337, 3.892, 3.894, 1.666, -0.567, 2.093, 3.405, 3.46, 1.117, -0.077, 1.537, 3.928, 3.358, 0.763, 0.094, 1.831, 3.884, 3.563, 0.799, 0.152, 2.189],
                smooth: false,
                showSymbol: false,
                large: true,
                largeThreshold: 1000,
                lineStyle: {
                    width: 1.5,
                    color: colors                   // thin line = faster render
                },
                animation: false,
            },
        ]
    };

    vibChart.setOption(option);


    // console.log(vibChart);

    vibChart.setOption({
        animation: false,
        xAxis: {
            data: ViewTime
        },
        series: [
            {
                data: ViewData_Z,
                animation: false,
            }
        ]
    }, false);

}

function frequencyChart() {

    const frequencyID = document.querySelector("#frequency-chart");
    console.log(frequencyID);

    if (!f_chart) {
        console.log("I'm in avilable");
        f_chart = echarts.init(frequencyID, null);
    }

    const option = {

        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                const p = params[0];
                return `
                Frequency: <b>${p.axisValue} Hz</b><br/>
                Magnatuied: <b>${p.value.toFixed(3)}</b>
            `;
            }
        },

        grid: {
            left: '8%',
            right: '5%',
            top: '12%',
            bottom: '12%'
        },

        xAxis: {
            type: 'category',
            name: 'Frequency (Hz)',
            data: frequencies,
            axisLabel: {
                interval: 8
            }
            // axisLine: { onZero: true }

        },

        yAxis: {
            type: 'value',
            name: 'Magnitude',
            // max: 
        },

        series: [
            {
                name: 'Spectrum',
                type: 'bar',
                data: amplitudes,   // Example: [0.01,0.03,0.05,...]
                barWidth: '12%',
                showSymbol: false,
                itemStyle: {
                    color: colors
                },
                emphasis: {
                    itemStyle: {
                        color: '#FF9800'
                    }
                }
            }
        ],

        animation: false
    };

    f_chart.setOption(option);


    f_chart.setOption({
        xAxis: {
            data: frequencies
        },
        series: [
            {
                data: amplitudes
            }
        ]
    }, false);
}

function FrequencyHandle(data) {
    frequencies.length = 0;
    amplitudes.length = 0;

    const frequencyStep = data.sampleRate / data.samples.length;

    // frequencies.push(0);
    data.spectrum.forEach((fr, i) => {

        frequencies.push(frequencyStep * (i + 1));
        amplitudes.push(fr);
    });
}

function WaveFormeHandle(data) {

    const dt = 1 / data.sampleRate;
    const start = data.windowIndex * (data.samples.length * dt);

    const vibration = data.samples;

    const time = [];
    for (let x = 0; x <= data.samples.length; x++) {
        time.push((start + (x * dt)).toFixed(1));
    }

    DataTime.push(time);
    ViewTime = DataTime.flat();


    DataSample_Z.push(vibration);
    ViewData_Z = DataSample_Z.flat();

    if (DataSample_Z.length > 5) {
        DataSample_Z.shift();
        DataTime.shift();
    }


    switch (data.axis) {
        case "Z":
            colors = '#5b1cda';
            break;
        case "Y":
            colors = '#c41a1a';
            break;
        case "X":
            colors = '#52c41a';
            break;
    }


}

export function updateUI() {
    VibrationChart();
    frequencyChart();
}