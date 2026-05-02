
function LabelOfWeek() {
    return ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
}

function LabelOfMonths() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}


function Generate_lable(type) {
    switch (type) {
        case 'week':
            return LabelOfWeek();
        case 'monthly':
            return LabelOfMonths();
    }
}


function build_bar_chart(ctx, type = 'week') {

    const Lable = Generate_lable(type);

    Chart.defaults.plugins.legend.display = false;
    new Chart(ctx,
        {
            type: 'bar',
            data: {
                labels: Lable,
                datasets: [
                    {
                        label: "",
                        data: [19, 10, 15, 26, 18, 20, 12],
                        backgroundColor: "#8d4fffa4",
                        barThickness: 20,
                        tension: 0.4
                    },

                    {
                        label: "",
                        data: [60, 12, 25, 17, 33, 10, 42],
                        backgroundColor: "#2564eb7b",
                        barThickness: 20,
                        tension: 0.4

                    },
                ]
            },

            options:
            {
                responsive: false,
                maintainAspectRatio: true,
                layout: {
                    padding: {
                        left: 25, right: 25, top: 50, bottom: 5
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
                            display: false
                        },
                    },

                    y:
                    {
                        beginAtZero: true,
                        grid: {
                            display: true
                        },
                        min: 0,
                        max: 80
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
function bulid_doughnut_chart(ctx, config) {

    new Chart(ctx,
        {
            type: "doughnut",
            data: {
                labels: ["opened", 'On hold', 'compeleted'],
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
                maintainAspectRatio: false
            }
        });

}


function bulid_line_chart(ctx) {

    Chart.defaults.plugins.legend.display = false;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['week 1', 'week2', 'week 3', 'week 4'],
            datasets: [{
                label: "MTBF",
                data: [50.6, 20.2, 40.0, 12.6],

                borderColor: '#7c3aed',
                borderWidth: 1.5,
                tension: 0.4,

                pointBackgroundColor: '#7c3aed',
                pointBorderColor: '#7c3aed',

                pointRadius: 3,
                pointHoverRadius: 6
            },
            {
                label: "MTTR",
                data: [10.6, 50.2, 20.0, 2.6],

                borderColor: '#2564eb7b',
                borderWidth: 1.5,
                tension: 0.4,


                pointBackgroundColor: '#2564ebe5',
                pointBorderColor: '#2564ebe5',
                pointRadius: 3,
                pointHoverRadius: 6
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                        loop: true
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

                    min: 0,
                    max: 80,
                    ticks:
                    {
                        stepSize: 5,
                    }

                }
            }
        }
    });

}