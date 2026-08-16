import { Chart } from '../../../node_modules/chart.js/auto';


function LableOfDaily(year, month) {

    let dayOfMoth = [];
    const LastDayOfMonth = new Date(year, month, 0).getDate();

    for (let i = 1; i <= LastDayOfMonth; i++) {
        dayOfMoth.push(i);
    }

    return dayOfMoth;
}
function LabelOfWeek() {
    return ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
}

function LabelOfMonths() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

function lableOfPercentage() {
    return [
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        10,
        0
    ]
}


function Generate_lable(type, year = 2026, month = 1) {
    switch (type) {
        case 'weekly':
            return LabelOfWeek();
        case 'monthly':
            return LabelOfMonths();
        case 'daily':
            return LableOfDaily(year, month);
        case 'percenatge':
            return lableOfPercentage();
    }
}


const barChartInstance = {};
export function build_bar_chart(ConvaID, data, barthickness = 15, maxValue = 40, type = 'monthly') {

    const Lable = Generate_lable(type);

    if (barChartInstance[ConvaID]) {
        barChartInstance[ConvaID].destroy();
    }
    const ctx = document.querySelector(ConvaID);


    if (undefined === data) return;

    const correctiveData = Array(12).fill(0);
    const preventiveData = Array(12).fill(0);

    data.forEach(x => {
        if (x.workOrderType === "Corrective") {
            return correctiveData[x.monthNumber - 1] = x.totalNumberOfMonth;
        }

        if (x.workOrderType === "Preventive") {
            return preventiveData[x.monthNumber - 1] = x.totalNumberOfMonth;
        }
    });


    barChartInstance[ConvaID] = Chart.defaults.plugins.legend.display = false;
    new Chart(ctx,
        {
            type: 'bar',
            data: {
                labels: Lable,
                datasets: [
                    {
                        label: "",
                        data: correctiveData,
                        backgroundColor: "#8d4fffa4",
                        barThickness: barthickness,       // Fixed width in pixels
                        maxBarThickness: 30,
                        tension: 0.4
                    },

                    {
                        label: "",
                        data: preventiveData,
                        backgroundColor: "#2564eb7b",
                        barThickness: barthickness,       // Fixed width in pixels
                        maxBarThickness: 30,
                        tension: 0.4

                    },
                ]
            },

            options:
            {
                responsive: true,
                maintainAspectRatio: true,
                layout: {
                    padding: {
                        left: 25, right: 10, top: 25, bottom: 5
                    }
                },
                Plugins:
                {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales:
                {
                    x:
                    {
                        grid: {
                            display: true
                        },
                    },

                    y:
                    {
                        beginAtZero: false,
                        grid: {
                            display: true
                        },
                        min: 0,
                        max: maxValue
                    }
                },
            }
        });

}

/*
   implement the pie chart to represent the summary about the latest opearion of work order
   ctx : is a canva context 2D
   return : class of chart render the chart
*/
export function bulid_doughnut_chart(ConvaID, config) {
    if (barChartInstance[ConvaID]) {
        barChartInstance[ConvaID].destroy();
    }

    const ctx = document.querySelector(ConvaID);

    if (config.data == undefined) return;



    barChartInstance[ConvaID] = new Chart(ctx,
        {
            type: "doughnut",
            data: {
                labels: config.Lable,
                datasets: [
                    {
                        data: config.data,
                        backgroundColor: config.bg_colors,
                        tension: 0.1

                    }
                ]

            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                plugins: {
                    legend:
                    {
                        display: config.display,

                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 5,
                            boxHeight: 5,
                        },

                        position: 'bottom'
                    },
                }
            }
        });

}

export function bulid_line_chart(ConvaID, Config = [], fills = true) {

    if (barChartInstance[ConvaID]) {
        barChartInstance[ConvaID].destroy();
    }

    const ctx = document.querySelector(ConvaID).getContext('2d');

    var gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, '#7334de');
    gradient1.addColorStop(1, 'rgba(67, 0, 100, 0)');

    var gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, 'rgb(66, 105, 232)');
    gradient2.addColorStop(1, 'rgba(0, 8, 100, 0)');

    Chart.defaults.plugins.legend.display = false;
    barChartInstance[ConvaID] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Config.months,
            datasets: [{
                label: "MTBF",
                data: Config.mtbf,

                borderColor: '#6015e1',
                borderWidth: 1.5,
                tension: .3,

                backgroundColor: gradient1,
                fill: fills,

                pointBackgroundColor: '#6015e1',
                pointBorderColor: '#6015e1',

                pointRadius: 3,
                pointHoverRadius: 6
            },
            {
                label: "MTTR",
                data: Config.mttr,

                borderColor: '#4079f3fb',
                borderWidth: 1.5,
                tension: 0.4,
                backgroundColor: gradient2,
                fill: fills,

                pointBackgroundColor: '#4079f3fb',
                pointBorderColor: '#4079f3fb',
                pointRadius: 3,
                pointHoverRadius: 6
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'ease',
                },
                // Ensures the background fill elements enter smoothly from the bottom boundary
                y: {
                    from: 40, // Starts rendering at the bottom axis scale line
                    duration: 1000,
                    easing: 'ease'
                }
            },
            layout: {
                autoPadding: true,
                padding: {
                    // top: 0,
                    // bottom: 50,
                    left: 10,
                    right: 10
                }
            },
            interactions:
            {
                intersect: false,
                mode: 'point'
            },
            plugins: {

                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        bottom: true
                    }
                },
                legend: { display: false },

                tooltip: {
                    usePointStyle: true,
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    beginAtZero: false,
                },
                y: {
                    beginAtZero: false,

                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },

                    min: Config.minValue,
                    max: Config.maxValue,
                    ticks:
                    {
                        stepSize: 5,
                    }

                }
            }
        }
    });

}

export function bulidTrendChart(ConvaID, name, type, data, config, Lable = []) {



    if (barChartInstance[ConvaID]) {
        barChartInstance[ConvaID].destroy();
    }

    if (Lable == undefined || Lable == []) {
        const Labledata = Generate_lable(type);
        Lable = Labledata;
    }

    const ctx = document.querySelector(ConvaID).getContext('2d');

    var gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, config.mainColor);
    gradient1.addColorStop(1, config.secondColor);

    Chart.defaults.plugins.legend.display = false;
    barChartInstance[ConvaID] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Lable,
            datasets: [{
                label: name,
                data: data,

                borderColor: config.mainColor,
                borderWidth: 1.5,
                tension: .3,

                // backgroundColor: gradient1,
                // fill: true,

                pointBackgroundColor: config.mainColor,
                pointBorderColor: config.mainColor,

                pointRadius: 3,
                pointHoverRadius: 3
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animations: {
                // tension: {
                //     duration: 500,
                //     easing: 'easeInExpo',
                // },
                // Ensures the background fill elements enter smoothly from the bottom boundary
                y: {
                    from: 300, // Starts rendering at the bottom axis scale line
                    duration: 1000,
                    easing: 'easeInQuart'
                }
            },
            layout: {
                autoPadding: true,
                // padding: {
                //     // top: 0,
                //     // bottom: 50,
                //     left: 5,
                //     right: 5
                // }
            },

            plugins: {

                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 10,
                        bottom: 0,
                        loop: true
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom', // Put it at the bottom
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        boxWidth: 8,
                        boxHeight: 8,

                        font: {
                            size: 12,        // Size in pixels
                            weight: 'normal',  // Font weight
                        },
                    }
                },

                tooltip: {
                    usePointStyle: true,
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true
                    },
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: false,

                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        display: true
                    },


                    // min: 0,
                    // max: 100,
                    // ticks:
                    // {
                    //     stepSize: 10,
                    // }

                }
            }
        }
    });

}

export function bulidHalfDount(CanvasID, config) {
    if (barChartInstance[CanvasID]) {
        barChartInstance[CanvasID].destroy();
    }

    const ctx = document.querySelector(CanvasID).getContext('2d');

    barChartInstance[CanvasID] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: config.Label,
            datasets: [{
                label: config.datesetName,
                data: config.data,

                backgroundColor: config.bgColor,
                // fill: true,
            }
            ]
        },
        options: {
            responsive: true,
            circumference: 180,
            rotation: 270,
            cutout: '80%',
            aspectRatio: 2,
            events: [],
            plugins: {
                legend: { display: false },

                tooltip: {
                    filter: (items) => {
                        return items.dataIndex !== 1;
                    }
                }
            },

        }
    });
}
